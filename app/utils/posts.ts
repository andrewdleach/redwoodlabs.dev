export function publishedPosts() {
  const query = queryCollection('blog').order('date', 'DESC')
  return import.meta.dev ? query : query.where('draft', '=', false)
}
