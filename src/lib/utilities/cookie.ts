export const decodeUserID = (cookie: string) => {
    const data = JSON.parse(window.atob(cookie));
    return data.filter((item) => item.name == "LastLoginElevId")[0].value
}