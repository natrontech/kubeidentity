/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  trailingSlash: true,
  nextConfig,
  publicRuntimeConfig: {
    ENV_GITHUB_CLIENT_ID: process.env.ENV_GITHUB_CLIENT_ID,
    ENV_GITHUB_REDIRECT_URI: process.env.ENV_GITHUB_REDIRECT_URI,
    ENV_GITHUB_OAUTH_URI: process.env.ENV_GITHUB_OAUTH_URI,
  },
  images: {
    // loader: "custom",
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'images.unsplash.com'],
    // nextImageExportOptimizer: {
    //   imageFolderPath: "public/images",
    //   exportFolderPath: "out",
    //   quality: 75,
    // },
  },
  env: {
    storePicturesInWEBP: true,
  },
}