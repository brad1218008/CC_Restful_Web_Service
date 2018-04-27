var reMargin = {
		top: 130,
		right: 55,
		bottom: 70,
		left: 85
	},
	reWidth = 550 - reMargin.left - reMargin.right,
	reHeight = 400 - reMargin.top - reMargin.bottom;


// set the ranges
var reX = d3.scale.ordinal().rangeRoundBands([0, reWidth], .05);

var reY = d3.scale.linear().range([reHeight, 0]);

// define the axis
var reXAxis = d3.svg.axis()
	.scale(reX)
	.ticks(6)
	.orient("bottom")


var reYAxis = d3.svg.axis()
	.scale(reY)
	.orient("left")
	.ticks(4);

function hoeffding_all() {
	document.getElementById("chart").innerHTML = " ";
	var reXAxis = d3.svg.axis()
		.scale(reX)
		.tickFormat("")
		.orient("bottom")
	svg = d3.select("#chart").append("svg")
		.attr("width", reWidth + reMargin.left + reMargin.right)
		.attr("height", reHeight + reMargin.top + reMargin.bottom)
		.append("g")
		.attr("transform",
			"translate(" + reMargin.left + "," + reMargin.top + ")");

	d3.json("http://0.0.0.0:5000/hoeffding1", function (error, data) {

		data.forEach(function (d) {
			d.city = d.city;
			d.p_value = +d.p_value;
		});

		reX.domain(data.map(function (d) {
			return d.city;
		}));
		reY.domain([-0.1, 1]);


		//		 add axis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + reHeight + ")")
			.call(reXAxis)
			.selectAll("text")
			.style("text-anchor", "end")
			.attr("dx", "3.8em")
			.attr("dy", "0.55em")
			.attr("transform", "rotate(45)");

		svg.append("g")
			.attr("class", "y axis axisLeft")
			.attr("transform", "translate(0,0)")
			.call(reYAxis)
			.append("text")
			.attr("y", 6)
			.attr("dy", "-2em")
			.style("text-anchor", "end")
			.text("p-value");

		svg.append("line")
			.attr("x1",reX("台灣區"))
			.attr("y1",reY("0.05"))
			.attr("x2",reX("嘉義市"))
			.attr("y2",reY("0.05"))
			.style("stroke","red")
			.style("stroke-width", "2px");
		
		var dota = svg.selectAll("scatter-dots")
			.data(data)
			.enter();
		dota.append("svg:circle")
			.attr("cx", function (d, i) {
				return reX(d.city);
			})
			.attr("cy", function (d) {
				return reY(d.p_value);
			})
			.attr("r", 4)
			.style("fill",function (d) {
				if(Number(d.p_value) < 0.05)
					return "darkorange";
				else
					return "green";
			})
			.on("mouseover",function(d) {
			});
		dota.append("text")
			.attr("class", "hoeChart")
			.attr("x", function (d, i) {
				return reX(d.city);
			})
			.attr("y", function (d) {
				return reY(d.p_value);
			})
			.attr("dy", "-2.7em")
			.attr("dx", "-0.5em")
			.attr("transform", "translate(0,0)")
			.text(function (d) {
				return d.city[0];
			});
		dota.append("text")
			.attr("class", "hoeChart")
			.attr("x", function (d, i) {
				return reX(d.city);
			})
			.attr("y", function (d) {
				return reY(d.p_value);
			})
			.attr("dy", "-1.7em")
			.attr("dx", "-0.5em")
			.attr("transform", "translate(0,0)")
			.text(function (d) {
				return d.city[1];
			});
		dota.append("text")
			.attr("class", "hoeChart")
			.attr("x", function (d, i) {
				return reX(d.city);
			})
			.attr("y", function (d) {
				return reY(d.p_value);
			})
			.attr("dy", "-0.7em")
			.attr("dx", "-0.5em")
			.attr("transform", "translate(0,0)")
			.text(function (d) {
				return d.city[2];
			});
		
	});


}

function hoeffding_five() {
	document.getElementById("chart").innerHTML = " ";
	svg = d3.select("#chart").append("svg")
		.attr("width", reWidth + reMargin.left + reMargin.right)
		.attr("height", reHeight + reMargin.top + reMargin.bottom)
		.append("g")
		.attr("transform",
			"translate(" + reMargin.left + "," + reMargin.top + ")");

	d3.json("http://0.0.0.0:5000/hoeffding2", function (error, data) {

		data.forEach(function (d) {
			d.year = d.year;
			d.p_value = +d.p_value;
		});

		reX.domain(data.map(function (d) {
			return d.year;
		}));
		reY.domain([-0.1, 1]);


		//		 add axis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + reHeight + ")")
			.call(reXAxis)
			.selectAll("text")
			.style("text-anchor", "end")
			.attr("dx", "1.8em")
			.attr("dy", "1.5em")
			.attr("transform", "rotate(45)");

		svg.append("g")
			.attr("class", "y axis axisLeft")
			.attr("transform", "translate(0,0)")
			.call(reYAxis)
			.append("text")
			.attr("y", 11)
			.attr("dy", "-2em")
			.style("text-anchor", "end")
			.text("p-value");

		var dota = svg.selectAll("scatter-dots")
			.data(data)
			.enter();
		
		svg.append("line")
			.attr("x1",reX("1999"))
			.attr("y1",reY("0.05"))
			.attr("x2",reX("2016"))
			.attr("y2",reY("0.05"))
			.style("stroke","red")
			.style("stroke-width", "2px");
		
		var line3 = d3.svg.line()
			.x(function (d) {
				return reX(d.year);
			})
			.y(function (d) {
				return reY(d.p_value);
			});

		svg.append("path")
			.datum(data)
			.attr("class", "line3")
			.attr("d", line3);
		
		dota.append("svg:circle")
			.attr("cx", function (d, i) {
				return reX(d.year);
			})
			.attr("cy", function (d) {
				return reY(d.p_value);
			})
			.attr("r", 4)
			.style("fill",function (d) {
				if(Number(d.p_value) < 0.05)
					return "darkorange";
				else
					return "green";
			})
			.on("mouseover",function(d) {
			});
	});
}

