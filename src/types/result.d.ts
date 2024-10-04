/**
 * 统一返回数据结果
 * 泛型
 */

export interface Result<T = any> {
  /**
   * 返回码
   */
  code: number;
  /**
   * 返回信息
   */
  message: string;
  /**
   * 返回数据
   */
  data: T;
}

export interface PageResult<T> {
  /**
   * 总记录数
   */
  total: number;
  /**
   * 当前页的数据集合
   */
  records: T[];
}