
const px2rem = require('postcss-px2rem')

module.exports = {
    publicPath: './',
    css: {
        modules: false, // 启用 CSS modules
        extract: true, // 是否使用css分离插件
        sourceMap: false, // 开启 CSS source maps?
        loaderOptions: {
            postcss: {
                // 这是rem适配的配置  注意： remUnit在这里要根据lib-flexible的规则来配制，如果您的设计稿是750px的，用75就刚刚好。
                 plugins: [
                    require("postcss-px2rem-exclude")({
                        remUnit: 37.5,
                        exclude: /node_modules|folder_name/i
                    })
                ]
            }
        } // css预设器配置项
    },
    lintOnSave: false
}