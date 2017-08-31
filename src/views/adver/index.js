import AdverList from './src/adver.list.vue'
import AdverAddModify from './src/adver.add.modify.vue'
// import AdverInfo from './src/adver.info.vue'
import AdverDelaySet from './src/adver.delay.set.vue'
import AdverCheck from './src/adver.check.vue'
export default function (router) {

  /**
  * 广告列表 (域名默认页面，默认结算广告列表)
  */
  router.push({
    path: '/',
    name: 'adverDefList',
    component: AdverList
  })

  /**
  * 广告列表
  * @param sourceType 广告类型 full 全屏广告 settle 结算广告
  *
  */
  router.push({
    path: '/adver/:sourceType/list',
    name: 'adverList',
    component: AdverList
  })

  /**
  * 广告 新增
  * @param type 广告操作 add 新增 edit 修改
  * @param sourceType 广告类型 full 全屏广告 settle 结算广告
  * @param adId 广告id
  */
  router.push({
    path: '/adver/:sourceType/add',
    name: 'AdverAdd',
    component: AdverAddModify
  })

  /**
  * 广告 修改
  * @param sourceType 广告类型 full 全屏广告 settle 结算广告
  * @param adId 广告id
  */
  router.push({
    path: '/adver/:sourceType/edit/:adId',
    name: 'AdverAddModify',
    component: AdverAddModify
  })

  /**
  * 结算广告列表 查看效果
  * 广告管理-结算广告-查看效果
  */
  router.push({
    path: '/adver/:sourceType/check',
    name: 'adverSettleCheck',
    component: AdverCheck
  })

  /**
  * 结算广告延迟设置
  * 广告管理-结算广告延迟设置
  */
  router.push({
    path: '/adver/delay/set',
    name: 'adverDelaySet',
    component: AdverDelaySet
  })

}
