/**
 * 员工模块
 */

// 员工登录传递的信息
export interface LoginDTO {
	username: string;
	password: string;
}

// 员工登录返回的信息
export interface LoginVO {
	// 主键值
	id: number;
	// 员工用户名
	username: string;
	// 员工姓名
	name: string;
	// token
	token: string;
}
