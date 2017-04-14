<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<style>
.sc_stdt1 {
	width: 100px;
	height: 50px;
	background: #009999;
}
</style>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script type="text/javascript">
	$(document).ready(function() {

		var sc_stdt = $('#20170404').attr("id");
		console.log(sc_stdt);

		$('#20170404').hover(function() {

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
						
						html += "<tr>";
						html += "<td>" + item.SC_STDT + "</td></tr>";
						html += "<td>" + item.SC_ENDT + "</td></tr>";
						html += "<td>" + item.SC_CON + "</td></tr>";
						html += "<td>" + item.SC_WT + "</td></tr>";
					})
					$("#schedule").html(html);
				},
				error : function(e) {
					console.log(e);
				}
			})
		})
	})
</script>
</head>
<body>

	<table>
		<tr>
		<td id='20170404' >2017년 4월 4일</td>
		</tr>
		<tr>
		<td id='20170414'>2017년 4월 14일</td>
		</tr>
	</table>

	<table id="schedule">



	</table>
</body>
</html>