package com.diary.smart.util;

import java.util.List;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.concurrent.TimeUnit;

import org.junit.internal.runners.statements.ExpectException;
import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.diary.smart.vo.Member;

public class CGVNavigator {
	private ChromeOptions options;
	private WebDriver driver;
	private JavascriptExecutor js;
	private String handle;
	ArrayList<String> movieList = new ArrayList<String>();
	
	public CGVNavigator() {
		System.setProperty("webdriver.chrome.driver", "C:\\chrome\\chromedriver.exe");
		options = new ChromeOptions();
		options.addArguments("--start-maximized");
		driver = new ChromeDriver(options);
		driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
		js = (JavascriptExecutor) driver; // 자바스크립트를 사용하기 위한
		driver.get("http://www.cgv.co.kr/ticket/");
		this.setHandle(driver.getWindowHandle());
	}

	//현재브라우저 창 객체 가져오기
	public String getHandle() {
		return handle;
	}

	//현재 브라우저 창을 객체로 생성
	public void setHandle(String handle) {
		this.handle = handle;
	}

	// 전체 영화 목록 사용자에게 주는 메소드
		public ArrayList<String> getMovie() {
			driver.switchTo().window(this.getHandle());
			driver.switchTo().frame("ticket_iframe");

			// 무비리스트 div태그 가져오기
			WebElement movieListTag = driver.findElement(By.id("movie_list"));

			// 영화목록태그 전부 가져오기
			List<WebElement> movie = movieListTag.findElements(By.cssSelector("span.text"));
			
			// 무비 제목 어레이리스트에 담기
			for (WebElement webElement : movie) {
				movieList.add(webElement.getText());
			}
			
			return movieList;

		}

