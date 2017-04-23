var dt = new Date(); // Date 객체
var today = new Date(); // 오늘 날짜 객체
var tooltiptext; // tooltiptext 배열
var process; // 선택된 icon의 절차 배열
var i = 0;
var writeInput="";
var movieflag = 0;
var dateNow="";
var start="";
var dest="";
var map = new Map();
var busGrade;
var full_seat = 0;
var check_seat = 0;
var seatList = new Array();
var flag = 0;
var busReserveInfo;
var starttime;
var selectBusInfo="";
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
function inputText(param) {
//	var html = "<input type='text' value='" + $(".write").val() +
//		"' size='" + $(".write").val().length + "'>" + "&nbsp;";
	
	if(param!=null){
		var html = param + "&nbsp;/&nbsp;";
	}else{
		var html = $(".write").val() + "&nbsp;/&nbsp;";
	}
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
	var html = "";

	/* 영화 목록 받는 부분 */
	$.ajax({
		type : "get",
		url : "getmovie",
		data : {	
		},
		success : function(data){
			html += '<form>';
			html += '<select multiple id="movieselect">';
			 $.each(data,function(i,item){
	             html+='<option>'+item+'</option>';
	           });
			 html+='</select>';
			 html+='<input type="button" class="form-control" value="선택" onclick="setmovie()">';
			 html+='</form>';
			 $(".iconList > a:nth-child(1) > i").attr("data-toggle", "popover");
			 $(".iconList > a:nth-child(1) > i").attr("title", "영화 목록");
			 $(".iconList > a:nth-child(1) > i").attr("data-content", html);
			 $(".iconList > a:nth-child(1) > i").attr("data-html", "true");
			 $(".iconList > a:nth-child(1) > i").attr("data-placement", "bottom");
			 $(".iconList > a:nth-child(1) > i").popover();
		},
		error : function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
}

/** ******************************** 영화 예매 ********************************* */
function movie() {
	tooltiptext = ["", "영화관은?", "시간은?", "몇 명?"];
	// 영화 선택 후 처리 부분
	var movieTheater = function(){
		$(".write").on("keydown",function(){
			$(".write").popover("hide");
		});
		$(".write").on("keyup",function(){
			console.log("inin");
			var cgv = "CGV";
		   	var mega = "메가박스";
		   	var lotcine = "롯데시네마";
		   	var html="";
		    $.ajax({
		        url : "movielocationList",
		        type : "post",
		        dataType : "json",
		        data : {
		           query : $(".write").val()
		        },
		        success : function(json) {
		           html += '<form>';
		    	   html += '<select multiple id="movieAreaSelect">';
		           $.each(json.items,function(i,item){
		              if(item.title.indexOf(cgv)!=-1 || item.title.indexOf(mega)!=-1 || item.title.indexOf(lotcine)!=-1){
		            	  if(item=='blank'){
		            		  movieflag=1;
		            		  return false;
		            	  }
		            	  html+='<option>'+item.title+'</option>';
		            	 if(i>=2)  return false;
		              }
		           }); //each
		           html+='</select>';
		           html +='<input type="button" class="form-control" value="선택" onclick="settheater()">';
		           html+='</form>';
		           if(movieflag!=1){
				    	$(".write").attr("data-toggle", "popover");
				     	$(".write").attr("title", "영화관 목록");
				     	$(".write").attr("data-content", html);
				     	$(".write").attr("data-html", "true");
				     	$(".write").attr("data-placement", "bottom");
				     	$(".write").popover("show");
		           }
		        },
		        error : function(err) {
		          // alert("에러");
		        }
		     });//ajax
		});//on. keyup
	};

	// 영화관 선택 후 처리 부분
	var movieTime = function () {
		var html="";
		$.ajax({
			type : "get",
			url : "gettime",
			data : {
			},
			success : function(data){
				 html += '<form>';
			     html += '<select multiple id="movieTimeSelect">';
			     $.each(data,function(i,item){
			            html+='<option>'+item+'</option>';
			      }); //each
			       html+='</select>';
			       html +='<input type="button" class="form-control" value="선택" onclick="settime()">';
			       html+='</form>';
			       if(movieflag!=1){
					 $(".write").attr("data-toggle", "popover");
					 $(".write").attr("title", "영화 시간");
					 $(".write").attr("data-content", html);
					 $(".write").attr("data-html", "true");
					 $(".write").attr("data-placement", "bottom");
					 $(".write").popover("show");
			       }	
			},
			error : function(request,status,error){
				console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
			}
		});
	}

	// 영화 시간 선택 후 처리 부분
	var moviePerson = function () {
		var html="";
		html += '<form>';
		html += '<select multiple id="movieCountSelect">';
		for(var i=1;i<9;i++){
			html+="<option>"+i+"</option>"
		}
		html +='</select>';
		html +='<input type="button" class="form-control" value="선택" onclick="getseat()">';
		html +='</form>';
		$(".write").attr("data-toggle", "popover");
		$(".write").attr("title", "인원");
		$(".write").attr("data-content", html);
		$(".write").attr("data-html", "true");
		$(".write").attr("data-placement", "bottom");
		$(".write").popover("show");
	}

	var movieFinish = function () {
		console.log("moviePerson selected.");
	}

	process = ["", movieTheater, movieTime, moviePerson, movieFinish];
}


/** ******************************** 버스 예매 ********************************* */
function bus() {
	map = new Map();
	tooltiptext = ["출발지는?", "도착지는?", "시간은?", "몇 명?"];
	$(".tooltiptext").html(tooltiptext[i]);
	// 버스 출발지 선택 시 처리 부분
	$(".write").on("keydown",function(){
		$(".write").popover("hide");
	});
		$(".write").on("keyup",function(){
		var html="";
		
		 $.ajax({
	           url : "terminalCode",
	           type : "post",
	           dataType : "json",
	           data : {
	              query : $(".write").val()
	           },
	           success : function(json) {
	           	html += '<form>';
	           	html += '<select multiple id="busStartSelect">';
	         	if(json.response.body.items.item!=null)
	           	if(Object.keys(json.response.body.items.item).length>2){
	           		$.each(json.response.body.items.item,function(i,item){
	           			if(item=='blank'){
	           				movieflag=1;
		            		  return false;
		            	  }
	           			map.put(item.terminalNm,item.terminalId);
	           			html+="<option>"+item.terminalNm+"</option>"
			         });            	
	           	}else{
	           		$.each(json.response.body.items,function(i,item){
	           			if(item=='blank'){
	           				movieflag=1;
		            		  return false;
		            	  }
	           			map.put(item.terminalNm,item.terminalId);
	           			html+="<option>"+item.terminalNm+"</option>"
			         });    
	           	}
	           	html +='</select>';
	           	html +='<input type="button" class="form-control" value="선택" onclick="selectBusArea()">';
	    		html +='</form>';
	    		if(movieflag!=1){
	    			$(".write").attr("data-toggle", "popover");
	    			$(".write").attr("title", "터미널 목록");
	    			$(".write").attr("data-content", html);
	    			$(".write").attr("data-html", "true");
	    			$(".write").attr("data-placement", "bottom");
	    			$(".write").popover("show");  
	    		}
	           },
	           error : function(err) {
	              //alert("에러");
	           }
	        });
		});

	// 버스 출발지 선택 후 처리 부분
	var busDest = function () {
		$(".write").on("keydown",function(){
			$(".write").popover("hide");
		});
			$(".write").on("keyup",function(){
			var html="";
			var input = $(".write").val();
			 $.ajax({
		           url : "terminalCode",
		           type : "post",
		           dataType : "json",
		           data : {
		              query : input
		           },
		           success : function(json) {
		           	html += '<form>';
		           	html += '<select multiple id="busDestSelect">';
		           	if(json.response.body.items.item!=null)
		           	if(Object.keys(json.response.body.items.item).length>2){
		           		$.each(json.response.body.items.item,function(i,item){
		           			if(item=='blank'){
		           				movieflag=1;
			            		  return false;
			            	  }
		           			map.put(item.terminalNm,item.terminalId);
		           			html+="<option>"+item.terminalNm+"</option>"
				         });            	
		           	}else{
		           		$.each(json.response.body.items,function(i,item){
		           			if(item=='blank'){
		           				movieflag=1;
			            		  return false;
			            	  }
		           			map.put(item.terminalNm,item.terminalId);
		           			html+="<option>"+item.terminalNm+"</option>"
				         });    
		           	}
		           	html +='</select>';
		           	html +='<input type="button" class="form-control" value="선택" onclick="selectBusArea2()">';
		    		html +='</form>';
		    		if(movieflag!=1){
		    			$(".write").attr("data-toggle", "popover");
		    			$(".write").attr("title", "터미널 목록");
		    			$(".write").attr("data-content", html);
		    			$(".write").attr("data-html", "true");
		    			$(".write").attr("data-placement", "bottom");
		    			$(".write").popover("show");  
		    		}
		           },
		           error : function(err) {
		              //alert("에러");
		           }
		        });
			});
	}

	// 버스 도착지 선택 후 처리 부분
	var busTime = function () {
		var html="";
		console.log(map.get(start));
		console.log(map.get(dest));
		$.ajax({
            url : "busInfo ",
            type : "post",
            dataType : "json",
            data : {
               depart : map.get(start),
               arrive : map.get(dest),
//               depart : "NAEK010",
//               arrive : "NAEK320",
               date : dateNow
            },
            success : function(json) {
            	html += '<table border="0">';
            	html+='<strong>출발일시</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>도착일시</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>출발터미널</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>도착터미널</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>버스등급</strong>';
            	html +='</table>';	
            	if(json.response.body.items.item==null){
            		alert("검색결과 없음");
            	}else{
            	 $.each(json.response.body.items.item,function(i,item){
            		 
            		 busGrade = item.gradeNm;
            		 if(i%2==0){
	            		 html+= "<span id='span"+i+"'><a href='javascript:selectBus("+i+','+item.depPlandTime+','+item.arrPlandTime+")' id='a"+i+"'><h4>"+item.depPlandTime.toString().substring(4,6)+"/"+item.depPlandTime.toString().substring(6,8)+" "+
	            		 item.depPlandTime.toString().substring(8,10)+":"+item.depPlandTime.toString().substring(10,12)+" "+
	            		 item.arrPlandTime.toString().substring(8,10)+":"+item.arrPlandTime.toString().substring(10,12)+" "+
	//            		 item.depPlaceNm.substring(0,3)+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+item.arrPlaceNm.substring(0,3)+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+item.gradeNm+"</h4></a></span><br>";
	            		 item.depPlaceNm+" "+item.arrPlaceNm+" "+item.gradeNm+" "+item.charge+"원"+"</h4></a></span><br>";
            		 }
	               });    //each
            	 	$("#busInformation").html(html);
 					$('div#busInfoModal').modal();
            	}//if else
//            	html +='<div class="form-group">';
//				html +='<input type="button" class="form-control" onclick="return selectBus();" value="선택">'
//				html +='</div>';
            },
            error : function(err) {
              // alert("에러");
            }
         });
	}

	// 버스 시간 선택 후 처리 부분
	var busPerson = function () {
		var html="";
		html += '<form>';
		html += '<select multiple id="busCountSelect">';
		for(var i=1;i<9;i++){
			html+="<option>"+i+"</option>"
		}
		html +='</select>';
		html +='<input type="button" class="form-control" value="선택" onclick="showBusSeat()">';
		html +='</form>';
		$(".write").attr("data-toggle", "popover");
		$(".write").attr("title", "인원");
		$(".write").attr("data-content", html);
		$(".write").attr("data-html", "true");
		$(".write").attr("data-placement", "bottom");
		$(".write").popover("show");
	}

	var busFinish = function () {
		console.log("busPerson selected.");
	}

	process = ["", busDest, busTime, busPerson, busFinish];
}

/** ******************************** 기차 예매 ********************************* */
function train() {
	var placeholderArray = ["영등포", "부산","",""];
	tooltiptext = ["출발지는?", "도착지는?", "몇 명?", "출발 시간은?" ];
	$(".write").attr("placeholder", placeholderArray[i]);
	$(".tooltiptext").html(tooltiptext[i]);
	
	//기차 출발지 선택 시 처리 부분
	trainAreaSelect('trainStartSelect');
	
	
	// 기차 도착지 선택 시 처리 부분
	var trainDest = function () {
		trainAreaSelect('trainDestSelect');
	}
	
	// 기차 인원 선택 시 처리 부분
	var trainPerson = function () {
		var html="";
		html += '<form>';
		html += '<select multiple id="trainCountSelect">';
		for(var i=1;i<9;i++){
			html+="<option>"+i+"</option>"
		}
		html +='</select>';
		html +='<input type="button" class="form-control" value="선택" onclick="showTrainTime()">';
		html +='</form>';
		$(".write").attr("data-toggle", "popover");
		$(".write").attr("title", "인원");
		$(".write").attr("data-content", html);
		$(".write").attr("data-html", "true");
		$(".write").attr("data-placement", "bottom");
		$(".write").popover("show");
	}
	
	// 기차 시간 선택 시 처리 부분
	var trainTime = function () {
		var html="";
		html += '<form>';
		html += '<select multiple id="trainTimeSelect">';
		var j=0;
		for(var i=0;i<24;i++){
			if(i<10){
				html+='<option value="0'+i+'">'+i+'(오전0'+i+')</option>';
			}else if(i<12){
				html+='<option value="'+i+'">'+i+'(오전'+i+')</option>';
			}else if(i>11){
				html+='<option value="'+i+'">'+i+'(오후0'+(j++)+')</option>';
			}
		}
		html +='</select>';
		html +='<input type="button" class="form-control" value="선택" onclick="showTimeModal()">';
		html +='</form>';
		$(".write").attr("data-toggle", "popover");
		$(".write").attr("title", "출발시간 선택");
		$(".write").attr("data-content", html);
		$(".write").attr("data-html", "true");
		$(".write").attr("data-placement", "bottom");
		$(".write").popover("show");
		
	}
	
	var trainFinish = function () {
		console.log("trainPerson selected.");
	}

	process = ["", trainDest, trainPerson, trainTime, trainFinish];
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
		html += "<td id='" + dateForm + "'>" + "<div style='height: 100%; width: 100%'><a href=javascript:selectedDate('" + dateForm + "')>" +
			date.getDate() + "</a></div></td>";

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
	dateNow="";
	$(".table > tbody > tr > td").css("outline", "");
	$("#" + date).css("outline", "steelblue solid 2px");
	$(".iconList").addClass("animated fadeInDown");
	$(".iconList").css("display", "block");
	dateNow += date.split('-')[0];
	dateNow += ('0'+date.split('-')[1]);
	dateNow += date.split('-')[2];
}

function makePopover() {
	for (var i = 0; i < $("#" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + " > table > tbody > tr > td div").length; i++) {
		var p = $("#" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + "> table > tbody > tr > td a").eq(i);
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
			markCircle(p.parent());
		}
		
		
	}
	
	markToday();
}

function markToday() {
	console.log(today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate());
	$("#" + today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()).find("a").css("color", "yellow");
}

function markCircle(p) {
	p.css("border-radius", "50%");
	p.css("background", "steelblue");
	p.css("width", "50%");
	p.css("margin", "auto");
}


function setmovie(){
	var movieName = $("#movieselect option:selected").val();
	$(".iconList > a:nth-child(1) > i").popover("destroy");
	showTextBlock();
	inputText(movieName);
	$.ajax({
		type : "get",
		url : "setmovie",
		data : {
			movie : movieName			
		},
		success : function(data){
			
		},
		error : function(e){
			console.log(e);
		}
	});
}

function settheater(){
	var areaName = $("#movieAreaSelect option:selected").val();
	$(".write").popover("destroy");
	
	$.ajax({
		type : "get",
		url : "settheater",
		data : {
			theater : areaName.split(' ')[1]		
		},
		success : function(data){
			$.ajax({
				type : "get",
				url : "setdate",
				data : {
					moviedate : dateNow			
				},
				success : function(data){
					showTextBlock();
					inputText(areaName);
					return true;
				},
				error : function(e){
					console.log(e);
				}
			});
		},
		error : function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
}

function settime(){
	var movieTime = $("#movieTimeSelect option:selected").val();
	$(".write").popover("destroy");
	showTextBlock();
	
	$.ajax({
		type : "get",
		url : "settime",
		data : {
			time : movieTime			
		},
		success : function(data){
			inputText(movieTime);
		},
		error : function(e){
			console.log(e);
		}
	});
}

function getseat(){
	var count = $("#movieCountSelect option:selected").val();
	$(".write").popover("destroy");
	$.ajax({
		type : "get",
		url : "getseat",
		data : {
			humanCount : count
		},
		dataType : "json",
		success : function(data){
			$("#test").html(data.tag);
			$('div#wrap').modal();
			setSeat(data.count);
		},
		error : function(e){
			console.log(e);
		}
	});
}


function setSeat(num){
	var seats_span_no = $("div#seats_list span.no");
	var array = new Array();
	var check = new Array();
	var flag = 0;
	
	seats_span_no.each(function(index, item){
		array.push(0);
		if($(item).next().text() == ' Economy' || $(item).next().text() == ' comfort' ||
				$(item).next().text() == ' prime zone prime' || $(item).next().text() == ' sweetbox'
			|| $(item).next().text() == ''){
			$(this).parent().on({
				mouseenter : function(){
					$(item).css("background","#d1ca36");
				},
				mouseleave : function(){
					if(array[index] == 0){
						if($(item).next().text() == ' sweetbox'){
							if($(item).next().next().text()==' 선택불가'){
								$(item).css("background","#bbbbbb");
							}else{
								$(item).css("background","#da1b68");
							}
						}else{
							if($(item).next().next().text()==' 선택불가'){
								$(item).css("background","#bbbbbb");
							}else{
								$(item).css("background","#666666");
							}
						}
					}
				},
				click : function(){
					if(array[index]==0){
						$(item).css("background","yellow");
						array[index] = 1;
						//seattext.push($(item).parent().parent().parent().parent().prev().prev().text());
						check[flag++] = $(item).parent().parent().parent().parent().parent().index();
						check[flag++] = Number($(item).text());
						console.log(check);
						if((num*2)==check.length){
							if(confirm("예매 하시겠습니까?")){
								$('div#wrap').modal('hide');
								$(".write").css("display", "none");
								inputText(num+"명");
								//spinner
								$.ajax({
									type : "POST",
									url : "setseat",
									contentType : "application/json",
									data : JSON.stringify({
										seats : check			
									}),
									dataType : "json",
									success : function(data){
										
										$("#scdate").text(data[2]);
										$("#mvname").text(data[3]);
										$("#mvarea").text(data[4]);
										$("#mvinfo").text(data[5]);
										$("#people").text(data[6]);
										$("#seatinfo").text(data[0]);
										$("#price").text(data[1]);

										$('div#checkMvModal').modal();
										
									},
									error : function(e){
										console.log(e);
									}
								});
							}
						}
					}else{
						if($(item).next().text() == ' sweetbox'){
							$(item).css("background","#da1b68");
						}else{
							$(item).css("background","#666666");
						}
						array[index] = 0;
						check.splice(flag-2,2);
						flag = flag-2;
					}
					//console.log(check);
				}//click
			});//on			
		} //if
	}); //each
}
function check_movieform(){
	$('div#checkMvModal').modal('hide');
	$('div#MoviePayModal').modal();
}


function payment(){
	var card = $("#lp_card_type_mv option:selected").text();
	var cardno = $("#cardnomv").val();
	var sno = $("#pwmv").val();
	var year = $("#validyearmv option:selected").val();
	var month = $("#validmonthmv option:selected").val();
	var birth = $("#birthmv").val();
	$('div#MoviePayModal').modal('hide');
	
	//spinner
	
	$.ajax({
		type : "get",
		url : "payment",
		data : {
			card : card,
			cardno : cardno,
			sno : sno,
			year : year,
			month : month,
			birth, birth			
		},
		dataType : "json",
		success : function(data){
			if(data==true){
				//예매완료.
				$('div#MoviePayModal').modal('hide');
				hideTextBlock();
			}else{
				alert('카드정보 오류입니다. 다시 입력 해주세요.')
				$('div#MoviePayModal').modal();
			}
		},
		error : function(e){
			console.log(e);
		}
	});
}

Map = function(){
	 this.map = new Object();
	};   
	Map.prototype = {   
	    put : function(key, value){   
	        this.map[key] = value;
	    },   
	    get : function(key){   
	        return this.map[key];
	    },
	    containsKey : function(key){    
	     return key in this.map;
	    },
	    containsValue : function(value){    
	     for(var prop in this.map){
	      if(this.map[prop] == value) return true;
	     }
	     return false;
	    },
	    isEmpty : function(key){    
	     return (this.size() == 0);
	    },
	    clear : function(){   
	     for(var prop in this.map){
	      delete this.map[prop];
	     }
	    },
	    remove : function(key){    
	     delete this.map[key];
	    },
	    keys : function(){   
	        var keys = new Array();   
	        for(var prop in this.map){   
	            keys.push(prop);
	        }   
	        return keys;
	    },
	    values : function(){   
	     var values = new Array();   
	        for(var prop in this.map){   
	         values.push(this.map[prop]);
	        }   
	        return values;
	    },
	    size : function(){
	      var count = 0;
	      for (var prop in this.map) {
	        count++;
	      }
	      return count;
	    }
	};
	
function selectBusArea(){
	start="";
	start = $("#busStartSelect option:selected").val();
	$(".write").popover("destroy");
	showTextBlock();
	inputText(start);
	
}
function selectBusArea2(){
	dest="";
	dest = $("#busDestSelect option:selected").val();
	$(".write").popover("destroy");
	$.ajax({
		type : "get",
		url : "setStartingPoint",
		data : {
			area : map.get(start).substring(4,7)
		},
		success : function(data){
			$.ajax({
				type : "get",
				url : "setDestination",
				data : {
					area : map.get(dest).substring(4,7)
				},
				success : function(data){

				},
				error : function(e){
					console.log(e);
				}
			});
		},
		error : function(e){
			console.log(e);
		}
	});
	showTextBlock();
	inputText(dest);
}

function selectBus(index,param1,param2){
//	console.log($("a#a"+index).text());
	var selectInfo = $("a#a"+index).text();
	selectBusInfo += ($("a#a"+index).text().split(" ")[3]+","+$("a#a"+index).text().split(" ")[4]+","+param1+","+$("a#a"+index).text().split(" ")[5]+","+$("a#a"+index).text().split(" ")[6]) ;
	starttime = param1;
	$.ajax({
		type : "get",
		url : "setBusdate",
		data : {
			date : param1
		},
		success : function(data){
		},
		error : function(e){
			console.log(e);
		}
	});
	$.ajax({
		type : "get",
		url : "setSeatGrade",
		data : {
			grade : busGrade
		},
		success : function(data){

		},
		error : function(e){
			console.log(e);
		}
	});
	$('div#busInfoModal').modal('hide');
	$(".write").val(selectInfo);
	showTextBlock();
	inputText();
	
	}

function showBusSeat(){
	var count = $("#busCountSelect option:selected").val();
	$(".write").popover("destroy");
	full_seat = count;
	$.ajax({
		type : "get",
		url : "setHuman",
		data : {
			count : count
		},
		success : function(data){
			$.ajax({
				type : "get",
				url : "selectTicket",
				data : {
					time : starttime.toString().substring(8,12)
				},
				success : function(data){
					inputText(count);
					showBusSeat2();
				},
				error : function(e){
					console.log(e);
				}
			});
			
		},
		error : function(e){
			console.log(e);
		}
	});
}

function showBusSeat2(){
	$.ajax({
		type : "get",
		url : "showBusSeat",
		data : {
			count : full_seat
		},
		dataType : "json",
		success : function(data){
			
			$("div.modal-body2").html(data.form);
			$("div#seatModal").modal();
			if(data.flag == 1){
				//추가
				flag = data.flag;
				$("input[type='checkbox']").attr("onClick","return fc_Check(this)");
				$("img").eq(0).attr("src","resources/img/enter.gif");
				$("img").eq(1).attr("src","resources/img/drive.gif");
				$("img").eq(2).remove();
			}
			
			full_seat = data.count;
			
		},
		error :function(request,status,error){
	        console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error); 
		}
	});
}

function fc_Check(box) {
	if(box.checked == true) {
		check_seat ++;
		if(full_seat < check_seat) {
			check_seat = check_seat -1;
			alert("예매/예약 하실 매수를 초과하였습니다. 예약/예매하고자 하시는 매수는 "+full_seat+"매입니다.");
			return false;
		}//if(full...의끝
		if(flag==1){
			seatList.push($(box).val());
		}else{
			seatList.push($(box).prev().text());
		}
		if(full_seat == check_seat){
			seatList.sort();
			if(confirm("좌석 "+seatList+"를 예약하시겠습니까?")){
				check_seat = 0;
				$('div#seatModal').modal('hide');
				seatList.push(selectBusInfo);
				console.log(seatList);
				$.ajax({
					type : "POST",
					url : "setBusSeat",
					contentType : "application/json",
					data : JSON.stringify({
						seats : seatList			
					}),
					dataType : "json",
					success : function(data){
						seatList = new Array();
						busReserveInfo = data;
						
						check_modal_on(data[data.length-1]);
					},
					error : function(e){
						console.log(e);
					}
				});
			}
		}
		return true;
	} else {
		seatList.splice(check_seat-1,1);
		check_seat = check_seat -1;
		console.log(seatList);
	}//if(box.checked....의 끝
	
	
}

function check_modal_on(flagParam){
	
	if(flagParam=="0" || flagParam=="1" || flagParam=="re"){
		$("#busdate").text(busReserveInfo[0]);
		$("#busarea").text(busReserveInfo[1]);
		$("#busgrade").text(busReserveInfo[2]);
		$("#busseat").text(busReserveInfo[3]);
		$("#busprice").text(busReserveInfo[4]);
		$('div#checkModal').modal();
	}else{
		showBusSeat();
	}		
	
}

function check_form(){
	$('div#checkModal').modal('hide');
	$('div#payModal').modal();
	//$('div#payModal').find('form').trigger('reset');
}


function writeCardInfo(){
	$('div#payModal').modal('hide');
	var cardno = $("#cardno").val();
	var year = $("#validyear option:selected").val();
	var month = $("#validmonth option:selected").val();
	var birth = $("#birth").val();
	$.ajax({
		type : "get",
		url : "writeCardInfo",
		data : {
			cardno : cardno,
			year : year,
			month : month,
			birth : birth
		},
		dataType : "json",
		success : function(data){
			//다이어리에 찍어줌..
			if(data.istrue){
				alert("결제완료.");
			}else{
				alert("결제오류. 다시 입력해주세요.");
				check_modal_on(data.flag);
			}
		},
		error :function(request,status,error){
	        console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error); 
		}
	});
	return true;
}

function trainAreaSelect(param){
	var train = "경부";
   	var train1 = "호남";
   	var train2 = "경전";
	var train3 = "전라";
	var train4 = "경의";
	var train5 = "충북";
	
	$(".write").on("keydown",function(){
		$(".write").popover("hide");
	});
		$(".write").on("keyup",function(){
		var html="";
		
		 $.ajax({
	           url : "stationLocation",
	           type : "post",
	           dataType : "json",
	           data : {
	        	   query : $(".write").val()
	           },
	           success : function(json) {
	           	html += '<form>';
	           	html += '<select multiple class="'+param+'2">';
	           	if(json.display==0){
	           		html += "<option>검색결과없음</option>";
	           	}else{
		            $.each(json.items,function(i,item){
		            	     if(item.title.indexOf(train)!=-1||item.title.indexOf(train1)!=-1||item.title.indexOf(train2)!=-1||item.title.indexOf(train3)!=-1||item.title.indexOf(train4)!=-1||item.title.indexOf(train5)!=-1 ){
		            	    	 html += "<option>"+item.title+"</option>";
		                 }   //if
		               });
	           	}
	           	html +='</select>';
	           	html +='<input type="button" class="form-control" value="선택" onclick="'+param+'();">';
	    		html +='</form>';
	    			$(".write").attr("data-toggle", "popover");
	    			$(".write").attr("title", "기차역 선택");
	    			$(".write").attr("data-content", html);
	    			$(".write").attr("data-html", "true");
	    			$(".write").attr("data-placement", "bottom");
	    			$(".write").popover("show");  
	           },
	           error : function(err) {
	              //alert("에러");
	           }
	        });
		});
}

function trainStartSelect(){
	$(".write").popover("destroy");
	var startTrain = $(".trainStartSelect2 option:selected").val();
	for(var i=0; i<startTrain.length ;i++){
		if(startTrain.charAt(i)=="역"){
			start = startTrain.substring(0,i);
			break;
		}//if
	}
	showTextBlock();
	inputText(start);
}

function trainDestSelect(){
	$(".write").popover("destroy");
	var destTrain = $(".trainDestSelect2 option:selected").val();
	for(var i=0; i<destTrain.length ;i++){
		if(destTrain.charAt(i)=="역"){
			dest = destTrain.substring(0,i);
			break;
		}//if
	}
	
	showTextBlock();
	$.ajax({
		type : "get",
		url : "setStartAndDestPoint",
		data : {
			area1 : start,
			area2 : dest
		},
		success : function(data){
			inputText(dest);
		},
		error : function(e){
			console.log(e);
		}
	});
	
}

function showTrainTime(){
	var count = $("#trainCountSelect option:selected").val();
	$.ajax({
		type : "get",
		url : "setPeople",
		data : {
			count : count
		},
		success : function(data){
		},
		error : function(e){
			console.log(e);
		}
	});
	$(".write").popover("destroy");
	showTextBlock();
	inputText(count+"명");
	
}

function showTimeModal(){
	var wantTrainTime = $("#trainTimeSelect option:selected").val();
	var dateTime = dateNow + (wantTrainTime+"00");
	
	$.ajax({
		type : "get",
		url : "setDate",
		data : {
			date : dateTime
		},
		dataType : "json",
		success : function(data){

		},
		error : function(e){
			console.log(e);
		}
	});
	
	
}
