$(function () {
	writeMap();
})


writeMap = function () {
	var width = 600,
		height = 600,
		centered;
	var svg = d3.select("#map").append("svg")
		// .attr("class", "svgback")
		.attr("width", width)
		.attr("height", height);
	var projection = d3.geo.mercator()
		.center([122.2, 24])
		.scale(8000);
	var path = d3.geo.path()
		.projection(projection);

	var g = svg.append("g");

	var tmpClick;
	var currCity;
	
	d3.json("json/taiwan.json", function (error, topology) {
		aaa = d3.select("#map").select("svg").select("g").selectAll("path")
			.data(topojson.feature(topology, topology.objects.County_MOI_1060525).features)
			.enter();

		aaa.append("path")
			.attr("d", path)
			.attr({
				d: path,
				name: function (d) {
					return d.properties["COUNTYNAME"];
				},
				fill: '#FFF',
				stroke: "#FFD306"
			}).attr('stroke-width', "2")
			.on("click",clicked)
			.on("mouseover", function (d) {
				if (State == 1) {
					document.getElementById("con").innerHTML = d.properties["COUNTYNAME"];
					if (document.getElementById("chart").innerHTML == "") {
						drawChart(d.properties["COUNTYNAME"]);
					}
					if (currClick != this) {
						d3.select(this).attr("fill", "#FFDC35");
						document.getElementById("chart").innerHTML = " ";
						drawChart(d.properties["COUNTYNAME"]);
					} else {
						document.getElementById("chart").innerHTML = "";
						drawChart(currCity);
						drawLine();
					}
				}
			}).on("mouseleave", function (d) {
				if (State == 1) {
					if (centered !== d) {
						d3.select(this).attr("fill", "#fff");
						document.getElementById("con").innerHTML = "";
						document.getElementById("chart").innerHTML = "";
					} else {
						tmpClick = this;
					}
					if (currClick != this && currClick != null) {
						document.getElementById("chart").innerHTML = "";
						document.getElementById("con").innerHTML = currCity;
						drawChart(currCity);
					}
				}
			});


	});

	clicked = function (d) {
		console.log(State)
		if (State == 1) {
			var x, y, k;

			if (d && centered !== d) {
				var centroid = path.centroid(d);
				x = centroid[0];
				y = centroid[1];
				k = 4;
				centered = d;
				d3.select(tmpClick).attr("fill", "#fff");
				d3.select(this).attr("fill", "#FFAC10");
				drawLine();
				currData = d;
				currClick = this;
				currCity = d.properties["COUNTYNAME"];
			} else {
				x = width / 2;
				y = height / 2;
				k = 1;
				d3.select(currClick).attr("fill", "#fff");
				centered = null;
				currData = null;
				currClick = null;
				currCity = null;
				removeLine();
			}

			g.selectAll("path")
				.classed("active", centered && function (d) {
					return d === centered;
				});

			g.transition()
				.duration(750)
				.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
				.style("stroke-width", 1.5 / k + "px");
		}
	}
}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
