import axios from "axios";

export const api = axios.create({
	baseURL: import.meta.env.VITE_REACT_APP_API_LOGIN_URL,
});
