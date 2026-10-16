import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { hasPublishedPosts } from '../lib/hasPublishedPosts.ts'

function dirWith(files) {
  const dir = mkdtempSync(join(tmpdir(), 'rwl-posts-'))
  for (const [name, body] of Object.entries(files)) writeFileSync(join(dir, name), body)
  return dir
}
const post = (front) => `---\ntitle: T\ndescription: D\ndate: 2026-10-01\n${front}---\n\nBody.\n`

test('missing directory', () => assert.equal(hasPublishedPosts(join(tmpdir(), 'rwl-does-not-exist')), false))
test('post without draft field is published', () => assert.equal(hasPublishedPosts(dirWith({ 'a.md': post('') })), true))
test('draft: false is published', () => assert.equal(hasPublishedPosts(dirWith({ 'a.md': post('draft: false\n') })), true))
test('draft: true is not published', () => assert.equal(hasPublishedPosts(dirWith({ 'a.md': post('draft: true\n') })), false))
test('draft: true with trailing comment is not published', () => assert.equal(hasPublishedPosts(dirWith({ 'a.md': post('draft: true # not ready\n') })), false))
test('draft: True (YAML boolean) is not published', () => assert.equal(hasPublishedPosts(dirWith({ 'a.md': post('draft: True\n') })), false))
test('file with BOM and draft: true is not published', () => assert.equal(hasPublishedPosts(dirWith({ 'a.md': '﻿' + post('draft: true\n') })), false))
test('CRLF draft: true is not published', () => assert.equal(hasPublishedPosts(dirWith({ 'a.md': post('draft: true\n').replace(/\n/g, '\r\n') })), false))
test('body containing --- does not affect frontmatter', () => assert.equal(hasPublishedPosts(dirWith({ 'a.md': post('draft: true\n') + '\n---\ndraft: false\n---\n' })), false))
test('non-markdown files are ignored', () => assert.equal(hasPublishedPosts(dirWith({ 'notes.txt': 'hello' })), false))
