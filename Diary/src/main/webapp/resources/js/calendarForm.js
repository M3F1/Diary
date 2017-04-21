var dt = new Date(); // Date 객체
var today = new Date(); // 오늘 날짜 객체
var tooltiptext; // tooltiptext 배열
var process; // 선택된 icon의 절차 배열
var i = 0;

$(document).ready(function () {
	// 달력 출력
	$("#calendar").html(calendarHtml(dt));
	// 달력 아이디 바꿔주기
	$("#calendar").attr("id", today.getFullYear() + "-" + (today.getMonth() + 1));
	// 일자에 popover 설정하기
	makePopover();
//	for (var i = 0; i < 10; i++) {
//		console.log($("#" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + "> table > tbody > tr > td div").eq(0).html());
//	}
//	console.log($("#" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + "> table > tbody > tr > td div").eq(0).attr("id", "1"));
	
	eventActive();

	// 아무데나 클릭 시 header 숨기기
	$(".slider-area").on("click", hideHeader);

	// slider-down mouseenter 시 bounce 추가
	$(".slider-down").on("mouseenter", function () {
		$(".slider-down>i").removeClass().addClass("fa fa-angle-down bounce");
	});

	// slider-down mouseleave 시 bounce 제거
	$(".slider-down").on("mouseleave", function () {
		$(".slider-down>i").removeClass().addClass("fa fa-angle-down");
	});
	
	// sliderButton 활성화
	$("a[data-slide=prev]").on("click", function () {
		lastMonth();
		dateInitialize();
	});

	$("a[data-slide=next]").on("click", function () {
		nextMonth();
		dateInitialize();
	});
});

function eventActive() {
	// 스케쥴 입력창 focus
	$(".write").on("focus", function () {
		$(".tooltiptext").css("visibility", "visible");
		$(".tooltiptext").css("opacity", "1");
	});

	// 스케쥴 입력창 blur
	 $(".write").on("blur", function () {
	 	$(".tooltiptext").css("visibility", "hidden");
	 	$(".tooltiptext").css("opacity", "0");
	 });

	// 스케쥴 입력창 enter key 동작하게 하기
	$(".write").on("keydown", function (e) {
		if (e.keyCode == 13 || e.which == 13) {
			if ($(".active .write").val() == "") {
				alert("내용을 입력하세요");
			} else {
				inputText();
			}
		}
	});

	// 영화 목록 가져오기
	movieList();

	// iconList 버튼 활성화
	for (var index = 2; index < 6; index++) {
		$(".iconList > a:nth-child(" + index + ")").on("click", function () {
			showTextBlock();
		});
	}
}

/** ************************** Header 보이기/숨기기 *************************** */
function showHeader() {
	$("#calHeader").css("top", "0px");
}

function hideHeader() {
	$("#calHeader").css("top", "-88px");
}

/** ************************ textBlock() 보이기/숨기기 ************************* */
function showTextBlock() {
	$(".iconList").css("display", "none");
	$(".textBlock").css("display", "block");
	$(".write").focus();
}

function hideTextBlock() {
	$(".iconList").css("display", "block");
	$(".textBlock").css("display", "none");
}

/** ******************** textBlock() 밑에 입력한 값 추가하기 ********************* */
function inputText() {
//	var html = "<input type='text' value='" + $(".write").val() +
//		"' size='" + $(".write").val().length + "'>" + "&nbsp;";
	var html = $(".write").val() + "&nbsp;/&nbsp;";
	$(".written").html($(".written").html() + html);

	$(".write").val("");

	if (process.length == ++i) {
		i = 0;
		$(".written").html("");
		hideTextBlock();
	} else {
		$(".tooltiptext").html(tooltiptext[i]);
		process[i]();
	}
}

/** ******************************** 영화 목록 ********************************* */
function movieList() {
	var html = "<a href='#'>영화1</a>";

	/* 영화 목록 받는 부분 */

	// 영화 목록 띄우는 popover 설정
	$(".iconList > a:nth-child(1)").attr("data-toggle", "popover");
	$(".iconList > a:nth-child(1)").attr("title", "영화 목록");
	$(".iconList > a:nth-child(1)").attr("data-content", html);
	$(".iconList > a:nth-child(1)").attr("data-html", "true");
	$(".iconList > a:nth-child(1)").attr("data-placement", "right");
	$(".iconList > a:nth-child(1)").popover();
}

/** ******************************** 영화 예매 ********************************* */
function movie() {
	tooltiptext = ["영화관은?", "시간은?", "몇 명?"];

	// 영화 선택 후 처리 부분
	console.log("movie selected.");

	// 영화관 선택 후 처리 부분
	var movieTime = function () {
		console.log("movieTheater selected.");
	}

	// 영화 시간 선택 후 처리 부분
	var moviePerson = function () {
		console.log("movieTime selected.");
	}

	var movieFinish = function () {
		console.log("moviePerson selected.");
	}

	process = ["", movieTime, moviePerson, movieFinish];
}


