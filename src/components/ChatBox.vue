<template>
    <div class="chat-box clearfix">
        <div class="robot-talk">
            <div class="avatar avatar-robot-header-icon" style="width:46px;height:46px;"></div>
            <div class="content">
                <div class="robot-response">
                    <div class="chat">
                        <span v-html="content"></span>
                    </div>
                </div>
            </div>
            <span class="robot-talk-cor"></span>
            <span class="robot-talk-outer-cor"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChatBox",
        props: ['content']
    }
</script>

<style scoped>
    .chat-box {
        padding-left: 30px;
        padding-right: 30px;
        margin-bottom: 30px;
    }
    .robot-talk {
        position: relative;
        width: 100%;
    }
    .robot-talk .avatar {
        width: 46px;
        height: 46px;
        border-radius: 46px;
        -moz-border-radius: 46px;
        vertical-align: top;
        display: inline-block;
        text-align: center;
        line-height: 46px;
    }
    .robot-talk .avatar {
        background: #E7F2FA;
        color: #3d5c71;
        position: absolute;
    }
    .robot-talk .avatar-robot-header-icon {
        background: url(https://img.alicdn.com/tfs/TB1LIeYvQyWBuNjy0FpXXassXXa-46-46.png) center center no-repeat;
    }
    .content {
        width: 722px;
        word-break: break-all;
        line-height: 20px;
        display: inline-block;
        vertical-align: top;
    }
    .robot-response {
        position: relative;
        margin-left: 62px;
        border-radius: 8px;
        -moz-border-radius: 8px;
        border: 1px solid #E5E5E5;
        background: #F7F9FA;
    }
    .chat {
        padding: 14px 18px;
    }
    .robot-talk-cor {
        border-color: transparent #F7F9FA transparent transparent;
        left: 52px;
        z-index: 100;
    }
    .robot-talk-cor, .robot-talk-outer-cor {
        width: 0;
        height: 0;
        font-size: 0;
        border-width: 6px;
        border-style: solid;
        overflow: hidden;
        position: absolute;
        top: 17px;
    }
    .robot-talk-outer-cor {
        border-color: transparent #F0F0F0 transparent transparent;
        left: 50px;
    }
</style>