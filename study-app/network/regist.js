import {myRequest} from './http.js'
 
export function regist (config) {  //注册
	return myRequest({
		url:'api/front/user/register',
		method:'post',
		data:config
	})
}
