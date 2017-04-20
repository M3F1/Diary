<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="utf-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>SMART DIARY - Home</title>
   <link rel="shortcut icon" href="resources/img/favicon.ico" />
   <!-- CSS START -->
   <link href="resources/css/bootstrap.min.css" rel="stylesheet">
   <link href="resources/css/style.css" rel="stylesheet">
   <style>
   	.slider-bg-img:after {
   		background: transparent;
   	}
   </style>
   <!-- CSS END -->
   <!--[if lt IE 9]>
         <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
         <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <![endif]-->
</head>

<body class="home">
   <!-- SLIDER START -->
   <section class="slider-area">
      <div class="slider-bg-img" style="background-image:url(resources/img/home-bg.jpg);">
      	<a href="diary">diary 보기</a>
      	<div class="title">
      		<img src="resources/img/title.png" />
      	</div>
      	<div class="btnGroup">
	      	<a href="#" id="loginBtn" data-toggle="modal" data-target="#loginModal">LOGIN</a>&nbsp;&nbsp;&nbsp;<a href="#" data-toggle="modal" data-target="#signUpModal">SIGN UP</a>
      	</div>
      </div>
      <a href="#header" class="slider-down"><i class="fa fa-angle-down bounce"></i></a>
   </section>
   <!-- SLIDER END -->
   <!-- HEADER START -->
   <header class="header" id="header">
      <section class="container">
         <!-- LOGO START -->
         <a href="home" class="site-logo">
            <img alt="Logo" src="resources/img/logo.png">
         </a>
         <!-- LOGO END -->
         <!-- SEARCH START -->
         <div class="header-search">
            <div class="header-search-form-button"><i class="fa fa-search"></i></div>
            <div class="header-search-form">
               <form role="search" method="get" class="search-form">
                  <div>
                     <input type="text" placeholder="Search..." name="s" class="search">
                     <button type="submit">SEARCH</button>
                  </div>
               </form>
            </div>
         </div>
         <!-- SEARCH END -->
         <!-- NAV MENU START -->
         <nav class="navbar">
            <!-- MOBILE MENU START -->
            <div class="navbar-header">
               <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                 </button>
            </div>
            <!-- MOBILE MENU END -->
            <!-- MENU LIST START -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
               <ul class="nav navbar-nav">
                  <li><a href="#" id="loginBtn" data-toggle="modal"
						data-target="#loginModal">Login</a></li>
                  <li><a href="signUpForm">Sign Up</a></li>
                  <li><a href="howTo">How To</a></li>
                  <li><a href="aboutUS">About Us</a></li>
             
               </ul>
            </div>
            <!-- MENU LIST END -->
         </nav>
         <!-- NAV MENU END -->
      </section>
   </header>
   <!-- HEADER END -->
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
					<form action="login" method="POST">
						<div class="form-group">
							<label for="id">ID</label> <input type="text" class="form-control" id="user_id"
								name="user_id">
						</div>
						<div class="form-group">
							<label for="id">Password</label> <input type="password" class="form-control"
								id="user_pw" name="user_pw">
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
	<!-- SIGN UP MODAL START -->
	<div class="modal fade" id="signUpModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">Sign Up</h4>
				</div>
				<div class="modal-body">
					<form action="signUp" method="POST">
						<div class="form-group">
							<label for="user_id">아이디</label>
							<input type="text" class="form-control" name="user_id" id="user_id"
								placeholder="아이디를 입력하세요">
						</div>
						<div class="form-group">
							<label for="user_pw">비밀번호</label> <input type="password"
								class="form-control" name="user_pw" id="user_pw"
								placeholder="비밀번호를 입력하세요">
						</div>
						<div class="form-group">
							<label for="re_user_pw">비밀번호 확인</label> <input type="password"
								class="form-control" id="re_user_pw" placeholder="비밀번호를 입력하세요">
						</div>
						<div class="form-group">
							<label for="nm">이름</label> <input type="text" class="form-control"
								name="user_nm" id="user_nm" placeholder="이름을 입력하세요">
						</div>
						<div class="form-group">
							<label for="user_birth">생년월일</label> <input type="text"
								class="form-control" name="user_birth" id="user_birth"
								placeholder="주민등록번호 앞번호 6자리를 입력하세요">
						</div>
						<div class="form-group">
							<label for="user_phone">휴대전화</label> <input type="text"
								class="form-control" name="user_phone" id="user_phone"
								placeholder="휴대전화 번호를  -없이 입력하세요">
						</div>
						<label for="phone">주소</label><br> <input type="text"
							id="sample6_postcode" placeholder="우편번호"> <input
							type="button" onclick="sample6_execDaumPostcode()" value="우편번호 찾기"><br>
						<input type="text" name="user_add1" id="user_add1" placeholder="주소"><br>
						<br> <input type="submit" class="form-control" id="joinBtn"
							value="가입">
					</form>
				</div>
			</div>
		</div>
	</div>
	<!-- SIGN UP MODAL END -->
   <!-- SITE CONTENT START -->
   <section class="site-content-wrapper">
      <!-- FULL GRID CONTENT START -->
      <section class="full-grid-content">
         <!-- BLOG LIST ITEM START -->
         <article style="background-image:url(resources/img/news1.jpg)">
            <a href="javascript:;">
               <section class="container">
                  <div class="full-grid-item">
                     <div class="post-list-information">
                        <span class="category">Sport</span>
                        <span>//</span>
                        <span class="date">22.03.2015</span>
                     </div>
                     <div class="full-grid-title">
                        <h2>Schedule that can be checked at a glance</h2>
                     </div>
                     <p>You can display all schedules on one screen via the calendar, <br>you can also check the detailed schedule of the day.</p>
                  </div>
               </section>
            </a>
         </article>
         <!-- BLOG LIST ITEM END -->
         <!-- BLOG LIST ITEM START -->
         <article style="background-image:url(resources/img/news2.jpg)">
            <a href="javascript:;">
               <section class="container">
                  <div class="full-grid-item">
                     <div class="post-list-information">
                        <span class="category">Sport</span>
                        <span>//</span>
                        <span class="date">22.03.2015</span>
                     </div>
                     <div class="full-grid-title">
                        <h2>Provide various services by entering simple text schedule</h2>
                     </div>
                     <p>After selecting the date and entering the schedule, <br>
