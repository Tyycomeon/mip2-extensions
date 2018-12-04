/**
 * file: 小说shell 小流量配置文件
 * @author: guoshuang
 */

import {getParamFromString} from './util'

class Flag {
  constructor () {
    // 无线下拉bkid
    this.bkid = ['377566031', '228265', '32544050', '494196121', '831262', '61031200']
  }
  /**
   * 安卓4及其以下的浏览器
   *
   * @public
   */
  isAndroid4 () {
    let userAgent = navigator.userAgent
    let index = userAgent.indexOf('Android')
    if (index >= 0) {
      let androidVersion = parseFloat(userAgent.slice(index + 8))
      // 安卓4以下版本降级
      if (androidVersion < 5) {
        return true
      }
    }
    return false
  }
  /**
   * 判断是否命中无限下拉的bookid
   *
   * @public
   */
  isUnlimitedPulldownSids () {
    // 安卓4降级
    if (this.isAndroid4()) {
      return false
    }
    let url = window.location.href
    if (!window.MIP.util.isCacheUrl(url)) {
      return false
    }
    let bkid = getParamFromString(url, 'bkid')
    // 命中bkid，走无限下拉
    if (this.bkid.indexOf(bkid) > -1) {
      return true
    }
    return false
  }

  isNovelShell (type) {
    return type === 'page'
  }
}

export default Flag
