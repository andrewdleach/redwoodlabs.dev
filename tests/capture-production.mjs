import { writeFileSync } from 'node:fs'
import { extractHead, visibleText } from './lib/html.mjs'

const html = await (await fetch('https://www.redwoodlabs.dev/')).text()
const snapshot = { head: extractHead(html), text: visibleText(html) }
writeFileSync(new URL('./fixtures/production-home.json', import.meta.url), JSON.stringify(snapshot, null, 2) + '\n')
console.log(snapshot)
