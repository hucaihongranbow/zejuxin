$(function () {
	var phone_boolean=false;
    var security_boolean=false;
    var pwd_boolean=false;
    var confirm_Boolean = false;

 //登录数据请求
 $('#denglu').click(function () {
 	sendRequest();//调用请求
 });
 
 //登录数据请求封装
 function sendRequest() {
 	//获取登录数据
 	var url=document.URL;
 	console.log(url)
 	var str=url.slice(url.indexOf('un'));
 	str = str.replace(/&/g,',');
 	console.log(str) 		
 	str = str.replace(/=/g,',');
 	console.log(str)
 	var str1 = str.split(',');
 	console.log(str1)
 	
 	
 	var str_reg=/^1[34578]\d{9}$/;
 	var str_pwd=/^[a-z0-9_-]{6,16}$/;
 	
 	var reg=$(".phone").val();
 	var pwd=$(".pwd").val();
 	if (str_reg.test(reg)&&str_pwd.test(pwd)&&reg===str1[1]&&pwd===str1[3]) {
 		alert('输入正确')
 		// 请求向后台发送登录信息
	 	$.ajax({
	 		"type":"get",
	 		"url":"http://192.168.2.152:8080/huajiayi/userLogin/login.do?iphone="+reg+"&password="+pwd,
	 		"success":function(dataa){
	 			console.log(dataa)
	 			alert("登录成功")
	 		},
	 		
	 		"error":function (dats) {
	 			console.log(dats)
	 		}
	 	})
 		
 	} else{
 	    alert('密码或账号错误');
 	    return;
 	}

 	
 }
 
 //找回密码
 $('.forget').click(function () {
 	 password_change()
 })
 
function password_change () {
window.location.href="pwd_find.html?un="+$('.phone').val();
}
 
 $("#noreg").click(function () {
 	window.location.href="register.html"
 })
})

