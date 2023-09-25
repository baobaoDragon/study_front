import {myRequest} from './http.js'
 
export function getClassType (id) {  //获取课程左侧一级目录
	return myRequest({
		url:'api/front/class/type/' + id,
		method:'get'
	})
}

export function getCourseList (id) {  //获取二级目录
	return myRequest({
		url:'api/front/class/info/'+id,
		method:'get'
	})
}

export function getCourseDetail (id) {  //获取课程细节
	return myRequest({
		url:'api/front/class/class/'+id,
		method:'get'
	})
}

export function getCourseCollect () {  //获取用户自己收藏的课程
	return myRequest({
		url:'api/front/class/love',
		method:'get'
	})
}