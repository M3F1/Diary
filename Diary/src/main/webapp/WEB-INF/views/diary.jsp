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
<title>Diary</title>
</head>
<body>
	<header class="header fixed-header navbar-fixed-top" id="calHeader">
		<section class="container">
			<!-- LOGO START -->
			<a href="/smart" class="site-logo"> <img alt="Logo" src="resources/img/logo.png">
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
						<li><a href="signUpForm">Sign Up</a></li>
						<li><a href="#" id="loginBtn" data-toggle="modal"
							data-target="#loginModal">Login</a></li>
						<li><a href="about.html">About Us</a></li>
						<li><a href="contact.html">Contact</a></li>
					</ul>
				</div>
				<!-- MENU LIST END -->
			</nav>
			<!-- NAV MENU END -->
		</section>
	</header>
<!-- LOGIN MODAL START -->
<div class="modal fade" id="loginModal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="myModalLabel">Login</h4>
			</div>
			<div class="modal-body">
				<form action="">
					<div class="form-group">
						<label for="id">ID</label> <input type="text" class="form-control" id="id"
							name="id">
					</div>
					<div class="form-group">
						<label for="id">Password</label> <input type="password" class="form-control"
							id="password" name="password">
					</div>
					<div class="form-group">
						<input type="submit" class="form-control" value="로그인">
					</div>
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
				<div class="slider-bg-img"></div>
				<!-- SLIDE BACKGROUND END -->
				<!-- SLIDE CAPTION START -->
				<div class="carousel-caption">
					<div class="col-xs-offset-1 col-xs-10 iconList">
						<a href="javascript:movie();"><i class="fa fa-film fa-3x" aria-hidden="true"></i></a>
						<a href="javascript:bus();"><i class="fa fa-bus fa-3x" aria-hidden="true"></i></a>
						<a href="javascript:train();"><i class="fa fa-train fa-3x" aria-hidden="true"></i></a>
						<a href="javascript:write();"><i class="fa fa-keyboard-o fa-3x" aria-hidden="true"></i></a>
						<!-- <input type="text" class="form-control" id="write"><br> <span id="written"></span> -->
					</div>
					<br />
					<div class="form-group col-xs-offset-1 col-xs-10 textBlock">
						<span class="tooltiptext"></span>
						<!--<button class="btn btn-default" id="scheduleSearch">스케쥴 검색</button>-->
						<input type="text" class="form-control write"><br>
						<span class="written"></span>
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
</body>
</html>