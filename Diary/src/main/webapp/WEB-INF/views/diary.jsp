<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- CSS START -->
<link href="resources/css/bootstrap.min.css" rel="stylesheet">
<link href="resources/css/style.css" rel="stylesheet">
<link rel="stylesheet" href="http://img.cgv.co.kr/CGV_RIA/Ticket/Common/css/2016/12/ispCredit/reservation.css">
<!-- CSS END -->
<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
<!-- JAVASCRIPT START -->
<script src="resources/js/jquery-3.1.1.js"></script>
<script src="resources/js/bootstrap.min.js"></script>
<script src="resources/js/ruxen.js"></script>
<script src="resources/js/calendarForm.js"></script>
<!-- <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script> -->
<!-- JAVASCRIPT END -->
<title>My Diary</title>
</head>
<body>
	<header class="header fixed-header navbar-fixed-top" id="calHeader">
		<section class="container">
			<!-- LOGO START -->
			<a href="diary" class="site-logo"> <img alt="Logo" src="resources/img/logo.png">
			</a>
			<!-- LOGO END -->
	
			<!-- NAV MENU START -->
			<nav class="navbar">
				<!-- MOBILE MENU START -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
						data-target="#bs-example-navbar-collapse-1">
						<span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span
							class="icon-bar"></span> <span class="icon-bar"></span>
					</button>
				</div>
				<!-- MOBILE MENU END -->
				<!-- MENU LIST START -->
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li><a href="#" id="myPageBtn" data-toggle="modal"
							data-target="#myPageModal">My Page</a></li>
						<li><a href="logout" >Logout</a></li>
						<li><a href="howTo">How To</a></li>
					<li><a href="aboutUS">About Us</a></li>
					</ul>
				</div>
				<!-- MENU LIST END -->
			</nav>
			<!-- NAV MENU END -->
		</section>
	</header>
<!-- LOGIN MODAL START -->
<div class="modal fade" id="myPageModal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="myModalLabel">My Page</h4>
			</div>
			<div class="modal-body">
				<form action="" method="post">
					<div class="form-group">
						<input type="text" class="form-control" name="user_id" id="user_id"
							placeholder="emailID">
					</div>
					<div class="form-group">
						<input type="password" class="form-control" name="user_pw" id="user_pw"
							placeholder="password">
					</div>
					<div class="form-group">
						<input type="password" class="form-control" id="re_user_pw" placeholder="password confirm">
					</div>
					<div class="form-group">
						<input type="text" class="form-control"	name="user_nm" id="user_nm" placeholder="name">
					</div>
					<div class="form-group">
						<input type="text" class="form-control" name="user_birth" id="user_birth"
							placeholder="birthDate(yyyymmdd)">
					</div>
					<div class="form-group">
						<input type="text" class="form-control" name="user_phone" id="user_phone"
							placeholder="cellphone number">
					</div>
					<input type="text" id="sample6_postcode" placeholder="postcode"> <input
						type="button" onclick="sample6_execDaumPostcode()" value="우편번호 찾기"><br>
					<input type="text" name="user_add1" id="user_add1" placeholder="address"><br>
					<br> <input type="submit" class="form-control" id="joinBtn"
						value="수정">
				</form>
			</div>
		</div>
	</div>
