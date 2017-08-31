<template>
  <div class="check-result">
    <go-back></go-back>
    <div class="base-info">
      <span>广告名称：<i>{{ info.adName }}</i></span>
      <span>类型：<i>{{ info.adTypeDesc }}</i></span>
      <span v-if="!isFull">关联方式：<i>{{ info.linkTypeDesc }}</i></span>
      <span>投放策略：<i>{{ info.deliveryDesc }}</i></span>
      <span v-if="info.activeTime">生效时间：<i>{{ info.activeTime}}</i></span>
      <span>状态：<i>{{ info.adStatusDesc }}</i></span>
    </div>
    <div class="city">
      <p>
        <span>覆盖城市：<i>{{ cover_data.coverCityCount }}</i></span>
        <span>覆盖门店：<i>{{ cover_data.coverStoreCount }}</i></span>
      </p>
      <p>top10</p>
      <div class="city-echart">
        <bq-chart :id="city" :data="cover_data.adCoverCityAndStoreList"></bq-chart>
      </div>
      <a class="export" :href="exportCoverData">导出全部数据</a>
    </div>
    <div class="city count">
      <p>
        <span>播放总次数：<i>{{ city_count.totalPlayCount }}次</i></span>
      </p>
      <p>top10</p>
      <div class="city-echart">
        <bq-chart :id="report" :data="city_count.adCoverCityPlayCountList"></bq-chart>
      </div>
      <a class="export" :href="exportCountData">导出全部数据</a>
    </div>
    <div class="detail-data">
      <a v-if="false">导出详细数据</a>
      <div class="table-list">
        <ul class="table-ul-common">
          <li id="header">
            <span>店铺名称</span>
            <span>播放次数</span>
          </li>
          <li v-for="item in store_count">
            <span>{{ item.storeName }}</span>
            <span>{{ item.playCount }}</span>
          </li>
          <li v-if="store_count.length <= 0">暂无数据</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import bqChart from '@/components/adver/chart'
import AdService from '@/services/ad.service'
import { API_HOST } from '@/config/global.config'
export default {
  data() {
    return {
      info: {},
      cover_data: {},
      city_count: {},
      store_count: {},
      city: 'city',
      report: 'report'
    }
  },
  mounted() {
    this.AdService = new AdService()
    this.info = this.$route.query
    this.getCoverData()
    this.getCityCountById()
    this.getStoreCountById()
  },
  computed: {
    exportCoverData () {
      return API_HOST + 'admin/ad/export/cover?adId=' + this.info.adId
    },
    exportCountData () {
      return API_HOST + 'admin/ad/export/count?adId=' + this.info.adId
    },
    isFull () {
      return this.$route.params.sourceType === 'full'
    }
  },
  methods: {
    async getCoverData () {
      let res = await this.AdService.getCoverById({adId: this.info.adId})
      this.cover_data = res
    },
    async getCityCountById () {
      let res = await this.AdService.getCityCountById({adId: this.info.adId})
      this.city_count = res
    },
    async getStoreCountById () {
      let res = await this.AdService.getStoreCountById({adId: this.info.adId})
      this.store_count = res
    }
  },
  components: {
    bqChart
  }
}
</script>
<style lang="scss" scoped>
@import 'scss/variables.scss';
.check-result {
  width: 100%;
  .base-info {
    padding-left: 2px;
    margin-bottom: 26px;
  }
  .city {
    padding: 10px 22px;
    overflow: hidden;
    display: inline-block;
    border: 1px solid #D0D0D0;
    margin: 0 30px 34px 0;
    p {
      margin-bottom: 10px;
    }
    .city-echart {
      margin: 0 20px;
    }
    .export {
      margin-top: 13px;
      float: right;
    }
  }
  .count {
    margin-right: 0;
  }
  .detail-data {
    .table-list {
      width: 580px;
      margin-top: 10px;
      span {
        width: 49%;
        font-size: 14px;
        color: #555555;
      }
      li {
        background: #fff;
      }
      #header {
        background: rgba(5,174,249,0.08);
      }
    }
  }
  span {
    color: $primary-font;
    font-size: 14px;
    margin-right: 33px;
    i {
      color: #252525;
    }
  }
  a {
    width: 94px;
    height: 28px;
    display: inline-block;
    line-height: 28px;
    text-align: center;
    color: #fff;
    background: $primary-font;
    border-radius: 4px;
  }
}
</style>
