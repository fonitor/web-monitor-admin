
import fetch from '../utils/fetch'

/**
 * js错误总数
 * @param {*} query
 */
export function jsCount (query) {
  return fetch({
    url: '/api/js/count',
    method: 'post',
    data: query
  })
}

/**
 * js错误总数
 * @param {*} query
 */
export function jsList (query) {
  return fetch({
    url: '/api/js/list',
    method: 'post',
    data: query
  })
}

