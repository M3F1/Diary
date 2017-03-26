<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Diary</title>
</head>
<body>
<h1>메인</h1>

<form action="login" method="post">
id<input type="text" name="user_id" id="user_id">
pw<input type="password" name="user_pw" id="user_pw">
<input type="submit" id="btn" value="로그인">
<br>
<a href="signUpForm">회원가입</a>
</form>
</body>
</html>
