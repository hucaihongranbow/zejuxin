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

/* 首页组件 */
var Home = Vue.extend({
	template: Util.tpl('tpl_home'),
	data: function () {
		return {
			types: "",
			ad: [],
			list: []
		}
	},
	// 组件创建后执行
	created: function () {
		
		var that = this;
		//获取页面地址
		var urls=document.URL;
		console.log(urls)
		var str=urls.slice(urls.indexOf('id'));
	 	str = str.replace(/&/g,',');
	 	console.log(str) 		
	 	str = str.replace(/=/g,',');
	 	console.log(str)
	 	var str1 = str.split(',');
	 	console.log(str1[1])
		// 显示搜索框
		// this.$parent.hideSearch = true;
//		var that = this;
		Util.ajax('http://192.168.2.146:8989/huajiayi/company/selectOneJob/'+str1[1]+'.do', function (res) {
			// 将返回的数据转化为json
			resd = JSON.parse(res);
			console.log(resd)
			console.log(resd.address)
			var arry=[];
			arry.push(resd)
			that.types=arry
			console.log(that.types)
			
			
		})
	}
})
//组件注册
Vue.component('home', Home)

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
	// 每次当hash改变的时候，我们要将它获取出来，根据hash值来渲染页面
	// #list\type\1 =》 list\type\1
	// var hash = location.hash.slice(1);
	var hash = location.hash;
	// #\list\type\1 或者 #list\type\1 => list
	// 处理字符串
	hash = hash.slice(1).replace(/^\//, '');
	// 将字符串转化成数组
	hash = hash.split('/')

	// 列表页失效问题产生的原因
	// 当前页面的view组件是list(app.view)，搜索后得到的view组件还是list(hash[0])
	if (app.view === hash[0] && hash[0] === 'list') {
		// 父组件向子组件发送消息 成功通过父组件app向子组件发送消息
		app.query = hash.slice(1)
		app.$broadcast('reload-list')
		return ;
	}

	// 根据hash值选择视图组件
	app.query = hash.slice(1)
	app.view = hash[0] || 'home';
	
	// console.log(111)
}

// 对hash改变注册事件
window.addEventListener('hashchange', route)
window.addEventListener('load', route)