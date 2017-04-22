<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<style>
.sc_stdt1 {
	width: 100px;
	height: 50px;
	background: #009999;
}
</style>
<script src="resources/js/bootstrap.min.js"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script type="text/javascript">
	$(document).ready(function() {

		var text;

		$('.container').on('popover', function() {

			text = $(this).text();
		});


		$("#schedule").on('hover', function() {

			$.ajax({
				type : "POST",
				url : "searchSchedule",
				data : {
					sc_stdt : sc_stdt
				},
				success : function(data) {
					console.log(data);
					var html = "";
					$.each(data, function(data, item) {

						html += "<table><tr>";
						html += "<td>" + item.SC_STDT + "</td></tr>";
						html += "<td>" + item.SC_ENDT + "</td></tr>";
						html += "<td>" + item.SC_CON + "</td></tr>";
						html += "<td>" + item.SC_WT + "</td></tr>";
						html += "</tr></table>";
					})
					$("#schedule").text(text);
				},
				error : function(e) {
					console.log(e);
				}
			})
		});
		
	})
</script>
</head>
<body>

	<!--  <table id="schedule">
	</table> -->

	<div class="container">
		<h3>Calendar</h3>
		<ul class="list-inline">
			<li><a href="#" title="Header" data-toggle="popover"
				data-placement="top" data-content="Content">4일</a></li>
			<li><a href="#" title="Header" data-toggle="popover"
				data-placement="top" data-content="Content">14일</a></li>
		</ul>
	</div>

	<a href="#" data-toggle="popover" title="Popover Header"
		data-content="Some content inside the popover">Toggle popover</a>
	<a href="#" title="Header" data-toggle="popover" data-trigger="hover"
		data-content="Some content">Hover over me</a>
</body>
</html>