		// 사용자가 영화 선택하면 셀레늄에서 영화 클릭하는 메소드
		public boolean setMovie(String movie) {
			driver.switchTo().window(this.getHandle());
			driver.switchTo().frame("ticket_iframe");
			try {
				Thread.sleep(500);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			for (String webElement : movieList) {
				if(webElement.equals(movie)){
					driver.findElement(By.cssSelector("div#movie_list li:nth-child(" + (movieList.indexOf(webElement)+1) + ") span.icon")).click();
					return true;
				}
			}
			return true;
		}

		//영화선택 하기위해 정보 끌어오기.
		public void movieSelectHelper(String theater) {

			driver.switchTo().window(this.getHandle());
			driver.switchTo().frame("ticket_iframe");

			// 지역정보 id태그 가져오기
			WebElement areaTag = driver.findElement(By.id("theater_area_list"));
			int i = 1;
			ArrayList<WebElement> list = new ArrayList<WebElement>(); 
			boolean check = true;
			
			while(true){
				list = (ArrayList<WebElement>) areaTag.findElements(By.cssSelector("li.selected ul.content.scroll-y a"));
				
				for (WebElement webElement : list) {
					if(theater.equals(webElement.getText())){
						areaTag.findElement(By.linkText(theater)).click();
						check = false;
						break;
					}					
				}
				if(!check)
					break;
				i++;
				list.clear();			
				areaTag.findElement(By.cssSelector("ul > li:nth-child("+i+") span.name")).click();			
			}
			
		}
		
		//날짜 선택 메소드
		public void selectDate(String date){
			driver.switchTo().window(this.getHandle());
			driver.switchTo().frame("ticket_iframe");
			driver.findElement(By.cssSelector("div#date_list li[date='" + date + "']")).click();
		}

		//선택한 영화의 전체 상영시간 출력
		public ArrayList<String> getMovieTimes(){
			ArrayList<String> movieTimes = new ArrayList<String>();
			driver.switchTo().window(this.getHandle());
			driver.switchTo().frame("ticket_iframe");

			ArrayList<WebElement> div = new ArrayList<WebElement>();
			ArrayList<WebElement> times = new ArrayList<WebElement>();
			
			div =  (ArrayList<WebElement>) driver.findElements(By.cssSelector("div.content.scroll-y > div.theater"));
			
			for (WebElement webElement : div) {
				times = (ArrayList<WebElement>) webElement.findElements(By.cssSelector("span.time > span"));
				for (WebElement webElement2 : times) {
					movieTimes.add(webElement2.getText());
				}
			}
			Collections.sort(movieTimes);	
			return movieTimes;		
		}
		
		
		//시간 선택 메소드
		public void selectTime(String time){
			driver.switchTo().window(this.getHandle());
			driver.switchTo().frame("ticket_iframe");
			
			ArrayList<WebElement> divs = new ArrayList<WebElement>();
			ArrayList<WebElement> times = new ArrayList<WebElement>();
			
			divs =  (ArrayList<WebElement>) driver.findElements(By.cssSelector("div.content.scroll-y > div.theater"));
			
			for (WebElement webElement : divs) {
				times = (ArrayList<WebElement>) webElement.findElements(By.cssSelector("span.time > span"));
				for (WebElement webElement2 : times) {
					if(webElement2.getText().equals(time)){
						webElement2.click();
						return;
					}
				}
			}
		}

	//영화, 장소, 시간 선택후 다음단계로 넘어가는 메소드
	public void nextStep(){
		driver.switchTo().window(this.getHandle());
		driver.switchTo().frame("ticket_iframe");
		driver.findElement(By.cssSelector("div.tnb.step1 > a.btn-right.on")).click();
		try {
			Thread.sleep(750);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		driver.findElement(By.cssSelector("div.ft_layer_popup.popup_login.ko a.join_guest")).click();
		try {
			Thread.sleep(750);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		driver.findElement(By.cssSelector("div.wrap-login a.round.inred > span")).click();
	}
		
	//비회원 로그인 메소드
	public void movieInput(Member member){
		driver.switchTo().window(this.getHandle());
		driver.findElement(By.cssSelector("span.inp_inbox.on > input")).click();
		
		driver.findElement(By.id("txtName")).clear();
		driver.findElement(By.id("txtName")).sendKeys(member.getUser_nm());
		driver.findElement(By.id("txtBirthday")).clear();
		driver.findElement(By.id("txtBirthday")).sendKeys(member.getUser_birth());
		
		driver.findElement(By.id("txtMobile2")).clear();
		driver.findElement(By.id("txtMobile2")).sendKeys(member.getUser_phone().substring(3, 7));
		driver.findElement(By.id("txtMobile3")).clear();
		driver.findElement(By.id("txtMobile3")).sendKeys(member.getUser_phone().substring(7, 11));
		
		driver.findElement(By.id("txtPassword")).clear();
		driver.findElement(By.id("txtPassword")).sendKeys("8686");
		driver.findElement(By.id("txtConfirmPassword")).clear();
		driver.findElement(By.id("txtConfirmPassword")).sendKeys("8686");
		
		driver.findElement(By.id("btn_submit")).submit();
		try {
			Thread.sleep(1200);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		driver.switchTo().frame("ticket_iframe");
		driver.findElement(By.cssSelector("div.tnb.step1 > a.btn-right.on")).click();

		
		//만약 팝업뜨면 확인누르기처리..
		/*try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		WebElement div = driver.findElement(By.cssSelector("div.ft_layer_popup.popup_alert.ko"));
		if(div!=null){
			div.findElement(By.cssSelector("div.ft a.btn.btn_ok > span")).click();
		}
		*/
		///에러.. 버튼을 못찾음
	}
	
	
	//좌석선택 메소드
	public Object selectMovieSeat(String humanCount){
		driver.switchTo().window(this.getHandle());
		driver.switchTo().frame("ticket_iframe");
		driver.findElement(By.cssSelector("div.group.adult li[data-count='"+humanCount+"']")).click();
		return js.executeScript("return document.getElementById('seats_list').outerHTML;");
	}
	
	
	//인원수 선택 및 좌석 보여주는 메소드
	public HashMap<String,Object> showMovieSeat(String humanCount){
		driver.switchTo().window(this.getHandle());
		driver.switchTo().frame("ticket_iframe");
		driver.findElement(By.cssSelector("div.group.adult li[data-count='"+humanCount+"']")).click();
		driver.findElement(By.cssSelector("div.block_wrap > span.seat_block.block1.enabled input")).click();
		HashMap<String,Object> result = new HashMap<String, Object>();
		result.put("tag", js.executeScript("return document.getElementById('seats_list').outerHTML;"));
		result.put("count", humanCount);
		return result;
	}
	
	//좌석클릭 메소드
	public void selectSeats(ArrayList<Integer> arrayList) {
		driver.switchTo().window(this.getHandle());
		driver.switchTo().frame("ticket_iframe");
		ArrayList<WebElement> div = new ArrayList<WebElement>();
		ArrayList<WebElement> span = new ArrayList<WebElement>();
		ArrayList<WebElement> click = new ArrayList<WebElement>();
		div =(ArrayList<WebElement>)driver.findElements(By.className("row"));
		
		for(int i = 0 ; i<arrayList.size() ; i++){
			if(i%2 == 0){
				span = (ArrayList<WebElement>) div.get(arrayList.get(i)).findElements(By.cssSelector("span.no"));
				for (WebElement webElement : span) {
					if(webElement.getText().equals(arrayList.get(i+1).toString())){
						webElement.click();
						click.add(webElement);
					}
				}//for
			}//if
			span = new ArrayList<WebElement>();
		}
		
		driver.findElement(By.id("tnb_step_btn_right")).click();
		
		/* 이미예약된거면.. 처리할곳
		Alert alert = driver.switchTo().alert(); 
		if(alert != null){ //누가예매하고있으면 다시처리. 클릭취소하고
			 alert.accept(); 
			 for (WebElement webElement : click) {
				webElement.click();
			}
			driver.findElement(By.cssSelector("div.block_wrap > span.seat_block.block1.enabled input")).click();
		}
		*/
	}
	
	public Object getPaymentForm(){
		driver.switchTo().window(this.getHandle());
		driver.switchTo().frame("ticket_iframe");
		return js.executeScript("return document.getElementsByClassName('tpm_wrap.tpm_last_pay').outerHTML;");
		//summary_total_amount
	}
	
	public boolean payment(ArrayList<String> payinfo){
		driver.switchTo().window(this.getHandle());
		driver.switchTo().frame("ticket_iframe");
		ArrayList<WebElement> option = 	
				(ArrayList<WebElement>) driver.findElement(By.id("lp_card_type")).findElements(By.tagName("option"));
		
		for (WebElement webElement : option) {
			if(webElement.getText().equals(payinfo.get(0))){
				webElement.click();
				break;
			}
		}
		
		driver.findElement(By.id("lp_card_no1")).clear();
		driver.findElement(By.id("lp_card_no1")).sendKeys(payinfo.get(1));
		driver.findElement(By.id("lp_card_no2")).clear();
		driver.findElement(By.id("lp_card_no2")).sendKeys(payinfo.get(2));
		driver.findElement(By.id("lp_card_no3")).clear();
		driver.findElement(By.id("lp_card_no3")).sendKeys(payinfo.get(3));
		driver.findElement(By.id("lp_card_no4")).clear();
		driver.findElement(By.id("lp_card_no4")).sendKeys(payinfo.get(4));
		driver.findElement(By.id("lp_card_pw")).clear();
		driver.findElement(By.id("lp_card_pw")).sendKeys(payinfo.get(5));
		
		driver.findElement(By.id("lp_card_month")).clear();
		driver.findElement(By.id("lp_card_month")).sendKeys(payinfo.get(6));
		driver.findElement(By.id("lp_card_year")).clear();
		driver.findElement(By.id("lp_card_year")).sendKeys(payinfo.get(7));
		
		driver.findElement(By.id("lp_card_ssn")).clear();
		driver.findElement(By.id("lp_card_ssn")).sendKeys(payinfo.get(8));
		
		driver.findElement(By.id("tnb_step_btn_right")).click();
		
		try {
			Thread.sleep(1200);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		WebElement popup = driver.findElement(By.cssSelector(".ft_layer_popup.popup_reservation_check"));
		
		popup.findElement(By.id("agreementAll")).click();
		popup.findElement(By.id("resvConfirm")).click();
		popup.findElement(By.cssSelector("div.ft > .reservation")).click();

		return true;
		
	}
		
	//셀레늄 종료 메서드
	public void quit(){
		driver.quit();
	}

}
