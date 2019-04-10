<template>
  <div id="app">
    <div class="home-header">
      <div class="y-row">
        <span class="home-title">CBC智能顾问</span>
        <span class="home-subtitle">努力学习的CBC智能顾问</span>
      </div>
    </div>
    <div class="home-body">
      <div class="y-row">
        <div class="body-left">
          <div class="zone-container">
            <div class="chat-zone">
              <div class="dialog-area"  ref="chatBoxWrapper">
<!--                chat-box-wrapper 用于 better-scroll-->
                <div class="chat-box-wrapper">
                  <div v-for="(chatItem, index) in chatBoxList" :key="index">
                    <ChatBox v-if="chatItem.type==='robot'"
                             :content="chatItem.content"
                    ></ChatBox>
                    <AskBox v-if="chatItem.type==='user'"
                            :content="chatItem.content"
                    ></AskBox>
                  </div>
                </div>
              </div>
              <div class="hot-problems">热门问题：
                <div @click="hotProblemClick" title="订单" class="hot-item">订单</div>
                <div @click="hotProblemClick" title="计费" class="hot-item">计费</div>
                <div @click="hotProblemClick" title="账务" class="hot-item">账务</div>
                <div @click="hotProblemClick" title="伙伴" class="hot-item">伙伴</div>
              </div>
              <div class="ask-area">
                <div class="input-area">
                  <ul class="input-tips" v-show="inputTips && inputTips.length > 0" style="">
                    <li v-for="(tip, index) in inputTips" :key="index" @click="clickOnTip(tip)">{{tip}}</li>
                    <!-- suggest tips in inputTips -->
                  </ul>
                  <textarea id="search" v-model="questionStr" @keyup.enter.exact.prevent="askQuestion" autocomplete="off" disableautocomplete="" placeholder="请详细描述您的问题向智能顾问提问，支持shift+enter换行。"></textarea>
                </div>
                <button class="send-btn enabled" @click="askQuestion" style=""> 发送</button>
              </div>
            </div>
          </div>
        </div>
        <div class="body-right">
          <div class="zone-container">
            <div class="link-zone">
              <div class="link-zone-title">自助工具</div>
              <div class="link-zone-content">
                <div class="tools-group-list">
                  <div class="tools-list-wrap">
                    <div class="tools-list-title">订单相关</div>
                    <div class="tools-list clearfix">
                      <ToolsItem
                              title="订购"
                              url="https://www.baidu.com/"
                              icon-class="shezhi"
                      ></ToolsItem>
                      <ToolsItem
                              title="退订"
                              url="https://www.baidu.com/"
                              icon-class="suoding"
                      ></ToolsItem>
                      <ToolsItem
                              title="合同"
                              url="https://www.baidu.com/"
                              icon-class="zhaohuimima"
                      ></ToolsItem>
                      <ToolsItem
                              title="资源"
                              url="https://www.baidu.com/"
                              icon-class="shouji"
                      ></ToolsItem>
                    </div>
                  </div>
                  <div class="tools-list-wrap">
                    <div class="tools-list-title">财务问题</div>
                    <div class="tools-list clearfix">
                      <ToolsItem
                              title="索取发票"
                              url="https://www.baidu.com/"
                              icon-class="fapiaoguanli"
                      ></ToolsItem>
                      <ToolsItem
                              title="欠费核销"
                              url="https://www.baidu.com/"
                              icon-class="suoding"
                      ></ToolsItem>
                      <ToolsItem
                              title="账单对账"
                              url="https://www.baidu.com/"
                              icon-class="zhaohuimima"
                      ></ToolsItem>
                      <ToolsItem
                              title="充值"
                              url="https://www.baidu.com/"
                              icon-class="shouji"
                      ></ToolsItem>
                    </div>
                  </div>
                  <div class="tools-list-wrap">
                    <div class="tools-list-title">伙伴相关</div>
                    <div class="tools-list clearfix">
                      <ToolsItem
                              title="伙伴入驻"
                              url="https://www.baidu.com/"
                              icon-class="jisuanqi"
                      ></ToolsItem>
                      <ToolsItem
                              title="绑定解绑"
                              url="https://www.baidu.com/"
                              icon-class="suoding"
                      ></ToolsItem>
                      <ToolsItem
                              title="伙伴中心"
                              url="https://www.baidu.com/"
                              icon-class="zhaohuimima"
                      ></ToolsItem>
                      <ToolsItem
                              title="手机绑定"
                              url="https://www.baidu.com/"
                              icon-class="shouji"
                      ></ToolsItem>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import ChatBox from './components/ChatBox.vue'