</div>
<!-- LOGIN MODAL END -->
<a href="javascript:showHeader()" class="slider-down"><i class="fa fa-angle-down"></i></a>
<!-- calendar part -->
<div class="container calendar">
<section class="slider-area">
	<section id="carousel-example-generic" class="carousel slide" data-wrap="false" data-interval="false" data-ride="carousel">
		<!-- SLIDE LIST START -->
		<div class="carousel-inner" role="listbox">
			<!-- SLIDE LIST ITEM START -->
			<div class="item active">
				<!-- SLIDE BACKGROUND START -->
				<div class="slider-bg-img" style="background-image:url(resources/img/diary-bg.jpg);"></div>
				<!-- SLIDE BACKGROUND END -->
				<!-- SLIDE CAPTION START -->
				<div class="carousel-caption">
					<div class="col-xs-offset-1 col-xs-10 iconList">
						<a href="javascript:movie();"><i class="fa fa-film fa-3x" aria-hidden="true"></i></a>
						<a href="javascript:bus();"><i class="fa fa-bus fa-3x" aria-hidden="true"></i></a>
						<a href="javascript:train();"><i class="fa fa-train fa-3x" aria-hidden="true"></i></a>
						<a href="javascript:restaurant();"><i class="fa fa-cutlery fa-3x" aria-hidden="true"></i></a>
						<a href="javascript:write();"><i class="fa fa-keyboard-o fa-3x" aria-hidden="true"></i></a>
						<!-- <input type="text" class="form-control" id="write"><br> <span id="written"></span> -->
					</div>
					<br />
					<div class="form-group col-xs-offset-1 col-xs-10 textBlock">
						<span class="tooltiptext"></span>
						<!--<button class="btn btn-default" id="scheduleSearch">스케쥴 검색</button>-->
						<input type="text" class="form-control write"><br>
						<a href="#"><i class="fa fa-users fa-1x friendList" aria-hidden="true"></i></a>
						<span class="written"></span>
						<a href="javascript:dateInitialize();"><i class="fa fa-times fa-1x cancel" aria-hidden="true"></i></a>
					</div>
					<br /><br />
					<div class="text-center">
						<h1><span id="year"></span>.<span id="month"></span></h1>
					</div>
					
					<div id="calendar" class="animated fadeInUpBig"></div>
				</div>
				<!-- SLIDE CAPTION END -->
			</div>
		</div>
		<!-- SLIDE LIST END -->
		<!-- SLIDER CONTROL START -->
		<a class="left carousel-control left-slider-arrow" href="#carousel-example-generic" role="button" data-slide="prev">
			<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
			<span class="sr-only">Previous</span>
		</a>
		<a class="right carousel-control right-slider-arrow" href="#carousel-example-generic" role="button" data-slide="next">
			<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
			<span class="sr-only">Next</span>
		</a>
		<!-- SLIDER CONTROL END -->
		<!-- <a href="#header" class="slider-down"><i class="fa fa-angle-down"></i></a> -->
	</section>
</section>
</div>


