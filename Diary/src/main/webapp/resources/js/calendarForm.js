var dt = new Date(); // Date 객체
var today = new Date(); // 오늘 날짜 객체
var q = [ "몇시?", "어디서?", "어떻게?" ]; // 입력창 질문
var i = 0;
var text = "";

$(document).ready(function() {
	calendarView(dt);
	$("#tooltiptext").html(q[i]);

	// 스케쥴 입력창 focus
	$("#write").on("focus", function() {
		$("#tooltiptext").css("visibility", "visible");
		$("#tooltiptext").css("opacity", "1");
	});

	// 스케쥴 입력창 blur
	$("#write").on("blur", function() {
		$("#tooltiptext").css("visibility", "hidden");
		$("#tooltiptext").css("opacity", "0");
	});

	// 스케쥴 입력창 enter key 동작하게 하기
	$("#write").on("keydown", function(e) {
		if (e.keyCode == 13 || e.which == 13) {
			inputSchedule();
		}
	});

	// 아무데나 클릭 시 header 숨기기
	$(".slider-area").on("click", hideHeader);

	// slider-down mouseenter 시 bounce 추가
	$(".slider-down").on("mouseenter", function() {
		$(".slider-down>i").removeClass().addClass("fa fa-angle-down bounce");
	});

	// slider-down mouseleave 시 bounce 제거
	$(".slider-down").on("mouseleave", function() {
		$(".slider-down>i").removeClass().addClass("fa fa-angle-down");
	});

	// 달력 이동 효과
	// $("#lastMonth").on("click", function () {
	// $("#calendar").hide();
	// });

	// $("#lastMonth").on("click", function () {
	// $("#calendar").animate({

	// }, 100);
	// });

	/** ******* 검색 부분 ******** */
	// 연도 hover 활성화
	// yearSearch();
	// 월 hover 활성화
	// monthSearch();
	// 스케쥴 검색 버튼 활성화
	// scheduleSearch();
});

/** ************************** Header 보이기/숨기기 *************************** */
function showHeader() {
	$("#calHeader").css("top", "0px");
}

function hideHeader() {
	$("#calHeader").css("top", "-88px");
}

/** **************************** 스케쥴 입력 부분 ***************************** */
// 영화 목록 보여주는 function
function movieList() {

	$("#iconList > a:nth-child(1) > i").attr("data-toggle", "popover");
	$("#iconList > a:nth-child(1) > i").attr("title", "영화 목록");
	$("#iconList > a:nth-child(1) > i").attr("data-content", "영화1");
	$("#iconList > a:nth-child(1) > i").attr("data-html", "true");
	$("#iconList > a:nth-child(1) > i").attr("data-placement", "right");

	$("[data-toggle='popover']").popover();
}

// Schedule 입력 처리 부분(단어 블록 단위로 만들기 해결 X)
function inputSchedule(icon) {
	if (icon == "직접 작성") {
		$("#tooltiptext").html("다이어리에 들어갈 내용을 작성하세요");
		$("#iconList").css("display", "none");
		$("#tooltip").css("display", "block");
		$("#write").focus();
		i = 2;
	} else {
		i == 2 ? i = 0 : i++;
		// i == 0 ? iconList() : iconSelect();
		if (i == 0) {
			$("#iconList").css("display", "block");
			$("#tooltip").css("display", "none");
		} else {
			$("#iconList").css("display", "none");
			$("#tooltip").css("display", "block");
			$("#write").focus();
		}

		if (i == 1) {
			text = "";
			text += icon;
		} else {
			$("#tooltiptext").html(q[i]);
			text += "<input type='text' class='clearable' value='"
					+ $("#write").val() + "' /> ";
			// 삭제 아이콘
			// text += "<i class='glyphicon glyphicon-remove'></i>";
			// text += $("#write").val();
		}
		$("#written").html(text);

		// $("#written > input[type=text]").css("width", $(this).val().length);
		for (var index = 0; index < i - 1; index++) {
			var select = "#written > input[type=text]:nth-child(" + (index + 1)
					+ ")";
			$(select).css("width", "10%");
			$(select).attr("size", $(select).val().length + 3);
		}
		// alert($("#written > input[type=text]:nth-child(2)").val().length);
		$("#write").val("");
	}
}

/** ******************************* 달력 부분 ******************************** */
// 이전달을 보여주는 function
function lastMonth() {
	dt.setMonth(dt.getMonth() - 2);
	calendarView(dt);
}

// 다음달을 보여주는 function
function nextMonth() {
	dt.setMonth(dt.getMonth());
	calendarView(dt);
}

// ##format으로 맞춰주는 function
function padDigits(number, digits) {
	return Array(Math.max(digits - String(number).length + 1, 0)).join(0)
			+ number;
}