import AskBox from './components/AskBox.vue'
import ToolsItem from './components/ToolsItem'
import { getToken, getSuggestions, getAnswer} from "./utils/utils";
  import moment from 'moment';

  let config = {};
export default {
  name: 'app',
  data () {
    return {
      inputTips: [],
      questionStr: '',
      chatBoxList:[{
        type:'robot',
        content:'请用一句话描述您的问题，我们来帮您解决。'
      }]
    }
  },
  components: {
    ChatBox,
    AskBox,
    ToolsItem
  },
  methods: {
    hotProblemClick(e){
      this.submitQuestion(e.target.innerText);
    },
    askQuestion () {
      this.submitQuestion(this.questionStr);
      this.questionStr = '';
      this.inputTips = [];
    },
    clickOnTip(tip) {
      this.submitQuestion(tip);
      this.questionStr = '';
      this.inputTips = [];
    },
    submitQuestion(question) {
      if(question === '\n'){
        return;
      }
      this.chatBoxList.push({
        type: 'user',
        content: question
      });
      this.scrollToBottom();
      let data = {
        "user_id": "z00123456",
        "session_id": "xxxxxxxxxxxxxxxxxx",
        "operate_type":3,
        "question": question
      };
      getAnswer(data, config).then(res=>{
        let ansContent = '';
        res.data.answers.map(ans=>{
          ansContent += (ans.answer + '\n');
        });
        this.chatBoxList.push({
          type: 'robot',
          content: ansContent
        });
        this.scrollToBottom();
        this.inputTips = [];
      });
    },
    scrollToBottom() {
      this.$nextTick(()=>{
        this.$refs.chatBoxWrapper.scrollTop = this.$refs.chatBoxWrapper.scrollHeight;
      });
    }
  },
  watch: {
    questionStr: function (question) {
      this.inputTips = [];
      if(question==='' || question.indexOf('\n')>= 0) {
        return;
      }
      let data = {
        "question":question,
        "top":2
      };
      getSuggestions(data, config).then(res=>{
        res.data.questions.map(que => {
          this.inputTips.push(que);
        })
      });
    }
  },
  created() {
    let expires_before = sessionStorage.getItem('expires_at');
    let now = moment();
    if(expires_before && now.isBefore(expires_before) && sessionStorage.getItem('hwtoken')){
      config = {
        headers: {'X-Auth-Token': sessionStorage.getItem('hwtoken')}
      }
    } else {
      getToken().then(res=>{
        let token = res.headers['x-subject-token'];
        let expires_at = res.data.token.expires_at;
        sessionStorage.setItem('expires_at', expires_at);
        sessionStorage.setItem('hwtoken', token);
        config = {
          headers: {'X-Auth-Token': token}
        }
      });
    }
  }
}
</script>

