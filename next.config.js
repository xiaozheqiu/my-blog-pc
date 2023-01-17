/** @type {import('next').NextConfig} */
const { withAxiom } = require('next-axiom')
const nextConfig = {
    // 严格模式
    reactStrictMode: true,
    // 编译指示器 展示位置
    devIndicators: {
        buildActivityPosition: 'bottom-right'
    },
    // 配置构建 ID
    generateBuildId: async () => 'my-build-id',
    // 启用构建压缩
    compress: false,
    // 在生产构建期间启用浏览器源映射生成
    productionBrowserSourceMaps: false
}

module.exports = withAxiom(nextConfig)
