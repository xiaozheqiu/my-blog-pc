/** @type {import('next').NextConfig} */

const nextConfig = {
    // 严格模式
    reactStrictMode: true,
    // 编译指示器 展示位置
    devIndicators: {
        buildActivityPosition: 'bottom-right'
    },
    // 忽略ts错误
    ignoreBuildErrors: false,
    // 忽略eslint错误
    ignoreDuringBuilds: true,
    // 配置构建 ID
    generateBuildId: async () => 'my-build-id',
    // 设置自定义构建目录
    distDir: 'build',
    // 启用构建压缩
    compress: false,
    // 在生产构建期间启用浏览器源映射生成
    productionBrowserSourceMaps: false
}

module.exports = nextConfig
