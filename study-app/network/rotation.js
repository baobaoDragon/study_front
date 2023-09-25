import {myRequest} from './http.js'
//帖子详情
export function getRotation () {  
	return myRequest({
		url:'api/front/rotation',
		method:'get'
	})
}