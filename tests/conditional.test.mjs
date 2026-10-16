import { test, before } from 'node:test'
import assert from 'node:assert/strict'
import { cpSync, mkdirSync, mkdtempSync, symlinkSync, writeFileSync, readFileSync, existsSync, appendFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'
import { extractHead } from './lib/html.mjs'

const root = new URL('..', import.meta.url).pathname
let out

before(() => {
  const dir = mkdtempSync(join(tmpdir(), 'rwl-conditional-'))
  const skip = new Set(['node_modules', '.nuxt', '.output', '.data', '.git'])
  cpSync(root, dir, { recursive: true, filter: (src) => !skip.has(src.slice(root.length).split('/')[0]) })
  symlinkSync(join(root, 'node_modules'), join(dir, 'node_modules'))

  mkdirSync(join(dir, 'content/blog'), { recursive: true })
  appendFileSync(join(dir, 'content/projects/family-connect.md'), '\nA write-up paragraph.\n')
  writeFileSync(join(dir, 'content/blog/published.md'), '---\ntitle: Published post\ndescription: A published post.\ndate: 2026-10-01\ndraft: false\n---\n\nBody.\n')
  writeFileSync(join(dir, 'content/blog/no-draft-field.md'), '---\ntitle: No draft field\ndescription: Omits draft.\ndate: 2026-09-01\n---\n\nBody.\n')
  writeFileSync(join(dir, 'content/blog/secret.md'), '---\ntitle: Secret draft\ndescription: A draft.\ndate: 2026-10-02\ndraft: true\n---\n\nBody.\n')

  execFileSync('npx', ['nuxt', 'generate'], { cwd: dir, stdio: 'inherit', env: { ...process.env, VERCEL_ENV: '' } })
  out = join(dir, '.output/public')
})

const read = (p) => readFileSync(join(out, p), 'utf8')
const locs = () => [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

test('rule 1: card with a write-up links internally', () => {
  assert.match(read('index.html'), /href="\/projects\/family-connect"/)
})

test('rule 2: project page generated and in sitemap', () => {
  assert.ok(existsSync(join(out, 'projects/family-connect/index.html')))
  assert.ok(locs().includes('https://www.redwoodlabs.dev/projects/family-connect'))
})

test('rule 3: blog link and index appear once a post exists', () => {
  assert.match(read('index.html'), /href="\/blog"/)
  assert.ok(existsSync(join(out, 'blog/index.html')))
})

test('rule 4: drafts excluded, posts without draft field published', () => {
  assert.ok(existsSync(join(out, 'blog/published/index.html')))
  assert.ok(existsSync(join(out, 'blog/no-draft-field/index.html')))
  assert.equal(existsSync(join(out, 'blog/secret/index.html')), false)
  assert.doesNotMatch(read('blog/index.html'), /Secret draft/)
  assert.equal(locs().some((l) => l.includes('secret')), false)
})

test('posts get title, description, canonical and BlogPosting', () => {
  const html = read('blog/published/index.html')
  const head = extractHead(html)
  assert.match(head.title, /Published post/)
  assert.equal(head.description, 'A published post.')
  assert.equal(head.canonical, 'https://www.redwoodlabs.dev/blog/published')
  assert.match(html, /"BlogPosting"/)
})