function mcnemar() {
	document.getElementById("chart").innerHTML = " ";
	svg = d3.select("#chart").append("svg")
		.attr("width", reWidth + reMargin.left + reMargin.right)
		.attr("height", reHeight + reMargin.top + reMargin.bottom)
		.append("g")
		.attr("transform",
			"translate(" + reMargin.left + "," + reMargin.top + ")");

	d3.json("http://0.0.0.0:5000/mcnemar", function (error, data) {

		data.forEach(function (d) {
			d.year = d.year;
			d.p_value = +d.p_value;
		});

		reX.domain(data.map(function (d) {
			return d.year;
		}));
		reY.domain([-0.1, 1]);

		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + reHeight + ")")
			.call(reXAxis)
			.selectAll("text")
			.style("text-anchor", "end")
			.attr("dx", "1.8em")
			.attr("dy", "1.5em")
			.attr("transform", "rotate(45)");

		svg.append("g")
			.attr("class", "y axis axisLeft")
			.attr("transform", "translate(0,0)")
			.call(reYAxis)
			.append("text")
			.attr("y", 11)
			.attr("dy", "-2em")
			.style("text-anchor", "end")
			.text("p-value");
		
		svg.append("line")
			.attr("x1",reX("1999"))
			.attr("y1",reY("0.05"))
			.attr("x2",reX("2016"))
			.attr("y2",reY("0.05"))
			.style("stroke","red")
			.style("stroke-width", "2px");
		
		var line3 = d3.svg.line()
			.x(function (d) {
				return reX(d.year);
			})
			.y(function (d) {
				return reY(d.p_value);
			});

		svg.append("path")
			.datum(data)
			.attr("class", "line3")
			.attr("d", line3);

		var dota = svg.selectAll("scatter-dots")
			.data(data)
			.enter();
		dota.append("svg:circle")
			.attr("cx", function (d, i) {
				return reX(d.year);
			})
			.attr("cy", function (d) {
				return reY(d.p_value);
			})
			.attr("r", 4)
			.style("fill",function (d) {
				if(Number(d.p_value) < 0.05)
					return "darkorange";
				else
					return "green";
			})
			.on("mouseover",function(d) {
			});
	});
}

function mann() {
	document.getElementById("chart").innerHTML = " ";
	svg = d3.select("#chart").append("svg")
		.attr("width", reWidth + reMargin.left + reMargin.right)
		.attr("height", reHeight + reMargin.top + reMargin.bottom)
		.append("g")
		.attr("transform",
			"translate(" + reMargin.left + "," + reMargin.top + ")");

	d3.json("http://0.0.0.0:5000/mann", function (error, data) {

		data.forEach(function (d) {
			d.year = d.year;
			d.p_value = +d.p_value;
		});

		reX.domain(data.map(function (d) {
			return d.year;
		}));
		reY.domain([-0.1, 1]);

		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + reHeight + ")")
			.call(reXAxis)
			.selectAll("text")
			.style("text-anchor", "end")
			.attr("dx", "1.8em")
			.attr("dy", "1.5em")
			.attr("transform", "rotate(45)");

		svg.append("g")
			.attr("class", "y axis axisLeft")
			.attr("transform", "translate(0,0)")
			.call(reYAxis)
			.append("text")
			.attr("y", 11)
			.attr("dy", "-2em")
			.style("text-anchor", "end")
			.text("p-value");
		
		svg.append("line")
			.attr("x1",reX("1999"))
			.attr("y1",reY("0.05"))
			.attr("x2",reX("2016"))
			.attr("y2",reY("0.05"))
			.style("stroke","red")
			.style("stroke-width", "2px");
		
		var line3 = d3.svg.line()
			.x(function (d) {
				return reX(d.year);
			})
			.y(function (d) {
				return reY(d.p_value);
			});

		svg.append("path")
			.datum(data)
			.attr("class", "line3")
			.attr("d", line3);

		var dota = svg.selectAll("scatter-dots")
			.data(data)
			.enter();
		dota.append("svg:circle")
			.attr("cx", function (d, i) {
				return reX(d.year);
			})
			.attr("cy", function (d) {
				return reY(d.p_value);
			})
			.attr("r", 4)
			.style("fill",function (d) {
				if(Number(d.p_value) < 0.05)
					return "darkorange";
				else
					return "green";
			})
			.on("mouseover",function(d) {
			});
	});
}