<!-- 영화 좌석 모달 -->
<div class="modal movieseat fade" id="wrap" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel">
	<!-- 컨텐츠 -->
	<div id="container">
		<!-- 빠른예매 -->
		<div id="ticket" class="ticket ko guest">
			<!-- 메인컨텐츠 -->
			<div class="steps">
				<!-- step2 -->
				<div class="step step2" style="display: block;">
					<!-- SEAT 섹션 -->
					<div class="section section-seat three_line">
						<div class="col-head" id="skip_seat_list">
							<a href="#" class="skip_to_something" onclick="skipToSomething('tnb_step_btn_right');return false;">인원/좌석선택 건너뛰기</a>
						<a href="javascript:void(0)" id="reservarionDiscountInfo" style="position: absolute; top: 3px; left: 15px; color: rgb(255, 255, 255); font-weight: bold;"></a></div>
						<div class="col-body">
							<!-- THEATER -->
							<div class="theater_minimap">
								<div class="theater nano has-scrollbar" id="seat_minimap_nano">
									<div class="content" id="seat" tabindex="-1" style="right: -17px; bottom: -17px;">
										<div class="screen" title="SCREEN" style="width: 652px;"><span class="text"></span></div>
										<div id="test"></div>
									</div>
								<div class="pane pane-y" style="display: none; opacity: 1; visibility: visible;"><div class="slider slider-y" style="height: 50px;"></div></div><div class="pane pane-x" style="display: none; opacity: 1; visibility: visible;"><div class="slider slider-x" style="width: 50px;"></div></div></div>
								<div class="minimap opened" id="minimap" style="display: none;">
									<div class="mini_header" onclick="ftSeatMinimapToggle();event.preventDefault();">Minimap<span></span></div>
									<div class="mini_container" style="width: 94px; height: 92px;">
										<div class="mini_screen">SCREEN</div>
										<div class="mini_seats"><div class="mini_seat" style="left:0px;top:0px;"><span></span></div><div class="mini_seat" style="left:4px;top:0px;"><span></span></div><div class="mini_seat" style="left:8px;top:0px;"><span></span></div><div class="mini_seat" style="left:12px;top:0px;"><span></span></div><div class="mini_seat" style="left:16px;top:0px;"><span></span></div><div class="mini_seat" style="left:20px;top:0px;"><span></span></div><div class="mini_seat" style="left:24px;top:0px;"><span></span></div><div class="mini_seat" style="left:28px;top:0px;"><span></span></div><div class="mini_seat" style="left:32px;top:0px;"><span></span></div><div class="mini_seat handicap" style="left:44px;top:0px;"><span></span></div><div class="mini_seat handicap" style="left:48px;top:0px;"><span></span></div><div class="mini_seat" style="left:0px;top:4px;"><span></span></div><div class="mini_seat" style="left:4px;top:4px;"><span></span></div><div class="mini_seat" style="left:8px;top:4px;"><span></span></div><div class="mini_seat" style="left:12px;top:4px;"><span></span></div><div class="mini_seat" style="left:16px;top:4px;"><span></span></div><div class="mini_seat" style="left:20px;top:4px;"><span></span></div><div class="mini_seat" style="left:24px;top:4px;"><span></span></div><div class="mini_seat" style="left:28px;top:4px;"><span></span></div><div class="mini_seat" style="left:32px;top:4px;"><span></span></div><div class="mini_seat" style="left:36px;top:4px;"><span></span></div><div class="mini_seat" style="left:40px;top:4px;"><span></span></div><div class="mini_seat" style="left:44px;top:4px;"><span></span></div><div class="mini_seat" style="left:48px;top:4px;"><span></span></div><div class="mini_seat" style="left:0px;top:8px;"><span></span></div><div class="mini_seat" style="left:4px;top:8px;"><span></span></div><div class="mini_seat" style="left:8px;top:8px;"><span></span></div><div class="mini_seat" style="left:12px;top:8px;"><span></span></div><div class="mini_seat" style="left:16px;top:8px;"><span></span></div><div class="mini_seat" style="left:20px;top:8px;"><span></span></div><div class="mini_seat" style="left:24px;top:8px;"><span></span></div><div class="mini_seat" style="left:28px;top:8px;"><span></span></div><div class="mini_seat" style="left:32px;top:8px;"><span></span></div><div class="mini_seat" style="left:36px;top:8px;"><span></span></div><div class="mini_seat" style="left:40px;top:8px;"><span></span></div><div class="mini_seat" style="left:44px;top:8px;"><span></span></div><div class="mini_seat" style="left:48px;top:8px;"><span></span></div><div class="mini_seat" style="left:0px;top:12px;"><span></span></div><div class="mini_seat" style="left:4px;top:12px;"><span></span></div><div class="mini_seat" style="left:8px;top:12px;"><span></span></div><div class="mini_seat" style="left:12px;top:12px;"><span></span></div><div class="mini_seat" style="left:16px;top:12px;"><span></span></div><div class="mini_seat" style="left:20px;top:12px;"><span></span></div><div class="mini_seat" style="left:24px;top:12px;"><span></span></div><div class="mini_seat" style="left:28px;top:12px;"><span></span></div><div class="mini_seat" style="left:32px;top:12px;"><span></span></div><div class="mini_seat" style="left:36px;top:12px;"><span></span></div><div class="mini_seat" style="left:40px;top:12px;"><span></span></div><div class="mini_seat" style="left:44px;top:12px;"><span></span></div><div class="mini_seat" style="left:48px;top:12px;"><span></span></div><div class="mini_seat reserved" style="left:0px;top:16px;"><span></span></div><div class="mini_seat reserved" style="left:4px;top:16px;"><span></span></div><div class="mini_seat reserved" style="left:8px;top:16px;"><span></span></div><div class="mini_seat reserved" style="left:12px;top:16px;"><span></span></div><div class="mini_seat reserved" style="left:16px;top:16px;"><span></span></div><div class="mini_seat reserved" style="left:20px;top:16px;"><span></span></div><div class="mini_seat reserved" style="left:24px;top:16px;"><span></span></div><div class="mini_seat reserved" style="left:28px;top:16px;"><span></span></div><div class="mini_seat reserved" style="left:32px;top:16px;"><span></span></div><div class="mini_seat reserved" style="left:36px;top:16px;"><span></span></div><div class="mini_seat reserved" style="left:40px;top:16px;"><span></span></div><div class="mini_seat reserved" style="left:44px;top:16px;"><span></span></div><div class="mini_seat reserved" style="left:48px;top:16px;"><span></span></div><div class="mini_seat" style="left:0px;top:20px;"><span></span></div><div class="mini_seat" style="left:4px;top:20px;"><span></span></div><div class="mini_seat" style="left:8px;top:20px;"><span></span></div><div class="mini_seat" style="left:12px;top:20px;"><span></span></div><div class="mini_seat" style="left:16px;top:20px;"><span></span></div><div class="mini_seat" style="left:20px;top:20px;"><span></span></div><div class="mini_seat" style="left:24px;top:20px;"><span></span></div><div class="mini_seat" style="left:28px;top:20px;"><span></span></div><div class="mini_seat" style="left:32px;top:20px;"><span></span></div><div class="mini_seat" style="left:36px;top:20px;"><span></span></div><div class="mini_seat" style="left:40px;top:20px;"><span></span></div><div class="mini_seat" style="left:44px;top:20px;"><span></span></div><div class="mini_seat" style="left:48px;top:20px;"><span></span></div><div class="mini_seat" style="left:8px;top:24px;"><span></span></div><div class="mini_seat" style="left:12px;top:24px;"><span></span></div><div class="mini_seat" style="left:16px;top:24px;"><span></span></div><div class="mini_seat" style="left:20px;top:24px;"><span></span></div><div class="mini_seat" style="left:24px;top:24px;"><span></span></div><div class="mini_seat" style="left:28px;top:24px;"><span></span></div><div class="mini_seat" style="left:32px;top:24px;"><span></span></div><div class="mini_seat" style="left:36px;top:24px;"><span></span></div><div class="mini_seat" style="left:40px;top:24px;"><span></span></div><div class="mini_seat" style="left:44px;top:24px;"><span></span></div><div class="mini_seat" style="left:48px;top:24px;"><span></span></div><div class="mini_seat" style="left:8px;top:28px;"><span></span></div><div class="mini_seat" style="left:12px;top:28px;"><span></span></div><div class="mini_seat" style="left:16px;top:28px;"><span></span></div><div class="mini_seat" style="left:20px;top:28px;"><span></span></div><div class="mini_seat" style="left:24px;top:28px;"><span></span></div><div class="mini_seat" style="left:28px;top:28px;"><span></span></div><div class="mini_seat" style="left:32px;top:28px;"><span></span></div><div class="mini_seat" style="left:36px;top:28px;"><span></span></div><div class="mini_seat" style="left:40px;top:28px;"><span></span></div><div class="mini_seat" style="left:44px;top:28px;"><span></span></div><div class="mini_seat" style="left:48px;top:28px;"><span></span></div><div class="mini_seat" style="left:8px;top:32px;"><span></span></div><div class="mini_seat" style="left:12px;top:32px;"><span></span></div><div class="mini_seat" style="left:16px;top:32px;"><span></span></div><div class="mini_seat" style="left:20px;top:32px;"><span></span></div><div class="mini_seat" style="left:24px;top:32px;"><span></span></div><div class="mini_seat" style="left:28px;top:32px;"><span></span></div><div class="mini_seat" style="left:32px;top:32px;"><span></span></div><div class="mini_seat" style="left:36px;top:32px;"><span></span></div><div class="mini_seat" style="left:40px;top:32px;"><span></span></div><div class="mini_seat" style="left:44px;top:32px;"><span></span></div><div class="mini_seat" style="left:48px;top:32px;"><span></span></div><div class="mini_seat" style="left:8px;top:36px;"><span></span></div><div class="mini_seat" style="left:12px;top:36px;"><span></span></div><div class="mini_seat reserved" style="left:16px;top:36px;"><span></span></div><div class="mini_seat reserved" style="left:20px;top:36px;"><span></span></div><div class="mini_seat" style="left:24px;top:36px;"><span></span></div><div class="mini_seat" style="left:28px;top:36px;"><span></span></div><div class="mini_seat" style="left:32px;top:36px;"><span></span></div><div class="mini_seat" style="left:36px;top:36px;"><span></span></div><div class="mini_seat" style="left:40px;top:36px;"><span></span></div><div class="mini_seat" style="left:44px;top:36px;"><span></span></div><div class="mini_seat" style="left:48px;top:36px;"><span></span></div><div class="mini_seat" style="left:8px;top:40px;"><span></span></div><div class="mini_seat" style="left:12px;top:40px;"><span></span></div><div class="mini_seat" style="left:16px;top:40px;"><span></span></div><div class="mini_seat" style="left:20px;top:40px;"><span></span></div><div class="mini_seat" style="left:24px;top:40px;"><span></span></div><div class="mini_seat" style="left:28px;top:40px;"><span></span></div><div class="mini_seat" style="left:32px;top:40px;"><span></span></div><div class="mini_seat" style="left:36px;top:40px;"><span></span></div><div class="mini_seat" style="left:40px;top:40px;"><span></span></div><div class="mini_seat" style="left:44px;top:40px;"><span></span></div><div class="mini_seat" style="left:48px;top:40px;"><span></span></div><div class="mini_seat sweet" style="left:56px;top:40px;"><span></span></div><div class="mini_seat sweet" style="left:60px;top:40px;"><span></span></div><div class="mini_seat" style="left:8px;top:44px;"><span></span></div><div class="mini_seat" style="left:12px;top:44px;"><span></span></div><div class="mini_seat" style="left:16px;top:44px;"><span></span></div><div class="mini_seat" style="left:20px;top:44px;"><span></span></div><div class="mini_seat" style="left:24px;top:44px;"><span></span></div><div class="mini_seat" style="left:28px;top:44px;"><span></span></div><div class="mini_seat" style="left:32px;top:44px;"><span></span></div><div class="mini_seat" style="left:36px;top:44px;"><span></span></div><div class="mini_seat" style="left:40px;top:44px;"><span></span></div><div class="mini_seat" style="left:44px;top:44px;"><span></span></div><div class="mini_seat" style="left:48px;top:44px;"><span></span></div><div class="mini_seat sweet" style="left:56px;top:44px;"><span></span></div><div class="mini_seat sweet" style="left:60px;top:44px;"><span></span></div><div class="mini_seat sweet" style="left:8px;top:48px;"><span></span></div><div class="mini_seat sweet" style="left:12px;top:48px;"><span></span></div><div class="mini_seat sweet" style="left:16px;top:48px;"><span></span></div><div class="mini_seat sweet" style="left:20px;top:48px;"><span></span></div><div class="mini_seat sweet" style="left:24px;top:48px;"><span></span></div><div class="mini_seat sweet" style="left:28px;top:48px;"><span></span></div><div class="mini_seat sweet" style="left:32px;top:48px;"><span></span></div><div class="mini_seat sweet" style="left:36px;top:48px;"><span></span></div><div class="mini_seat sweet" style="left:40px;top:48px;"><span></span></div><div class="mini_seat sweet" style="left:44px;top:48px;"><span></span></div><div class="mini_seat sweet" style="left:56px;top:48px;"><span></span></div><div class="mini_seat sweet" style="left:60px;top:48px;"><span></span></div></div>
										<div class="mini_exits"><div class="mini_exit tr"></div></div>
									</div>
									<div class="mini_region" style="height: 92px; width: 94px; top: 25px; left: 5px;"><span></span></div>
								</div>
								<div class="legend" style="width: 110px;">
									<div class="buttons">
									</div>
									<div class="seat-icon-desc">
										<span class="icon selected"><span class="icon"></span>선택</span>
										<span class="icon reserved"><span class="icon"></span>예매완료</span>
										<span class="icon notavail"><span class="icon"></span>선택불가</span>
									</div>
									<div class="seat-type"><span class="radiobutton type-rating_prime" title="Prime 석" style="display: block;">Prime Zone<span class="icon"></span></span><span class="radiobutton type-rating_comfort" title="Standard 석" style="display: block;">Standard Zone<span class="icon"></span></span><span class="radiobutton type-rating_economy" title="Economy 석" style="display: block;">Economy Zone<span class="icon"></span></span>
										
										<span class="radiobutton type-normal" style="display: none;"><span class="icon"></span>일반석</span>
										<span class="radiobutton type-couple" title="연인, 가족, 친구를 위한 둘만의 좌석" style="display: none;"><span class="icon"></span>커플석</span>
										<span class="radiobutton type-handicap" style="display: block;"><span class="icon"></span>장애인석</span>
										<span class="radiobutton type-sweetbox" title="국내 최대 넓이의 프리미엄 커플좌석" style="display: block;"><span class="icon"></span>SWEETBOX</span>
										<span class="radiobutton type-veatbox" title="음향 진동 시스템이 적용된 특별좌석" style="display: none;"><span class="icon"></span>VEATBOX</span>
										<span class="radiobutton type-4d" title="바람, 진동 등 오감으로 영화 관람, 4DX" style="display: none;"><span class="icon"></span>4DX</span>
										<span class="radiobutton type-widebox" title="일반석보다 더 넓고 편안한 좌석" style="display: none;"><span class="icon"></span>WIDEBOX</span>
										<span class="radiobutton type-cinekids last" title="365일 어린이 전용 상영관" style="display: none;"><span class="icon"></span>CINEKIDS</span>
									</div>
									
								</div>
								
							</div>
						   <div class="mouse_block"></div>
						</div>
					</div>
				</div>
				<!-- //step2 -->
		<!-- //빠른예매 -->
	</div>
	</div>
	</div>
