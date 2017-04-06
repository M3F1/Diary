<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html>
<head>
<script src="resources/js/calendarForm.js"></script>
<title>Diary</title>
</head>
<body>
	<tiles:insertDefinition name="defaultTemplate">
		<tiles:putAttribute name="body">
			<!-- icon 선택 및 input text part -->
			<div class="col-xs-offset-1 col-xs-10" id="iconList">
				<a href="javascript:movieList()"><i class="fa fa-film fa-3x" aria-hidden="true"></i></a>
				<a href="javascript:inputSchedule('버스')"><i class="fa fa-bus fa-3x" aria-hidden="true"></i></a>
				<a href="javascript:inputSchedule('기차')"><i class="fa fa-train fa-3x" aria-hidden="true"></i></a>
				<a href="javascript:inputSchedule('직접 작성')"><i class="fa fa-keyboard-o fa-3x" aria-hidden="true"></i></a>
				<!-- <input type="text" class="form-control" id="write"><br> <span id="written"></span> -->
			</div>
			<br>
			<br>
			
			<!-- calendar part -->
			<h2 class="text-center">
				<a class="left carousel-control left-slider-arrow" href="javascript:lastMonth();" id="lastMonth">
					<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
					<span class="sr-only">Previous</span>
				</a>
			
				<span id="yearSearch"></span>년 <span id="monthSearch"></span>월
			
				<a class="left carousel-control right-slider-arrow" href="javascript:nextMonth();" id="nextMonth">
					<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
					<span class="sr-only">Next</span>
				</a>
			</h2>
			<div id="calendar"></div>
		</tiles:putAttribute>
	</tiles:insertDefinition>
</body>
</html>