var State = 1;
var currClick;
var currData;
var clicked;
var writeMap;
var first = true;
function drawChart(city) {

	 margin = {
			top: 130,
			right: 55,
			bottom: 70,
			left: 85
		},
		width = 550 - margin.left - margin.right,
		height = 450 - margin.top - margin.bottom;


	// set the ranges
	 x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

	 y0 = d3.scale.linear().range([height, 0]);
	 y1 = d3.scale.linear().range([height, 0]);

	// define the axis
	 xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")


	 yAxisLeft = d3.svg.axis()
		.scale(y0)
		.orient("left")
		.ticks(4);

	 yAxisRight = d3.svg.axis()
		.scale(y1)
		.ticks(6)
		.orient("right");



	// add the SVG element
	 svg = d3.select("#chart").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform",
			"translate(" + margin.left + "," + margin.top + ")");

	d3.json("http://0.0.0.0:5000", function (error, data) {

		data.DataCollection.Data.forEach(function (d) {
			d.Year = d.Year;
			d[city] = +d[city];
		});

		// scale the range of the data
		x.domain(data.DataCollection.Data.map(function (d) {
			return d.Year;
		}));
		y0.domain([600000, 1600000]);


		// add axis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.selectAll("text")
			.style("text-anchor", "end")
			.attr("dx", "-.8em")
			.attr("dy", "-.55em")
			.attr("transform", "rotate(-90)");

		svg.append("g")
			.attr("class", "y axis axisLeft")
			.attr("transform", "translate(0,0)")
			.call(yAxisLeft)
			.append("text")
			.attr("y", 6)
			.attr("dy", "-2em")
			.style("text-anchor", "end")
			.text("Salary");


		// Add bar chart
		svg.selectAll("bar")
			.data(data.DataCollection.Data)
			.enter().append("rect")
			.attr("class", "bar1")
			.attr("x", function (d) {
				return x(d.Year);
			})
			.attr("width", x.rangeBand() / 2)
			.attr("y", function (d) {
				return y0(d[city]);
			})
			.attr("height", function (d) {
				return height - y0(d[city]);
			});

	});
	d3.json("http://0.0.0.0:5000/people", function (error, data) {
		data.forEach(function (d) {
			d.Year = d.Year;
			d[city] = +d[city];
			d.區域別總計 = +d.區域別總計;
		});

		// scale the range of the data
		x.domain(data.map(function (d) {
			return d.Year;
		}));
		y1.domain([0, 20]);

		var line2 = d3.svg.line()
			.x(function (d) {
				return x(d.Year) + x.rangeBand() / 2;
			})
			.y(function (d) {
				return y1(d.區域別總計);
			});

		// add axis
		svg.append("g")
			.attr("class", "y axis axisRight")
			.attr("transform", "translate(" + (width) + ",0)")
			.call(yAxisRight)
			.append("text")
			.attr("y", 6)
			.attr("dy", "-2em")
			.attr("dx", "2em")
			.style("text-anchor", "end")
			.text("Born(%)");


		// Add bar chart
		bars = svg.selectAll("bar")
			.data(data)
			.enter();
		bars.append("rect")
			.attr("class", "bar2")
			.attr("x", function (d) {
				return x(d.Year) + x.rangeBand() / 2;
			})
			.attr("width", x.rangeBand() / 2)
			.attr("y", function (d) {
				return y1(d[city]);
			})
			.attr("height", function (d) {
				return height - y1(d[city]);
			});

	});
//	d3.json("http://0.0.0.0:5000/nopeople", function (error, data) {
//		data.forEach(function (d) {
//			d.Year = d.Year;
//			d[city] = +d[city];
//			d.區域別總計 = +d.區域別總計;
//		});
//
//		// scale the range of the data
//		x.domain(data.map(function (d) {
//			return d.Year;
//		}));
//		y1.domain([0, 20]);
//
//		var line2 = d3.svg.line()
//			.x(function (d) {
//				return x(d.Year) + x.rangeBand() / 2;
//			})
//			.y(function (d) {
//				return y1(d.區域別總計);
//			});
//
//		// add axis
//		svg.append("g")
//			.attr("class", "y axis axisRight")
//			.attr("transform", "translate(" + (width) + ",0)")
//			.call(yAxisRight)
//			.append("text")
//			.attr("y", 6)
//			.attr("dy", "-2em")
//			.attr("dx", "2em")
//			.style("text-anchor", "end")
//			.text("Born(%)");
//
//
//		// Add bar chart
//		bars = svg.selectAll("bar")
//			.data(data)
//			.enter();
//		bars.append("rect")
//			.attr("class", "bar3")
//			.attr("x", function (d) {
//				return x(d.Year) + x.rangeBand() / 3*2;
//			})
//			.attr("width", x.rangeBand() / 3)
//			.attr("y", function (d) {
//				return y1(d[city]);
//			})
//			.attr("height", function (d) {
//				return height - y1(d[city]);
//			});
//	});
	
}
