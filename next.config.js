/** @type {import('next').NextConfig} */

module.exports = {
    i18n: {
        locales: ["en"],
        defaultLocale: "en",
    },
    reactStrictMode: true,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i, issuer: /\.[jt]sx?$/, use: ['@svgr/webpack'],
        })
        return config
    },
    compiler: {
        styledComponents: true
    },
}
