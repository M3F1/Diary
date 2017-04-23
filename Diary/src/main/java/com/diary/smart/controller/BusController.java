package com.diary.smart.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.diary.smart.dao.DiaryDAO;
import com.diary.smart.util.ExpressBusNavigator;
@Controller
public class BusController {
	@Autowired
	private DiaryDAO dao;
	
	private ExpressBusNavigator ebn = new ExpressBusNavigator();
	
	@ResponseBody
	@RequestMapping(value = "setStartingPoint", method=RequestMethod.GET)
	public void setStartingPoint(String area){
		ebn.setStartingPoint2(area);
	}
	@ResponseBody
	@RequestMapping(value = "setDestination", method=RequestMethod.GET)
	public void setDestination(String area){
		if(ebn.getNow().equals("kobus")){
			ebn.setDestination2(area);
		}else{
			ebn.setDestination(area);
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "showPayWindow", method=RequestMethod.GET)
	public Object showPayWindow(){
		if(ebn.getNow().equals("kobus")){
			return ebn.showPayWindow2();
		}else{
			return ebn.showPayWindow();
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "setBusdate", method=RequestMethod.GET)
	public void setdate(String date){
		if(ebn.getNow().equals("kobus")){
			ebn.setDate2(date);
		}else{
			ebn.setDate(date);
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "setSeatGrade", method=RequestMethod.GET)
	public void setSeatGrade(String grade){
		if(ebn.getNow().equals("kobus")){
			ebn.setSeatGrade2(grade);
		}else{
			ebn.setSeatGrade(grade);
		}
		
	}
	
	@ResponseBody
	@RequestMapping(value = "setHuman", method=RequestMethod.GET)
	public void setHuman2(String count){
		if(ebn.getNow().equals("kobus")){
			ebn.setHuman2(count);
		}else{
			ebn.setHuman(count);
		}
		
	}
	
	@ResponseBody
	@RequestMapping(value = "selectTicket", method=RequestMethod.GET)
	public void selectTicket(String time){
		if(ebn.getNow().equals("kobus")){
			ebn.selectTicket2(time);
		}else{
			ebn.selectTicket(time);
		}
		
	}
	
	@ResponseBody
	@RequestMapping(value = "showBusSeat", method=RequestMethod.GET)
	public HashMap<String,Object> showBusSeat(String count){
		if(ebn.getNow().equals("kobus")){
			return ebn.showBusSeat2();
		}else{
			return ebn.showBusSeat(count);
		}
	}
	
	@RequestMapping(value = "test2", method=RequestMethod.GET)
	public String test2(){
		
		return "test2";
	}
	
	@ResponseBody
	@RequestMapping(value = "setBusSeat", method=RequestMethod.POST)
	public ArrayList<String> setBusSeat(@RequestBody HashMap<String, Object> seats){
//		HashMap<String, Object> map = (HashMap<String, Object>) seats;
//		ebn.selectSeats2((ArrayList<Integer>)map.get("seats"));
		if(ebn.getNow().equals("kobus")){
			return ebn.selectSeats2((ArrayList<String>)seats.get("seats"));
		}else{
			return ebn.selectSeats((ArrayList<String>)seats.get("seats"));
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "writeCardInfo", method=RequestMethod.GET)
	public HashMap<String,Object> writeCardInfo(String cardno, String year, String month, String birth){
		HashMap<String, Object> result = new HashMap<>();
		if(ebn.getNow().equals("kobus")){
			ArrayList<String> cardInfo = new ArrayList<String>();
			cardInfo.add(cardno);
			cardInfo.add(year);
			cardInfo.add(month);
			cardInfo.add(birth);
			if(ebn.writeCardInfo2(cardInfo)){
				result.put("istrue", true);
				result.put("flag", "0");
			}else{
				result.put("istrue", false);
				result.put("flag", "re");
			}
			return result;
		}else{
			ArrayList<String> cardInfo = new ArrayList<String>();
			cardInfo.add(cardno);
			cardInfo.add(year);
			cardInfo.add(month);
			cardInfo.add(birth);
			cardInfo.add("01022326656");
			ebn.writeCardInfo(cardInfo);
			if(ebn.paymentCheck()!=null){
				//db에 예약번호 입력 및 결제플래그 Y로 수정
				result.put("istrue", true);
				result.put("flag", "1");
			}else{
				result.put("istrue", false);
				result.put("flag", "re");
			}
			return result;
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "cancleBusTicket", method=RequestMethod.GET)
	public boolean cancleBusTicket(String cardno, String terminal){
		//terminal 매개변수로 db에서 kobus인지 아닌지 확인해서 밑에 if안 terminal이랑 교체해야함.
		
		
		if(terminal.equals("kobus")){
			return ebn.cancleTicket2(cardno);
		}else{
			//매개변수로 예약번호 넘김.
			//디비에서 꺼내서 전달.
			if(ebn.cancleTicket(cardno,"예약번호 넘기기.")){
				//디비에서 일정 삭제 처리(삭제플래그 업데이트)
				
				return true;
			}else{
				return false;
			}
		}
	}
	
	
	
}
