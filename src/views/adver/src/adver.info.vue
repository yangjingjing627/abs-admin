<template>
  <hsy-dialog v-if="adverInfo.visible" :visible="adverInfo.visible" :title="adverInfo.dialogTitle" v-on:updateVisible="updateVisible">
    <div slot="main">
      <div class="card">
        <h3>广告名称: {{info.adName}}</h3>
      </div>
      <div class="card">
        <h3>广告类型: {{info.adTypeDesc}}</h3>
        <img v-if="info.adType==10" :src="info.adUrl"/>
        <video v-if="info.adType==20">
          <source :src="info.adUrl">
        </video>
        <div v-if="info.adType==20">播放次数：{{ info.repeatTimes }}</div>
        <div v-if="info.adType==20">视频名称：{{ info.fileName }}</div>
        <div>播放时长：{{ info.playLength }}s</div>
      </div>
      <div class="card" v-if="adverInfo.sourceType==10">
        <h3>关联方式: {{info.linkTypeDesc}}</h3>
        <div v-if="info.linkType==10" class="goods-item" v-for="item in info.linkDetails" :key="item.sku">
          <h4>商品条形码: {{item.sku}}</h4>
          <img :src="item.imageUrl"/>
          <p>{{item.goodsName}}</p>
        </div>
        <span v-if="info.linkType==20" class="btn-item" v-for="item in info.linkDetails" :key="item">
          <a class="button-key">{{item}}</a>
        </span>
        <label v-if="info.linkType==30" v-for="item in info.linkDetails" :key="item.cityId">
          <span><b class="cbx"></b>{{item.cateName}}</span>
        </label>
      </div>
      <div class="card">
        <h3>投放策略: {{info.deliveryTypeDesc}}</h3>
        <div class="card-padding card-block">
          <div v-if="info.deliveryType!=10" class="time"><span>播放总次数: {{info.deliveryDetail&&info.deliveryDetail.playTimes}} 次/店</span></div><br v-if="info.deliveryType!=10"/>
          <div v-if="info.deliveryType==20" class="time">
            生效时间: {{info.deliveryDetail&&info.deliveryDetail.activeTime&&info.deliveryDetail.activeTime.replace(/\-/g,'.')}}
          </div>
          <br v-if="info.deliveryType!=10"/>
          <div v-if="info.deliveryType!=20" class="time">日期: {{info.deliveryDetail&&info.deliveryDetail.playStart&&info.deliveryDetail.playStart.replace(/\-/g,'.')}}-{{info.deliveryDetail&&info.deliveryDetail.playEnd&&info.deliveryDetail.playEnd.replace(/\-/g,'.')}}</div>
        </div>
      </div>
      <div class="card">
        <h3>播放时段: {{info.playTimeFrameTypeDesc}}</h3>
        <div class="card-padding" v-for="time in info.playTimeFrameDetails">
          <span class="time">{{time.timeStart}}</span>至<span class="time">{{time.timeEnd}}</span>
        </div>
      </div>
      <div class="card">
        <h3>投放区域: {{info.playRegionTypeDesc}}</h3>
        <div class="card-padding card-group" v-if="info.playRegionType!=10&&info.playRegionDetails&&info.playRegionDetails.length>0" :class="{'store': info.playRegionType!=20}">
          <label v-for="item in info.playRegionDetails" :key="item.cityId || item.storeId">
            <span v-if="info.playRegionType==20"><b class="cbx"></b>{{item.cityName}}</span>
            <span v-if="info.playRegionType!=20"><b class="cbx"></b><span class="storeId">ID:{{item.storeId}}</span>店铺名称:{{item.storeName}}</span>
          </label>
        </div>
      </div>
    </div>
    <div slot="footer"><a class="button" @click="updateVisible">关闭</a><a v-if="adverInfo.adStatusDesc !== '已结束'" class="button" @click="goAdverFullAdd(info)">编辑</a></div>
  </hsy-dialog>
