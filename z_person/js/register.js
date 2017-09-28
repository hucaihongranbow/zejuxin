// $(document).ready(function () {
 	
 	var phone_boolean=false;
    var security_boolean=false;
    var pwd_boolean=false;
    var confirm_Boolean = false;
 

//1.电话号码注册
$(function () {
//注册数据请求
 $('.gain').click(function () {
 	console.log("注册")
 	if ((/^1[34578]\d{9}$/).test($('.phones').val())) {//正则判断
		phone_boolean=true;
		
		console.log($('.phones').val())
		
		console.log("填写正确")
	} else{
		phone_boolean=false;
		alert("填写错误")
	}
 	sendRequestphone();//数据请求函数调用
 })
 
 //注册数据请求封装
 function sendRequestphone() {
 		var accounts=$(".phones").val();
   		var yzms=$(".IDcode").val();
 		$.ajax({
 			'type':'get',
 			//获取手机验证码
 			'url':'http://192.168.2.151:8080/huajiayi/user/ipone.do?phone='+accounts,

 		    //获取验证码成功则执行输入验证码事件(keyup)
 		    'success':function (data) {
 		    	console.log(data);
 		    	if (data==100) {
 		    		console.log("手机输入正确")
 		    	$(".IDcode").keyup(function () {
 		    		console.log("yzm="+$(".IDcode").val())
 		    		$.ajax({
 		    			'type':"get",
 		    			//向后台提交验证码
 		    			'url':"http://192.168.2.151:8080/huajiayi/userLogin/shoujiyanzhengma.do?iphone="+accounts+"&yzm="+$(".IDcode").val(),
 		    			 
 		    			 //验证码提交成功则执行注册按钮的点击函数
 		    			success:function(r){
 		    				console.log(r)
 		    				console.log("验证码输入正确")
 		    				$('.l_submit').click(function() {
			 		    		if ((/^[a-z0-9_-]{6,16}$/).test($(".pwd").val())) {
			 		                   pwd_boolean=true;
			 		                      console.log("密码正确");
			 		                      var pwds=$('.pwd').val();
			 		                      $.ajax({
			 		                      	"type":"post",
			 		                      	//向后台提交注册信息
			 		                      	"url":"http://192.168.2.151:8080/huajiayi/userLogin/regist.do?iphone="+accounts+"&password="+pwds,
			 		                        
			 		                        //提交成功则跳转登录页面
			 		                      	'success':function (data) {
			 		                      		console.log('注册成功');
			 		                      		console.log(data);
			 		                      		//注册成功后跳转页面
			 		                      		window.location.href="login.html?un="+accounts+"&pwd="+pwds;
			 		                      	},
			 		                      	
			 		                      	"error" : function (XMLHttpRequest, textStatus, errorThrown){
			 				                       alert(errorThrown)
			 			                        }
			 		                      	
			 		                      });
			 	                           } else{
			 		                     pwd_boolean=false;
			 		                       console.log("密码错误");
			 	                        }
 		    						})
 		    			}
 		    		});
 		    	})
 		    	}else{
 		    		alert("错误")
 		    	}
// 		    	var data=JSON.parse(data);
// 		    	alert(data.msg);
 		    	
 		    },
 		    //错误信息
 			"error" : function (XMLHttpRequest, textStatus, errorThrown){
 				alert("您好")
 			}
 		})		
 }
})
	

var mail=$(".mall").val();
 var e_pwd=$(".e_pwd").val();
 var code=$(".pic_yan").val();
		
 function Img (data) {
        data.src = 'http://192.168.2.151:8080/huajiayi/captcher/capt.do?'+(new Date()).getTime();   
	}
 
function yanzheng () {
			$.ajax({
				type:"get",
				url:"http://192.168.2.151:8080/huajiayi/captcher/yzm.do?email="+mail+"&yzm="+$(".pic_yan").val(),
				success:function (rs) {
					console.log(rs)
    				console.log("验证码输入正确")
				}
			});
		}
 
    // 2.邮箱注册
function wdww () {
   	console.log("注册")
   	if ((/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).test($('.mall').val())) {//正则判断
		phone_boolean=true;
		console.log("填写正确")
		var mail=$(".mall").val();
		 var e_pwd=$(".e_pwd").val();
		$.ajax({
						type:"post",
						url:"http://192.168.2.151:8080/huajiayi/userLogin/regist.do?email="+mail+"&password="+e_pwd,
						success:function () {
							alert("注册成功")
						},
						error:function () {
							alert("cuowu")
						}
					});

	} else{
		phone_boolean=false;
		alert("填写错误")
	}
		
}
    