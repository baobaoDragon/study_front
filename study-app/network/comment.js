import {
  myRequest
} from './http.js'

export function getComments(x) { //获取评论
  return myRequest({
    url: 'api/front/comments/get',
    method: 'post',
    data: {
      "post_id": x.post_id,
      "type_id": x.type_id
    }
  })
}

export function setComments(x) { //新增评论
  return myRequest({
    url: 'api/front/comments',
    method: 'post',
    data: {
      "post_id": x.post_id,
      "type_id": x.type_id,
      "title":x.title
    }
  })
}