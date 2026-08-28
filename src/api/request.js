/**
 * 模拟网络请求
 * 统一伪造异步延迟 + 数据深拷贝，让 mock 数据的消费方式与未来接入真实接口时一致：
 * 调用方永远 await 一个 Promise，不会因为拿到的是同一份内存对象而被意外互相污染。
 */

/** 默认模拟延迟（毫秒），保持较短以不影响原型开发体验 */
const DEFAULT_DELAY = 200

/**
 * 包装一份 mock 数据为「异步请求」
 * @param {*} data 要返回的数据（会被深拷贝）
 * @param {{ delay?: number }} [options]
 * @returns {Promise<*>}
 */
export function mockRequest(data, { delay = DEFAULT_DELAY } = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(typeof data === 'function' ? data() : structuredClone(data))
    }, delay)
  })
}
