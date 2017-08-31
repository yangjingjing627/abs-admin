import {post, get} from 'http'
export default class LoginService {
  /**
   * 登录接口
   * @param {string} username 用户名 [必须]
   * @param {string} passwd 密码 [必须]
   * @returns
   * @memberof LoginService
   */
  login(params) {
    return post('admin/login', params)
  }

  /**
   * 退出登录接口
   * @param {string} userId 用户id [必须]
   * @returns
   * @memberof LoginService
   */
  logout(params) {
    return get('admin/logout', params)
  }
}
