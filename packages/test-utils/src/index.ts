import { vi } from 'vitest'

export function createConsoleSpy() {
  return {
    log: vi.spyOn(console, 'log').mockImplementation(() => void 0),
    debug: vi.spyOn(console, 'debug').mockImplementation(() => void 0),
    info: vi.spyOn(console, 'info').mockImplementation(() => void 0),
    warn: vi.spyOn(console, 'warn').mockImplementation(() => void 0),
    error: vi.spyOn(console, 'error').mockImplementation(() => void 0),
  }
}
