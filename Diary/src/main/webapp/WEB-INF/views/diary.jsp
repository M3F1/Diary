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
			<div class="container">
				<!--<form id="input" onsubmit="return inputSchedule();">-->
				<div class="col-xs-offset-1 col-xs-10" id="iconList">
					<a href="javascript:movieList()"><i class="fa fa-film fa-3x" aria-hidden="true"></i></a>
					<a href="javascript:inputSchedule('버스')"><i class="fa fa-bus fa-3x" aria-hidden="true"></i></a>
					<a href="javascript:inputSchedule('기차')"><i class="fa fa-train fa-3x" aria-hidden="true"></i></a>
					<a href="javascript:inputSchedule('직접 작성')"><i class="fa fa-keyboard-o fa-3x" aria-hidden="true"></i></a>
					<!--<button class="btn btn-default" id="scheduleSearch">스케쥴 검색</button>-->
					<input type="text" class="form-control" id="write"><br> <span
						id="written"></span>
				</div>
				<!--</form>-->
				<br>
				<br>
				<h2 class="text-center">
					<div class="row">
						<div class="col-xs-2">
							<a href="javascript:lastMonth();" id="lastMonth">&lt;</a>
						</div>
						<div class="col-xs-8">
							<span id="yearSearch"></span>년 <span id="monthSearch"></span>월
						</div>
						<div class="col-xs-2">
							<a href="javascript:nextMonth();" id="nextMonth">&gt;</a>
						</div>
					</div>
				</h2>
				<div id="calendar"></div>
			</div>
		</tiles:putAttribute>
	</tiles:insertDefinition>
</body>
</html>