</div>

<!-- 영화 중간 예약확인 모달 -->
<div class="modal fade" id="checkMvModal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="myModalLabel">중간예매확인</h4>
			</div>
			<div class="modal-body">
				<form>
				<div class="form-group">
						<label for="normal">날짜</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<h3 id="scdate"></h3>
					</div>
					<div class="form-group">
						<label for="cardno">영화</label> 
						<h3 id="mvname"></h3>
					</div>
					<div class="form-group">
						<label for="validdate">영화관</label> 
						<h3 id="mvarea"></h3>
					</div>
					<div class="form-group">
						<label for="validdate">영화등급</label> 
						<h3 id="mvinfo"></h3>
					</div>
					<div class="form-group">
						<label for="validdate">인원</label> 
						<h3 id="people"></h3>
					</div>
					<div class="form-group">
						<label for="validdate">좌석</label> 
						<h3 id="seatinfo"></h3>
					</div>
					<div class="form-group">
						<label for="validdate">가격</label> 
						<h3 id="price"></h3>
					</div>
					<div class="form-group">
						<input type="button" class="form-control" onclick="return check_movieform()" value="확인">
					</div>					
				</form>
			</div>
		</div>
	</div>
</div>

<!-- 영화 결제창 모달 -->
<div class="modal fade" id="MoviePayModal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="myModalLabel">Payment</h4>
			</div>
			<div class="modal-body">
				<form>						
				<div class="form-group">
						<label for="normal">카드 종류</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						 <select id="lp_card_type_mv"><option selected="selected">카드를 선택하세요</option><option>BC카드</option><option>국민카드</option><option>삼성카드(올앳포함)</option><option>신한카드</option><option>현대카드</option><option>KEB하나카드(구,외환)</option><option>우리(평화)카드</option><option>롯데/아멕스카드</option><option>시티카드(구,한미)</option><option>신세계카드</option><option>NH카드</option><option>하나카드(구,하나SK)</option><option>광주VISA카드</option><option>산은캐피탈</option><option>수협카드</option><option>KDB산업은행카드</option><option>전북은행카드</option><option>제주은행카드</option><option>우체국카드</option><option>스탠다드차타드은행카드</option><option>MG체크카드</option><option>현대증권카드</option><option>기업은행카드</option></select> 
					</div>
					<div class="form-group">
						<label for="cardno">카드번호</label> <input type="text" class="form-control" id="cardnomv"
							name="cardnomv" placeholder="숫자만 입력하세요. 예)0000111122223333">
					</div>
					<div class="form-group">
						<label for="validdate">비밀번호 (앞2자리)</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
						<input type="password" class="form-control" id="pwmv"
							name="pwmv">

					</div>
					<div class="form-group">
						<label for="validdate">유효기간</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
						<select id="validyearmv" name="validyear">
							<option value='17'>2017</option> <option value='18'>2018</option> <option value='19'>2019</option>
							<option value='20'>2020</option> <option value='21'>2021</option> <option value='22'>2022</option>
							<option value='23'>2023</option> <option value='24'>2024</option> <option value='25'>2025</option>
							<option value='26'>2026</option> <option value='27'>2027</option> <option value='28'>2028</option>
							<option value='29'>2029</option> <option value='30'>2030</option> <option value='31'>2031</option>
							<option value='32'>2032</option> <option value='33'>2033</option> <option value='34'>2034</option>
							<option value='35'>2035</option> <option value='36'>2036</option>
							</select> 년
							&nbsp;&nbsp;&nbsp;
							<select id="validmonthmv" name="validmonth">
							<option value='01'>1</option> <option value='02'>2</option> <option value='03'>3</option>
							<option value='04'>4</option> <option value='05'>5</option> <option value='06'>6</option>
							<option value='07'>7</option> <option value='08'>8</option> <option value='09'>9</option>
							<option value='10'>10</option> <option value='11'>11</option> <option value='12'>12</option>
							</select> 월
					</div>
					<div class="form-group">
						<label for="cardno">생년월일</label> <input type="text" class="form-control" id="birthmv"
							name="bitrhmv" placeholder="예)990201">
					</div>
					<div class="form-group">
						<input type="button" class="form-control" onclick="return payment();" value="예매">
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<!-- 버스 출발/도착정보 모달 -->
<div class="modal fade" id="busInfoModal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="myModalLabel">버스 노선 정보 선택</h4>
			</div>
			<div class="modal-body">
				<form id="busInformation">
				
				</form>
			</div>
		</div>
	</div>