<style>
  body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, textarea, p, blockquote, th, td, hr, button, article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    margin: 0;
    padding: 0;
  }
  body {
    font-family: microsoft yahei;
    color: #333333;
    font-size: 12px;
  }
  ::-webkit-scrollbar-track-piece {
    background: transparent;
  }
  ::-webkit-scrollbar-track {
    width: 7px;
    height: 7px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: #dddfe0;
  }
  ::-webkit-scrollbar-button {
    display: none;
  }
  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  .clearfix:before, .clearfix:after {
    display: table;
    content: " ";
  }
  .clearfix:after {
    clear: both;
  }
  *, *:before, *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.home-header {
  width: 100%;
  height: 60px;
  /*background: #333;*/
  background: radial-gradient(at bottom, #0096D6 12%, #00328F);
  line-height: 60px;
}
.home-header .home-title {
  font-size: 20px;
  color: white;
  margin-left: 8px;
}
  .home-header .home-subtitle {
    font-size: 14px;
    color: white;
    margin-left: 12px;
  }
.home-header span {
  vertical-align: middle;
}
.home-body {
  position: absolute;
  top: 60px;
  bottom: 0px;
  width: 100%;
  /*background: url(https://img.alicdn.com/tfs/TB1NR1ga49YBuNjy0FfXXXIsVXa-1920-568.png) center center no-repeat, linear-gradient(#12C9E9, #7925C6);*/
  background-color:#dfe7fc;
  /*background-image: url(https://cdn.stocksnap.io/img-thumbs/960w/6FVEXBEWPJ.jpg);*/
  /*background-attachment: fixed;*/
  /*background-repeat: no-repeat;*/
  /*background-size: cover;*/
  /*background: #eeeeee;*/

  padding-top: 20px;
  padding-bottom: 20px;
}
  .home-body .y-row {
    height: 100%;
    position: relative;
  }
  .y-row {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
    zoom: 1;
    min-width: 1000px;
    max-width: 1200px;
  }
  .home-body .y-row .body-left {
    position: relative;
    height: 100%;
    margin-right: 340px;
  }
  .home-body .y-row .body-right {
    position: absolute;
    height: 100%;
    width: 320px;
    right: 0;
    top: 0;
  }
  .zone-container {
    position: relative;
    height: 100%;
  }
  .link-zone {
    padding: 0;
    position: relative;
    background: #fff;
    height: 100%;
  }
  .link-zone .link-zone-title {
    height: 40px;
    line-height: 40px;
    background: #fff;
    font-size: 14px;
    color: #373D41;
    text-align: center;
  }
  .link-zone .link-zone-content {
    overflow: auto;
    padding: 0 10px;
    position: absolute;
    top: 40px;
    bottom: 0;
    width: 100%;
  }
.link-zone .tools-group-list {
overflow: hidden;
}
  .link-zone .tools-list-wrap .tools-list-title {
    background: #f0f3f5;
    text-align: center;
    line-height: 22px;
  }
  .link-zone .tools-list-wrap .tools-list {
    margin-top: 14px;
    margin-bottom: 17px;
  }
  .link-zone .tools-list-wrap .tools-list .tools-list-item {
    float: left;
    text-align: center;
    width: 25%;
    box-sizing: border-box;
    padding: 0 5px;
  }
  .zone, .chat-zone {
    position: relative;
    height: 100%;
    border: 1px solid #E5E5E5;
    background: white;
  }
  .chat-zone .dialog-area {
    position: absolute;
    bottom: 164px;
    top: 0px;
    right: 0px;
    left: 0px;
    overflow-y: scroll;
    padding-top: 30px;
    padding-right: 0px;
  }
  .chat-zone .hot-problems {
    padding-left: 13px;
    background: #FFFFFF;
    box-shadow: 0 -2px 3px 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    bottom: 124px;
    width: 100%;
    height: 40px;
    font-size: 12px;
    line-height: 40px;
    color: #373D41;
  }
  .chat-zone .hot-problems .hot-item:first-child {
    margin-left: 3px;
  }
  .chat-zone .hot-problems .hot-item {
    line-height: 22px;
    height: 22px;
    display: inline-block;
    padding: 0px 11px;
    border: 1px solid rgba(155, 158, 160, 0.6);
    margin-left: 14px;
    background: #F4F7FC;
    border-radius: 3px;
    cursor: pointer;
    color: #373D41;
    max-width: 144px;
    overflow: hidden;
    white-space: nowrap;
    vertical-align: middle;
    text-overflow: ellipsis;
  }
  .chat-zone .ask-area {
    background: white;
    position: absolute;
    height: 124px;
    width: 100%;
    border-top: 1px solid #E5E5E5;
    bottom: 0px;
  }
  .chat-zone .ask-area .input-area {
    z-index: 1040;
    position: absolute;
    right: 124px;
    left: 0;
    padding-left: 18px;
    padding-right: 18px;
    top: 24px;
  }
  .chat-zone .input-tips {
    list-style: none;
    position: absolute;
    bottom: 79px;
    border: 1px solid #E5E5E5;
    border-bottom: 0px;
    left: 18px;
    right: 18px;
    background: #fff;
    z-index: 300;
    padding-left: 0;
  }
  .input-tips li {
    padding: 9px;
    font-size: 12px;
  }
  .input-tips li:hover {
    background: lightgrey;
    color: #00a2ca;
  }
  .chat-zone .ask-area .input-area #search {
    overflow-y: auto;
    width: 100%;
    height: 78px;
    border: 1px solid #E5E5E5;
    resize: none;
    padding: 4px 8px;
  }
  .chat-zone .ask-area .send-btn {
    width: 85px;
    height: 33px;
    line-height: 33px;
    text-align: center;
    float: right;
    margin: 45px 20px;
    border: 1px solid #00C1DE;
    background: #e2f8fb;
    border-radius: 3px;
    cursor: pointer;
    color: #00a2ca;
  }
</style>
