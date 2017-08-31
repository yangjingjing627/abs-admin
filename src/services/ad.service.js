import {get, post} from 'http'
export default class AdService {
  /**
   *
   * 获取广告列表
   * @param {any} params.adType [必须] 广告类型 (全部: 0 / 图片: 10 / 视频: 20)
   * @param {any} params.linkType [必须] 关联类型 (全部: 0 / SKU: 10 / 关键字: 20 / 品类: 30 / 所有结算: 40 /)
   * @param {any} params.adStatus [必须] 广告状态 (全部: 0 / 未开始: 10 / 投放中: 20 / 已结束: 30 / 暂停: 21)
   * @param {any} params.sourceType [必须] 结算单广告: 10, 全屏广告: 20
   * @param {any} params.parameter [非必须] 查询参数(对名称的模糊搜索)
   * @returns
   * @memberof AdService
   */
  getAdList(params) {
    return get('admin/ad/list', params)
  }
  /**
   *
   * 获取城市列表
   * @param {any} 无
   * @returns
   * @memberof AdService
   */
  getCityList(params) {
    return get('admin/ad/play/region/city', params)
  }

  /**
   *
   * 根据店铺id查询店铺
   * @param {any} params.storeId  [必须] 店铺ID
   * @returns
   * @memberof AdService
   */
  getStoreById(params) {
    return get('admin/ad/play/region/store', params)
  }

  /**
   *
   * 根据广告id查询覆盖城市
   * @param {int} params.adId  [必须] 广告ID
   * @returns
   * @memberof AdService
   */
  getCoverById(params) {
    return get('admin/ad/import/cover', params)
  }

  /**
   *
   * 根据广告id查询播放次数
   * @param {int} params.adId  [必须] 广告ID
   * @returns
   * @memberof AdService
   */
  getCityCountById(params) {
    return get('admin/ad/import/city/count', params)
  }

  /**
   *
   * 根据广告id查询店铺的播放次数
   * @param {int} params.adId  [必须] 广告ID
   * @returns
   * @memberof AdService
   */
  getStoreCountById(params) {
    return get('admin/ad/import/store/count', params)
  }

  /**
   *
   * 根据广告id导出覆盖城市数据
   * @param {int} params.adId  [必须] 广告ID
   * @returns
   * @memberof AdService
   */
  exportCityById(params) {
    return get('admin/ad/export/cover', params)
  }

  /**
   *
   * 根据广告id导出覆盖城市数据
   * @param {int} params.adId  [必须] 广告ID
   * @returns
   * @memberof AdService
   */
  exportCountById(params) {
    return get('admin/ad/export/count', params)
  }

  /**
   *
   * 广告创建
   * @param {any}
   * @returns
   * @memberof AdService
   */
  adCreate(params) {
    return post('admin/ad/create', params, true, { headers: {'content-type': 'application/json; charset=utf-8'}, isJson: true })
  }

  /**
   *
   * 广告修改
   * @param {any}
   * @returns
   * @memberof AdService
   */
  adSave(params) {
    return post('admin/ad/save', params, true, { headers: {'content-type': 'application/json; charset=utf-8'}, isJson: true })
  }

  /**
   *
   * @param {int} adId 广告ID [必须]
   * @returns
   * @memberof AdService
   */
  getAdverInfoByAdId({adId}) {
    return get('admin/ad/edit', {adId})
  }

  /**
   * 广告状态修改
   * @param {int} params.adId  [必须] 广告ID
   * @param {int} params.adStatus  [必须] 广告状态
   * @param {any} 无
   * @returns
   * @memberof AdService
   */
  changeAdStatus(params) {
    return post('admin/ad/status/change', params)
  }

  /**
   * SKU关联, SKU查询API
   * @param {string} sku  需要关联的sku [必须]
   * @returns
   * @memberof AdService
   */
  getAdLinkSKU({sku}) {
    return get('admin/ad/link/sku', {sku})
  }

  /**
   * 品类关联, 品类查询API
   */
  getAdLinkCateList() {
    return get('admin/ad/link/cate')
  }
}
