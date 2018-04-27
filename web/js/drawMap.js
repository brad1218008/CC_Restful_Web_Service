function hoeDrawMap() {
	var map = document.querySelector("#map");
	var g = map.querySelector("g");
	var path = g.querySelectorAll("path");
	path[21].setAttribute("fill","#FFAC10");
	path[18].setAttribute("fill","#FFAC10");
	path[15].setAttribute("fill","#FFAC10");
	path[11].setAttribute("fill","#FFAC10");
	path[9].setAttribute("fill","#FFAC10");
}

function clearMap() {
	var map = document.querySelector("#map");
	var g = map.querySelector("g");
	var path = g.querySelectorAll("path");
	for(i=0 ; i<=21 ; i++) {
		path[i].setAttribute("fill","#FFF");
	}
}

function divideSN() {
	var map = document.querySelector("#map");
	var g = map.querySelector("g");
	var path = g.querySelectorAll("path");
	for(i=0 ; i<=21 ; i++) {
		path[i].setAttribute("fill","yellow");
	}
	path[2].setAttribute("fill","#FFAC10");
	path[10].setAttribute("fill","#FFAC10");
	path[11].setAttribute("fill","#FFAC10");
	path[12].setAttribute("fill","#FFAC10");
	path[13].setAttribute("fill","#FFAC10");
	path[14].setAttribute("fill","#FFAC10");
	path[16].setAttribute("fill","#FFAC10");
	path[17].setAttribute("fill","#FFAC10");
	path[18].setAttribute("fill","#FFAC10");
	path[8].setAttribute("fill","#FFF");
	path[7].setAttribute("fill","#FFF");
	
}