// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
import viteCompression from "vite-plugin-compression";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  ssr: false,

  loadingIndicator: {
    name: "chasing-dots",
    color: "blue",
    background: "white",
  },

  app: {
    head: {
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "title",
          content: "iMeeting - Icon+",
        },
      ],
      script: [],
      link: [{ rel: "icon", type: "image/x-icon", href: "/logo.svg" }],
      // please note that this is an area that is likely to change
      style: [
        // <style type="text/css">:root { color: red }</style>
        // { children: ":root { color: red }", type: "text/css" },
      ],
      noscript: [{ children: "JavaScript is required" }],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  css: [
    "~/assets/styles/global.scss",
    "bootstrap/dist/css/bootstrap.min.css",
    "bootstrap-icons/font/bootstrap-icons.css",
  ],

  plugins: [],

  vue: {
    compilerOptions: {
      directiveTransforms: {
        focus: () => ({
          props: [],
          needRuntime: true,
        }),
      },
    },
  },

  vite: {
    plugins: [viteCompression({ algorithm: "gzip" })],
    optimizeDeps: {
      include: ["fast-deep-equal"],
    },
    build: {
      cssCodeSplit: true,
    },
  },

  nitro: {
    compressPublicAssets: true,
  },

  buildModules: ["@averjs/nuxt-compression"],

  devServer: {
    port: 3000,
  },

  modules: [
    "@pinia/nuxt",
    "dayjs-nuxt",
    "@bootstrap-vue-next/nuxt",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          "Open Sans": {
            wght: [400, 500, 600, 700, 800, 900],
          },
          Roboto: {
            wght: [400, 500, 600, 700, 800, 900],
          },
          Inter: {
            wght: [400, 500, 600, 700, 800, 900],
          },
        },
        display: "swap",
        prefetch: false,
        preconnect: false,
        preload: false,
        download: true,
        base64: false,
      },
    ],
  ],

  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },

  delayHydration: {
    mode: "mount",
    debug: process.env.NODE_ENV === "development",
  },

  runtimeConfig: {
    public: {},
  },

  devServerHandlers: [],

  build: {},

  hooks: {
    "build:manifest": (manifest) => {
      const css = manifest["node_modules/nuxt/dist/app/entry.js"]?.css;
      if (css) {
        for (let i = css.length - 1; i >= 0; i--) {
          if (css[i].startsWith("entry")) css.splice(i, 1);
        }
      }
    },
  },

  experimental: {
    extractCSS: true,
    viewTransition: true,
  },
});
