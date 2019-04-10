<template>
  <div class="chat-box clearfix">
    <div class="i-talk">
      <div class="avatar" v-if="!chat.history">我</div>
      <div class="content">{{content}}</div>
      <span class="i-talk-cor"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AskBox',
  props: ['content'],
  data () {
    return {
      chat: {
        history: false
      }
    }
  }
}
</script>

<style scoped>
  .chat-box {
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 30px;
  }
  .i-talk {
    position: relative;
    width: 100%;
    color: white;
    padding-right: 18px;
  }
  .i-talk .avatar {
    background: #3AAEFF;
    float: right;
    width: 46px;
    height: 46px;
    border-radius: 46px;
    -moz-border-radius: 46px;
    vertical-align: top;
    display: inline-block;
    text-align: center;
    line-height: 46px;
  }
  .content {
    line-height: 20px;
    display: inline-block;
    vertical-align: top;
  }
  .i-talk .content {
    border-radius: 8px;
    -moz-border-radius: 8px;
    background: #3AAEFF;
    margin-right: 16px;
    padding: 14px 18px;
    float: right;
    width: 50%;
    word-break: break-all;
  }
  .i-talk-cor {
    width: 0;
    height: 0;
    font-size: 0;
    border-width: 6px;
    border-style: solid;
    overflow: hidden;
    position: absolute;
    top: 17px;
  }
  .i-talk .i-talk-cor {
    border-color: transparent transparent transparent #3AAEFF;
    right: 68px;
  }
</style>