/** ******************************** 버스 예매 ********************************* */
function bus() {
	tooltiptext = ["출발지는?", "도착지는?", "시간은?", "몇 명?"];
	$(".tooltiptext").html(tooltiptext[i]);

	// 버스 출발지 선택 시 처리 부분
	console.log("busDepart");

	// 버스 출발지 선택 후 처리 부분
	var busDest = function () {
		console.log("busDepart selected.");
	}

	// 버스 도착지 선택 후 처리 부분
	var busTime = function () {
		console.log("busDest selected.");
	}

	// 버스 시간 선택 후 처리 부분
	var busPerson = function () {
		console.log("busTime selected.");
	}

	var busFinish = function () {
		console.log("busPerson selected.");
	}

	process = ["", busDest, busTime, busPerson, busFinish];
}

/** ******************************** 기차 예매 ********************************* */
function train() {
	tooltiptext = ["출발지는?", "도착지는?", "시간은?", "몇 명?"];
	$(".tooltiptext").html(tooltiptext[i]);

	// 기차 출발지 선택 시 처리 부분
	console.log("trainDepart");

	// 기차 도착지 선택 시 처리 부분
	var trainDest = function () {
		console.log("trainDepart selected.");
	}

	// 기차 시간 선택 시 처리 부분
	var trainTime = function () {
		console.log("trainDest selected.");
	}

	// 기차 인원 선택 시 처리 부분
	var trainPerson = function () {
		console.log("trainTime selected.");
	}

	var trainFinish = function () {
		console.log("trainPerson selected.");
	}

	process = ["", trainDest, trainTime, trainPerson, trainFinish];
}

/** ******************************** 직접 작성 ********************************* */
function write() {
	tooltiptext = ["일정을 입력하세요"];
	$(".tooltiptext").html(tooltiptext[i]);

	// 직접 일정 입력 시 처리 부분
	var scheduleWrite = function () {
		alert("written");
	}

	process = [scheduleWrite];
}

/** ******************************** 일정 검색 ********************************* */
function search() {
	tooltiptext = ["검색할 일정을 입력하세요"];
	$(".tooltiptext").html(tooltiptext[i]);

	// 일정 검색 시 처리 부분
	var scheduleSearch = function () {
		alert("searched");
	}

	process = [scheduleSearch];
}

/** ******************************* 달력 부분 ******************************** */

function dateInitialize() {
	i = 0;
	$(".table > tbody > tr > td").css("outline", "");
	$(".iconList").css("display", "none");
	$(".textBlock").css("display", "none");
}

// 지난달
function lastMonth() {
	var tempYear = dt.getFullYear();
	var tempMonth = dt.getMonth();

	dt.setMonth(dt.getMonth() - 1);
	var html = $(".item:first-child").html();
	
	// div id 연도 바꾸기
	html = html.replace('<div id="' + tempYear + '-' + (tempMonth + 1) + '"', '<div id="'
			+ dt.getFullYear() + "-" + (dt.getMonth() + 1) + '"');

	// table 부분 지난달로 바꾸기
	html = html.replace(html.slice(html.search("<table"), html.search("</table>") + 8), calendarHtml(dt));

	// 년 바꾸기
	html = html.replace('<span id="' + tempYear + '">' + tempYear + '</span>',
		'<span id="' + dt.getFullYear() + '">' + dt.getFullYear() + '</span>');

	// 월 바꾸기
	html = html.replace('<span id="' + padDigits((tempMonth + 1), 2) + '">' + padDigits((tempMonth + 1), 2) + '</span>',
		'<span id="' + padDigits((dt.getMonth() + 1), 2) + '">' + padDigits((dt.getMonth() + 1), 2) + '</span>');

	html = "<div class='item'>" + html + "</div>";

	// 현재 item에서 앞에 item이 존재하지 않는 경우
	if ($(".item.active").index(".item") == 0) {
		$(".item:first-child").before(html);
		makePopover();

		eventActive();
	}

	// 현재 item이 세 개인 경우 한 개 삭제
	if ($(".item").length == 3) {
		$(".item:last-child").remove();
	}
	
	$(".item>div:last-child>div:last-child").removeClass().addClass("animated fadeInLeftBig");
}

