/** 公共缓存类 */
export interface IStorage {
  save: (keyVal: object, time?: number) => void,
  get: (key: string) => any,
  remove: (key: string) => void,
  clear: () => void
}

/** 存入缓存格式 */
export interface IStorageSave {
  exp: number,
  val: any
}