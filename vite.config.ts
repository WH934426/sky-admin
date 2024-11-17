import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig, loadEnv } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	return {
		plugins: [
			vue(),
			AutoImport({
				resolvers: [ElementPlusResolver()],
				imports: ['vue', 'vue-router'],
				dts: 'src/types/auto-imports.d.ts',
				eslintrc: {
					enabled: false,
					filepath: './.eslintrc-auto-import.json',
					globalsPropValue: true
				}
			}),
			Components({
				resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
				dts: 'src/types/components.d.ts'
			}),
			createSvgIconsPlugin({
				iconDirs: [path.resolve(process.cwd(), 'src/icons')],
				symbolId: 'icon-[dir]-[name]'
			})
		],
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
        @use "@/styles/element/index.scss" as *;
        `,
					api: 'modern-compiler'
				}
			}
		},
		server: {
			open: true,
			port: 9528,
			proxy: {
				'/api': {
					target: env.VITE_APP_API_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, '')
				}
			}
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src')
			}
		}
	};
});
