import { IStorage, IStorageSave } from './storage.interface'

class Storage implements IStorage {
  /**
   * @author Cyan
   * @constructor [type] 调用缓存的类型 local 或者 session 默认使用 session
   * @function [save] 储存
   * @function [get] 获取
   * @function [remove] 移除指定缓存数据
   * @function [clear] 全部清空
   */
  public type: string
  public localReg: RegExp = /local/

  constructor(type: string) {
    /** 匹配是否需要调用 local 缓存 默认使用 session */
    this.type = (this.localReg.test(type) && 'localStorage') ||  'sessionStorage'
  }

  public save = (keyVal: object, time?: number): void => {
    /**
     * @param keyVal 需要缓存数据的键值对
     * @param expireTime 缓存时间
     * @constant cacheExpire 缓存过期时间 默认为12小时
     */
    const expireTime = time || 12 * 60 * 60

    Object.keys(keyVal).forEach((e: string): void => {

      const cacheExpire: number = expireTime * 1000 + new Date().getTime()

      window[this.type].setItem(e, JSON.stringify({
        exp: cacheExpire,
        val: keyVal[e]
      }))

    })
  }

  public get = (key: string): any => {
    /**
     * @constant cacheVal 获取缓存内容
     * @constant valParse 解析内容
     * @constant nowDate 获取当前时间
     * @description 如果超出缓存时间则清空该数据
     */
    const cacheVal: string = window[this.type].getItem(key)
    const valParse: IStorageSave = JSON.parse(cacheVal)

    if (!valParse) {
      return null
    }

    const { exp, val }: IStorageSave = valParse
    const nowDate: number = new Date().getTime()
    
    if (nowDate > exp) {
      this.remove(key)
      return null
    }
    return val
  }

  public remove = (key: string): void => {
    window[this.type].removeItem(key)
  }

  public clear = (): void => {
    window[this.type].clear()
  }
}

export const storage = (type: string = 'sessionStorage'): IStorage => new Storage(type)