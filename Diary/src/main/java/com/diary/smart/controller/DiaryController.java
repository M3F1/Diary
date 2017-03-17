package com.diary.smart.controller;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.diary.smart.dao.DiaryDAO;
import com.diary.smart.vo.Diary;

@Controller
public class DiaryController {
	private static final Logger logger = LoggerFactory.getLogger(DiaryController.class);
	
	@Autowired
	private DiaryDAO dao;
	
	@ResponseBody
	@RequestMapping(value = "ss", method=RequestMethod.GET)
	public String xxx(Model model, HttpSession session){
		
		return "";
	}
	
	@RequestMapping(value = "dd", method=RequestMethod.POST)
	public String aaa(Diary diary){
		
		return "";
	}
	
}
