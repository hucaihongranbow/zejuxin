window.onload = function  () {
	var cut = document.getElementById("cut");
	var city = document.getElementById("city");
	var del = document.getElementById("del");
	var adv = document.getElementById("adv");
	var advs = document.getElementById("advs");
	cut.onclick = function  () {
		city.style.display="block";
	}
	
	del.onclick = function  () {
		city.style.display = "none";
	}
	
	adv.onclick = function  () {
		advs.style.display = "none";
	}
	
	
	//横幅轮播开始
    var box = document.getElementById("box");
    var screen = box.children[0];
    var ul = screen.children[0];
    var ol = screen.children[1];
    var ulLis = ul.children;
    var imgWidth = screen.offsetWidth;
    var timer = null;
    
    var firstImg = ulLis[0].cloneNode(true);
    ul.appendChild(firstImg);
    var pic = 0;

    timer = setInterval(playNext, 3000)

    function playNext() {
        if (pic == ulLis.length - 1) {
            ul.style.left = 0;
            pic = 0;
        }
        pic++;
        var target = -pic * imgWidth;
        animate(ul, target);
    }


    function animate(obj, target) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var step = 150;
            var step = obj.offsetLeft < target ? step : -step;


            if (Math.abs(obj.offsetLeft - target) > Math.abs(step)) {
                obj.style.left = obj.offsetLeft + step + "px";
            } else {
                obj.style.left = target + "px";
                clearInterval(obj.timer);
            }
        }, 30)
    }
    //横幅轮播结束
}