import {myRequest} from './http.js'

 // 获取所有用户的信息列表
export function getUserInfo () {
	return myRequest({
		url:'api/front/user',
    method:"get"
	})
}

//更新用户的信息列表
export function updateUserInfo (info) {
	return myRequest({
		url:'api/front/user',
    method:"put",
    data:info
	})
}