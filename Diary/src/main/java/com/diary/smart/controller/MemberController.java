package com.diary.smart.controller;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.diary.smart.dao.MemberDAO;
import com.diary.smart.vo.Member;

@Controller
public class MemberController {

	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	
	@Autowired
	private MemberDAO dao;
	
	@ResponseBody
	@RequestMapping(value = "ff", method=RequestMethod.GET)
	public String bbb(Model model, HttpSession session, HttpServletResponse response){
		
		return "";
	}
	
	@RequestMapping(value = "gg", method=RequestMethod.POST)
	public String ccc(Member member){
		
		return "";
	}
}
