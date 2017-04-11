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
			<div class="container home">
				<a href="diary" class="text-center">dairy 보기</a> <br /> <br /> <br /> <br />
				<a href="mypage">mypage</a>
				<br /> <br /> <br /> <br /> <br />
				<!-- 문구가 들어갈 부분 -->
				<br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
			</div>
			<!-- SITE CONTENT START -->
			<section class="site-content-wrapper">
				<!-- FULL GRID CONTENT START -->
				<section class="full-grid-content">
					<!-- BLOG LIST ITEM START -->
					<article style="background-image: url(resources/img/news1.jpg)">
						<a href="single.html">
							<section class="container">
								<div class="full-grid-item">
									<div class="post-list-information">
										<span class="category">Sport</span> <span>//</span> <span class="date">22.03.2015</span>
									</div>
									<div class="full-grid-title">
										<h2>The Sound Of The Heartbeat Street</h2>
									</div>
									<p>Aliquam cursus ligula a magna lobortis tempor. Etiam posuere iaculis
										sem et dictum. Proin a suscipit libero. Proin viverra egestas ultricies.
										Nulla facilisi. Integer vulputate magna non ornare vehicula.</p>
									<span class="more"><i class="fa fa-chevron-right"></i> More</span>
								</div>
							</section>
						</a>
					</article>
					<!-- BLOG LIST ITEM END -->
					<!-- BLOG LIST ITEM START -->
					<article style="background-image: url(resources/img/news2.jpg)">
						<a href="single.html">
							<section class="container">
								<div class="full-grid-item">
									<div class="post-list-information">
										<span class="category">Sport</span> <span>//</span> <span class="date">22.03.2015</span>
									</div>
									<div class="full-grid-title">
										<h2>A Wonderful Surprise Under The Sea</h2>
									</div>
									<p>Aliquam cursus ligula a magna lobortis tempor. Etiam posuere iaculis
										sem et dictum. Proin a suscipit libero. Proin viverra egestas ultricies.
										Nulla facilisi. Integer vulputate magna non ornare vehicula.</p>
									<span class="more"><i class="fa fa-chevron-right"></i> More</span>
								</div>
							</section>
						</a>
					</article>
					<!-- BLOG LIST ITEM END -->
					<!-- BLOG LIST ITEM START -->
					<article style="background-image: url(resources/img/news3.jpg)">
						<a href="single.html">
							<section class="container">
								<div class="full-grid-item">
									<div class="post-list-information">
										<span class="category">Sport</span> <span>//</span> <span class="date">22.03.2015</span>
									</div>
									<div class="full-grid-title">
										<h2>I No Longer Make Vacation Plans</h2>
									</div>
									<p>Aliquam cursus ligula a magna lobortis tempor. Etiam posuere iaculis
										sem et dictum. Proin a suscipit libero. Proin viverra egestas ultricies.
										Nulla facilisi. Integer vulputate magna non ornare vehicula.</p>
									<span class="more"><i class="fa fa-chevron-right"></i> More</span>
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