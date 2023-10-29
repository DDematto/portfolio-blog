/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ["en"], defaultLocale: "en",
    }, reactStrictMode: true, compiler: {
        styledComponents: true
    },
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        return config;
    }
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',

})

module.exports = withBundleAnalyzer(nextConfig)

