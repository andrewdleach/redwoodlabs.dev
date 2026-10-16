import { test } from 'node:test'
import assert from 'node:assert/strict'
import { hasBody } from '../app/utils/hasBody.ts'

test('no body object', () => assert.equal(hasBody({}), false))
test('null body', () => assert.equal(hasBody({ body: null }), false))
test('empty minimark value', () => assert.equal(hasBody({ body: { type: 'minimark', value: [] } }), false))
test('whitespace-only text nodes', () => assert.equal(hasBody({ body: { value: ['\n', '  '] } }), false))
test('a paragraph', () => assert.equal(hasBody({ body: { value: [['p', {}, 'Hello']] } }), true))
