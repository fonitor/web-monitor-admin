
import fetch from '../utils/fetch'

/**
 * 项目列表
 * @param {*} query
 */
export function projectList (query) {
  return fetch({
    url: '/api/project/list',
    method: 'post',
    data: query
  })
}