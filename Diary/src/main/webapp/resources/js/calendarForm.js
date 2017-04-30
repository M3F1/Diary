var dt = new Date(); // Date 객체
var today = new Date(); // 오늘 날짜 객체
var tooltiptext; // tooltiptext 배열
var process; // 선택된 icon의 절차 배열
var i = 0;
var selectMemberList;	// 전체 유저 목록
var friendList = new Array();	// 친구 목록
var scheduleList;	// 전체 스케쥴 목록
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
var mvnamecancle = new Array();
var mvtimecancle = new Array();
var kobuscancle = new Array();
var mvscno = new Array();
var kobusscno = new Array();
var easybusscno = new Array();
var trainscno = new Array();

$(document).ready(function () {
	// diary 접속 시 필요한 서버 요청
	sendRequest();
	// 달력 출력
	$("#calendar").html(calendarHtml(dt));
	// 달력 아이디 바꿔주기
	$("#calendar").attr("id", today.getFullYear() + "-" + (today.getMonth() + 1));
	// 일자에 popover 설정하기
	makePopover();
	// 각 event 활성화
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

function spinnerStart() {
	$("body").removeClass("loaded");
	$(".loader-section").css("opacity", "0");
	$(".loader-section").fadeTo("slow", "0.5");
	$(".calendar").fadeTo("slow", "0.5");
}

function spinnerEnd() {
	$(".loader-wrapper .loader-section").css("-webkit-transform", "none");
	$(".loader-wrapper .loader-section").css("-ms-transform", "none");
	$(".loader-wrapper .loader-section").css("transform", "none");
	$(".loader-section").fadeTo("slow", "1");
	$(".calendar").fadeTo("slow", "1");
	$("body").addClass("loaded");
}

function sendRequest() {
	$.ajax({
		type : "get",
		url : "getFriendList",
		async : false,
		success : function (data) {
			// 아이콘의 친구 목록 생성
			makeFriendList(data);
			
			// 처음 켰을 때 myfriend modal의 친구 목록 띄우기
			var html = "";
			$.each(data, function(key, value) {
				if (value.USER_FRNO && value.FR_FLAG == 'Y') {
					html += "<tr>";
					html += "<td>" + value.USER_NM + "</td>";
					html += "<td>" + value.USER_BIRTH + "</td>";
					html += "<td>";
					html += "<a href='javascript:deleteFriend(" + value.USER_NO_PK + ");'><i class='fa fa-user-times'></i></a>";
				}
			});
			html += "</td>";
			html += "</tr>";
			
			$(".friendListDiv>.table").html(html);
		},
		error : function (e) {
			console.log(e);
		}
	});
	
	// myfriend modal 목록 만들기
	$.ajax({
		type : "get",
		url : "getFriendRequestList",
		async : false,
		success : function (data) {
			makeRequestList(data);
			
			// 친구 요청 메세지 개수 처리 부분
			if (data.length != 0) {
				$(".requestNum").html(data.length);
			}
		},
		error : function (e) {
			console.log(e);
		}
	});
	
	// 친구 추가를 위한 유저 검색
	$("#friend_nm").on("keyup", function() {
		searchMemberList();
	});
}

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
	$(".slider-area .carousel-caption").css("top", "2.5%");
	$(".iconList").css("display", "none");
	$(".textBlock").css("display", "block");
	$(".write").focus();
}

function hideTextBlock() {
	$(".slider-area .carousel-caption").css("top", "10%");
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

/** ******************************** 친구 목록 ********************************* */
function makeFriendList(friendList) {
	// 아이콘에 친구 목록 불러오기
	var html = "";
	
	html = "<div class='list-group'>";
	$.each(friendList, function(key, value) {
		html += "<a href='javascript:;' class='list-group-item'>" + value.USER_NM + "(" + value.USER_ID + ")" + "</a>";
	});
	
	html += "</div>";
	
	// 친구 목록 popover 만들기
	$(".friendList").attr("data-toggle", "popover");
	$(".friendList").attr("title", "친구 목록");
	$(".friendList").attr("data-content", html);
	$(".friendList").attr("data-html", "true");
	$(".friendList").attr("data-placement", "bottom");
	$(".friendList").popover();
	
	$(".friendList").on("click", function() {
		var fl = $(".friendList + div > .popover-content a");
		$(this).next().css("overflow-y", "scroll");
		$(this).next().css("height", "200px");
		
		for (var index = 0; index < fl.length; index++) {
			fl.eq(index).off().on("click", function() {
				$(this).toggleClass("active");
			});
		}
	});
}

function makeRequestList(requestList) {
	var html = "";
	
	$.each(requestList, function (key, value) {
		html += "<tr>";
		html += "<td>" + value.USER_NM + "(" + value.USER_ID + ")" + "님의 친구 요청이 들어왔습니다." + "</td>";
		html += "<td>" + "<button>수락</button>";
		html += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		html += "<button>거절</button>" + "</td>";
		html += "</tr>";
	});
	
	
	$(".requestListDiv table").html(html);
	
	$.each(requestList, function (key, value) {
		$(".requestListDiv table tr:nth-child(" + (key + 1) + ") button:nth-child(1)").on("click", function () {
			acceptFriend(key, value);
		});
		
		$(".requestListDiv table tr:nth-child(" + (key + 1) + ") button:nth-child(2)").on("click", function () {
			rejectFriend(key, value);
		});
	});
}

function acceptFriend(key, value) {
	$.ajax({
		type : "get",
		url : "acceptFriend",
		data : {
			user_no_pk : value.USER_NO_PK
		},
		success : function (data) {
			$(".requestListDiv table tr").eq(key).html("<td colspan='2'>" + value.USER_NM + "(" + value.USER_ID + ")" + "님의 친구 요청을 수락했습니다." + "</td>");
			
			var cnt = parseInt($(".requestNum").html());
			
			if (cnt == 1) {
				$(".requestNum").html("");
			} else {
				$(".requestNum").html(cnt - 1);
			}
			
		},
		error : function (e) {
			console.log(e);
		}
	});
	searchMemberList();
}

function rejectFriend(key, value) {
	$.ajax({
		type : "get",
		url : "rejectFriend",
		data : {
			user_no_pk : value.USER_NO_PK
		},
		success : function (data) {
			$(".requestListDiv table tr").eq(key).html("<td colspan='2'>" + value.USER_NM + "(" + value.USER_ID + ")" + "님의 친구 요청을 거절했습니다." + "</td>");
			
			var cnt = parseInt($(".requestNum").html());
			
			if (cnt == 1) {
				$(".requestNum").html("");
			} else {
				$(".requestNum").html(cnt - 1);
			}
		},
		error : function (e) {
			console.log(e);
		}
	});
	searchMemberList();
}

function searchMemberList() {
	var nm = $("#friend_nm").val();
	
	$.ajax({
		type : "get",
		url : "selectMemberList",
		data : {
			user_nm : nm
		},
		async : false,
		success : function(data) {
			var html = "";
			var friendArray = new Array();
			
			console.log(nm.length);
			html += "<tr>";
			html += "<th>이름</th>";
			html += "<th>생년월일</th>";
			html += "<th></th>";
			html += "</tr>";
			if (nm.length == 0) {
				$.each(data, function(key, value) {
					if (value.USER_FRNO && value.FR_FLAG == 'Y') {
						html += "<tr>";
						html += "<td>" + value.USER_NM + "</td>";
						html += "<td>" + value.USER_BIRTH + "</td>";
						html += "<td>";
						friendArray.push(value);
						html += "<a href='javascript:deleteFriend(" + value.USER_NO_PK + ");'><i class='fa fa-user-times'></i></a>";
					}
				});
				html += "</td>";
				html += "</tr>";
			} else {
				$.each(data, function(key, value) {
					html += "<tr>";
					html += "<td>" + value.USER_NM + "</td>";
					html += "<td>" + value.USER_BIRTH + "</td>";
					html += "<td>";
					if (value.USER_FRNO && value.FR_FLAG == 'Y') {
						friendArray.push(value);
						html += "<a href='javascript:deleteFriend(" + value.USER_NO_PK + ");'><i class='fa fa-user-times'></i></a>";
					} else if (value.USER_FRNO && value.FR_FLAG == 'N') {
						html += "waiting";
					} else {
						html += "<a href='javascript:addFriend(" + value.USER_NO_PK + ");'><i class='fa fa-user-plus'></i></a>";
					}
					html += "</td>";
					html += "</tr>";
				});
			}
			
			makeFriendList(friendArray);
			$(".friendListDiv>.table").html(html);
		},
		error : function(e) {
			console.log(e);
		}
	});
}

function addFriend(user_no_pk) {
	$.ajax({
		type : "get",
		url : "addFriend",
		data : {
			user_no_pk : user_no_pk
		},
		async : false,
		success : function(data) {
			console.log("OK");
		},
		error : function(e) {
			console.log(e);
		}
	});
	searchMemberList();
}

function deleteFriend(user_no_pk) {
	$.ajax({
		type : "get",
		url : "deleteFriend",
		data : {
			user_no_pk : user_no_pk
		},
		async : false,
		success : function(data) {
			console.log("OK");
		},
		error : function(e) {
			console.log(e);
		}
	});
	searchMemberList();
}
/** ******************************** 영화 목록 ********************************* */
function movieList() {
//	/* 영화 목록 받는 부분 */
	var html = $("#movieListValue").val();
	 $(".iconList > a:nth-child(1) > i").attr("data-toggle", "popover");
	 $(".iconList > a:nth-child(1) > i").attr("title", "<img src='resources/img/icon/show.png'>");
	 $(".iconList > a:nth-child(1) > i").attr("data-content", html);
	 $(".iconList > a:nth-child(1) > i").attr("data-html", "true");
	 $(".iconList > a:nth-child(1) > i").attr("data-placement", "bottom");
	 $(".iconList > a:nth-child(1) > i").popover();
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
		           html +='<input type="image" img src="resources/img/icon/right-arrow.png" class="form-control" value="선택" onclick="settheater();return false;">';
		           html+='</form>';
		           if(movieflag!=1){
				    	$(".write").attr("data-toggle", "popover");
				     	$(".write").attr("title", "<img src='resources/img/icon/theater.png'>");
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
			       html +='<input type="image" img src="resources/img/icon/right-arrow.png" class="form-control" value="선택" onclick="settime();return false;">';
			       html+='</form>';
			       if(movieflag!=1){
					 $(".write").attr("data-toggle", "popover");
					 $(".write").attr("title", "<img src='resources/img/icon/time.png'>");
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
				html +='<input type="image" img src="resources/img/icon/right-arrow.png" class="form-control" value="선택" onclick="getseat();return false;">';
		html +='</form>';
		$(".write").attr("data-toggle", "popover");
		$(".write").attr("title", "<img src='resources/img/icon/people.png'>");
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
	           	//html +='<input type="button" class="form-control" value="선택" onclick="selectBusArea()">';
	           	html +='<input type="image" img src="resources/img/icon/right-arrow.png" class="form-control" value="선택" onclick="selectBusArea();return false;">';
	    		html +='</form>';
	    		if(movieflag!=1){
	    			$(".write").attr("data-toggle", "popover");
	    			$(".write").attr("title", "<img src='resources/img/icon/departure.png'>");
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
		           	//html +='<input type="button" class="form-control" value="선택" onclick="selectBusArea2()">';
		           	html +='<input type="image" img src="resources/img/icon/right-arrow.png" class="form-control" value="선택" onclick="selectBusArea2();return false;">';
		    		html +='</form>';
		    		if(movieflag!=1){
		    			$(".write").attr("data-toggle", "popover");
		    			$(".write").attr("title", "<img src='resources/img/icon/arrival.png'>");
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
            	if(json.response.body.items.item==null){
            		alert("검색결과 없음");
            	}else{
            		html += '<select multiple id="busInfoSelect">';
            	 $.each(json.response.body.items.item,function(i,item){
            		 busGrade = item.gradeNm;
            		 if(i%2==0){
            			 html+="<option id='option"+i+"' value='"+item.depPlaceNm+"/"+item.arrPlaceNm+"/"+item.depPlandTime+"/"+item.arrPlandTime+"/"+item.gradeNm+"/"+item.charge+"원"+"'>"+item.depPlandTime.toString().substring(8,10)+":"+item.depPlandTime.toString().substring(10,12)+"~"+ item.arrPlandTime.toString().substring(8,10)+":"+item.arrPlandTime.toString().substring(10,12)+" "+item.gradeNm+" "+item.charge+"원"+"</option>";
            		 }
	               });    //each
            	 html +='<input type="image" img src="resources/img/icon/right-arrow.png" class="form-control" value="선택" onclick="selectBus();return false;">';
            	 	$("#busInformation").html(html);
 					$('div#busInfoModal').modal();
            	}//if else
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
		html +='<input type="image" img src="resources/img/icon/right-arrow.png" class="form-control" value="선택" onclick="showBusSeat();return false;">';
		html +='</form>';
		$(".write").attr("data-toggle", "popover");
		$(".write").attr("title", "<img src='resources/img/icon/people.png'>");
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
		//html +='<input type="button" class="form-control" value="선택" onclick="showTrainTime()">';
		html +='<input type="image" img src="resources/img/icon/right-arrow.png" class="form-control" value="선택" onclick="showTrainTime();return false;">';
		html +='</form>';
		$(".write").attr("data-toggle", "popover");
		$(".write").attr("title", "<img src='resources/img/icon/people.png'>");
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
		//html +='<input type="button" class="form-control" value="선택" onclick="showTimeModal()">';
		html +='<input type="image" img src="resources/img/icon/right-arrow.png" class="form-control" value="선택" onclick="showTimeModal();return false;">';
		html +='</form>';
		$(".write").attr("data-toggle", "popover");
		$(".write").attr("title", "<img src='resources/img/icon/departure.png'>");
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

/** ******************************** 맛집 검색 ********************************* */
function restaurant() {
	$(".write").attr("placeholder", "강남 or 삼겹살");
	tooltiptext = ["약속 장소는?"];
	$(".tooltiptext").html(tooltiptext[i]);
	
	process = [""];
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
	$(".slider-area .carousel-caption").css("top", "10%");
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
	html += "<td>SUN</td><td>MON</td><td>TUE</td><td>WED</td><td>THU</td><td>FRI</td><td>SAT</td>";
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
		var dateForm = date.getFullYear() + "-" + padDigits((date.getMonth() + 1), 2) + "-" +
		padDigits(date.getDate(), 2);
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

	return html;
}

// 날짜 선택
function selectedDate(date) {
	dateNow="";
	$(".table > tbody > tr > td").css("outline", "");
	$("#" + date).css("outline", "lightsteelblue solid 2px");
	$(".iconList").addClass("animated fadeInDown");
	$(".iconList").css("display", "block");
	dateNow += date.split('-')[0];
	dateNow += (date.split('-')[1]);
	dateNow += date.split('-')[2];
}

function makePopover() {
	// scheduleList 가져오기
	scheduleList = JSON.parse($("#scheduleList").val());
	console.log(scheduleList);
	
	var param1 ="";
	var param2 ="";
	
	var html = new Array(); // 일정 내용 및 날씨 넣는곳.
	var weather = new Array(); // 일정 내용 및 날씨 넣는곳.
	for (var i = 0; i < $("#" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + " > table > tbody > tr > td div").length; i++) {
		var p = $("#" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + "> table > tbody > tr > td a").eq(i);
		html[i]="";
		weather[i]="";
		/* 일정 가져오는 부분 */
		/*html[i]+='<div class="left-box">'+dt.getFullYear() + '년 ' + (dt.getMonth() + 1) + '월 ' + p.html() + '일 일정</div>';*/
		$.each(scheduleList, function(key, value) {
			if (p.parent().parent().attr("id") == value.SC_STDT) {
				if(value.SC_FIN=='Y' && value.SC_DFLAG=='Y') {
					p.attr("data-toggle", "popover");
					//p.attr("content", dt.getFullYear() + "년 " + (dt.getMonth() + 1) + "월 " + p.html() + "일 일정");
					
					markCircle(p.parent());
					
					/*
					html[i]+='<table><tr><td>'+value.SC_CON.split("_")[0]+'</td>';
					html[i]+='<td>'+value.SC_CON.split("_")[1]+'</td>';
					
					if(value.SC_CON.split("_")[4]=="mv"){
						mvscno[i] = value.SC_NO_PK;
						mvtimecancle[i] = value.SC_CON.split("_")[0];
						mvnamecancle[i] = value.SC_CON.split("_")[1];
						html[i]+='<td>'+value.SC_CON.split("_")[2].split(" ")[0]+value.SC_CON.split("_")[2].split(" ")[1]+'</td>';
						html[i]+='<td>'+value.SC_CON.split("_")[3].split(" ")[1]+'</td>';
						html[i]+="<td><input type='button' class='mvcancleBTN' onclick='mvCancle("+i+")' value='취소'/></td></tr></table>";
					}
					else if(value.SC_CON.split("_")[4]=="kobus"){
						kobusscno[i] = value.SC_NO_PK;
						kobuscancle[i] = value.SC_CON.split("_")[3]+"_"+value.SC_CON.split("_")[0]+"_"+value.SC_CON.split("_")[2];
						html[i]+='<td>'+value.SC_CON.split("_")[2]+'</td>';
						html[i]+='<td><input type="button" onclick="kobusCancleModal('+i+')" value="취소"/></td></tr></table>';
					}
					else if(value.SC_CON.split("_")[4]=="easy"){
						easybusscno[i] = value.SC_NO_PK;
						html[i]+='<td>'+value.SC_CON.split("_")[2]+'</td>';
						html[i]+='<td><input type="button" onclick="easyCancle()" value="취소"/></td></tr></table>';
					}
					else if(value.SC_CON.split("_")[4]=="train"){
						trainscno[i] = value.SC_NO_PK; 
						html[i]+='<td><input type="button" onclick="trainCancle()" value="취소"/></td></tr></table>';
					}else{
						html[i]+='</table>';
					}
					*/
					html[i] += '<button class="accordion">' + value.SC_CON.split("_")[0] + '&nbsp;' + value.SC_CON.split("_")[4] + '</button>';
					html[i] += '<div class="panel">';
					html[i] += '영화 제목 : ' + value.SC_CON.split("_")[1] + '<br>';
					html[i] += '영화관 : ' + value.SC_CON.split("_")[2] + '<br>';
					html[i] += '자리 : ' + value.SC_CON.split("_")[3];
					html[i] += '</div>';
					
					p.attr("data-content", html[i]);
					
				}
			}
		});
		
		// 날씨
//		var array1 = todayWeather();
//		var array2 = weekWeather();
//		
//		$.each(array1, function(j,item){
//			
//			if (p.parent().parent().attr("id") == item.date) {
//				weather[i]+=item.html;
//				weather[i]+='<div class="title-box">'+p.html()+'</div></div>';
//				p.attr("data-title", weather[i]);
//				p.attr("data-content", html[i]);
//				
//			}
//		 });
//		
//		$.each(array2, function(j,item){
//			if (p.parent().parent().attr("id") == item.date) {
//				weather[i+3]="";
//				weather[i+3]+=item.html;
//				weather[i+3]+='<div class="title-box">'+p.html()+'</div></div>';
//				p.attr("data-title", weather[i+3]);
//				p.attr("data-content", html[i+3]);
//			}
//		 });
		
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
	}
	
	// accordian 이벤트 활성화
	$(document).on("click", ".accordion", function() {
		$(this).toggleClass("active");
		
		var panel = $(this).next();
		console.log(panel.css("maxHeight"));
		console.log(panel.prop("scrollHeight"));
		
		if (panel.css("maxHeight") == "0px") {
			panel.css("maxHeight", panel.prop("scrollHeight") + "px");
		} else {
			panel.css("maxHeight", "0px");
		}
	});
	
	// hover 시 날짜 숫자색 변경
	p.on("hover", function() {
		p.css("color", "red");
	});
	
	markToday();
}

function markToday() {
	var todayDate = $("#" + today.getFullYear() + "-" + padDigits((today.getMonth() + 1), 2) + "-" +
			padDigits(today.getDate(), 2) + " a");
//	todayDate.css("border-radius", "50%");
//	todayDate.css("border", "2px solid red");
//	todayDate.css("width", "50%");
//	todayDate.css("margin", "auto");
//	todayDate.css("color", "red");
	todayDate.parent().addClass("fa bounce");
}

function markCircle(p) {
	p.css("border-radius", "50%");
	p.css("background", "rgb(162, 189, 350)");
	p.css("width", "50%");
	p.css("margin", "auto");
}

/** ********************************** 날씨 *********************************** */

//오늘부터 +2일까지의 날씨
function todayWeather() {
	var whtml = "";
	var whtml1 = "";
	var whtml2 = "";
	var jArray = new Array();
	var jobj = new Object();
	var jobj1 = new Object();
	var jobj2 = new Object();
	
	var date = "";
	var fdate = "";
	
     $.ajax({
        url : "weather",
        type : "post",
        dataType : "json",
        data : {
        	city : "서울",
        	county : "강남구",
        	village : "삼성동"
        },
        async : false,
        success : function(json) {
        	console.log(json);
        	 $.each(json.weather.forecast3days,function(i,item){
        		

        		 whtml += "<div class='backweather'  style = 'background-image:url(resources/img/weather_icons/"+item.fcst3hour.sky.code4hour+"b.png); background-size: 273px;'> '<img src='resources/img/weather_icons/"+item.fcst3hour.sky.code4hour+".png' width='40px' height='40px'>"+item.fcst3hour.sky.name4hour+
        		 		  "     temperature "+item.fcst3hour.temperature.temp4hour+"℃";
        		 whtml1 +="<div class='backweather'  style = 'background-image:url(resources/img/weather_icons/"+item.fcst3hour.sky.code25hour+"b.png); background-size: 273px;'> '<img src='resources/img/weather_icons/"+item.fcst3hour.sky.code25hour+".png' width='40px' height='40px'>"+item.fcst3hour.sky.name25hour+
 		 				  "     temperature "+item.fcst3hour.temperature.temp25hour+"℃";
        		 whtml2 +="<div class='backweather'  style = 'background-image:url(resources/img/weather_icons/"+item.fcst3hour.sky.code49hour+"b.png); background-size: 273px;'> '<img src='resources/img/weather_icons/"+item.fcst3hour.sky.code49hour+".png' width='40px' height='40px'>"+item.fcst3hour.sky.name49hour+
 		 				  "     temperature "+item.fcst3hour.temperature.temp49hour+"℃";
        		 
        		 fdate = item.timeRelease.split(' ')[0].substr(0,8);
        		 date = parseInt(item.timeRelease.split(' ')[0].split('-')[2]);
        		 
        		 jobj.date = item.timeRelease.split(' ')[0];
        		 jobj.html =  whtml;
        		 
        		 jobj1.date = fdate+(date+1);
        		 jobj1.html =  whtml1;
        		 
        		 jobj2.date = fdate+(date+2);
        		 jobj2.html =  whtml2;
        		 
        		 jArray .push(jobj);
        		 jArray .push(jobj1);
        		 jArray .push(jobj2);
             });   
        },
       	        
        error : function(err) {
           alert("에러");
        }
     });
     return jArray;
     
}

//+3일부터 +7일까지의 날씨
function weekWeather() {
	var whtml3 = "";
	var whtml4 = "";
	var whtml5 = "";
	var whtml6 = "";
	var whtml7 = "";
	
	var jArray = new Array();
	var jobj3 = new Object();
	var jobj4 = new Object();
	var jobj5 = new Object();
	var jobj6 = new Object();
	var jobj7 = new Object();
	
	var date = "";
	var fdate = "";
	
     $.ajax({
        url : "weather2",
        type : "post",
        dataType : "json",
        data : {
        	city : "서울",
        	county : "강남구",
        	village : "삼성동"
        },
        async : false,
        success : function(json) {
        	 $.each(json.weather.forecast6days,function(i,item){
        		

        		 whtml3 += "<div class='backweather'  style = 'background-image:url(resources/img/weather_icons/"+item.sky.pmCode3day+"b.png); background-size: 273px;'> <img src='resources/img/weather_icons/"+item.sky.pmCode3day+".png' width='40px' height='40px'>"+item.sky.pmName3day+"<br>" +
        		 		"max :"+item.temperature.tmax3day+"℃   min :"+item.temperature.tmin3day+"℃";
        		 whtml4 += "<div class='backweather'  style = 'background-image:url(resources/img/weather_icons/"+item.sky.pmCode4day+"b.png); background-size: 273px;'> <img src='resources/img/weather_icons/"+item.sky.pmCode4day+".png' width='40px' height='40px'>"+item.sky.pmName4day+"<br>" +
        		 		"max :"+item.temperature.tmax4day+"℃   min :"+item.temperature.tmin4day+"℃";;
        		 whtml5 += "<div class='backweather'  style = 'background-image:url(resources/img/weather_icons/"+item.sky.pmCode5day+"b.png); background-size: 273px;'> <img src='resources/img/weather_icons/"+item.sky.pmCode5day+".png' width='40px' height='40px'>"+item.sky.pmName5day+"<br>" +
        		 		"max :"+item.temperature.tmax5day+"℃   min :"+item.temperature.tmin5day+"℃";;
        		 whtml6 += "<div class='backweather'  style = 'background-image:url(resources/img/weather_icons/"+item.sky.pmCode6day+"b.png); background-size: 273px;'> <img src='resources/img/weather_icons/"+item.sky.pmCode6day+".png' width='40px' height='40px'>"+item.sky.pmName6day+"<br>" +
        		 		"max :"+item.temperature.tmax6day+"℃   min :"+item.temperature.tmin6day+"℃";;
        		 whtml7 += "<div class='backweather'  style = 'background-image:url(resources/img/weather_icons/"+item.sky.pmCode7day+"b.png); background-size: 273px;'> <img src='resources/img/weather_icons/"+item.sky.pmCode7day+".png' width='40px' height='40px'>"+item.sky.pmName7day+"<br>" +
        		 		"max :"+item.temperature.tmax7day+"℃   min :"+item.temperature.tmin7day+"℃";;
        		
        		 fdate = item.timeRelease.split(' ')[0].substr(0,8);
        		 date = parseInt(item.timeRelease.split(' ')[0].split('-')[2]);
        		 
        			 
        		 jobj3.date = fdate+(date+3);
        		 jobj3.html =  whtml3;
        		 jobj4.date = fdate+(date+4);
        		 jobj4.html =  whtml4;
        		 jobj5.date = fdate+(date+5);
        		 jobj5.html =  whtml5;
        		 jobj6.date = fdate+(date+6);
        		 jobj6.html =  whtml6;
        		 jobj7.date = fdate+(date+7);
        		 jobj7.html =  whtml7;
        		
        		 
        		 jArray .push(jobj3);
        		 jArray .push(jobj4);
        		 jArray .push(jobj5);
        		 jArray .push(jobj6);
        		 jArray .push(jobj7);
        		 
             });   
        },
       	        
        error : function(err) {
           alert("에러");
        }
     });
     return jArray;
     
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
	var date = $("#scdate").text();
	var mvname = $("#mvname").text();
	var mvarea = $("#mvarea").text();
	var seat = $("#seatinfo").text();
	
	$.ajax({
		type : "get",
		url : "beforePaymentSchedule",
		data : {
			date : dateNow.substring(2,8),
			time : date.split(" ")[1],
			mvname : mvname,
			mvarea : mvarea,
			seat : seat,
			flag : "mv"
		},
		success : function(data){
		},
		error : function(e){
			console.log(e);
		}
	});
	
	$('div#MoviePayModal').modal();
}

function mvSetting(){
	$.ajax({
		type : "get",
		url : "mvInfoSetting",
		data : {
		},
		success : function(data){
			
		},
		error : function(e){
			console.log(e);
		}
	});
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
			if(data){
				//예매완료.
				location.href="diary";
				$("#spin").hide();
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

	function selectBus(){
		var selectInfo = $("#busInfoSelect option:selected").val();
		selectBusInfo += (selectInfo.split("/")[0]+","+selectInfo.split("/")[1]+","+selectInfo.split("/")[2]+","+selectInfo.split("/")[4]+","+selectInfo.split("/")[5]) ;
		starttime = selectInfo.split("/")[2];
		$.ajax({
			type : "get",
			url : "setBusdate",
			data : {
				date : starttime
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
		$(".write").val($("#busInfoSelect option:selected").text());
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
	}//if(box.checked....의 끝
	
	
}

function check_modal_on(flagParam){
	
//	if(flagParam=="0" || flagParam=="1" || flagParam=="re"){
	if(flagParam=="0" || flagParam=="1" || flagParam=="re"){
		$("#busdate").text(busReserveInfo[0]);
		$("#busarea").text(busReserveInfo[1]);
		$("#busgrade").text(busReserveInfo[2]);
		$("#busseat").text(busReserveInfo[3]);
		$("#busprice").text(busReserveInfo[4]);
		if(flagParam=="0") $("#busflag").val("kobus");
		if(flagParam=="1") $("#busflag").val("easy");
		$('div#checkModal').modal();
	}else{
		showBusSeat();
	}		
	
}

function check_form(){
	$('div#checkModal').modal('hide');
	var time = $("#busdate").text();
	var busarea = $("#busarea").text();
	var seat = $("#busseat").text();
		$.ajax({
			type : "get",
			url : "beforePaymentBusSchedule",
			data : {
				date : dateNow.substring(2,8),
				busdate : time.split(" ")[0],
				time : time.split(" ")[1],
				busarea : busarea,
				seat : seat,
				flag : $("#busflag").val()
			},
			success : function(data){
			},
			error : function(e){
				console.log(e);
			}
		});
	
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
			if(data){
				$("#spin").hide();
				location.href="diary";
			}else{
				alert("결제오류. 다시 입력해주세요.");
//				check_modal_on(data.flag);
//				check_form("again");
				$('div#checkModal').modal();
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
	           	//html +='<input type="button" class="form-control" value="선택" onclick="'+param+'();">';
	            html +='<input type="image" img src="resources/img/icon/right-arrow.png" class="form-control" value="선택" onclick="'+param+'();return false;">';
	           	
	           	
	    		html +='</form>';
	    			$(".write").attr("data-toggle", "popover");
	    			$(".write").attr("title", "<img src='resources/img/icon/train.png'>");
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
			$(".write").popover("destroy");
			showTextBlock();
			inputText(count+"명");
		},
		error : function(e){
			console.log(e);
		}
	});
	
	
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

function mvCancle(num){
	$.ajax({
		type : "get",
		url : "cancleMovieCGV",
		data : {
			mvtime : mvtimecancle[num],
			mvname : mvnamecancle[num],
			scno : mvscno[num]
		},
		success : function(data){
			if(data){
				location.href="diary";
				$("#spin").hide();
			}else{
				alert('취소도중 오류발생 다시시도 해주세요.');
			}
		},
		error : function(e){
			console.log(e);
		}
	});
}

function kobusCancleModal(num){
	$("#buscancleFlag").val(num);
	$("#busCancleModal").modal();
}

function kobusCancle(){
	$("#busCancleModal").modal('hide');
	
	var num = $("#buscancleFlag").val();
	var cardno = $("#buscancle_card_no").val();
	var year = $("#cvalidyear option:selected").val();
	var month = $("#cvalidmonth option:selected").val();
	console.log(year);
	console.log(month);
	
	$.ajax({
		type : "get",
		url : "cancleKOBUS",
		data : {
			scno : kobusscno[num],
			cardno : cardno,
			startdate : kobuscancle[num].split("_")[0],
			time : kobuscancle[num].split("_")[1],
			area : kobuscancle[num].split("_")[2],
			year : year,
			month : month
		},
		success : function(data){
			if(data){
				location.href="diary";
				$("#spin").hide();
			}else{
				alert('취소도중 오류발생 다시시도 해주세요.');
			}
		},
		error : function(e){
			console.log(e);
		}
	});
}
