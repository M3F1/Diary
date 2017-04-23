<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html>
<head>
<script src="resources/js/jquery-3.1.1.js"></script>
<script type="text/javascript">
$(document).ready(function () {
	var html="";
	$.ajax({
		type : "get",
		url : "getmovie",
		data : {	
		},
		success : function(data){
			html += '<form>';
			html += '<select multiple id="movieselect">';
			 $.each(data,function(i,item){
	             html+='<option>'+item+'</option>';
	           });
			 html+='</select>';
			 html+='<input type="button" class="form-control" value="선택" onclick="setmovie()">';
			 html+='</form>';
			 $("#loginModal #movieList").val(html);
			 console.log(html);
		},
		error : function(request,status,error){
			console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
});
</script>
</head>
<body class="home">
   <!-- SLIDER START -->
   <section class="slider-area">
      <div class="slider-bg-img" style="background-image:url(resources/img/home-bg.jpg);">
      	<a href="diary">diary 보기</a>
      	<div class="title">
      		<img src="resources/img/title.png" />
      	</div>
      	<div class="btnGroup">
	      	<a href="#" id="loginBtn" data-toggle="modal" data-target="#loginModal">LOGIN</a>&nbsp;&nbsp;&nbsp;<a href="#" data-toggle="modal" data-target="#signUpModal">SIGN UP</a>
      	</div>
      </div>
      <a href="#header" class="slider-down"><i class="fa fa-angle-down bounce"></i></a>
   </section>
   <!-- SLIDER END -->
   <tiles:insertDefinition name="defaultTemplate">
   <tiles:putAttribute name="title">SMART DIARY - Home</tiles:putAttribute>
   <tiles:putAttribute name="body">
	
	   <!-- SITE CONTENT START -->
	   <section class="site-content-wrapper">
	      <!-- FULL GRID CONTENT START -->
	      <section class="full-grid-content">
	         <!-- BLOG LIST ITEM START -->
	         <article style="background-image:url(resources/img/news1.jpg)">
	            <a href="javascript:;">
	               <section class="container">
	                  <div class="full-grid-item">
	                     <div class="post-list-information">
	                        <span class="category">Point 1</span>
	                     </div>
	                     <div class="full-grid-title">
	                        <h2>Schedule that can be checked at a glance</h2>
	                     </div>
	                     <p>You can display all schedules on one screen via the calendar, <br>you can also check the detailed schedule of the day.</p>
	                  </div>
	               </section>
	            </a>
	         </article>
	         <!-- BLOG LIST ITEM END -->
	         <!-- BLOG LIST ITEM START -->
	         <article style="background-image:url(resources/img/news2.jpg)">
	            <a href="javascript:;">
	               <section class="container">
	                  <div class="full-grid-item">
	                     <div class="post-list-information">
	                        <span class="category">Point 2</span>
	                     </div>
	                     <div class="full-grid-title">
	                        <h2>Provide by entering simple text schedule</h2>
	                     </div>
	                     <p>After entering the schedule, We provide various information and services<br>
							concerning schedule contents, Schedule management is convenient and easy.</p>
	                  </div>
	               </section>
	            </a>
	         </article>
	         <!-- BLOG LIST ITEM END -->
	         <!-- BLOG LIST ITEM START -->
	         <article style="background-image:url(resources/img/news3.jpg)">
	            <a href="javascript:;">
	               <section class="container">
	                  <div class="full-grid-item">
	                     <div class="post-list-information">
	                        <span class="category">Point 3</span>
	                     </div>
	                     <div class="full-grid-title">
	                        <h2>Sharing of schedule</h2>
	                     </div>
	                     <p>Share your schedule with friends, family and colleagues.</p>
	                  </div>
	               </section>
	            </a>
	         </article>
	         <!-- BLOG LIST ITEM END -->
	      </section>
	      <!-- FULL GRID CONTENT END -->
	   </section>
	   <!-- SITE CONTENT END -->
	</tiles:putAttribute>
   </tiles:insertDefinition>
</body>
</html>