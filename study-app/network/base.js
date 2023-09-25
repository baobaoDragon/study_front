let baseURL = '';
// 是否在控制台显示接口请求日志,本地环境启用,打包环境禁用
let showHttpLog = false;
// 测试环境
// baseURL = 'http://192.168.31.44:8888/';
// baseURL = 'http://192.168.3.165:8888/';
// 正式环境
baseURL = 'http://49.234.47.245:8888/';
module.exports = {
	baseURL: baseURL,
	showHttpLog: showHttpLog
}