module.exports = {
    devServer: {
        proxy: {
            '/myhuaweicloud': {
                target: 'https://cbs.cn-north-1.myhuaweicloud.com',
                pathRewrite: {
                    '^/myhuaweicloud': '', // remove base path
                },
                changeOrigin: true
            },
            '/v3':{
                target: 'https://cbs.cn-north-1.myhuaweicloud.com'
            },
            '/v1':{
                target: 'https://cbs.cn-north-1.myhuaweicloud.com'
            }
        }
    }
}