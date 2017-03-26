<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="resources/css/style.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="resources/js/signUpForm.js"></script>
<title>회원가입</title>
</head>
<body>
	<h1>[ 회원가입 ]</h1>
	<br>
	<br>
	<div class="container">
		<form action="signUp" method="post" class="col-xs-offset-2 col-xs-8"
			onsubmit="return validationCheck()">
			<div class="form-group">
				<label for="id">아이디</label><div id="idLabel"></div> <input type="text" class="form-control"
					name="user_id" id="user_id" placeholder="아이디를 입력하세요">
			</div>
			<div class="form-group">
				<label for="user_pw">비밀번호</label> <input type="password"
					class="form-control" name="user_pw" id="user_pw"
					placeholder="비밀번호를 입력하세요">
			</div>
			<div class="form-group">
				<label for="user_pw">비밀번호 확인</label> <input type="password"
					class="form-control" id="re_user_pw" placeholder="비밀번호를 입력하세요">
			</div>
			<div class="form-group">
				<label for="name">이름</label> <input type="text" class="form-control"
					name="user_nm" id="user_nm" placeholder="이름을 입력하세요">
			</div>
			<div class="form-group">
				<label for="birth">생년월일</label> <input
					type="text" class="form-control" name="user_birth" id="user_birth"
					placeholder="주민등록번호 앞번호 6자리를 입력하세요">
			</div>
			<div class="form-group">
				<label for="phone">휴대전화</label> <input type="text"
					class="form-control" name="user_phone" id="user_phone"
					placeholder="휴대전화 번호를  -없이 입력하세요">
			</div>
			<div class="form-group">
				<label for="address1">주소</label> <input type="text"
					class="form-control" name="user_add1" id="user_add1"
					placeholder="주소를 입력하세요">
			</div>
			<br>
			<div class="form-group">
				<input type="submit" class="form-control" value="가입">
			</div>
		</form>
	</div>
</body>

</html>