import {myRequest} from './http.js'
 
export function login (config) {  //登录
	return myRequest({
		url:'api/front/user/login',
		method:'post',
		data:config
	})
}

export function getUserInfo () {  //获取用户信息
	return myRequest({
		url:'api/front/user',
		method:'get'
	})
}