</div>

<!-- 버스 좌석 모달 -->
<div id="seatModal" class="modal fade" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="myModalLabel">좌석선택</h4>
			</div>
			<div class="modal-body2">
			
			</div>
		</div>
	</div>
	
</div>

<!-- 버스 중간예약 확인 모달 -->
<div class="modal fade" id="checkModal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="myModalLabel">중간예매확인</h4>
			</div>
			<div class="modal-body">
				<form>
				<div class="form-group">
						<label for="normal">출발일시</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<h3 id="busdate"></h1>
					</div>
					<div class="form-group">
						<label for="cardno">출발지/도착지</label> 
						<h3 id="busarea"></h1>
					</div>
					<div class="form-group">
						<label for="validdate">버스등급</label> 
						<h3 id="busgrade"></h1>
					</div>
					<div class="form-group">
						<label for="validdate">좌석</label> 
						<h3 id="busseat"></h1>
					</div>
					<div class="form-group">
						<label for="validdate">가격</label> 
						<h3 id="busprice"></h1>
					</div>
					<div class="form-group">
						<input type="button" class="form-control" onclick="return check_form()" value="확인">
					</div>					
				</form>
			</div>
		</div>
	</div>
</div>

<!-- 버스 결제 모달 -->
<div class="modal fade" id="payModal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="myModalLabel">Payment</h4>
			</div>
			<div class="modal-body">
				<form>
				<div class="form-group">
						<label for="normal">카드 종류</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						 <input type="radio" id="normal" value="0" name="card" checked="checked"> 일반
							&nbsp;&nbsp;&nbsp;
							<input type="radio" id="company"
							name="card"> 법인
					</div>
					<div class="form-group">
						<label for="cardno">카드번호</label> <input type="text" class="form-control" id="cardno"
							name="cardno" placeholder="숫자만 입력하세요. 예)0000111122223333">
					</div>
					<div class="form-group">
						<label for="validdate">유효기간</label> <select id="validyear" name="validyear">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<option value='2017'>2017</option> <option value='2018'>2018</option> <option value='2019'>2019</option>
							<option value='2020'>2020</option> <option value='2021'>2021</option> <option value='2022'>2022</option>
							<option value='2023'>2023</option> <option value='2024'>2024</option> <option value='2025'>2025</option>
							<option value='2026'>2026</option> <option value='2027'>2027</option> <option value='2028'>2028</option>
							<option value='2029'>2029</option> <option value='2030'>2030</option> <option value='2031'>2031</option>
							<option value='2032'>2032</option> <option value='2033'>2033</option> <option value='2034'>2034</option>
							<option value='2035'>2035</option> <option value='2036'>2036</option>
							</select> 년
							&nbsp;&nbsp;&nbsp;
							<select id="validmonth" name="validmonth">
							<option value='01'>1</option> <option value='02'>2</option> <option value='03'>3</option>
							<option value='04'>4</option> <option value='05'>5</option> <option value='06'>6</option>
							<option value='07'>7</option> <option value='08'>8</option> <option value='09'>9</option>
							<option value='10'>10</option> <option value='11'>11</option> <option value='12'>12</option>
							</select> 월
					</div>
					<div class="form-group">
						<label for="cardno">생년월일</label> <input type="text" class="form-control" id="birth"
							name="bitrh" placeholder="예)990201">
					</div>
					<div class="form-group">
						<input type="button" class="form-control" onclick="return writeCardInfo();" value="예매">
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
</body>
</html>