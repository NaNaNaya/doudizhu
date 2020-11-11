
	function toggleSound() {
            let music = document.getElementById("second-bgmusic");
            if (music.paused) { //判读是否播放  
                music.paused=false;
                music.play(); //没有就播放 
            }  
            
        }

setInterval("toggleSound()",1);

