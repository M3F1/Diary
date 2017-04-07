<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html>
<head>
<title>Diary</title>
</head>
<body>
	<br /><br /><br />
	<tiles:insertDefinition name="calendarTemplate">
		<tiles:putAttribute name="body">
			<!-- icon 선택 및 input text part -->
			<div class="col-xs-offset-1 col-xs-10" id="iconList">
				<a href="javascript:movieList()"><i class="fa fa-film fa-3x" aria-hidden="true"></i></a>
				<a href="javascript:inputSchedule('버스')"><i class="fa fa-bus fa-3x" aria-hidden="true"></i></a>
				<a href="javascript:inputSchedule('기차')"><i class="fa fa-train fa-3x" aria-hidden="true"></i></a>
				<a href="javascript:inputSchedule('직접 작성')"><i class="fa fa-keyboard-o fa-3x" aria-hidden="true"></i></a>
				<!-- <input type="text" class="form-control" id="write"><br> <span id="written"></span> -->
			</div>

			
			<!-- calendar part -->
			<section class="slider-area">
		<section id="carousel-example-generic" class="carousel slide" data-interval="false" data-ride="carousel">
			<!-- SLIDE LIST START -->
			<div class="carousel-inner" role="listbox">
				<!-- SLIDE LIST ITEM START -->
				<div class="item active">
					<!-- SLIDE BACKGROUND START -->
					<div class="slider-bg-img" style="background-image:url(assets/img/slider1.jpg);"></div>
					<!-- SLIDE BACKGROUND END -->
					<!-- SLIDE CAPTION START -->
					<div class="carousel-caption">
						<h2 class="text-center">
							<div class="row">
								<!--<div class="col-xs-2"><a href="javascript:lastMonth();" id="lastMonth">&lt;</a></div>-->
								<div class="col-xs-8"><span id="yearSearch"></span>년 <span id="monthSearch"></span>월</div>
								<!--<div class="col-xs-2"><a href="javascript:nextMonth();" id="nextMonth">&gt;</a></div>-->
							</div>
						</h2>
						<div id="calendar" class="animated fadeInLeftBig"></div>
						<!--SLIDE INFO START -->
						<!--<div class="slider-post-information animated fadeInDown">
							<span class="category">Sport</span>
							<span>//</span>
							<span class="date">22.03.2015</span>
						</div>-->
						<!-- SLIDE INFO END -->
						<!-- SLIDE TITLE START -->
						<!--<div class="slider-post-title">
							<span class="slider-post-title-top animated fadeInLeftBig">For a New</span>
							<span class="slider-post-title-bottom animated fadeInRightBig">Adventure</span>
						</div>-->
						<!-- SLIDE TITLE END -->
						<!-- SLIDE EXCERPT START -->
						<!--<p class="animated fadeInUpBig">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a pretium nunc, eget ornare nisi. Pellentesque
							vel nisi facilisis, blandit neque in, convallis nibh ellentesque a pretium nun.</p>-->
						<!-- SLIDE EXCERPT END -->
						<!-- SLIDE MORE BUTTON START -->
						<!--<a href="single.html" class="more animated fadeInUpBig"><i class="fa fa-chevron-right"></i> More</a>-->
						<!-- SLIDE MORE BUTTON END -->
					</div>
					<!-- SLIDE CAPTION END -->
				</div>
				<!-- SLIDE LIST ITEM END -->
				<!-- SLIDE LIST ITEM START -->
				<div class="item">
					<!-- SLIDE BACKGROUND START -->
					<div class="slider-bg-img" style="background-image:url(assets/img/slider2.jpg);"></div>
					<!-- SLIDE BACKGROUND END -->
					<!-- SLIDE CAPTION START -->
					<div class="carousel-caption">
						<!-- SLIDE INFO START -->
						<div class="slider-post-information animated fadeInDown">
							<span class="category">Sport</span>
							<span>//</span>
							<span class="date">22.03.2015</span>
						</div>
						<!-- SLIDE INFO END -->
						<!-- SLIDE TITLE START -->
						<div class="slider-post-title">
							<span class="slider-post-title-top animated fadeInLeftBig">For a New</span>
							<span class="slider-post-title-bottom animated fadeInRightBig">Adventure</span>
						</div>
						<!-- SLIDE TITLE END -->
						<!-- SLIDE EXCERPT START -->
						<p class="animated fadeInUpBig">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque a pretium nunc, eget ornare nisi. Pellentesque
							vel nisi facilisis, blandit neque in, convallis nibh ellentesque a pretium nun.</p>
						<!-- SLIDE EXCERPT END -->
						<!-- SLIDE MORE BUTTON START -->
						<a href="single.html" class="more animated fadeInUpBig"><i class="fa fa-chevron-right"></i> More</a>
						<!-- SLIDE MORE BUTTON END -->
					</div>
					<!-- SLIDE CAPTION END -->
				</div>
				<!-- SLIDE LIST ITEM END -->
			</div>
			<!-- SLIDE LIST END -->
			<!-- SLIDER CONTROL START -->
			<a class="left carousel-control left-slider-arrow" href="#carousel-example-generic" role="button" data-slide="prev">
				<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
				<span class="sr-only">Previous</span>
			</a>
			<a class="right carousel-control right-slider-arrow" href="#carousel-example-generic" role="button" data-slide="next">
				<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
				<span class="sr-only">Next</span>
			</a>
			<!-- SLIDER CONTROL END -->
			<!-- <a href="#header" class="slider-down"><i class="fa fa-angle-down"></i></a> -->
		</section>
	</section>
		</tiles:putAttribute>
	</tiles:insertDefinition>
	<script src="resources/js/calendarForm.js"></script>
</body>
</html>