function calendarView(dt) {
	// h2부분에 연도랑 월 넣기
	$("#yearSearch").html(dt.getFullYear());
	$("#monthSearch").html(padDigits((dt.getMonth() + 1), 2));

	var html = "<table class='table borderless'>";
	html += "<tr class='text-center'>";
	html += "<td>일</td><td>월</td><td>화</td><td>수</td><td>목</td><td>금</td><td>토</td>";
	html += "</tr>";

	// 우선은 오늘 날짜 기준으로 설정
	// 매개변수로 받을 예정
	// var dt = new Date(date);
	var temp = dt.getMonth();

	// 날짜를 현재 달의 1일로 설정
	var cnt = 1;
	dt.setDate(cnt);

	/* 첫 번째 방법 */
	// for (var i = 0; i < 5; i++) {
	// html += "<tr>";
	// // 첫 번째날로 설정
	// if (i == 0) {
	// for (var j = 0; j < dt.getDay(); j++) {
	// html += "<td></td>";
	// }
	// for (var j = dt.getDay(); j < 7; j++) {
	// html += "<td>" + cnt++ + "</td>";
	// }
	// } else {
	// for (var j = 0; j < 7; j++) {
	// html += "<td>" + cnt++ + "</td>";
	// }
	// }
	// html += "</tr>";
	// }
	/* 두 번째 방법 */
	html += "<tr>";
	for (var i = 0; i < dt.getDay(); i++) {
		html += "<td></td>";
	}

	while (dt.getMonth() == temp) {
		// 각 칸에 날짜 정보 저장
		var dateForm = (dt.getMonth() + 1) + "-" + dt.getDate() + "-"
				+ dt.getFullYear();
		html += "<td id='" + dateForm + "' onclick=selectedDate('" + dateForm
				+ "')>" + "<a href='#'><div style='height: 100%; width: 100%'>"
				+ dt.getDate() + "</div></a></td>";

		if (dt.getDay() == 6) {
			html += "</tr><tr>";
		}
		dt.setDate(++cnt);
	}

	if (dt.getDay() != 0) {
		for (var i = 6 - dt.getDay(); i >= 0; i--) {
			html += "<td></td>";
		}
	}

	html += "</tr>";

	html += "</table>";
	$("#calendar").html(html);

	// 토요일은 파란색, 일요일은 숫자를 빨간색으로 표시
	// $("#calendar > table > tbody > tr > td:nth-child(1)").css("color",
	// "gray");
	// $("#calendar > table > tbody > tr > td:nth-child(7)").css("color",
	// "gray");
	$("#calendar > table > tbody > tr > td").css("color", "white");

	// 오늘 날짜는 배경색을 노란색으로 표시
	$(
			"#" + (today.getMonth() + 1) + "-" + today.getDate() + "-"
					+ today.getFullYear()).css("background-color", "chocolate");
}

// 날짜 클릭 시 테두리로 표시하는 function
function selectedDate(dt) {
	$("#calendar > table > tbody > tr > td").css("outline", "");
	$("#" + dt).css("outline", "steelblue solid 2px");
	$("#iconList").addClass("animated fadeInDown");
	$("#iconList").css("display", "block");
}

/** ***************************** 날짜 이동 부분 ****************************** */
/*
 * function yearSearch() { $("#yearSearch").on("mouseenter", function () {
 * $("#yearSearch").css("font-size", "90%");
 * 
 * var html = ""; var year = $("#yearSearch").html(); html += "<select
 * id='year'>"; for (var index = 2000; index < year; index++) { html += "<option>" +
 * index + "</option>";
 *  } html += "<option selected='selected'>" + year + "</option>"; for (var
 * index = parseInt(year) + 1; index < 2051; index++) { html += "<option>" +
 * index + "</option>"; } html += "</select>"; $("#yearSearch").html(html);
 *  // $("#year").off().on("change", function () { // alert($("#yearSearch >
 * select > option:selected").html()); // calendarView(new
 * Date(parseInt($("#monthSearch").html()) + // "-1-" + $("#year >
 * option:selected").html())); // yearSearch(); // }); });
 * 
 * $("#yearSearch").on("mouseleave", function () {
 * $("#yearSearch").css("font-size", "100%"); var year = $("#yearSearch > select >
 * option:selected").html(); $("#yearSearch").html(year); }); }
 */

/*
 * function monthSearch() { $("#monthSearch").on("mouseenter", function () {
 * $("#monthSearch").css("font-size", "90%");
 * 
 * var html = ""; var month = $("#monthSearch").html(); html += "<select
 * id='month'>"; for (var index = 1; index < parseInt(month); index++) { html += "<option>" +
 * padDigits(index, 2) + "</option>"; } html += "<option selected='selected'>" +
 * month + "</option>"; for (var index = parseInt(month) + 1; index < 13;
 * index++) { html += "<option>" + padDigits(index, 2) + "</option>"; } html += "</select>";
 * $("#monthSearch").html(html);
 *  // $("#month").off().on("change", function () { // alert($("#month >
 * option:selected").html()); // calendarView(new Date(parseInt($("#month >
 * option:selected").html()) + // "-1-" + $("#yearSearch").html())); //
 * monthSearch(); // }); });
 * 
 * $("#monthSearch").on("mouseleave", function () {
 * $("#monthSearch").css("font-size", "100%"); var month = $("#monthSearch >
 * select > option:selected").html(); $("#monthSearch").html(month); }); }
 */

/** ******************************* 검색 부분 ******************************** */
function scheduleSearch() {

}