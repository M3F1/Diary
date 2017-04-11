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
		ebn.setStartingPoint(area);
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
	public HashMap<String,Object> showBusSeat(){
		if(ebn.getNow().equals("kobus")){
			return ebn.showBusSeat2();
		}else{
			return ebn.showBusSeat("2");
		}
	}
	
	@RequestMapping(value = "test2", method=RequestMethod.GET)
	public String test2(){
		
		return "test2";
	}
	
	@ResponseBody
	@RequestMapping(value = "setBusSeat", method=RequestMethod.POST)
	public Object setBusSeat(@RequestBody HashMap<String, Object> seats){
//		HashMap<String, Object> map = (HashMap<String, Object>) seats;
//		ebn.selectSeats2((ArrayList<Integer>)map.get("seats"));
		if(ebn.getNow().equals("kobus")){
			ebn.selectSeats2((ArrayList<String>)seats.get("seats"));
		}else{
			ebn.selectSeats((ArrayList<String>)seats.get("seats"));
		}
		
		return null;
	}
	
	@ResponseBody
	@RequestMapping(value = "writeCardInfo", method=RequestMethod.GET)
	public Object writeCardInfo(){
	
		if(ebn.getNow().equals("kobus")){
			ArrayList<String> cardInfo = new ArrayList<String>();
			cardInfo.add("1234115122624532");
			cardInfo.add("2018");
			cardInfo.add("12");
			cardInfo.add("880301");
			ebn.writeCardInfo2(cardInfo);
		}else{
			ArrayList<String> cardInfo = new ArrayList<String>();
			cardInfo.add("1234115122624532");
			cardInfo.add("2018");
			cardInfo.add("12");
			cardInfo.add("880301");
			cardInfo.add("01022326656");
			ebn.writeCardInfo(cardInfo);
		}
		
		return null;
	}
	
}
