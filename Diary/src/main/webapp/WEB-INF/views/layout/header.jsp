<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
<header class="header" id="header">
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