window.onload=function () {
	//登录方式切换
	var phone=document.getElementById("phone")
	var Phone=document.getElementById("F_phone")
	
	var puto=document.getElementById("puto")
	var Puto=document.getElementById("Puto")
	phone.onclick=function(){
		Phone.style.display="block";
		Puto.style.display="none";
	}
	
	puto.onclick=function(){
		Puto.style.display="block";
		Phone.style.display="none";
	}
	
	//注册方式切换
}