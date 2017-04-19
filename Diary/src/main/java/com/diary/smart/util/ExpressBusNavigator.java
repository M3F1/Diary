package com.diary.smart.util;

import static org.hamcrest.CoreMatchers.nullValue;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.stereotype.Controller;

public class ExpressBusNavigator {
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

	public ExpressBusNavigator(){
		System.setProperty("webdriver.chrome.driver", "C:\\chrome\\chromedriver.exe");
		options = new ChromeOptions();
		options.addArguments("--start-maximized");
		driver = new ChromeDriver(options);
		driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
		js = (JavascriptExecutor) driver; // 자바스크립트를 사용하기 위한
//		driver.get("https://www.hticket.co.kr/main.action");
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
	
	public void setBrowserKOBUS(){
		driver.get("http://www.kobus.co.kr/web/03_reservation/reservation01.jsp");
		this.setHandle(driver.getWindowHandle());
		this.setNow("kobus");
	}
	
	public void setBrowserEASYTICKET(){
		driver.get("https://www.hticket.co.kr/booking/inform.action");
		this.setHandle(driver.getWindowHandle());
		this.setNow("easyticket");
	}
	
	public void setStartingPoint(String area){
		boolean flag = false;
		driver.switchTo().window(this.getHandle());
		this.setBrowserEASYTICKET();
		ArrayList<WebElement> terminal = (ArrayList<WebElement>) driver.findElement(By.id("searchStTermNbr")).findElements(By.tagName("option"));
		
		for (int i = 1; i < terminal.size(); i++) {
			if(terminal.get(i).getText().contains("*") || terminal.get(i).getText()==null )
				flag = true;
			else{
				if(terminal.get(i).getText().contains(area)){
					terminal.get(i).click();
					break;
				}//if
			}
			if(flag) break;
		}//for
		if(flag) this.setStartingPoint2(area);
		
	}
	

	public void setStartingPoint2(String area) {
		boolean flag=false;
		driver.switchTo().window(this.getHandle());
		this.setBrowserKOBUS();		
		ArrayList<WebElement> terminal = (ArrayList<WebElement>) driver.findElement(By.id("regForm01")).findElements(By.tagName("option"));
		
		for (int i = 1; i < terminal.size(); i++) {
			if(terminal.get(i).getText().contains("*")  || terminal.get(i).getText()==null){
				flag = true;
			}
			else{
				if(terminal.get(i).getText().contains(area)){
					terminal.get(i).click();
					break;
				}//if
			}
			if(flag) break;
		}//for
		if(flag) this.setStartingPoint(area);
	}
	
	public void setDestination(String area){
		driver.switchTo().window(this.getHandle());
		ArrayList<WebElement> terminal = (ArrayList<WebElement>) driver.findElement(By.id("searchArTermNbr")).findElements(By.tagName("option"));
		
		for (int i = 1; i < terminal.size(); i++) {
			if(terminal.get(i).getText().contains("*") || terminal.get(i).getText()==null ){
				
			}
			else{
				if(terminal.get(i).getText().contains(area)){
					terminal.get(i).click();
					break;
				}//if
			}
		}//for
		
	}
	
	public void setDestination2(String area){
		driver.switchTo().window(this.getHandle());
		ArrayList<WebElement> terminal = (ArrayList<WebElement>) driver.findElement(By.cssSelector("select[name='TER_TO']")).findElements(By.tagName("option"));
		
		for (int i = 1; i < terminal.size(); i++) {
			if(terminal.get(i).getText().contains("*")  || terminal.get(i).getText()==null){
			}
			else{
				if(terminal.get(i).getText().contains(area)){
					terminal.get(i).click();
					break;
				}//if
			}
		}//for
	}
	
	
	public void setDate(String date){
		driver.switchTo().window(this.getHandle());
		ArrayList<WebElement> year = (ArrayList<WebElement>) driver.findElement(By.id("searchYear")).findElements(By.tagName("option"));
		ArrayList<WebElement> month = (ArrayList<WebElement>) driver.findElement(By.id("searchMonth")).findElements(By.tagName("option"));
		ArrayList<WebElement> day = (ArrayList<WebElement>) driver.findElement(By.id("searchDay")).findElements(By.tagName("option"));
		ArrayList<WebElement> time = (ArrayList<WebElement>) driver.findElement(By.id("searchTime")).findElements(By.tagName("option"));
		for (int i = 0; i < year.size(); i++) {
			if(year.get(i).getText().equals(date.substring(0, 4))){
				year.get(i).click();
				break;
			}//if
		}//for
		for (int i = 0; i < month.size(); i++) {
			if(month.get(i).getText().equals(date.substring(4, 6))){
				month.get(i).click();
				break;
			}//if
		}//for
		
		for (int i = 0; i < day.size(); i++) {
			if(day.get(i).getText().equals(date.substring(6, 8))){
				day.get(i).click();
				break;
			}//if
		}//for
		String setTime = date.substring(8,10) + ":" + date.substring(10,12);
		for (int i = 0; i < time.size(); i++) {
			if(time.get(i).getText().equals(setTime)){
				time.get(i).click();
				break;
			}//if
		}//for
	}
	
	public void setDate2(String date){
		driver.switchTo().window(this.getHandle());
		ArrayList<WebElement> year = (ArrayList<WebElement>) driver.findElement(By.name("Tim_date_Year")).findElements(By.tagName("option"));
		ArrayList<WebElement> month = (ArrayList<WebElement>) driver.findElement(By.name("Tim_date_Month")).findElements(By.tagName("option"));
		ArrayList<WebElement> day = (ArrayList<WebElement>) driver.findElement(By.name("Tim_date_Day")).findElements(By.tagName("option"));
		ArrayList<WebElement> time = (ArrayList<WebElement>) driver.findElement(By.name("TIM_TIM_I")).findElements(By.tagName("option"));
		for (int i = 1; i < year.size(); i++) {
				if(year.get(i).getText().contains(date.substring(0, 4))){
					year.get(i).click();
					break;
				}//if
		}//for
		
		for (int i = 1; i < month.size(); i++) {
			//받아올때 03이면 밑에꺼 걍 3이면 4,5
			if(month.get(i).getText().contains(date.substring(4, 6))){
				month.get(i).click();
				break;
			}//if
		}//for
		
		for (int i = 1; i < day.size(); i++) {
			//월형식에따라 다름.. 날짜 한자리여도.. 보내줄때어케할지 알아야겟다.
			if(day.get(i).getText().contains(date.substring(6, 8))){
				day.get(i).click();
				break;
			}//if
		}//for
		String setTime = date.substring(8,10) + ":" + date.substring(10,12);
		for (int i = 1; i < time.size(); i++) {
			if(time.get(i).getText().contains(setTime)){
				time.get(i).click();
				break;
			}//if
		}//for
		
	}
	
	public void setSeatGrade2(String grade){
		driver.switchTo().window(this.getHandle());
		ArrayList<WebElement> seat = (ArrayList<WebElement>) driver.findElement(By.cssSelector("select[name='BUS_GRA_I']")).findElements(By.tagName("option"));
		for (int i = 1; i < seat.size(); i++) {
			if(seat.get(i).getText().contains(grade)){
				seat.get(i).click();
				break;
			}//if
		}//for
	}
	
	public void setSeatGrade(String grade){
		driver.switchTo().window(this.getHandle());
		ArrayList<WebElement> seat = (ArrayList<WebElement>) driver.findElement(By.id("searchGrade")).findElements(By.tagName("option"));
		for (int i = 1; i < seat.size(); i++) {
			if(seat.get(i).getText().contains(grade)){
				seat.get(i).click();
				break;
			}//if
		}//for
		
//		driver.findElement(By.cssSelector("td[align='center'] a")).click();
		ArrayList<WebElement> aTag = (ArrayList<WebElement>) driver.findElement(By.id("Table_3")).findElements(By.tagName("a"));
		aTag.get(1).click();
		
		
//		ArrayList<String> handles = new ArrayList<>(driver.getWindowHandles());
//		driver.switchTo().window(handles.get(1));
//		System.out.println(driver.getWindowHandles());
//		driver.findElement(By.cssSelector("td[align='right'] > a")).click();
//		driver.switchTo().window(this.getHandle());
	}
	
	public void setHuman2(String count){
		driver.switchTo().window(this.getHandle());
		ArrayList<WebElement> human = (ArrayList<WebElement>) driver.findElement(By.cssSelector("select[name='pCnt_100']")).findElements(By.tagName("option"));
		for (int i = 1; i < human.size(); i++) {
			if(human.get(i).getAttribute("value").equals(count)){
				human.get(i).click();
				break;
			}//if
		}//for
		driver.findElement(By.cssSelector("dd.btn input")).click();
		Alert alert = driver.switchTo().alert();
		if(alert!=null){
			alert.accept();
		}
	}
	
	public void setHuman(String count){
		driver.switchTo().window(this.getHandle());
		ArrayList<WebElement> human = (ArrayList<WebElement>) driver.findElement(By.id("selectTkt01")).findElements(By.tagName("option"));
		for (int i = 1; i < human.size(); i++) {
			if(human.get(i).getAttribute("value").equals(count)){
				human.get(i).click();
				break;
			}//if
		}//for
	}
	
	//필요없을지도? api로ㅓ 정보보여주고 거기서 선택ㅎ했다면..
	public ArrayList<String> getStartTime2(){
		driver.switchTo().window(this.getHandle());
		ArrayList<WebElement> table = (ArrayList<WebElement>) driver.findElement(By.cssSelector("table.ticket")).findElements(By.cssSelector("tbody tr"));
		ArrayList<String> resultTime = new ArrayList<String>();
		
		for (WebElement webElement : table) {
			resultTime.add(webElement.findElement(By.cssSelector("td:nth-child(0)")).getText());
		}
		
		return resultTime;		
	}
	
	public void selectTicket(String time){
		driver.switchTo().window(this.getHandle());
//		ArrayList<WebElement> table = (ArrayList<WebElement>)driver.findElement(By.id("Table_4")).findElements(By.cssSelector("tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr"));
//		System.out.println(table);
		ArrayList<WebElement> table2 = (ArrayList<WebElement>)driver.findElement(By.id("Table_4")).findElements(By.cssSelector("table"));
		ArrayList<WebElement> tr = (ArrayList<WebElement>)table2.get(4).findElements(By.cssSelector("tr"));
		ArrayList<WebElement> td = null;
		for (WebElement webElement : tr) {
			td = (ArrayList<WebElement>) webElement.findElements(By.tagName("td"));
			if(td.get(0).getText().contains("08:00")){
				td.get(td.size()-1).findElement(By.tagName("a")).click();
				break;
			}
			td = new ArrayList<WebElement>();
		}
//		ArrayList<WebElement> td = (ArrayList<WebElement>) driver.findElements(By.className("table_underline"));
		
		
		//		for (int i=2; i<table.size(); i++){
//			if(table.get(i).findElements(By.cssSelector("td")).get(0).getText().equals(time)){
//				webElement.findElements(By.cssSelector("td")).get(webElement.findElements(By.cssSelector("td")).size()-1).findElement(By.cssSelector("input")).click();
//				break;
//			}
//				
//		}
			
	}
	
	
	public void selectTicket2(String time){
		driver.switchTo().window(this.getHandle());
		ArrayList<WebElement> table = (ArrayList<WebElement>) driver.findElement(By.cssSelector("table.ticket")).findElements(By.cssSelector("tbody tr"));
		for (WebElement webElement : table) {
			if(webElement.findElements(By.cssSelector("td")).get(0).getText().equals(time)){
				webElement.findElements(By.cssSelector("td")).get(webElement.findElements(By.cssSelector("td")).size()-1).findElement(By.cssSelector("input")).click();
				break;
			}
				
		}
		
		Alert alert = driver.switchTo().alert();
		if(alert!=null){
			alert.accept();
		}
	}
	
	//count값 생각...나중에 체크할때
	public HashMap<String,Object> showBusSeat2(){
		driver.switchTo().window(this.getHandle());
		HashMap<String,Object> result = new HashMap<String, Object>();
		String count = (String) js.executeScript("return document.getElementsByClassName('text02')[0].outerHTML;");
		result.put("form", js.executeScript("return document.getElementsByClassName('tbl_seat01')[0].outerHTML;"));
		result.put("count", count.charAt(41));
		result.put("flag", 0);
//		return js.executeScript("return document.getElementsByName('SeatForm')[0].outerHTML;");
//		return js.executeScript("return document.getElementsByClassName('tbl_seat01')[0].outerHTML;");
		return result;
	}
	
	public HashMap<String,Object> showBusSeat(String count){
		driver.switchTo().window(this.getHandle());
		HashMap<String,Object> result = new HashMap<String, Object>();
		result.put("form", js.executeScript("return document.getElementById('seatView').outerHTML;"));
		result.put("count", count);
		result.put("flag", 1);
		return result;
	}

	public void selectSeats2(ArrayList<String> arrayList) {
		driver.switchTo().window(this.getHandle());
		int flag = 0;
		ArrayList<WebElement> td = (ArrayList<WebElement>) driver.findElement(By.className("tbl_seat01")).findElements(By.cssSelector("label"));
		ArrayList<WebElement> input = (ArrayList<WebElement>) driver.findElement(By.className("tbl_seat01")).findElements(By.cssSelector("input"));
		
		for (int i=0; i<td.size(); i++){
			for(String seat : arrayList){
				if(td.get(i).getText().equals(seat)){
					input.get(i).click();
					flag++;
					break;
				}
			}
			if(flag==arrayList.size()) break;
		}
		
		driver.findElement(By.name("checkbox1")).click();
	}
	
	public void selectSeats(ArrayList<String> arrayList) {
		driver.switchTo().window(this.getHandle());
		int flag = 0;
		ArrayList<WebElement> ckbox = (ArrayList<WebElement>) driver.findElement(By.id("seatView")).findElements(By.cssSelector("input[type='checkbox']"));
		
		for (WebElement webElement : ckbox) {
			for (String seat : arrayList) {
				if(webElement.getAttribute("value").equals(seat)){
					webElement.click();
					flag++;
					break;
				}
			}
			if(flag==arrayList.size()) break;
		}
		
		driver.findElement(By.id("Table_10")).findElement(By.cssSelector("a")).click();
	}
	
	public void writeCardInfo2(ArrayList<String> cardInfo){
		driver.switchTo().window(this.getHandle());
		driver.findElement(By.name("pCAD_NO")).clear();
		driver.findElement(By.name("pCAD_NO")).sendKeys(cardInfo.get(0));
		ArrayList<WebElement> year = (ArrayList<WebElement>) driver.findElement(By.name("pVIL_YEAR")).findElements(By.cssSelector("option"));
		ArrayList<WebElement> month = (ArrayList<WebElement>) driver.findElement(By.name("pVIL_MONTH")).findElements(By.cssSelector("option"));
		for (WebElement webElement : year) {
			if(webElement.getAttribute("value").equals(cardInfo.get(1))){
				webElement.click();
			}
		}
		for (WebElement webElement : month) {
			if(webElement.getAttribute("value").equals(cardInfo.get(2))){
				webElement.click();
			}
		}
		
		driver.findElement(By.name("pUSR_JUMIN")).clear();
		driver.findElement(By.name("pUSR_JUMIN")).sendKeys(cardInfo.get(3));
		driver.findElement(By.id("p111")).click();
		
	}
	
	public void writeCardInfo(ArrayList<String> cardInfo){
		driver.switchTo().window(this.getHandle());
		
		driver.findElement(By.id("chkagree1y")).click();
		driver.findElement(By.id("chkagreey")).click();
		
		driver.findElement(By.id("textfield1")).clear();
		driver.findElement(By.id("textfield1")).sendKeys(cardInfo.get(0));
		ArrayList<WebElement> year = (ArrayList<WebElement>) driver.findElement(By.name("cardYear")).findElements(By.cssSelector("option"));
		ArrayList<WebElement> month = (ArrayList<WebElement>) driver.findElement(By.name("cardMonth")).findElements(By.cssSelector("option"));
		for (WebElement webElement : year) {
			if(webElement.getAttribute("value").equals(cardInfo.get(1))){
				webElement.click();
			}
		}
		for (WebElement webElement : month) {
			if(webElement.getAttribute("value").equals(cardInfo.get(2))){
				webElement.click();
			}
		}
		driver.findElement(By.name("cardJumin")).clear();
		driver.findElement(By.name("cardJumin")).sendKeys(cardInfo.get(3));
		driver.findElement(By.name("rsvSMS_Phone")).clear();
		driver.findElement(By.name("rsvSMS_Phone")).sendKeys(cardInfo.get(4));
		driver.findElement(By.id("tktGoBtn")).findElement(By.tagName("a")).click();
		
	}
	
	
	
	
}
