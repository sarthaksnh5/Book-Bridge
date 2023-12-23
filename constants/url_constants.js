const baseURL = `http://192.168.1.12:8000`;
export const loginURL = `${baseURL}/api-user/token/`;
export const registerURL = `${baseURL}/api-user/register/`;
export const changePasswordURL = `${baseURL}/api-user/profile/changepassword`
export const profileURL = `${baseURL}/api-user/profile/`
export const booksURL = `${baseURL}/api-book/book/`
export const chatURL = `${baseURL}/api-chat/create`

const baseWS = `ws://192.168.1.12:8000`
export const chatWS = `${baseWS}/ws/user`
export const messageWS = `${baseWS}/ws/chat`