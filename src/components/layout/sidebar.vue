<template>
  <div class="side-bar">
    <ul>
      <li class="title">广告管理</li>
      <li :class="{'active': selectName === 'adversettle'}">
        <router-link to="/adver/settle/list">
          结算广告
        </router-link>
      </li>
      <li :class="{'active': selectName === 'adverfull'}">
        <router-link to="/adver/full/list">
          全屏广告
        </router-link>
      </li>
      <li :class="{'active': selectName === 'adverdelay'}">
        <router-link to="/adver/delay/set">
          结算广告延迟设置
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      selectName: 'adversettle'
    }
  },
  mounted () {
    let pathname = window.location.pathname
    this.selectName = pathname.substr(1) ? pathname.substr(1).split('/')[0] + pathname.substr(1).split('/')[1] : 'adversettle'
  },
  watch: {
    '$route' (to) {
      this.selectName = to.path.substr(1).split('/')[0] + to.path.substr(1).split('/')[1]
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'scss/variables.scss';
.side-bar{
  width: $side-width;
  height: 100%;
  background: $sidebar-bg;
  ul{
    display: block;
    width: 100%;
    text-align: center;
    li{
      width: 100%;
      height: 40px;
      color: $primary-font;
      line-height: 40px;
      cursor: pointer;
      a{
        display: block;
        width: 100%;
        height: 100%;
      }
      &.title{
        height: 62px;
        font-size: 18px;
        line-height: 22px;
        padding: 20px 0;
        position: relative;
        &:after{
          position: absolute;
          content: "";
          width: 4px;
          height: 18px;
          background: $primary;
          border-radius: 2px;
          top: 22px;
          left: 29px;
        }
      }
      &.active{
        background: $primary-bg;
        // opacity: $primary-opacity;
        color: #fff;
        position: relative;
        &:after{
          content: "";
          position: absolute;
          width:0;
          height:0;
          border-top: 6px solid transparent;
          border-right: 12px solid #fff;
          border-bottom: 6px solid transparent;
          right: 0;
          top: 14px;
        }
      }
    }
  }
}
</style>
