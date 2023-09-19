import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isProd = command === "build";

  return {
    base: isProd ? "/monetory/" : "",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "~": path.resolve(__dirname, "node_modules"),
        "@images": path.resolve(__dirname, "src/assets/images"),
      },
      extensions: [".js", ".ts", ".json", ".scss", ".css"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
        @import "@/styles/config.scss";
        @import "@/styles/mixins.scss";
      `,
        },
      },
    },
    plugins: [vue()],
  };
});
