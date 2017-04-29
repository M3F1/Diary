<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<header class="header" id="header">
	<section class="container">
		<!-- LOGO START -->
		<a href="/smart" class="site-logo"> <img alt="Logo"
			src="resources/img/logo.png">
		</a>
		<!-- LOGO END -->

		<!-- NAV MENU START -->
		<nav class="navbar">
			<!-- MOBILE MENU START -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
			</div>
			<!-- MOBILE MENU END -->
			<!-- MENU LIST START -->
			<div class="collapse navbar-collapse"
				id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav">
					<li><a href="#" id="loginBtn" data-toggle="modal"
						data-target="#loginModal">Login</a></li>
					<li><a href="#" data-toggle="modal" data-target="#signUpModal">Sign
							Up</a></li>
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
<div class="modal fade" id="loginModal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="myModalLabel"><img src='resources/img/icon/login.png' width='30px' height='30px'></h4>
			</div>
			<div class="modal-body">
				<form action="login" method="POST">
					<div class="form-group">
						<label for="id">ID</label> <input type="text" class="form-control"
							id="id" name="id"> <input type="hidden"
							id="movieList" name="movieList" value='' />
					</div>
					<div class="form-group">
						<label for="id">Password</label> <input type="password"
							class="form-control" id="pw" name="pw">
					</div>
					<div class="form-group">
						<input type="submit" class="form-control" value="LOGIN">
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<!-- LOGIN MODAL END -->
<!-- SIGNUP MODAL START -->
<div class="modal fade" id="signUpModal" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="myModalLabel"><img src='resources/img/icon/link.png' width='30px' height='30px'></h4>
			</div>
			<div class="modal-body">                                                                
				<form action="signUp" method="post" onsubmit="return validationCheck()">
					<div class="form-group">
						<div id="idLabel"></div><br>
						<input type="text" class="form-control" name="user_id"
							id="user_id" placeholder="emailID">
					</div>
					<div class="form-group">
						<input type="password" class="form-control" name="user_pw"
							id="user_pw" placeholder="password">
					</div>
					<div class="form-group">
						<input type="password" class="form-control" id="re_user_pw"
							placeholder="password confirm">
					</div>
					<div class="form-group">
						<input type="text" class="form-control" name="user_nm"
							id="user_nm" placeholder="name">
					</div>
					<div class="form-group">
						<input type="text" class="form-control" name="user_birth"
							id="user_birth" placeholder="birthdate(yymmdd)">
					</div>
					<div class="form-group">
						<input type="text" class="form-control" name="user_phone"
							id="user_phone" placeholder="cellphone number">
					</div>
					<div class="form-group form-inline">
						<input type="text" class="form-control" id="sample6_postcode" placeholder="postcode"  readonly="readonly">
						<input type="button" onclick="sample6_execDaumPostcode()"
							value="우편번호 찾기"><br>
					</div>
					<div class="form-group">
						<input type="text"
							name="user_add1" id="user_add1" class="form-control" placeholder="address"><br>
						<input type="submit" class="form-control" id="joinBtn"
							value="SIGNUP">
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
<!-- SIGNUP MODAL END -->
