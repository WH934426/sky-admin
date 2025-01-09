// user token
const User_Token = 'user_token';
export const Get_Token = (): string | null => localStorage.getItem(User_Token);
export const Set_Token = (token: string) =>
	localStorage.setItem(User_Token, token);
export const Remove_Token = () => localStorage.removeItem(User_Token);

// app sidebar_status
const Sidebar_Status = 'sidebar_status';
export const Get_Sidebar_Status = localStorage.getItem(Sidebar_Status);
export const Set_Sidebar_Status = (status: string) =>
	localStorage.setItem(Sidebar_Status, status);
