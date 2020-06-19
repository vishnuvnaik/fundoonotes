export function isLogin () {
    let islogin = localStorage.getItem('userDetails') ? true : false
    return islogin
}
