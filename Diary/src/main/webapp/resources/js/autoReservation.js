var full_seat = 0;
var check_seat = 0;
var seatList = new Array();
var flag = 0;
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
				$.ajax({
					type : "POST",
					url : "setBusSeat",
					contentType : "application/json",
					data : JSON.stringify({
						seats : seatList			
					}),
					dataType : "json",
					success : function(data){
						
						//중간과정한번보여줌.맞냐? ㄹㅇ확인
						
						
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

function setStartingPoint(stpoint){
	$.ajax({
		type : "get",
		url : "setStartingPoint",
		data : {
			area : stpoint
		},
		dataType : "json",
		success : function(data){

		},
		error : function(e){
			console.log(e);
		}
	});
}

function setDestination(despoint){
	$.ajax({
		type : "get",
		url : "setDestination",
		data : {
			area : despoint
		},
		dataType : "json",
		success : function(data){

		},
		error : function(e){
			console.log(e);
		}
	});
}

function setBusdate(date){
	$.ajax({
		type : "get",
		url : "setBusdate",
		data : {
			date : date
		},
		dataType : "json",
		success : function(data){

		},
		error : function(e){
			console.log(e);
		}
	});
}

function setSeatGrade(grade){
	$.ajax({
		type : "get",
		url : "setSeatGrade",
		data : {
			grade : grade
		},
		dataType : "json",
		success : function(data){

		},
		error : function(e){
			console.log(e);
		}
	});
}

function setHuman(count){
	$.ajax({
		type : "get",
		url : "setHuman",
		data : {
			count : count
		},
		dataType : "json",
		success : function(data){

		},
		error : function(e){
			console.log(e);
		}
	});
}

function selectTicket(time){
	$.ajax({
		type : "get",
		url : "selectTicket",
		data : {
			time : time
		},
		dataType : "json",
		success : function(data){

		},
		error : function(e){
			console.log(e);
		}
	});
}

function showBusSeat(){
	$.ajax({
		type : "get",
		url : "showBusSeat",
		data : {},
		dataType : "json",
		success : function(data){
			
			$("#content").html(data.form);				
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
			
			//function(e){
			//console.log("에러");
			//console.log(e);
		}
	});
}
	
	//폼형식으로 전달..정보
function writeCardInfo(){
	$.ajax({
		type : "get",
		url : "writeCardInfo",
		data : {},
		dataType : "json",
		success : function(data){
			
						
		},
		error :function(request,status,error){
	        console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error); 
		}
	});
}




//////영화 예매 시 필요한 스크립트

function setSeat(num){
	//var seats_span = $("div#seats_list span.sreader");
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
						//check[flag++] = $(item).parent().parent().parent().parent().prev().prev().text();
						check[flag++] = $(item).parent().parent().parent().parent().parent().index();
						check[flag++] = Number($(item).text());
						console.log(check);
						if((num*2)==check.length){
							if(confirm("예매 하시겠습니까?")){
								//전역변수로 변수들해서 값가져감. 모달페이지(홈jsp)
								$.ajax({
									type : "POST",
									url : "setseat",
									contentType : "application/json",
									data : JSON.stringify({
										seats : check			
									}),
									dataType : "json",
									success : function(data){
										$.ajax({
											type : "get",
											url : "",
											
											
											
										})
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

function getmovie(){
	$.ajax({
		type : "get",
		url : "getmovie",
		data : {	
		},
		success : function(data){
			
			var html ="";
			
			html += "<h1>"+data+"</h1>"
			$("#movie").html(html);			
			
		},
		error : function(e){
			console.log(e);
		}
	});
}


function setmovie(movieName){
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

function setdate(movieDate){
	$.ajax({
		type : "get",
		url : "setdate",
		data : {
			moviedate : movieDate			
		},
		success : function(data){
			
		},
		error : function(e){
			console.log(e);
		}
	});
}

function settheater(movieTheater){
	$.ajax({
		type : "get",
		url : "settheater",
		data : {
			theater : movieTheater		
		},
		success : function(data){
			
		},
		error : function(e){
			console.log(e);
		}
	});
}

function gettime(){
	$.ajax({
		type : "get",
		url : "gettime",
		data : {
		},
		success : function(data){
			var html ="";
			
			html += "<h1>"+data+"</h1>"
			$("#time").html(html);		
		},
		error : function(e){
			console.log(e);
		}
	});
}

function settime(movieTime){
	$.ajax({
		type : "get",
		url : "settime",
		data : {
			time : movieTime			
		},
		success : function(data){
			
		},
		error : function(e){
			console.log(e);
		}
	});
}

function getseat(count){
	$.ajax({
		type : "get",
		url : "getseat",
		data : {
			humanCount : count
		},
		dataType : "json",
		success : function(data){
			$("#test").html(data.tag);
			setSeat(data.count);
		},
		error : function(e){
			console.log(e);
		}
	});
}

function payment(){
	$.ajax({
		type : "get",
		url : "payment",
		data : {
			
		},
		dataType : "json",
		success : function(data){

		},
		error : function(e){
			console.log(e);
		}
	});
}

$(document).ready(function(){
	$('#getMovieSeat').on('click',function(){
		getseat('1');
	});
	
	$('#getBusSeat').on('click',function(){
		showBusSeat();
	});
});
	

