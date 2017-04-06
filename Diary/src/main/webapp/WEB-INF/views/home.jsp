<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html>
<head>
<title>Main</title>
</head>
<body>
<<<<<<< HEAD
	<tiles:insertDefinition name="defaultTemplate">
		<tiles:putAttribute name="body">
			<h1>This is body.</h1>
		</tiles:putAttribute>
	</tiles:insertDefinition>
=======
<h1>메인</h1>
<h2>${sessionScope.user_id}님 안녕!</h2>
<form action="login" method="post">
id<input type="text" name="user_id" id="user_id">
pw<input type="password" name="user_pw" id="user_pw">
<input type="submit" id="btn" value="로그인">
<br>
<a href="signUpForm">회원가입</a>
</form>
>>>>>>> branch 'master' of https://github.com/M3F1/Diary.git
</body>
</html>
