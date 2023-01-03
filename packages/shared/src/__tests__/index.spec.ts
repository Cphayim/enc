import { it, expect, vi } from 'vitest'
import {
  createErrorMessage,
  createThrowErrorFunction,
  deepClone,
  delayWrapper,
  getFileNameFromUrl,
  isNone,
  log,
  randomStr,
} from '..'

it('should be able to output prefixed logs', () => {
  const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => void 0)
  const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => void 0)
  const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => void 0)
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => void 0)

  log.debug('debug')
  expect(debugSpy).toBeCalled()
  expect(debugSpy).lastCalledWith('[enc]', 'debug')

  log.info('info')
  expect(infoSpy).toBeCalled()
  expect(infoSpy).lastCalledWith('[enc]', 'info')

  log.warn('warn')
  expect(warnSpy).toBeCalled()
  expect(warnSpy).lastCalledWith('[enc]', 'warn')

  log.error('error')
  expect(errorSpy).toBeCalled()
  expect(errorSpy).lastCalledWith('[enc]', 'error')
})

it(`should create a standard error message`, () => {
  expect(createErrorMessage('test error message')).toBe('[enc] test error message')
})

it(`should create a throw standard error function`, () => {
  const message = createErrorMessage('test error message')
  expect(createThrowErrorFunction('test error message')).toThrowError(message)
})

it(`should be able to check if a value is none`, () => {
  expect(isNone(undefined)).toBe(true)
  expect(isNone(null)).toBe(true)
  expect(isNone(0)).toBe(false)
  expect(isNone('')).toBe(false)
  expect(isNone({})).toBe(false)
})

it(`should be able to create a random string`, () => {
  expect(randomStr(6)).toHaveLength(6)
  expect(randomStr(0)).toHaveLength(32) // default length
  expect(randomStr(-1)).toHaveLength(0) // invalid length return empty string
  expect(randomStr(1000)).not.toEqual(randomStr(1000))
})

it(`should be able to deep clone an object`, () => {
  const obj = { a: 1, b: { c: 2 } }
  expect(deepClone(obj)).toEqual(obj)
  expect(deepClone(obj)).not.toBe(obj)
})

it(`should be able to get file name from url`, () => {
  expect(getFileNameFromUrl('https://example.com/test.png')).toBe('test.png')
  expect(getFileNameFromUrl('https://example.com/test.png#hash')).toBe('test.png')
  expect(getFileNameFromUrl('https://example.com/test.png?query')).toBe('test.png')
  expect(getFileNameFromUrl('https://example.com/test.png?query#/hash/a/b')).toBe('test.png')
  expect(getFileNameFromUrl('https://example.com/test.png?query#/hash/a/b?query')).toBe('test.png')
  expect(getFileNameFromUrl('/test.png')).toBe('test.png')
  expect(getFileNameFromUrl('/test.png?query#hash?query#hash')).toBe('test.png')
})

it(`should be able to delay a function`, async () => {
  const fn = vi.fn(() => 1)
  const result = await delayWrapper(fn, 1)
  expect(result).toBe(1)
  expect(fn).toBeCalled()
})
