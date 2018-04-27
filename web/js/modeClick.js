function Mode(state) {
	switch(state) {
			
		case 1:
			State = 1;
//			alert(State)
			document.getElementById("map").classList.remove("notDisplay")
			document.getElementById("resultTable").classList.add("notDisplay")
			document.getElementById("disMode").classList.remove("unClickMode")
			document.getElementById("disMode").classList.add("clickMode")
			document.getElementById("btnGroupDrop1").classList.remove("clickMode")
			document.getElementById("btnGroupDrop1").classList.add("unClickMode")
			document.getElementById("btnGroupDrop1").innerHTML = "Test Module";
			document.getElementById("con").innerHTML = ""
			document.getElementById("resultText").innerHTML = ""
			document.getElementById("chart").innerHTML = " ";
			clearMap();
			break;
		case 2:
			
			if(currClick != null) {
				clicked(currData);
			}
			if(State == 2)
				break;
			State = 2;
//			alert(State);
			document.getElementById("map").classList.remove("notDisplay")
			document.getElementById("resultTable").classList.add("notDisplay")
			document.getElementById("disMode").classList.remove("clickMode")
			document.getElementById("disMode").classList.add("unClickMode")
			document.getElementById("btnGroupDrop1").classList.remove("unClickMode")
			document.getElementById("btnGroupDrop1").classList.add("clickMode")
			document.getElementById("btnGroupDrop1").innerHTML = "Hoeffding's City";
			document.getElementById("resultText").innerHTML = "再使用Hoeffding's檢定觀察個縣市18年來的資料，僅<strong>臺南市、高雄市、新竹縣、澎湖縣、新竹市</strong>的出生率跟平均薪資成相關(不獨立)，同時這些縣市的<strong>薪資與出生率皆呈現負相關</strong>。"
			document.getElementById("con").innerHTML = "Hoeffding's City"
			hoeffding_all();
			clearMap();
			hoeDrawMap();
			break;
		case 3:
			if(currClick != null) {
				clicked(currData);
			}
			if(State == 3)
				break;
			State = 3;
//			alert(State);
			document.getElementById("map").classList.add("notDisplay")
			document.getElementById("resultTable").classList.remove("notDisplay")
			document.getElementById("disMode").classList.remove("clickMode")
			document.getElementById("disMode").classList.add("unClickMode")
			document.getElementById("btnGroupDrop1").classList.remove("unClickMode")
			document.getElementById("btnGroupDrop1").classList.add("clickMode")
			document.getElementById("btnGroupDrop1").innerHTML = "Hoeffding's Year";
			document.getElementById("resultText").innerHTML = "使用Hoeffding's檢定，可以發現<strong>從2011年之後整體薪資與出生率皆呈現正相關</strong>。"
			document.getElementById("con").innerHTML = "Hoeffding's Year"
			hoeffding_five();
			hoeYearTable();
			break;
		case 4:
			if(currClick != null) {
				clicked(currData);
			}
			if(State == 4)
				break;
			State = 4;
//			alert(State);
			document.getElementById("map").classList.add("notDisplay")
			document.getElementById("resultTable").classList.remove("notDisplay")
			document.getElementById("disMode").classList.remove("clickMode")
			document.getElementById("disMode").classList.add("unClickMode")
			document.getElementById("btnGroupDrop1").classList.remove("unClickMode")
			document.getElementById("btnGroupDrop1").classList.add("clickMode")
			document.getElementById("btnGroupDrop1").innerHTML = "McNemar";
			document.getElementById("resultText").innerHTML = "若改變資料，看新資是否高於平均與出生率是否高於平均的關係，可以經由mcnemar檢定發現<strong>從2005年開始有顯著一致性</strong>。"
			document.getElementById("con").innerHTML = "McNemar"
			mcnemar();
			mcnemarTable();
			break;
		case 5:
			if(currClick != null) {
				clicked(currData);
			}
			if(State == 5)
				break;
			State = 5;
//			alert(State);
			document.getElementById("map").classList.remove("notDisplay")
			document.getElementById("resultTable").classList.add("notDisplay")
			document.getElementById("disMode").classList.remove("clickMode")
			document.getElementById("disMode").classList.add("unClickMode")
			document.getElementById("btnGroupDrop1").classList.remove("unClickMode")
			document.getElementById("btnGroupDrop1").classList.add("clickMode")
			document.getElementById("btnGroupDrop1").innerHTML = "Mann-Whitney U";
			document.getElementById("resultText").innerHTML = "將縣市區分為南北（如右圖），由無母數曼尼檢定可以知道，在出生率的部分，每一年皆呈現南北台灣的出生率一致，可見<strong>出生率不受是否為南北縣市所影響</strong>。"
			document.getElementById("con").innerHTML = "Mann-Whitney U"
			mann();
			clearMap();
			divideSN();
			break;
		case 6:
			if(State == 6)
				break;
//			alert(State);
			document.getElementById("disMode").classList.remove("clickMode")
			document.getElementById("disMode").classList.add("unClickMode")
			document.getElementById("btnGroupDrop1").classList.remove("unClickMode")
			document.getElementById("btnGroupDrop1").classList.add("clickMode")
			break;
	}
}