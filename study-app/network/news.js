import {myRequest} from './http.js'
//帖子详情
export function getNewsDetail (e) {  
	return myRequest({
		url:'api/front/news/'+e,
		method:'get'
	})
}

 // 获取热点ai新闻列表
export function getNewsList () {
	return myRequest({
		url:'api/front/news/latest_list',
    method:"get"
	})
}