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

// 员工列表查询
export interface EmployeePageQueryDTO {
	// 员工姓名
	name?: string;
	// 需要查询的页面
	page: number;
	// 每页显示的条数
	pageSize: number;
}

// 员工列表查询返回值
export interface EmployeeEntity {
	// 员工id
	id: number;
	// 员工姓名
	name: string;
	// 员工用户名
	username: string;
	// 员工密码
	password: string;
	// 手机号
	phone: string;
	// 性别
	sex: string;
	// 身份证号
	idNumber: string;
	// 账号状态，1正常 0锁定
	status: number;
	// 创建时间
	createTime: Date | null;
	// 最后修改时间
	updateTime: Date;
	// 创建人id
	createUser: number | null;
	// 最后修改人id
	updateUser: number;
}
