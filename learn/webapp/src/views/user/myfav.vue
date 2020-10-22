<template>
  <div>
    <my-header title="我的收藏" bkColor="#fff" :zIndex="100"></my-header>
    <div class="container">
      <div class="content">
        <ul class="content-box">
          <li class="content-item">
            <div class="header">
              <img src="/img/bear-200-200.jpg" class="img" alt />
              <span>Brian老师</span>
            </div>
            <div class="title">如何零基础自学Web前端开发者</div>
            <div class="desc">5G风口，前端岗位的内涵和外延不断扩大, 企业缩减人力成本，前端岗位竞争越发激烈。前、后端界限融合，大前端当道，倒逼程序员转型转行</div>
            <div class="bottom flex">
              <div>
                <span class="hands">
                  <svg-icon icon="zan"></svg-icon>20
                </span>
                <span class="reads">
                  <svg-icon icon="eye-open"></svg-icon>200
                </span>
              </div>
              <div>
                <svg-icon icon="delete"></svg-icon>
              </div>
            </div>
          </li>
          <li class="content-item">
            <div class="header">
              <img src="/img/header.jpg" class="img" alt />
              <span>Brian老师</span>
            </div>
            <div class="title">大前端-前端高级进阶</div>
            <div
              class="desc"
            >比前端全栈更上一层，专为实际开发经验1年以上的前端工程师设计，高效全能架构前端，录播+直播+社群+问答等慕课网精心设计8种方式，全方位助力学习</div>
            <div class="bottom flex">
              <div>
                <span class="hands">
                  <svg-icon icon="zan"></svg-icon>20
                </span>
                <span class="reads">
                  <svg-icon icon="eye-open"></svg-icon>200
                </span>
              </div>
              <div>
                <svg-icon icon="delete"></svg-icon>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myfav'
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/_mixin';

.container {
  // padding-top: $header-height + 10;
  padding-top: $header-height;
  position: fixed;
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  .content-box {
    background: #fff;
    padding: 0 30px;
    .flex {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
    }
    .content-item {
      align-items: center;
      padding: 30px 20px;
      @extend %border-line;
    }
    .title {
      color: #333;
      font-size: 30px;
      font-weight: bold;
      overflow: hidden;
      line-height: 38px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 15px;
    }
    .desc {
      font-size: 24px;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 32px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 30px;
    }
    .header {
      margin-bottom: 30px;
      span {
        font-size: 26px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        margin-left: 10px;
      }
      .img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .bottom {
      color: #999;
      font-size: 24px;
      .reads,
      .hands {
        margin-right: 20px;
      }
    }
    .svg-icon {
      font-size: 36px;
    }
  }
}
</style>
