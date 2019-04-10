<template>
    <div class="tools-list-item">
        <a :href="url" :title="title" target="_blank">
            <i :class="iconClassStr"></i>
            <div class="icon-label">
                {{title}}
            </div>
        </a>
    </div>
</template>

<script>
    export default {
        name: "ToolsItem",
        props: ['title', 'url' ,'iconClass'],
        computed: {
            iconClassStr () {
                return `iconfont icon-${this.iconClass}`
            }
        }
    }
</script>

<style scoped>
    .tools-list-item {
        float: left;
        text-align: center;
        width: 25%;
        box-sizing: border-box;
        padding: 0 5px;
    }
    .iconfont {
        font-size: 20px;
    }
    .icon-label {
        margin-top: 4px;
        line-height: 16px;
    }
    a, a:visited {
        color: #333333;
        text-decoration: none;
    }
    a:hover, a:link {
        color: #00a2ca;
    }

</style>