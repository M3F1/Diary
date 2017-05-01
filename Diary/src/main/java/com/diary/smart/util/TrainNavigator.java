package com.diary.smart.util;

import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.stereotype.Repository;
@Repository
public class TrainNavigator {
	private ChromeOptions options;
	private WebDriver driver;
	private JavascriptExecutor js;
	private String handle;
	private String now;

	public String getNow() {
		return now;
	}

	public void setNow(String now) {
		this.now = now;
	}

	// 현재브라우저 창 객체 가져오기
	public String getHandle() {
		return handle;
	}

	// 현재 브라우저 창을 객체로 생성
	public void setHandle(String handle) {
		this.handle = handle;
	}

	public TrainNavigator() {
		System.setProperty("webdriver.chrome.driver", "C:\\chrome\\chromedriver.exe");
		options = new ChromeOptions();
		options.addArguments("--start-maximized");
		driver = new ChromeDriver(options);
		driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
		js = (JavascriptExecutor) driver; // 자바스크립트를 사용하기 위한
		driver.get("http://www.letskorail.com/ebizprd/EbizPrdTicketpr21100W_pr21110.do");
		this.setHandle(driver.getWindowHandle());
	}
	
	public void setStartAndDestPoint(String area1, String area2){
		driver.switchTo().window(this.getHandle());
		driver.findElement(By.id("start")).clear();
		driver.findElement(By.id("start")).sendKeys(area1);
		driver.findElement(By.id("get")).clear();
		driver.findElement(By.id("get")).sendKeys(area2);
	}
	
	public ArrayList<String> setDate(String date){
		driver.switchTo().window(this.getHandle());
		ArrayList<WebElement> year = (ArrayList<WebElement>) driver.findElement(By.id("s_year")).findElements(By.tagName("option"));
		ArrayList<WebElement> month = (ArrayList<WebElement>) driver.findElement(By.id("s_month")).findElements(By.tagName("option"));
		ArrayList<WebElement> day = (ArrayList<WebElement>) driver.findElement(By.id("s_day")).findElements(By.tagName("option"));
		ArrayList<WebElement> hour = (ArrayList<WebElement>) driver.findElement(By.id("s_hour")).findElements(By.tagName("option"));
		for (WebElement webElement : year) {
			if(webElement.getText().equals(date.substring(0,4))){
				webElement.click();
				break;
			}
		}
		for (WebElement webElement : month) {
			if(webElement.getAttribute("value").equals(date.substring(4,6))){
				webElement.click();
				break;
			}
		}
		for (WebElement webElement : day) {
			if(webElement.getAttribute("value").equals(date.substring(6,8))){
				webElement.click();
				break;
			}
		}
		for (WebElement webElement : hour) {
			if(webElement.getAttribute("value").equals(date.substring(8,10))){
				webElement.click();
				break;
			}
		}
		
		driver.findElement(By.className("btn_inq")).findElement(By.tagName("a")).click();
		
		
		ArrayList<String> timeList = new ArrayList<>();
		
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//시간가져오기
		ArrayList<WebElement> trList = (ArrayList<WebElement>) driver.findElements(By.cssSelector("table#tableResult tbody tr"));
		for (WebElement webElement : trList) {
			timeList.add(webElement.findElements(By.cssSelector("td")).get(2).getText().trim()+"/"+webElement.findElements(By.cssSelector("td")).get(3).getText().trim());
		}
		
		return timeList;
		
	}
	
	public void setPeople(String count){
		driver.switchTo().window(this.getHandle());
		ArrayList<WebElement> people = (ArrayList<WebElement>) driver.findElement(By.id("peop01")).findElements(By.tagName("option"));
		
		for (WebElement webElement : people) {
			if(webElement.getAttribute("value").equals(count)){
				webElement.click();
				break;
			}
		}//for
	}
		
