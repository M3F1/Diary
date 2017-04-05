<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html>
<head>
<title>Diary</title>
</head>
<body>
	<tiles:insertDefinition name="defaultTemplate">
		<tiles:putAttribute name="body">
			<h1>일정</h1>
	일정입력
	<input type="text" name="content">
			<a href="">입력</a>
		</tiles:putAttribute>
	</tiles:insertDefinition>
</body>
</html>