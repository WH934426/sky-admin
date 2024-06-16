import md5 from 'md5'

/**
 * 根据配置生成请求的唯一键。
 * 如果没有配置，则使用当前时间的MD5哈希作为默认键。
 *
 * @param config - 请求的配置对象，可选。
 * @returns 生成的请求唯一键。
 */
export const getRequestKey = (config?: any): string => {
  if (!config) {
    return md5(String(+new Date())) // 当config不存在时，使用当前时间戳的MD5哈希
  }

  // 确保data部分可以被转换为字符串
  const dataStr = typeof config.data === 'string' ? config.data : JSON.stringify(config.data)

  // 组合url、method和data生成签名字符串，然后计算其MD5哈希
  return md5(config.url + '&' + config.method + '&' + dataStr)
}

/**
 * 用于存储所有正在进行的请求的标识符及其状态的对象。
 */
export const pending: { [key: string]: boolean } = {}

/**
 * 检查给定的请求键是否处于pending状态。
 *
 * @param key - 请求的唯一键。
 * @returns 如果请求处于pending状态则返回true，否则返回false。
 */
export const checkPending = (key: string): boolean => !!pending[key]

/**
 * 从pending对象中移除指定的请求键，表明该请求不再pending。
 *
 * @param key - 要移除的请求的唯一键。
 */
export const removePending = (key: string): void => {
  delete pending[key]
}
