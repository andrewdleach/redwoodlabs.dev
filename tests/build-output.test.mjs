import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { OUT, extractHead, visibleText } from './lib/html.mjs'

const prod = JSON.parse(readFileSync(new URL('./fixtures/production-home.json', import.meta.url), 'utf8'))
const read = (p) => readFileSync(new URL(p, OUT), 'utf8')
const home = () => read('index.html')

test('home: visible text matches production', () => {
  assert.equal(visibleText(home()), prod.text)
})

test('home: static assets present', () => {
  for (const f of ['resume.pdf', 'profile-picture.jpeg', 'favicon.ico']) assert.ok(existsSync(new URL(f, OUT)), f)
})

test('home: color mode script runs before body', () => {
  const head = home().split(/<body/i)[0]
  assert.match(head, /prefers-color-scheme/)
})

test('seo: head tags match production', () => {
  const { person, ...rest } = extractHead(home())
  const { person: prodPerson, ...prodRest } = prod.head
  assert.deepEqual(rest, prodRest)
})

test('seo: Person structured data matches production', () => {
  assert.deepEqual(extractHead(home()).person, prod.head.person)
})

test('seo: robots.txt allows indexing and points at sitemap', () => {
  const robots = read('robots.txt')
  assert.match(robots, /^Sitemap: https:\/\/www\.redwoodlabs\.dev\/sitemap\.xml$/m)
  assert.doesNotMatch(robots, /^Disallow:\s*\/\s*$/m)
})

test('seo: sitemap lists only the homepage', () => {
  const locs = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  assert.deepEqual(locs, ['https://www.redwoodlabs.dev/'])
})

test('baseline: no project page without body', () => {
  assert.equal(existsSync(new URL('projects/family-connect/index.html', OUT)), false)
})

test('baseline: no blog while there are no posts', () => {
  assert.equal(existsSync(new URL('blog/index.html', OUT)), false)
  assert.doesNotMatch(home(), /href="\/blog"/)
})

test('baseline: project card links to the live site', () => {
  assert.match(home(), /href="https:\/\/familyconnect\.dev"/)
})
