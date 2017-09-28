
var Util = {
	// 获取模板内容
	tpl: function (id) {
		return document.getElementById(id).innerHTML;
	}
}
var job = [];
var url;
var urls;
var city=document.getElementsByClassName("city");
var City=document.getElementById("city")
var Did=document.getElementById("did")

/* 热门职位 */
var Home = Vue.extend({
	template: Util.tpl('tpl_home'),
	data: function () {
		return {
			types: "",
			list: []
		}
	},
	// 组件创建后执行
	created: function () {
		// 显示搜索框
		//this.$parent.hideSearch = true;
		var that = this;
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function (argument) {
				if (xhr.readyState == 4) 
				{
					var d1 = xhr.responseText;
					var datas = JSON.parse(d1);
					console.log(datas)
					that.types=datas
				}
			};
			
			var Did=document.getElementById("did");
			
			for (var j=0;j<city.length;j++) {
				city[j].onclick = function () {
				url= "http://192.168.2.146:8989/huajiayi/company/selectHotJob/"+this.innerHTML+".do";
				
				Did.innerHTML=this.innerHTML;
				console.log(url)
				xhr.open("GET",url,true);
				xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xhr.send();
				
                var that = this;
				//模糊查询
                $("#sousuo").click(function(){
                	console.log($("#sou").val())
                	url="http://192.168.2.146:8989/huajiayi/company/selectaddressJob/"+that.innerHTML+"/"+$("#sou").val()+"/"+null+"/"+null+"/"+null+".do";
                	console.log(url)
					xhr.open("GET",url,true);
					xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
					xhr.send();
                })
                
	                //最新职位
	                $("#new").click(function () {
	                	console.log(that.innerHTML)
						url= "http://192.168.2.146:8989/huajiayi/company/selectaddproNewJob/"+that.innerHTML+".do"
						console.log(url)
						xhr.open("GET",url,true);
						xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
						xhr.send();
	                })
	                
	                //热门职位
	                $("#hot").click(function () {
	                	console.log(that.innerHTML)
						url= "http://192.168.2.146:8989/huajiayi/company/selectHotJob/"+that.innerHTML+".do"
						console.log(url)
						xhr.open("GET",url,true);
						xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
						xhr.send();
	                })
                
				}		
			}
			
			url= "http://192.168.2.146:8989/huajiayi/company/selectHotJob/贵阳.do";
			console.log(url)
			xhr.open("GET",url,true);
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xhr.send();
			
			//模糊查询
                $("#sousuo").click(function(){
                	console.log($("#sou").val())
                	url="http://192.168.2.146:8989/huajiayi/company/selectpropertyJob/"+$("#sou").val()+".do";
                	console.log(url)
					xhr.open("GET",url,true);
					xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
					xhr.send();
                })
                
                //最新职位
                $("#new").click(function () {
                	console.log(that.innerHTML)
					url= "http://192.168.2.146:8989/huajiayi/company/selectaddproNewJob/贵阳.do"
					console.log(url)
					xhr.open("GET",url,true);
					xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
					xhr.send();
                })
                
                //热门职位
                $("#hot").click(function () {
                	console.log(that.innerHTML)
					url= "http://192.168.2.146:8989/huajiayi/company/selectHotJob/贵阳.do"
					console.log(url)
					xhr.open("GET",url,true);
					xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
					xhr.send();
                })
	},
	
	methods:{
		classed:function (data) {
        	alert("你好")
        	console.log(data)
        	window.location.href="zhiwei.html?id="+data;
        },
               
       	canmply: function  (datas) {
			alert("公司")
			console.log(datas)
			window.location.href="Company.html?ids="+datas;
		}
	}
})

