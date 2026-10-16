export function hasBody(doc: { body?: { value?: unknown[] } | null }): boolean {
  const nodes = doc.body?.value ?? []
  return nodes.some((n) => (typeof n === 'string' ? n.trim() !== '' : true))
}
