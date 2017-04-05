<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html>
<head>
<title>Main</title>
</head>
<body>
	<tiles:insertDefinition name="defaultTemplate">
		<tiles:putAttribute name="body">
			<h1>This is body.</h1>
		</tiles:putAttribute>
	</tiles:insertDefinition>
</body>
</html>
