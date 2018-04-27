function hoeYearTable(){
	
	d3.json("http://0.0.0.0:5000/hoeffding2", function (error, data) {
		var tabletText = '';
		tabletText += "<table class=\"table table-hover\"><tbody><tr>";
		for (key in data[0]) {
			tabletText += '<td>' + key + '</td>';
		}
		tabletText += "</tr>";
		for (var i = 0; i < data.length; i++) {
			if(Number(data[i].p_value) < 0.05)
				tabletText += '<tr style="color:red">';
			else
				tabletText += '<tr>';
			for (key in data[i]) {
			tabletText += '<td>' + data[i][key] + '</td>';
		  }
			tabletText += '</tr>';
		}
		tabletText += "</tbody></table>";
		document.getElementById("resultTable").innerHTML = tabletText;
	});
	
}

function mcnemarTable(){
	d3.json("http://0.0.0.0:5000/mcnemar", function (error, data) {
		var tabletText = '';
		tabletText += "<table class=\"table table-hover\"><tbody><tr>";
		for (key in data[0]) {
			tabletText += '<td>' + key + '</td>';
		}
		tabletText += "</tr>";
		for (var i = 0; i < data.length; i++) {
			if(Number(data[i].p_value) > 0.05)
				tabletText += '<tr style="color:red">';
			else
				tabletText += '<tr>';
			for (key in data[i]) {
			tabletText += '<td>' + data[i][key] + '</td>';
		  }
			tabletText += '</tr>';
		}
		tabletText += "</tbody></table>";
		document.getElementById("resultTable").innerHTML = tabletText;
	});
	
}