import {myRequest} from './http.js'

 // 获取通知
export function getNotice () {
	return myRequest({
		url:'api/front/notice',
    method:"get"
	})
}