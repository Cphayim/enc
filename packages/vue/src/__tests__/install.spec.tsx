import { describe, expect, it, vi } from 'vitest'
import { createApp, defineComponent } from 'vue'

import { withInstall, isSFCWithInstall, usingSFCWithInstall, SFCWithInstall } from '../install'

function getComponent(name = 'Test') {
  return defineComponent({
    name,
    render() {
      return <div>TEST</div>
    },
  })
}

describe('install', () => {
  it('should be able to add an install method to component', () => {
    const component = getComponent()
    expect(component).toBeDefined()
    expect(isSFCWithInstall(component)).toBe(false)

    // add install method
    const sfcWithInstall = withInstall(component)
    expect(isSFCWithInstall(sfcWithInstall)).toBe(true)
    expect(sfcWithInstall.install).toBeDefined()
    expect(sfcWithInstall.install).toBeInstanceOf(Function)

    const app = createApp(getComponent('Root'))
    app.component = vi.fn().mockImplementation(() => void 0)

    // call install method will call app.component()
    sfcWithInstall.install!(app)
    expect(app.component).toBeCalled()
    expect(app.component).toBeCalledWith('Test', sfcWithInstall)
  })

  it('should be able to install `SFCWithInstall` using `usingSFCWithInstall`', () => {
    const component = getComponent()
    const sfcWithInstall = withInstall(component)

    const app = createApp(getComponent('Root'))
    app.use = vi.fn().mockImplementation(() => void 0)

    usingSFCWithInstall(app, sfcWithInstall)
    expect(app.use).toBeCalled()
    expect(app.use).toBeCalledWith(sfcWithInstall)
  })

  it('should be able to install `SFCWithInstall[]` using `usingSFCWithInstall`', () => {
    const sfcWithInstalls: SFCWithInstall<unknown>[] = [
      withInstall(getComponent('Test1')),
      withInstall(getComponent('Test2')),
      withInstall(getComponent('Test3')),
    ]

    const app = createApp(getComponent('Root'))
    app.use = vi.fn().mockImplementation(() => void 0)

    usingSFCWithInstall(app, sfcWithInstalls)
    expect(app.use).toBeCalledTimes(3)
    expect(app.use).toHaveBeenNthCalledWith(1, sfcWithInstalls[0])
    expect(app.use).toHaveBeenNthCalledWith(2, sfcWithInstalls[1])
    expect(app.use).toHaveBeenNthCalledWith(3, sfcWithInstalls[2])
  })

  it('should be able to install `Record<string, SFCWithInstall>` using `usingSFCWithInstall`', () => {
    const sfcWithInstallMap: Record<string, SFCWithInstall<unknown>> = {
      Test1: withInstall(getComponent('Test1')),
      Test2: withInstall(getComponent('Test2')),
      Test3: withInstall(getComponent('Test3')),
    }

    const app = createApp(getComponent('Root'))
    app.use = vi.fn().mockImplementation(() => void 0)

    usingSFCWithInstall(app, sfcWithInstallMap)
    expect(app.use).toBeCalledTimes(3)
    expect(app.use).toHaveBeenNthCalledWith(1, sfcWithInstallMap.Test1)
    expect(app.use).toHaveBeenNthCalledWith(2, sfcWithInstallMap.Test2)
    expect(app.use).toHaveBeenNthCalledWith(3, sfcWithInstallMap.Test3)
  })
})
