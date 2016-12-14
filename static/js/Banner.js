//显示隐藏
function showHide(className){
	$(function(){
		$(className).hover(function(){
			$(this).children('a').addClass('bg');
			$(className+' .i2').show();
			$(className+' .msg').show();
		},function(){
			$(this).children('a').removeClass('bg');
			$(className+' .i2').hide();
			$(className+' .msg').hide();
	})
	})
}
//返回顶部
$(function () {
	$('.top a').hover(function () {
		$(this).find('.i5').show().css('zIndex','10');
	},function () {
		$(this).find('.i5').hide();
	})
});
//tab框
tab();
function tab(){
	$('#tab .msg-nav a').click(function(){
		$('#tab .msg-nav a').removeClass("on");
		$(this).addClass("on");
		$('#tab .tab').css('display','none');
		$('#tab .tab').eq($(this).index()).css('display','block');
	});
}
//banner图片延迟加载
lazyImg();
function lazyImg(){
	var $aImg=$('#banner').find('a');
	setTimeout(function(){
		$aImg.show();
	},1000)
}
//鼠标滑过往上提

//搜索框
var searchRender=(function(){
	var $search=$('#search');
	var $text=$('#text');
	var $oDiv=$('.search-bg');
	function bindInpEvent(){
		var textValue=$(this).val();
		if(textValue.length!==0){
			$oDiv.css('display','block');
		}else{
			$oDiv.css('display','none');
		}
		//如果文本框中有内容
		$.ajax({
			type:"get",
			url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+textValue,
			dataType:'jsonp',
			jsonp:'cb',
			success:function(result){
				var result=result['s'];
				//如果result里没有数据，终止操作
				if(result.length===0){
					$oDiv.css('display','none');
					return
				};
				//如果result里有数据
				var str='<ul>';
				$.each(result, function(index,item) {
					if(index>3) return false;
					str+=index===0?'<li class="on">'+item+'</li>':'<li>'+item+'</li>';
				});
				str+='</ul>';
				$oDiv.html(str).stop().slideDown(100);
			}
		});
	}
	function bindClickEvent(e){
		var target=e.target;
		var tagName=target.tagName.toUpperCase();
		var tnValue=target.innerHTML;
		var $tagName=$(target);
		if(tagName==='INPUT' && target.id==='text') return;
		if(tagName==='LI' && $tagName.parent().parent().hasClass('.search-bg')){
			$text.val(tnValue);
			$oDiv.css('display','none');
		}
		//其他事件源
		$oDiv.css('display','none');
	}
	return{
		init:function(){
			//这里要干的事情
			//input获取焦点事件
			$text.on('keyup focus',bindInpEvent);
			$(document).on('click',bindClickEvent);
		}
	}
})();
searchRender.init();
var searchRender1=(function(){
	var $search=$('#search1');
	var $text=$('#text1');
	var $oDiv=$('.search-bg');
	function bindInpEvent(){
		var textValue=$(this).val();
		if(textValue.length!==0){
			$oDiv.css('display','block');
		}else{
			$oDiv.css('display','none');
		}
		//如果文本框中有内容
		$.ajax({
			type:"get",
			url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+textValue,
			dataType:'jsonp',
			jsonp:'cb',
			success:function(result){
				var result=result['s'];
				//如果result里没有数据，终止操作
				if(result.length===0){
					$oDiv.css('display','none');
					return
				};
				//如果result里有数据
				var str='<ul>';
				$.each(result, function(index,item) {
					if(index>3) return false;
					str+=index===0?'<li class="on">'+item+'</li>':'<li>'+item+'</li>';
				});
				str+='</ul>';
				$oDiv.html(str).stop().slideDown(100);
			}
		});
	}
	function bindClickEvent(e){
		var target=e.target;
		var tagName=target.tagName.toUpperCase();
		var tnValue=target.innerHTML;
		var $tagName=$(target);
		if(tagName==='INPUT' && target.id==='text1') return;
		if(tagName==='LI' && $tagName.parent().parent().hasClass('.search-bg')){
			$text.val(tnValue);
			$oDiv.css('display','none');
		}
		//其他事件源
		$oDiv.css('display','none');
	}
	return{
		init:function(){
			//这里要干的事情
			//input获取焦点事件
			$text.on('keyup focus',bindInpEvent);
			$(document).on('click',bindClickEvent);
		}
	}
})();
searchRender1.init();
//导航
var scrollRender=(function () {
	function comput() {
		//获取浏览器被卷去的高度
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var clientHeight=document.documentElement.clientHeight||document.body.clientHeight;
		if(scrollTop>=clientHeight){
			$('#fixBox').css({
				width:'100%',
				display:'block',
				position:'fixed',
				background:'rgba(10, 9, 9, 0.85)',
				zIndex:200
			});
			$('#top').css('display','block');
		}else{
			$('#fixBox').css('display','none');
			$('#top').css('display','none');
		}
	}
	//导航
	var $subNav=$('#subnav');
	var $subNav1=$('#subnav1');
	$(function () {
		$($subNav).hover(function () {
			$(this).addClass('bdHover');
			$(this).find('.menu').css('display','block');
		},function () {
			$(this).removeClass('bdHover');
			$(this).find('.menu').css('display','none');
		})
	});
	$(function () {
		$($subNav1).hover(function () {
			$(this).addClass('bdHover');
			$(this).find('.menu').css('display','block');
		},function () {
			$(this).removeClass('bdHover');
			$(this).find('.menu').css('display','none');
		})
	});
	return{
		init:function () {
			window.onscroll=comput;
		}
	}
})();
scrollRender.init();
/*回到顶部*/
$(function(){
	var $btn=$('#tip');
	var $top=$('#top');
	$(window).on('scroll',computedDisplay);//给scroll行为绑定事件computedDisplay
	function computedDisplay(){
		//判断浏览器被卷去高度>可视区的高度，让按钮显示，否则，按钮隐藏；
		if($(window).scrollTop()>$(window).height()){
			$top.show();
		}else{
			$top.hide();
		}
	}
	$btn.click(function(){
		$(this).hide();
		//解除事件绑定
		$(window).off('scroll',computedDisplay)
		var target=$(window).scrollTop();//浏览器卷去的高度
		var duration=1000;
		var interval=30;
		var step=target/duration*interval;
		clearInterval(timer);
		var timer=setInterval(function(){
			var curTop=$(window).scrollTop();
			if(curTop<=0){
				clearInterval(timer);
				$(window).on('scroll',computedDisplay);
				return;
			}
			curTop-=step;
			$(window).scrollTop(curTop);
		},interval)


	})
})









































