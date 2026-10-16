export const OUT = new URL('../../.output/public/', import.meta.url)

function metaContent(html, attr, key) {
  const tag = html.match(new RegExp(`<meta[^>]*\\b${attr}="${key}"[^>]*>`, 'i'))?.[0]
  return tag?.match(/\bcontent="([^"]*)"/i)?.[1] ?? null
}

function jsonLdBlocks(html) {
  return [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => JSON.parse(m[1]))
}

export function normalizePerson(blocks) {
  const nodes = blocks.flatMap((b) => (b['@graph'] ? b['@graph'] : [b]))
  const byId = new Map(nodes.filter((n) => n['@id']).map((n) => [n['@id'], n]))
  const resolve = (v) => (v && typeof v === 'object' && v['@id'] && Object.keys(v).length === 1 ? byId.get(v['@id']) ?? v : v)
  const first = (v) => (Array.isArray(v) ? v[0] : v)
  const isPerson = (n) => [].concat(n['@type']).includes('Person')
  const p = nodes.find(isPerson)
  if (!p) return null
  const image = resolve(first(p.image))
  const worksFor = resolve(first(p.worksFor))
  const address = resolve(first(p.address)) ?? {}
  return {
    name: p.name,
    url: p.url,
    image: typeof image === 'string' ? image : image?.url ?? image?.contentUrl,
    jobTitle: p.jobTitle,
    worksFor: worksFor?.name,
    address: { locality: address.addressLocality, region: address.addressRegion, country: address.addressCountry },
    sameAs: [].concat(p.sameAs ?? []),
  }
}

export function extractHead(html) {
  return {
    title: html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? null,
    description: metaContent(html, 'name', 'description'),
    canonical: html.match(/<link[^>]*rel="canonical"[^>]*>/i)?.[0].match(/href="([^"]*)"/)?.[1] ?? null,
    og: Object.fromEntries(['title', 'description', 'type', 'url', 'image'].map((k) => [k, metaContent(html, 'property', `og:${k}`)])),
    twitter: Object.fromEntries(['card', 'title', 'description'].map((k) => [k, metaContent(html, 'name', `twitter:${k}`)])),
    person: normalizePerson(jsonLdBlocks(html)),
  }
}

export function visibleText(html) {
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? ''
  return body
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}
