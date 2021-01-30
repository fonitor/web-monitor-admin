
import fetch from '../utils/fetch'

/**
 * js错误总数
 * @param {*} query
 */
export function pageTrend (query) {
  return fetch({
    url: '/api/page/trend',
    method: 'post',
    data: query
  })
}