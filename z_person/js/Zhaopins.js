$(document).ready(function  () {
		var urls=document.URL;
		console.log(urls)
		var str=urls.slice(urls.indexOf('id'));
		str = str.replace(/&/g,',');
 		console.log(str)
 		str = str.replace(/=/g,',');
 		console.log(str)
 		var str1 = str.split(',');
 		console.log(str1)
 		console.log(str1[1])
 		console.log(str1[3])
 		console.log(str1[5])
 		console.log(str1[7])
 		console.log(str1[9])
 		
 		var urls="http://192.168.2.146:8989/huajiayi/company/MenuErjiJob/"+str1[1]+"/"+str1[3]+"/"+str1[5]+"/"+str1[7]+"/"+str1[9]+".do";
 		
 		//地址
 		var addr=document.getElementsByClassName("addr");
 		console.log(addr.length)
 		for (var i=0;i<addr.length;i++) {
 			addr[i].onclick=function (){
 				alert(this.innerHTML)
 				window.location.href="zhaopin.html?id="+str1[1]+"&ida="+this.innerHTML+"&industry="+null+"&exper="+null+"&school_w="+null;
 			}
 		}
 		
 		//行业
 		var industry=document.getElementsByClassName("industry");
 		console.log(industry.length)
 		for (var i=0;i<industry.length;i++) {
 			industry[i].onclick=function (){
 				alert(this.innerHTML)
 				window.location.href="zhaopin.html?id="+str1[1]+"&ida="+str1[3]+"&industry="+this.innerHTML+"&exper="+null+"&school_w="+null;
 			}
 		}
 		
 		//工作经验
 		var exper=document.getElementsByClassName("exper");
 		console.log(exper.length)
 		for (var i=0;i<exper.length;i++) {
 			exper[i].onclick=function (){
 				alert(this.innerHTML)
 				window.location.href="zhaopin.html?id="+str1[1]+"&industry="+str1[3]+"&ida="+str1[5]+"&exper="+this.innerHTML+"&school_w="+null;
 			}
 		}
 		
 		//学历要求
 		var school_w=document.getElementsByClassName("school_w");
 		console.log(school_w.length)
 		for (var i=0;i<school_w.length;i++) {
 			school_w[i].onclick=function (){
 				alert(this.innerHTML)
 				window.location.href="zhaopin.html?id="+str1[1]+"&industry="+str1[3]+"&exper="+str1[5]+"&ida="+str1[7]+"&school_w="+this.innerHTML;
 			}
 		}
 		
 		
 		
	  //定义一个分页方法，可多次调用
        function paginationNick(opt){
            //参数设置
            var pager={
                paginationBox:'',//分页容器-- 必填
                mainBox:'',//内容盒子--必填
                numBtnBox:'',//数字按钮盒子-- 必填
                btnBox:'',//按钮盒子 --必填
                ipt:'',//input class-- 必填
                goBtn:'',//go btn class --必填
                currentBtn:'',//当前按钮class name --必填
                pageCount:2,//每页显示几条数据
                numBtnCount:3,//当前页左右两边各多少个数字按钮
                currentPage:0,//当前页码data-page，首屏默认值
                maxCount:0,//ajax请求数据分成的最大页码
                data:[]//ajax请求的数据
            };
            pager = $.extend(pager,opt);
            //请求数据页面跳转方法
        function goPage(btn){
            //obj为ajax请求数据
            $.ajax({
		type:"get",
		url:urls,
		dataType: "json",
		success:function (sell) {
			var datas=sell
			console.log(datas)
			
			//obj为ajax请求数据
                var obj={
                other:{},
                value:datas
                };
                
                console.log(obj)
                
             //将展示的数据赋值给pager.data  (array)
                pager.data=obj.value;   
             
             
             //设置ajax请求数据分成的最大页码
                pager.maxCount=pager.data.length % pager.pageCount ? parseInt(pager.data.length / pager.pageCount) +1 :
                    pager.data.length / pager.pageCount;

                //设置当前页码
                if(!isNaN(btn)){//数字按钮
                    pager.currentPage=parseInt(btn);
                }else{
                    switch(btn){
                        case 'first':
                            pager.currentPage=0;
                            break;
                        case 'prev':
                            if(pager.currentPage>0){
                                --pager.currentPage;
                            }
                            break;
                        case 'next':
                            if(pager.currentPage+1<pager.maxCount){
                                ++pager.currentPage;
                            }
                            break;
                        case 'last':
                            pager.currentPage=pager.maxCount-1;
                            break;
                    }
                }
              
                
                //创建数字按钮
                createNumBtn(pager.currentPage);
                //赋值给页码跳转输入框的value，表示当前页码
                $('.'+pager.btnBox+' .'+pager.ipt).val(pager.currentPage+1);
               //内容区填充数据
                var arr=[],str='';
                arr=pager.data.slice(pager.pageCount*pager.currentPage,
                        pager.data.length - pager.pageCount*(pager.currentPage+1) > -1 ?
                        pager.pageCount*(pager.currentPage+1) : pager.data.length);
                        var pres=arr[0].companyjob[0];
                arr.forEach(function(val){  //传参数调用数组中的数据
                    str+='<div class="movie"><div id = "er1" data-id="'+pres.jobid+'">'+pres
.name+'</div><div id = "er2">'+pres.address+'</div><img src="val.ur+img" id = "er3"/><img src="val.ur+imgs" id = "er4"/><div id = "er5">'+val.ti+'</div><br/><br/><div id = "er6">'+val.tnum+'</div><div id = "er7">'+val.key7+'</div><div id = "er8">'+val.key8+'</div><div id = "er9">'+val.key9+'</div><br/><br/><div id = "er10">'+val.key10+'</div></div>';
                }); 
                $('.'+pager.mainBox).html(str);
                
                //添加点击事件
                $("#er1").click(function () {
            		var getids=this.getAttribute("data-id");
					alert(getids)
					window.location.href="zhiwei.html?id="+getids;
                })
		},
		error:function(){
			alert("请求失败")
		}
	});
            }
            //创建非数字按钮和数据内容区
            function createOtherBtn(){
                $('.'+pager.paginationBox).html('<div class="'+pager.mainBox+'"></div> <div class="'+pager.btnBox+'"><button data-page="first" class="first-btn">首页</button><button data-page="prev" class="prev-btn">上一页</button><span class="'+pager.numBtnBox+'"></span><button data-page="next" class="next-btn">下一页</button><input type="text" placeholder="请输入页码" class="'+pager.ipt+'"><button class="'+pager.goBtn+'">确定</button><button data-page="last" class="last-btn">尾页</button></div>');
                //ipt value变化并赋值给go btn data-page
                $('.'+pager.btnBox+' .'+pager.ipt).change(function(){
                    if(!isNaN($(this).val())){//是数字
                        if($(this).val() > pager.maxCount){//限制value最大值，跳转尾页
                            $(this).val(pager.maxCount);
                        }
                        if($(this).val()<1){//限制value最小值，跳转首页
                            $(this).val(1);
                        }
                    }else{//非数字清空value
                        $(this).val('');
                    }
                    $('.'+pager.btnBox+' .'+pager.goBtn).attr('data-page',$(this).val() ? $(this).val()-1 : '');
                });
                //每个btn绑定请求数据页面跳转方法
                $('.'+pager.btnBox+' button').each(function(i,v){
                    $(this).click(function(){
                        //有值且不是上一次的页码时才调用
                        if(v.getAttribute('data-page') && v.getAttribute('data-page') != pager.currentPage){
                            goPage(v.getAttribute('data-page'));
                        }
                    });
                });
            }
            //创建数字按钮
            function createNumBtn(page){
                //page是页面index从0开始，这里的page加减一要注意
                var str='';
                if(pager.maxCount>pager.numBtnCount*2){//若最大页码数大于等于固定数字按钮总数（pager.numBtnCount*2+1）时
                    //此页左边右边各pager.numBtnCount个数字按钮
                    if(page-pager.numBtnCount>-1){//此页左边有pager.numBtnCount页 page页码从0开始
                        for(var m=pager.numBtnCount;m>0;m--){
                            str+='<button data-page="'+(page-m)+'">'+(page-m+1)+'</button>';
                        }
                    }else{
                        for(var k=0;k<page;k++){
                            str+='<button data-page="'+k+'">'+(k+1)+'</button>';
                        }
                    }
                    str+='<button data-page="'+page+'" class="'+pager.currentBtn+'" disabled="disabled">'+(page+1)+'</button>';//此页
                    if(pager.maxCount-page>3){//此页右边有pager.numBtnCount页 page页码从0开始
                        for(var j=1;j<pager.numBtnCount+1;j++){
                            str+='<button data-page="'+(page+j)+'">'+(page+j+1)+'</button>';
                        }
                    }else{
                        for(var i=page+1;i<pager.maxCount;i++){
                            str+='<button data-page="'+i+'">'+(i+1)+'</button>';
                        }
                    }
                    /*数字按钮总数小于固定的数字按钮总数pager.numBtnCount*2+1时，
                     这个分支，可以省略*/
                    if(str.match(/<\/button>/ig).length<pager.numBtnCount*2+1){
                        str='';
                        if(page<pager.numBtnCount){//此页左边页码少于固定按钮数时
                            for(var n=0;n<page;n++){//此页左边
                                str+='<button data-page="'+n+'">'+(n+1)+'</button>';
                            }
                            str+='<button data-page="'+page+'" class="'+pager.currentBtn+'" disabled="disabled">'+(page+1)+'</button>';//此页
                            for(var x=1;x<pager.numBtnCount*2+1-page;x++){//此页右边
                                str+='<button data-page="'+(page+x)+'">'+(page+x+1)+'</button>';
                            }
                        }
                        if(pager.maxCount-page-1<pager.numBtnCount){
                            for(var y=pager.numBtnCount*2-(pager.maxCount-page-1);y>0;y--){//此页左边
                                str+='<button data-page="'+(page-y)+'">'+(page-y+1)+'</button>';
                            }
                            str+='<button data-page="'+page+'" class="'+pager.currentBtn+'" disabled="disabled">'+(page+1)+'</button>';//此页
                            for(var z=page+1;z<pager.maxCount;z++){//此页右边
                                str+='<button data-page="'+z+'">'+(z+1)+'</button>';
                            }
                        }
                    }
                }else{
                    str='';
                    for(var n=0;n<page;n++){//此页左边
                        str+='<button data-page="'+n+'">'+(n+1)+'</button>';
                    }
                    str+='<button data-page="'+page+'" class="'+pager.currentBtn+'" disabled="disabled">'+(page+1)+'</button>';//此页
                    for(var x=1;x<pager.maxCount-page;x++){//此页右边
                        str+='<button data-page="'+(page+x)+'">'+(page+x+1)+'</button>';
                    }
                }

                $('.'+pager.numBtnBox).html(str);
              //每个btn绑定请求数据页面跳转方法
                $('.'+pager.numBtnBox+' button').each(function(i,v){
                    $(this).click(function(){
                        goPage(v.getAttribute('data-page'));
                    });
                });

                //按钮禁用
                $('.'+pager.btnBox+' button').not('.'+pager.currentBtn).attr('disabled',false);
                if(!page){//首页时
                    $('.'+pager.btnBox+' .first-btn').attr('disabled',true);
                    $('.'+pager.btnBox+' .prev-btn').attr('disabled','disabled');
                }
                if(page==pager.maxCount-1){//尾页时
                    $('.'+pager.btnBox+' .last-btn').attr('disabled',true);
                    $('.'+pager.btnBox+' .next-btn').attr('disabled',true);
                }
            }

            //首屏加载
            createOtherBtn();//首屏加载一次非数字按钮即可
            goPage();//请求数据页面跳转满足条件按钮点击都执行，首屏默认跳转到currentPage
        }
        //调用
        paginationNick({
            paginationBox:'pagination-nick',//分页容器--必填
            mainBox:'main-box-nick',//内容盒子--必填
            numBtnBox:'num-box-nick',//数字按钮盒子-- 必填
            btnBox:'btn-box-nick',//按钮盒子 --必填
            ipt:'page-ipt-nick',//input class-- 必填
            goBtn:'go-btn-nick',//go btn class --必填
            currentBtn:'active-nick'//当前按钮class name --必填
        });
})