</template>
<script>
import AdService from '@/services/ad.service'
export default {
  data() {
    return {
      info: {}
    }
  },
  props: {
    adverInfo: {
      type: Object
    }
  },
  created() {
    this.AdService = new AdService()
  },
  computed: {
    sourceName () {
      return this.$route.params.sourceType
    }
  },
  watch: {
    'adverInfo.adId'() {
      this.getAdverInfoByAdId()
    }
  },
  methods: {
    goAdverFullAdd(info) {
      this.$router.push('/adver/' + this.sourceName + '/edit/' + info.adId)
    },
    async getAdverInfoByAdId() {
      if (this.adverInfo.adId === undefined) return
      let res = await this.AdService.getAdverInfoByAdId({adId: this.adverInfo.adId})
      this.info = res
    },
    updateVisible() {
      this.$emit('updateVisible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'scss/variables.scss';
.close {
  position: absolute;
  cursor: pointer;
  width: 10px;
  height: 10px;
  top: 9px;
  right: 19px;
  &:before, &:after {
    position: absolute;
    content: '';
    width: 1px;
    height: 10px;
    background: #999;
    transform: rotate(-45deg);
  }
  &:after {
    transform: rotate(45deg);
  }
}
.card {
  padding: 8px 0 0 47px;
  position: relative;
  color: $font-color;
  font-size: 12px;
  line-height: 17px;
  text-align: left;
  &-padding {
    padding-left: 61px;
    margin-top: 10px;
  }
  &-block {
    .time {
      display: inline-block;
      margin-top: 10px;
      max-width: 200px;
      width: auto;
      &:nth-of-type(1) {
        margin-top: 0;
      }
    }
  }
  &-group {
    width: 422px;
    padding: 12px 10px;
    border: 1px solid $border-color;
    border-radius: 4px;
  }
  &:before {
    position: absolute;
    content: '';
    top: 10px;
    left: 38px;
    width: 3px;
    height: 12px;
    background: #3dbcfc;
    border-radius: 2px;
  }
  h3, h4, p {
    font-size: 12px;
    line-height: 17px;
  }
  h3 {
    margin-bottom: 10px;
  }
  img, video {
    width: 108px;
    height: 78px;
    border: 1px solid $border-color;
    border-radius: 4px;
  }
}
.goods-item {
  width: 200px;
  height: 110px;
  display: inline-block;
  padding: 5px;
  margin-right: 24px;
  margin-bottom: 17px;
  border: 1px solid $border-color;
  border-radius: 4px;
  position: relative;
  &:nth-of-type(2n) {
    margin-right: 0;
  }
  h4 {
    text-align: center;
  }
  img {
    width: 73px;
    height: 73px;
    position: absolute;
    top: 27px;
    bottom: 10px;
    left: 11px;
    margin: 0;
  }
  p {
    position: absolute;
    padding-top: 17px;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 90px;
  }
}
.btn-item {
  display: inline-block;
  box-sizing: border-box;
  padding-right: 0;
  margin-top: 16px;
  font-size: 0;
  min-width: 160px;
}
.time {
  width: auto;
  padding: 0 15px;
  margin: 0 8px;
  height: 24px;
  line-height: 24px;
  border: 1px solid $border-color;
  border-radius: 4px;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  text-align: center;
}
label {
  width: 100px;
  padding-right: 5px;
  line-height: 26px;
  &:nth-of-type(2n+4) {
    padding-right: 0;
  }
}
label, .cbx {
  display: inline-block;
  vertical-align: middle;
}
.store {
  label {
    display: block;
    width: auto;
  }
  .storeId {
    display: inline-block;
    min-width: 60px;
    padding-right: 20px;
  }
}
.cbx {
  position: relative;
  margin-right: 7px;
  display: inline-block;
  width: 8px;
  height: 5px;
  margin-top: -4px;
  border-left: 1px solid #3dbcfc;
  border-bottom: 1px solid #3dbcfc;
  transform: rotate(-45deg);
}
.btn-item {
  display: inline-block;
  box-sizing: border-box;
  padding-right: 0;
  margin-top: 16px;
  font-size: 0;
  min-width: 160px;
  font-size: 12px;
  &:nth-of-type(1), &:nth-of-type(2){
    margin-top: 0;
  }
}
.button-key {
  display: inline-block;
  background: #f1f1f1;
  border: 1px solid $border-color;
  border-radius: 4px;
  height: 30px;
  line-height: 30px;
  padding: 0 20px;
  box-sizing: border-box;
}

// }
</style>
