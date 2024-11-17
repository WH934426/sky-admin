export interface RouteItem {
	path: string;
	component?: Component | (() => Promise<Component>);
	name: string;
	meta: RouteMeta;
	children?: RouteItem[];
}

interface RouteMeta {
	title?: string;
	icon?: string;
	order?: number;
	auth?: boolean;
	hidden?: boolean;
}
