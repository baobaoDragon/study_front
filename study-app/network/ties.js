import {myRequest} from './http.js'
//帖子详情
export function getTiesDetail (e) {  
	return myRequest({
		url:'api/front/posts/info/'+e,
		method:'get'
	})
}

 // 获取帖子列表
export function getTiesList () {
	return myRequest({
		url:'api/front/posts/many/50',
    method:"get"
	})
}

//发布帖子
export function addTie (e) {  
	return myRequest({
		url:'api/front/posts',
		method:'post',
    data:e
	})
}