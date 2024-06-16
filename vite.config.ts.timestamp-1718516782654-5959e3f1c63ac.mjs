// vite.config.ts
import vue from "file:///E:/CodeTest/Project/sky/sky-admin/node_modules/.pnpm/@vitejs+plugin-vue@5.0.5_vite@5.3.1_@types+node@20.14.2_sass@1.77.5__vue@3.4.28_typescript@5.4.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import * as path from "path";
import AutoImport from "file:///E:/CodeTest/Project/sky/sky-admin/node_modules/.pnpm/unplugin-auto-import@0.17.6_@vueuse+core@9.13.0_vue@3.4.28_typescript@5.4.5___rollup@4.18.0/node_modules/unplugin-auto-import/dist/vite.js";
import { ElementPlusResolver } from "file:///E:/CodeTest/Project/sky/sky-admin/node_modules/.pnpm/unplugin-vue-components@0.27.0_@babel+parser@7.24.7_rollup@4.18.0_vue@3.4.28_typescript@5.4.5_/node_modules/unplugin-vue-components/dist/resolvers.js";
import Components from "file:///E:/CodeTest/Project/sky/sky-admin/node_modules/.pnpm/unplugin-vue-components@0.27.0_@babel+parser@7.24.7_rollup@4.18.0_vue@3.4.28_typescript@5.4.5_/node_modules/unplugin-vue-components/dist/vite.js";
import { defineConfig, loadEnv } from "file:///E:/CodeTest/Project/sky/sky-admin/node_modules/.pnpm/vite@5.3.1_@types+node@20.14.2_sass@1.77.5/node_modules/vite/dist/node/index.js";
import { createSvgIconsPlugin } from "file:///E:/CodeTest/Project/sky/sky-admin/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.3.1_@types+node@20.14.2_sass@1.77.5_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_dirname = "E:\\CodeTest\\Project\\sky\\sky-admin";
var vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
        symbolId: "icon-[dir]-[name]"
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ["vue", "vue-router"]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    server: {
      open: true,
      host: "0.0.0.0",
      port: 3e3,
      proxy: {
        "/api": {
          target: env.VITE_APP_URL,
          changeOrigin: true,
          rewrite: (path2) => path2.replace(/^\/api/, "")
        }
      }
    },
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "src")
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxDb2RlVGVzdFxcXFxQcm9qZWN0XFxcXHNreVxcXFxza3ktYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXENvZGVUZXN0XFxcXFByb2plY3RcXFxcc2t5XFxcXHNreS1hZG1pblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovQ29kZVRlc3QvUHJvamVjdC9za3kvc2t5LWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKVxyXG4gIHJldHVybiB7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgICAgaWNvbkRpcnM6IFsgcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL3N2ZycpIF0sXHJcbiAgICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXSdcclxuICAgICAgfSksXHJcbiAgICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICAgIHJlc29sdmVyczogWyBFbGVtZW50UGx1c1Jlc29sdmVyKCkgXSxcclxuICAgICAgICBpbXBvcnRzOiBbICd2dWUnLCAndnVlLXJvdXRlcicgXVxyXG4gICAgICB9KSxcclxuICAgICAgQ29tcG9uZW50cyh7XHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKSBdLFxyXG4gICAgICB9KSxcclxuICAgIF0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgb3BlbjogdHJ1ZSxcclxuICAgICAgaG9zdDogJzAuMC4wLjAnLFxyXG4gICAgICBwb3J0OiAzMDAwLFxyXG4gICAgICBwcm94eToge1xyXG4gICAgICAgICcvYXBpJzoge1xyXG4gICAgICAgICAgdGFyZ2V0OiBlbnYuVklURV9BUFBfVVJMLFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStSLE9BQU8sU0FBUztBQUMvUyxZQUFZLFVBQVU7QUFDdEIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUywyQkFBMkI7QUFDcEMsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxjQUFjLGVBQWU7QUFDdEMsU0FBUyw0QkFBNEI7QUFOckMsSUFBTSxtQ0FBbUM7QUFTekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBTTtBQUNqRCxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ3ZDLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLHFCQUFxQjtBQUFBLFFBQ25CLFVBQVUsQ0FBTyxhQUFRLFFBQVEsSUFBSSxHQUFHLGdCQUFnQixDQUFFO0FBQUEsUUFDMUQsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBLFFBQ1QsV0FBVyxDQUFFLG9CQUFvQixDQUFFO0FBQUEsUUFDbkMsU0FBUyxDQUFFLE9BQU8sWUFBYTtBQUFBLE1BQ2pDLENBQUM7QUFBQSxNQUNELFdBQVc7QUFBQSxRQUNULFdBQVcsQ0FBRSxvQkFBb0IsQ0FBRTtBQUFBLE1BQ3JDLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxRQUFRO0FBQUEsVUFDTixRQUFRLElBQUk7QUFBQSxVQUNaLGNBQWM7QUFBQSxVQUNkLFNBQVMsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLFFBQzlDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQVUsYUFBUSxrQ0FBVyxLQUFLO0FBQUEsTUFDcEM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiXQp9Cg==
