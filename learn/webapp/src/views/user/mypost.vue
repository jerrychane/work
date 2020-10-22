<template>
  <div>
    <my-header title="我的帖子"></my-header>
    <div class="container">
      <div class="content">
        <ul class="content-box">
          <li class="content-item flex">
            <div class="column">
              <div class="title">
                <span class="tags">热门</span>如何零基础自学Web前端开发讲者,如何零基础自学Web前端开发讲者
              </div>
              <div class="bottom flex">
                <div>
                  <span class="reads">3.2k回复</span>
                  <span class="time">8天前</span>
                </div>
                <div>
                  <svg-icon icon="delete"></svg-icon>
                </div>
              </div>
            </div>
          </li>
          <li class="content-item flex">
            <div class="column">
              <div class="title">
                <span class="tags color1">精华</span>如何零基础自学Web前端开发讲者,
              </div>
              <div class="bottom flex">
                <div>
                  <span class="reads">3.2k回复</span>
                  <span class="time">8天前</span>
                </div>
                <div>
                  <svg-icon icon="delete"></svg-icon>
                </div>
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
  name: 'mypost'
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/_mixin';

.container {
  // padding-top: $header-height + 10;
  padding-top: $header-height;
  .content-box {
    padding: 0 30px;
    .content-item {
      align-items: center;
      @extend %border-line;
    }
    .column {
      flex: 1;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      height: 150px;
      padding: 30px 20px;
      // @extend %border-line;
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
      }
    }
    .flex {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
    }
    .tags {
      font-size: 24px;
      color: #fff;
      background: $primary-color;
      border-radius: 24px 24px 24px 0;
      padding: 4px 12px;
      margin-right: 10px;
      display: inline-block;
      transform: scale(0.8);
      position: relative;
      top: -2px;
      &.color1 {
        background: #0166f8;
      }
    }
    .bottom {
      color: #999;
      font-size: 24px;
      .reads {
        margin-right: 20px;
      }
    }
    .svg-icon {
      font-size: 36px;
    }
  }
}
</style>