//废弃组件
var Employment = Vue.extend({
	template:Util.tpl('tpl_employment'),
	data:function () {
		return {
			types: "",
		}
	},
	
	// 组件创建后执行
	created: function () {
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


//请求到招聘页面的数据展示
$(document).ready(function (datad) {
	invite();
	
	function invite () {
		//菜单数据请求
		var xmlhttp;
		if (window.XMLHttpRequest)
		{
			//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
			xmlhttp=new XMLHttpRequest();
		}
		else
		{
			// IE6, IE5 浏览器执行代码
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				var datas=xmlhttp.responseText
				var dataed=JSON.parse(datas)
				console.log(dataed)
				console.log(dataed.length)
				var str="";
				for (var k=0;k<dataed.length;k++) {
					str+='<li class="list" data-id="'+dataed[k].id+'"><div>'+dataed[k].name+'</div></li>';//难点	
				}
	//			console.log(that)
				$("#menu").html(str)
				
				//点击菜单传值到职位详情
				$(".list").click(function () {
					
					$("#menus").css("display","block")
					var getid=this.getAttribute("data-id");
	//				alert(getid)
					$.ajax({
						type:"get",
						url:"http://192.168.2.146:8989/huajiayi/company/MenuErji/"+getid+".do",
						success:function (data) {
							console.log("url")
							console.log(data)
							console.log(data.length)
							var srt="";
							for (var j=0;j<data.length;j++) {
								console.log(j)
								srt+='<li class="t_list" data-id="'+data[j].id+'"><div>'+data[j].name+'</div></li>'
							}
							$("#menus").html(srt)
							
							$(".t_list").click(function () {
								$("#menus").css("display","none")
								var getids=this.getAttribute("data-id");
								alert(getids)
								window.location.href="zhaopin.html?id="+getids+"&address=贵阳&id1="+null+"&id2="+null+"&id3="+null;
							})
						}
					});
				})
			}
		}
		xmlhttp.open("GET","http://192.168.2.146:8989/huajiayi/company/MenuYiji.do",true);
		xmlhttp.send();
	
	}

   //点击选择城市后跳转招聘
// var Html=$("#did").html();
	$(".city").click(function () {
		var dizhi=$(this).html()
		console.log(dizhi)
		alert(" hello你好")
		
		//菜单数据请求
		var xmlhttp;
		if (window.XMLHttpRequest)
		{
			//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
			xmlhttp=new XMLHttpRequest();
		}
		else
		{
			// IE6, IE5 浏览器执行代码
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				var datas=xmlhttp.responseText
				var dataed=JSON.parse(datas)
				console.log(dataed)
				console.log(dataed.length)
				var str="";
				for (var k=0;k<dataed.length;k++) {
					str+='<li class="list" data-id="'+dataed[k].id+'"><div>'+dataed[k].name+'</div></li>';//难点	
				}
	//			console.log(that)
				$("#menu").html(str)
				
				//点击菜单传值到职位详情
				$(".list").click(function () {
					var getid=this.getAttribute("data-id");
	//				alert(getid)
					$.ajax({
						type:"get",
						url:"http://192.168.2.146:8989/huajiayi/company/MenuErji/"+getid+".do",
						success:function (data) {
							console.log("url")
							console.log(data)
							console.log(data.length)
							var srt="";
							for (var j=0;j<data.length;j++) {
								console.log(j)
								srt+='<li class="t_list" data-id="'+data[j].id+'"><div>'+data[j].name+'</div></li>'
							}
							$("#menus").html(srt)
							
							$(".t_list").click(function () {
								var getids=this.getAttribute("data-id");
								alert(getids)
								window.location.href="zhaopin.html?id="+getids+"&address="+dizhi+"&id1="+null+"&id2="+null+"&id3="+null;
							})
						}
					});
				})
			}
		}
		xmlhttp.open("GET","http://192.168.2.146:8989/huajiayi/company/MenuYiji.do",true);
		xmlhttp.send();
	}) 
	
	
	$.ajax({
		type:"get",
		url:"http://192.168.2.146:8989/huajiayi/company/queryHjy.do",
		success:function (dataf) {
			console.log(dataf)
			var list='';
			for (var n=0;n<dataf.length;n++) {
				list+="<li class='lis'><img src="+dataf[n].pic+"/></li>"
			}
			$("#benner").html(list)
		}
	});
	
	$("#invite").click(function () {
		window.location.href="zhaopin.html?id="+null+"&ids="+null+"&id1="+null+"&id2="+null+"&id3="+null;
	})
	
	$("#zhiye").click(function () {
		window.location.href="careers_guide.html?id=0";
	})
})