We provide various information and services concerning schedule contents,<br>
Schedule management is convenient and easy.</p>
                  </div>
               </section>
            </a>
         </article>
         <!-- BLOG LIST ITEM END -->
         <!-- BLOG LIST ITEM START -->
         <article style="background-image:url(resources/img/news3.jpg)">
            <a href="javascript:;">
               <section class="container">
                  <div class="full-grid-item">
                     <div class="post-list-information">
                        <span class="category">Sport</span>
                        <span>//</span>
                        <span class="date">22.03.2015</span>
                     </div>
                     <div class="full-grid-title">
                        <h2>Sharing of schedule</h2>
                     </div>
                     <p>Share your schedule with friends, family and colleagues.</p>
                  </div>
               </section>
            </a>
         </article>
         <!-- BLOG LIST ITEM END -->
      </section>
      <!-- FULL GRID CONTENT END -->
   </section>
   <!-- SITE CONTENT END -->
   <!-- FOOTER START -->
   <footer class="footer">
      <section class="container">
         <!-- FOOTER SOCIAL MEDIA START -->
         <ul class="footer-social-media">
            <li><a href="javascript:;" target="_blank"><i class="fa fa-facebook"></i></a></li>
            <li><a href="javascript:;" target="_blank"><i class="fa fa-twitter"></i></a></li>
            <li><a href="javascript:;" target="_blank"><i class="fa fa-google-plus"></i></a></li>
            <li><a href="javascript:;" target="_blank"><i class="fa fa-instagram"></i></a></li>
            <li><a href="javascript:;" target="_blank"><i class="fa fa-vine"></i></a></li>
            <li><a href="javascript:;" target="_blank"><i class="fa fa-youtube"></i></a></li>
         </ul>
         <!-- FOOTER SOCIAL MEDIA END -->
		<br />
         <!-- COPYRIGHT START -->
         <p>&copy; 2015 Copyright Ruxenna Blog Theme - All rights reserved</p>
         <!-- COPYRIGHT END -->
      </section>
   </footer>
   <!-- FOOTER END -->

   <!-- FOOTER BOTTOM START -->
   <section class="footer-bottom">
      <div class="top-icon">
         <i class="fa fa-chevron-up"></i>
         <span>Top</span>
      </div>
   </section>
   <!-- FOOTER BOTTOM END -->
   <!-- JAVASCRIPT START -->
   <script src="resources/js/jquery-3.1.1.js"></script>
   <script src="resources/js/bootstrap.min.js"></script>
   <script src="resources/js/ruxen.js"></script>
   <!-- JAVASCRIPT END -->
</body>

</html>