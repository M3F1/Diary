<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		list();

		$("#user_id").keyup(function() {

			var user_id = $("#user_id").val();

			$.ajax({

				type : "get",
				url : "selectMember",
				data : {
					user_id : user_id
				},
				dataType : "json",
				success : function(data) {
					console.log(data);
					if (data.user_id == null) {
						$("#idLabel").text("* 사용자가 없습니다");
					} else {
						
						$("#idLabel").text("* 사용자가 맞는지 확인하세요")
						var html = "";
						html += "<tr>";
						html += "<td>" + data.user_id + "</td></tr>";
						html += "<td>" + data.user_nm + "</td>";
						html += "</tr>";

						$("#member").html(html);
					}
					list();
				},
				error : function(e) {
					console.log(e);
				}
			})
		});

		function list() {

			var user_id2 = $("#user_id2").val();

			$.ajax({
				type : "GET",
				url : "frlist",
				data : {
					user_id : user_id2
				},
				dataType : "json",
				success : function(data) {
					console.log(data);
					
					var html = "";

					$.each(data, function(data, item) {

						html += "<tr>";
						html += "<td>" + item.USER_ID + "</td></tr>";
						html += "<td>" + item.USER_NM + "</td></tr>";
						html += "<td>" + item.USER_PHONE + "</td>";
						html += "</tr>";
					})
					$("#frlist").html(html);
					
				},
				error : function(e) {
					console.log(e);
				}
			})
		}
	});
</script>
</head>
<body>
	<h3>[ 친구찾기 ]</h3>

	<label for="id">ID(EMAIL)검색</label>
	<div id="idLabel"></div>
	<form action="addFriend" method="get">
		<input type="text" id="user_id" name="user_id"> <input
			type="hidden" id="user_id2" name="user_id2"
			value="${sessionScope.user_id}"> <input type="submit"
			value="친구 등록">
	</form>
	<table id="member">

	</table>
	<br>

	<h3>[ 리스트 ]</h3>

	<table id="frlist">

	</table>
</body>
</html>