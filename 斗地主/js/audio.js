
	/*function toggleSound() {
		let music = document.getElementById("first-bgmusic");
		if(music.paused) { //判读是否播放  
			music.paused = false;
			music.play(); //没有就播放 
		}

	}
	setInterval("toggleSound()", 1);*/
	//弹出窗口
//	let btn = document.getElementById('start');
//	btn.onclick = () => {
//		setTimeout(function() {
//		
//			document.getElementsByClassName('load-center')[0].style.display = 'block';
//			document.getElementById('fade').style.display = 'block';
//		
//		}, 2000);
//		document.getElementsByClassName('load-center')[0].style.display = 'none';
//			document.getElementById('fade').style.display = 'none';
//		setTimeout(function () {
//          $(".all_poker").eq(0).find('li').css({ 'transform': 'rotateZ(180deg) rotateY(45deg) rotateX(-45deg) ', 'transition': 'transform 1s' });
//          $(".all_poker").eq(1).find('li').css({ 'transform': 'rotateZ(180deg) rotateY(-45deg) rotateX(-45deg) ', 'transition': 'transform 1s' });
//      }, 200)
//	}
//	console.log(event.type);
//	$('#start').click(
//		setTimeout(function(){
//			$('.load-center').css('display','none');
//			$('#fade').css('display','none');
//			window.location.href="the-first-page.html";
//		},2000)
//		$('.load-center').css('display','block');
//		$('#fade').css('display','block');
//	)
//	setTimeout(function(){
//		
//	},4000)
	
$(function () {
    $('#start').click(
		setTimeout(function(){
			$('.load-center').css('display','none');
			$('#fade').css('display','none');
			window.location.href="the-first-page.html";
		},2000);
		$('.load-center').css('display','block');
		$('#fade').css('display','block');
	)
});
