/** @type {import('next').NextConfig} */

const { version } = require("./package.json");

const nextConfig = {
  i18n: {
    locales: ["sv"],
    defaultLocale: "sv",
  },
  publicRuntimeConfig: {
    version,
  },
};

module.exports = nextConfig;
