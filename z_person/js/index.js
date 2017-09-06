var Util = {
	// 获取模板内容
	tpl: function (id) {
		return document.getElementById(id).innerHTML;
	},
	// 异步请求方法
	ajax: function (url, fn) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200 || xhr.status === 304) {
					fn && fn(xhr.responseText)
				}
			}
		};
		xhr.open('GET', url, true);
		xhr.send();
	}
}

/* 最新职位 */
var Home = Vue.extend({
	template: Util.tpl('tpl_home'),
	data: function () {
		return {
			types: [
				{id: 1, title: '美食', url: '01.png'},
				{id: 2, title: '电影', url: '02.png'},
				{id: 3, title: '酒店', url: '03.png'},
				{id: 4, title: '休闲娱乐', url: '04.png'},
				{id: 5, title: '外卖', url: '05.png'},
				{id: 6, title: 'KTV', url: '06.png'},
				{id: 7, title: '周边游', url: '07.png'}
			],
			ad: [],
			list: []
		}
	},
	// 组件创建后执行
	created: function () {
		// 显示搜索框
		this.$parent.hideSearch = true;
		var that = this;
		Util.ajax('data/home.json', function (res) {
			// 将返回的数据转化为json
			res = JSON.parse(res);
			if (res.errno === 0) {
				// 添加广告数据
				that.$set('ad', res.data.ad)
				// 添加列表数据
				that.$set('list', res.data.list)
			}
			
		})
	}
})

//热门职位
var Employment = Vue.extend({
	template:Util.tpl('tpl_employment'),
	data:function () {
		return {
			types: [
				{id: 1, title: '美食', url: '01.png'},
				{id: 2, title: '电影', url: '02.png'},
				{id: 3, title: '酒店', url: '03.png'},
				{id: 4, title: '休闲娱乐', url: '04.png'},
				{id: 5, title: '外卖', url: '05.png'},
				{id: 6, title: 'KTV', url: '06.png'},
				{id: 7, title: '周边游', url: '07.png'}
			],
		}
	}
})

//注册组件
Vue.component('home', Home)
Vue.component('employment',Employment)

//声明组件
var app = new Vue({
	el: '#app',
	data: {
		view: '',
		// 存储哈希中信息的
		query: [],
		hideSearch: true
	},
	methods: {
		// 为搜索框绑定搜索事件
		search: function (e) {
			// 通过当前对象获取搜索框的数据
			var value = e.target.value;
			// 将value放在hash #list/search/value
			location.hash = '#list/search/' + value;
			// console.log(value)
		}
	}
})

// 路由
var route = function () {
	var hash = location.hash;
	hash = hash.slice(1).replace(/^\//, '');
	hash = hash.split('/')
	if (app.view === hash[0] && hash[0] === 'list') {
		app.query = hash.slice(1)
		app.$broadcast('reload-list')
		return ;
	}
	app.query = hash.slice(1)
	app.view = hash[0] || 'home';	
}

window.addEventListener('hashchange', route)
window.addEventListener('load', route)