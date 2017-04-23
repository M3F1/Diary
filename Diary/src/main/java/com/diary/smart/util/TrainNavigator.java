package com.diary.smart.util;

import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

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
	
	public void setDate(String date){
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
			if(webElement.getText().equals(date.substring(4,6))){
				webElement.click();
				break;
			}
		}
		for (WebElement webElement : day) {
			if(webElement.getText().equals(date.substring(6,8))){
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
			System.out.println(webElement.findElement(By.cssSelector("td:nth-child(3)")).getText());
			if(webElement.findElement(By.cssSelector("td:nth-child(3)")).getText().contains(date.substring(8,10)+":"+date.substring(10,12))){
				webElement.findElements(By.cssSelector("td:nth-child(6) a")).get(0).click();
				break;
			}
		}//for
	}
	
	
	public void login(ArrayList<String> info){
		driver.switchTo().window(this.getHandle());
		if(info.get(0).equals("1")){
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
		while(flag){
			Alert alert = driver.switchTo().alert();
			if(alert!=null){
				alert.accept();
			}else{
				flag=false;
			}
		}//while
	}
	
	public void pay(ArrayList<String> info){
		driver.switchTo().window(this.getHandle());
		if(info.get(0).equals("0")){ //법인카드는 0
			driver.findElement(By.id("chk_card02")).click();
		}
		driver.findElement(By.id("btn_next")).click();
		driver.findElement(By.name("txtCardNo1")).clear();
		driver.findElement(By.name("txtCardNo1")).sendKeys(info.get(1).substring(0,5));
		driver.findElement(By.name("txtCardNo2")).clear();
		driver.findElement(By.name("txtCardNo2")).sendKeys(info.get(1).substring(5,9));
		driver.findElement(By.name("txtCardNo3")).clear();
		driver.findElement(By.name("txtCardNo3")).sendKeys(info.get(1).substring(9,13));
		driver.findElement(By.name("txtCardNo4")).clear();
		driver.findElement(By.name("txtCardNo4")).sendKeys(info.get(1).substring(13,17));
		
		ArrayList<WebElement> month = (ArrayList<WebElement>) driver.findElement(By.id("month")).findElements(By.tagName("option"));
		ArrayList<WebElement> year = (ArrayList<WebElement>) driver.findElement(By.id("year")).findElements(By.tagName("option"));
		for (WebElement webElement : month) {
			if(webElement.getAttribute("value").equals(info.get(2))){
				webElement.click();
				break;
			}
		}

		for (WebElement webElement : year) {
			if(webElement.getText().equals(info.get(3))){ 
				webElement.click();
				break;
			}
		}
		
		driver.findElement(By.cssSelector(".inp89.jsNumOnly")).clear();
		driver.findElement(By.cssSelector(".inp89.jsNumOnly")).sendKeys(info.get(4));
		
		driver.findElement(By.cssSelector(".inp120.jsNumOnly")).clear();
		driver.findElement(By.cssSelector(".inp120.jsNumOnly")).sendKeys(info.get(5));
		
		driver.findElement(By.id("fnIssuing")).click();
	}
	
}
