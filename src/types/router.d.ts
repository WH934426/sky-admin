// 路由配置接口
export interface RouteItem {
	path: string;
	name?: string;
	meta: {
		title: string;
		icon?: string;
		order: number;
		auth?: boolean;
		hidden?: boolean;
	};
	children?: RouteItem[];
}
