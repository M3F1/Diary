package com.diary.smart.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.diary.smart.dao.DiaryDAO;
import com.diary.smart.util.TrainNavigator;
@Controller
public class TrainController {
	@Autowired
	private DiaryDAO dao;
	
	private TrainNavigator tn = new TrainNavigator();
	
	@ResponseBody
	@RequestMapping(value = "setStartAndDestPoint", method=RequestMethod.GET)
	public void setStartAndDestPoint(String area1, String area2){
		tn.setStartAndDestPoint(area1, area2);
	}
	
	@ResponseBody
	@RequestMapping(value = "setDate", method=RequestMethod.GET)
	public void setDate(String date){
		tn.setDate(date);
	}
	
	@ResponseBody
	@RequestMapping(value = "getSeat", method=RequestMethod.GET)
	public void getSeat(String date){
		tn.getSeat(date);
	}
	
	@ResponseBody
	@RequestMapping(value = "setPeople", method=RequestMethod.GET)
	public void setPeople(String count){
		tn.setPeople(count);
	}
	
}
