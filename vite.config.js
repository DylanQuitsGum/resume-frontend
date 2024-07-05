import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

const path = require("path");

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      vue(),
      vuetify({
        autoImport: true,
      }),
    ],
    define: {
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@components": path.resolve(__dirname, "src/components"),
        "@services": path.resolve(__dirname, "src/services"),
      },
    },
  };
});
