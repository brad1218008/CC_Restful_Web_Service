var saLine;
var boLine;
var deLine;


function drawLine() {
	d3.json("http://0.0.0.0:5000", function (error, data) {

		data.DataCollection.Data.forEach(function (d) {
			d.Year = d.Year;
			d.臺灣地區 = +d.臺灣地區;
		});

		// scale the range of the data
		x.domain(data.DataCollection.Data.map(function (d) {
			return d.Year;
		}));
		y0.domain([600000, 1600000]);

		var line1 = d3.svg.line()
			.x(function (d) {

				return x(d.Year) + x.rangeBand() / 2;
			})
			.y(function (d) {
				return y0(d.臺灣地區);
			});


		saLine = svg.append("path")
			.datum(data.DataCollection.Data)
			.attr("class", "line")
			.attr("d", line1);

	});
	d3.json("http://0.0.0.0:5000/people", function (error, data) {

		data.forEach(function (d) {
			d.Year = d.Year;
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

		boLine = svg.append("path")
			.datum(data)
			.attr("class", "line1")
			.attr("d", line2);
	});
//	d3.json("http://0.0.0.0:5000/nopeople", function (error, data) {
//
//		data.forEach(function (d) {
//			d.Year = d.Year;
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
//		deLine = svg.append("path")
//			.datum(data)
//			.attr("class", "line2")
//			.attr("d", line2);
//	});
}

function removeLine() {
	saLine.remove();
	boLine.remove();
//	deLine.remove();
}