	public void getSeat(String date){
		driver.switchTo().window(this.getHandle());
		ArrayList<WebElement> tr = (ArrayList<WebElement>) driver.findElement(By.id("tableResult")).findElement(By.tagName("tbody")).findElements(By.tagName("tr"));
		for (WebElement webElement : tr) {
//			if(webElement.findElement(By.cssSelector("td:nth-child(3)")).getText().contains(date.substring(8,10)+":"+date.substring(10,12))){
			if(webElement.findElement(By.cssSelector("td:nth-child(3)")).getText().contains(date)){
				webElement.findElements(By.cssSelector("td:nth-child(6) a")).get(0).click();
				break;
			}
		}//for
		
//		int i=0;
//		while(true){
//			try{
//				driver.switchTo().frame("embeded-modal-traininfo");
//				driver.findElement(By.cssSelector("p.btn_c a")).click();
//				Alert alert2 = driver.switchTo().alert();
//				alert2.accept();	
//				driver.switchTo().window(this.getHandle());
//				Alert alert = driver.switchTo().alert();
//				alert.accept();	
//			}catch(WebDriverException e){
//				e.printStackTrace();
//				i++;
//				if(i==6) break;
//			}
//		}
		
	}
	
	
	public ArrayList<String> login(ArrayList<String> info){
		driver.switchTo().window(this.getHandle());
		if(info.get(0).equals("0")){
			driver.findElement(By.id("radInputFlg0")).click();
		}else if(info.get(1).equals("2")){
			driver.findElement(By.id("radInputFlg2")).click();
		}
		driver.findElement(By.id("txtMember")).clear();
		driver.findElement(By.id("txtMember")).sendKeys(info.get(1));
		driver.findElement(By.id("txtPwd")).clear();
		driver.findElement(By.id("txtPwd")).sendKeys(info.get(2));
		driver.findElement(By.className("btn_login")).findElement(By.tagName("a")).click();
		
		boolean flag = true;
		int i=0;
		
		while(flag){
			try{
				Alert alert = driver.switchTo().alert();
				if(alert!=null){
					alert.accept();
					i++;
				}
			}catch(WebDriverException e){
				if(i==2) flag=false;
			}
		}//while
		
		ArrayList<WebElement> infotd = (ArrayList<WebElement>) driver.findElements(By.cssSelector("div.mt40 > table tbody td"));
		ArrayList<WebElement> infotd2 = (ArrayList<WebElement>) driver.findElements(By.cssSelector("tbody#infos td"));
		ArrayList<String> result = new ArrayList<>();
		result.add(infotd.get(0).getText().trim()+" "+infotd.get(4).getText().trim()+" ~ "+infotd.get(6).getText().trim()); //일시
		result.add(infotd.get(3).getText().trim()+" → "+infotd.get(5).getText().trim()); //출발지 도착지
		
		result.add(infotd2.get(0).getText().trim());//등급
		result.add(infotd2.get(1).getText().trim()); //좌석
		result.add(infotd2.get(5).getText());//가격
		result.add("2");
		driver.findElement(By.id("btn_next")).click();
		return result;
	}
	
	public boolean pay(ArrayList<String> info){
		driver.switchTo().window(this.getHandle());
		if(info.get(0).equals("1")){ //법인카드는 1
			driver.findElement(By.id("chk_card02")).click();
		}
		driver.findElement(By.name("txtCardNo1")).clear();
		driver.findElement(By.name("txtCardNo1")).sendKeys(info.get(1).substring(0,4));
		driver.findElement(By.name("txtCardNo2")).clear();
		driver.findElement(By.name("txtCardNo2")).sendKeys(info.get(1).substring(4,8));
		driver.findElement(By.name("txtCardNo3")).clear();
		driver.findElement(By.name("txtCardNo3")).sendKeys(info.get(1).substring(8,12));
		driver.findElement(By.name("txtCardNo4")).clear();
		driver.findElement(By.name("txtCardNo4")).sendKeys(info.get(1).substring(12,16));
		
		ArrayList<WebElement> month = (ArrayList<WebElement>) driver.findElement(By.id("month")).findElements(By.tagName("option"));
		ArrayList<WebElement> year = (ArrayList<WebElement>) driver.findElement(By.id("year")).findElements(By.tagName("option"));
		for (WebElement webElement : month) {
			if(webElement.getAttribute("value").equals(info.get(3))){
				webElement.click();
				break;
			}
		}

		for (WebElement webElement : year) {
			if(webElement.getText().equals(info.get(2))){ 
				webElement.click();
				break;
			}
		}
		
		driver.findElement(By.cssSelector(".inp89.jsNumOnly")).clear();
		driver.findElement(By.cssSelector(".inp89.jsNumOnly")).sendKeys(info.get(4));
		
		driver.findElement(By.cssSelector(".inp120.jsNumOnly")).clear();
		driver.findElement(By.cssSelector(".inp120.jsNumOnly")).sendKeys(info.get(5));
		
		driver.findElement(By.id("fnIssuing")).click();
		driver.findElement(By.cssSelector("a#tabSale3")).click();
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		driver.switchTo().frame("mainframeSaleInfo");
		driver.findElement(By.cssSelector("input#radSmart1")).click();
		driver.findElement(By.cssSelector("a#btn_next")).click();
		
		return true;
	}
	
}
