
import fetch from '../utils/fetch'

/**
 * js错误总数
 * @param {*} query
 */
export function httpCount (query) {
  return fetch({
    url: '/api/http/count',
    method: 'post',
    data: query
  })
}