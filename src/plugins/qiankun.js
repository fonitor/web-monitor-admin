import { registerMicroApps, start } from 'qiankun'

const apps = [
    {
        name: 'suiApp',
        entry: '//localhost:10000', // 默认会加载这个html 解析里面的js 动态执行 (子应用必须支持跨域), fetch
        container: "#sui", // 容器名称
        activeRule: '/sui' // 激活路径
      },
]

registerMicroApps(apps)
start()