import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { parse } from 'yaml'

const FRONTMATTER = /^﻿?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/

// Nuxt prerenders every static page when crawling, so /blog is skipped until a published post exists.
export function hasPublishedPosts(dir = 'content/blog'): boolean {
  if (!existsSync(dir)) return false
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .some((f) => {
      const front = readFileSync(`${dir}/${f}`, 'utf8').match(FRONTMATTER)?.[1] ?? ''
      return parse(front)?.draft !== true
    })
}
