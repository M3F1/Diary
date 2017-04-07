<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<style type="text/css">
/* 필요한 스타일 선언 */

</style>
<title><tiles:insertAttribute name="title" ignore="true" /></title>
<!--타이틀이 null인 경우에는 무시한다-->
</head>
<body>
	<div class="page">
		<div class="content">
			<tiles:insertAttribute name="body" />
		</div>
		<tiles:insertAttribute name="footer" />
	</div>
</body>
</html>
