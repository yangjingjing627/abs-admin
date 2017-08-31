<template>
  <div class="list">
    <div class="header-search">
      <hsy-input type="text" v-model="params.adName" placeholder="请输入广告名称">名称</hsy-input>
      <hsy-select :options="types" v-model="params.adType">类型</hsy-select>
      <hsy-select :options="ways" v-model="params.linkType" v-if="!isFull">关联方式</hsy-select>
      <hsy-select :options="status" v-model="params.adStatus">状态</hsy-select>
      <div>
        <a class="button" @click="search">查询</a>
      </div>
      <div>
        <a class="button add" @click="add">新增广告</a>
      </div>
    </div>
    <div class="table-list">
      <ul class="table-ul-common">
        <li id="header">
          <span>添加时间</span>
          <span>名称</span>
          <span>类型</span>
          <span>播放时长</span>
          <span>连续轮播</span>
          <span v-if="!isFull">关联方式</span>
          <span>投放策略</span>
          <span>生效时间</span>
          <span>状态</span>
          <span>已播放次数</span>
          <span>操作</span>
        </li>
        <li v-for="item in list">
          <span>{{ item.createTime }}</span>
          <span>
            <a @click="adEdit(item.adId, item.adStatusDesc)">
              {{ item.adName }}
            </a>
          </span>
          <span>{{ item.adTypeDesc }}</span>
          <span>{{ item.playLengthDesc }}</span>
          <span>{{ item.repeatTimesDesc }}</span>
          <span v-if="!isFull">{{ item.linkTypeDesc }}</span>
          <span>{{ item.deliveryDesc }}</span>
          <span>{{ item.activeTime }}</span>
          <span>{{ item.adStatusDesc }}</span>
          <span>{{ item.playTimes }}</span>
          <span class="operation">
            <a @click="check(item)" v-if="item.adStatus !== 10">查看效果</a>
            <a @click="modify(item)" v-if="item.adStatus !== 30">编辑</a>
            <a @click="edit(item, 21)"
            v-if="item.adStatus == 20 || item.adStatus == 21">
            {{ item.adStatus === 20 ? '暂停' : '开启'}}
          </a>
            <a @click="edit(item, 30)" v-if="item.adStatus !== 30">下刊</a>
          </span>
        </li>
        <li v-if="list.length <= 0">暂无广告</li>
      </ul>
    </div>
    <hsy-pagination
    :total="total"
    :pageSize="params.size"
    :page="params.page"
    @hsyCurrentChange="currentChange"></hsy-pagination>
    <adver-info :adverInfo="adverInfo" v-on:updateVisible="updateVisible"></adver-info>
  </div>
</template>
<script>
import { value } from './adver.list.js'
import AdService from '@/services/ad.service'
import AdverInfo from './adver.info.vue'

export default {
  data() {
    return {
      value: '',
      total: 0,
      params: {
        adType: 0,
        linkType: 0,
        adStatus: 0,
        adName: '',
        sourceType: 10,
        page: 1,
        size: 20
      },
      list: [],
      ...value,
      adverInfo: {
        dialogTitle: '开启投放此广告',
        visible: false,
        adId: undefined,
        sourceType: ''
      }
    }
  },
  computed: {
    isFull () {
      return this.$route.params.sourceType === 'full'
    },
    sourceName () {
      return this.$route.params.sourceType
    }
  },
  mounted() {
    this.AdService = new AdService()
    this.getList()
  },
  methods: {
    async getList () {
      if (this.isFull) {
        this.params.sourceType = 20
      } else {
        this.params.sourceType = 10
      }
      let res = await this.AdService.getAdList(this.params)
      this.list = res.list
      this.total = res.total
    },
    search () {
      this.getList()
    },
    currentChange (val) {
      this.params.page = val
      this.getList()
    },
    add () {
      if (this.isFull) {
        this.$router.push('/adver/full/add')
      } else {
        this.$router.push('/adver/settle/add')
      }
    },
    adEdit(adId, adStatusDesc) {
      this.adverInfo.visible = true
      this.adverInfo.adId = adId
      this.adverInfo.adStatusDesc = adStatusDesc
      this.adverInfo.sourceType = this.params.sourceType
    },
    updateVisible(flag) {
      this.adverInfo.visible = flag
    },
    check (item) {
      this.$router.push('/adver/' + this.sourceName + '/check?adId=' + item.adId + '&adName=' + item.adName + '&adTypeDesc=' + item.adTypeDesc + '&linkTypeDesc=' +
      item.linkTypeDesc + '&deliveryDesc=' + item.deliveryDesc + '&activeTime=' + (item.activeTime || '') + '&adStatusDesc=' + item.adStatusDesc)
    },
    // 暂停/投放 = 21 下刊 = 30
    edit (item, tag) {
      let self = this
      let params = {
        adId: item.adId,
        adStatus: tag
      }
      let confirm = {
        content: '此操作下次开机/登录生效',
        title: '确定暂停播放此广告?'
      }
      if (item.adStatusDesc === '暂停') {
        confirm.title = '开启投放此广告?'
      }
      if (tag === 30) {
        confirm.content = '设置为下刊后将不可继续恢复，确定下刊?'
        confirm.title = ''
      }
      self.$confirm(confirm.content, confirm.title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        self.AdService.changeAdStatus(params).then(() => {
          self.getList()
        })
      }).catch(() => {
      })
    },
    modify (item) {
      this.$router.push('/adver/' + this.sourceName + '/edit/' + item.adId)
    }
  },
  beforeDestroy () {
    console.log('beforeDestroy')
  },
  watch: {
    '$route' () {
      this.params = {
        adType: 0,
        linkType: 0,
        adStatus: 0,
        adName: '',
        sourceType: 10,
        page: 1,
        size: 20
      }
      this.getList()
    }
  },
  components: {
    AdverInfo
  }
}
</script>

<style lang="scss" scoped>
@import 'scss/variables.scss';
.table-ul-common{
  li{
    span{
      word-break: break-all;
      a{
        color: $primary-font;
      }
    }
    span:nth-child(1) {
      width: 10%
    }
    span:nth-child(2) {
      width: 8%
    }
    span:nth-child(3) {
      width: 8%
    }
    span:nth-child(4) {
      width: 8%
    }
    span:nth-child(5) {
      width: 8%
    }
    span:nth-child(6) {
      width: 8%
    }
    span:nth-child(7) {
      width: 12%
    }
    span:nth-child(8) {
      width: 10%
    }
    span:nth-child(9) {
      width: 8%
    }
    span:nth-child(10) {
      width: 10%
    }
    span:nth-child(11) {
      width: 15%
    }
  }
}
</style>