// 다음달
function nextMonth() {
	var tempYear = dt.getFullYear();
	var tempMonth = dt.getMonth();

	dt.setMonth(dt.getMonth() + 1);
	var html = $(".item:last-child").html();
	
	// div id 연도 바꾸기
	html = html.replace('<div id="' + tempYear + '-' + (tempMonth + 1) + '"', '<div id="'
			+ dt.getFullYear() + "-" + (dt.getMonth() + 1) + '"');

	// table 부분 다음달로 바꾸기
	html = html.replace(html.slice(html.search("<table"), html.search("</table>") + 8), calendarHtml(dt));

	// 년 바꾸기
	html = html.replace('<span id="' + tempYear + '">' + tempYear + '</span>',
		'<span id="' + dt.getFullYear() + '">' + dt.getFullYear() + '</span>');

	// // 월 바꾸기
	html = html.replace('<span id="' + padDigits((tempMonth + 1), 2) + '">' + padDigits((tempMonth + 1), 2) + '</span>',
		'<span id="' + padDigits((dt.getMonth() + 1), 2) + '">' + padDigits((dt.getMonth() + 1), 2) + '</span>');

	html = "<div class='item'>" + html + "</div>";

	// 현재 item에서 앞에 item이 존재하지 않는 경우
	if ($(".item.active").index(".item") == $(".item").length - 1) {
		$(".item:last-child").after(html);
		makePopover();

		eventActive();
	}

	// 현재 item이 세 개인 경우 한 개 삭제
	if ($(".item").length == 3) {
		$(".item:first-child").remove();
	}
	
	$(".item>div:last-child>div:last-child").removeClass().addClass("animated fadeInRightBig");
}

function padDigits(number, digits) {
	return Array(Math.max(digits - String(number).length + 1, 0)).join(0) +
		number;
}

function calendarHtml(date) {
	$("#year").attr("id", date.getFullYear());
	$("#month").attr("id", padDigits((date.getMonth() + 1), 2));
	$("#" + date.getFullYear()).html(date.getFullYear());
	$("#" + padDigits((date.getMonth() + 1), 2)).html(padDigits((date.getMonth() + 1), 2));

	var html = "<table class='table borderless'>";
	html += "<tr class='text-center'>";
	html += "<td>일</td><td>월</td><td>화</td><td>수</td><td>목</td><td>금</td><td>토</td>";
	html += "</tr>";

	// 우선은 오늘 날짜 기준으로 설정
	// 매개변수로 받을 예정
	// var date = new Date(date);
	var temp = date.getMonth();

	// 날짜를 현재 달의 1일로 설정
	var cnt = 1;
	date.setDate(cnt);

	html += "<tr>";
	for (var i = 0; i < date.getDay(); i++) {
		html += "<td></td>";
	}

	while (date.getMonth() == temp) {
		// 각 칸에 날짜 정보 저장
		var dateForm = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +
			date.getDate();
		html += "<td id='" + dateForm + "' onclick=selectedDate('" + dateForm +
			"')>" + "<a href='#'><div style='height: 100%; width: 100%'>" +
			date.getDate() + "</div></a></td>";

		if (date.getDay() == 6) {
			html += "</tr><tr>";
		}
		date.setDate(++cnt);
	}

	if (date.getDay() != 0) {
		for (var i = 6 - date.getDay(); i >= 0; i--) {
			html += "<td></td>";
		}
	}

	html += "</tr>";

	html += "</table>";

	date.setMonth(date.getMonth() - 1);
	console.log(date);

	return html;
}

// 날짜 선택
function selectedDate(date) {
	$(".table > tbody > tr > td").css("outline", "");
	$("#" + date).css("outline", "steelblue solid 2px");
	$(".iconList").addClass("animated fadeInDown");
	$(".iconList").css("display", "block");
}

function makePopover() {
	for (var i = 0; i < $("#" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + " > table > tbody > tr > td div").length; i++) {
		var p = $("#" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + "> table > tbody > tr > td div").eq(i);
		p.attr("data-toggle", "popover");
		p.attr("title", dt.getFullYear() + "년 " + (dt.getMonth() + 1) + "월 " + p.html() + "일 일정");
		
		/* 일정 가져오는 부분 */
		p.attr("data-content", "오늘의 일정");
		
		p.attr("data-html", "true");
		p.attr("data-placement", "top");
		p.attr("data-trigger", "manual");
		p.popover().on("mouseenter", function() {
			var _this = this;
			$(this).popover("show");
			$(this).siblings(".popover").on("mouseleave", function() {
				$(_this).popover("hide");
			});
		}).on("mouseleave", function() {
			var _this = this;
			setTimeout(function() {
				if (!$(".popover:hover").length) {
					$(_this).popover("hide");
				}
			}, 10);
		});
		
		// hover 시 날짜 숫자색 변경
		p.on("hover", function() {
			p.css("color", "red");
		});
		
		// 일정 있는 날 동그라미 그리는 부분
		if (i % 7 == 3) {
			markCircle(p);
		}
		
		
	}
	
	markToday();
}

function markToday() {
	$("#" + today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()).css("color", "yellow");
}

function markCircle(p) {
	p.css("border-radius", "50%");
	p.css("background", "steelblue");
	p.css("width", "40%");
	p.css("margin", "auto");
}
