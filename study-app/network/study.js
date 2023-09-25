import {myRequest} from './http.js'

export function getQuestionInfo () {  //获取题库信息
	return myRequest({
		url:'api/front/questions/everyday',
		method:'get'
	})
}