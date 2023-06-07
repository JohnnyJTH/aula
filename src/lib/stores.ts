import { localStorageStore } from "./utilities";

export const authStore = localStorageStore("auth", {
    cookie: "",
    school: 0,
    username: "",
    password: "",
});