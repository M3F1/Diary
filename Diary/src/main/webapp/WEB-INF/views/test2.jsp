<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Content-Script-Type" content="text/javascript">
<meta http-equiv="Content-Style-Type" content="text/css">
<script type="text/javascript" src="resources/js/jquery-3.1.1.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap-theme.min.css">

<style type="text/css">
.tbl_seat01 {border-top:2px solid #dedede; border-bottom:2px solid #dedede;}
.tbl_seat01 td {height:39px; text-align:center; background:#d3e4f4; border-right:1px solid #fff; border-bottom:1px solid #fff;}
.tbl_seat01 td.lady {background:#c2e395;}
.tbl_seat01 td.door {background:#eaeaea;}
.tbl_seat01 td.nobg {background:#fff;}
.tbl_seat01 td.last {border-right:0;}
.tbl_seat01 td label {height:16px; line-height:14px; display:block;}
</style>

<script type="text/javascript" src="resources/js/autoReservation.js"></script>

<title>Insert title here</title>
</head>
<body>
<a href="javascript:setStartingPoint('서울경부')">출발지</a>
<a href="javascript:setDestination('천안')">도착지</a>
<a href="javascript:setBusdate('201704121000')">년도선택</a>
<a href="javascript:setSeatGrade('우등')">좌석등급</a>
<a href="javascript:setHuman('2')">사람선택</a>
<a href="javascript:selectTicket()">티켓선택</a>
<a id="getBusSeat" href="#" data-target="#content" data-toggle="modal">좌석보여주기</a>
<a href="javascript:writeCardInfo()">카드결제</a>
<div id="content" class="modal fade" oncontextmenu="return false" ondragstart="return false" onselectstart="return false"></div>




</body>
</html>