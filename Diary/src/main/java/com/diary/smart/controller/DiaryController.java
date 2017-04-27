package com.diary.smart.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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
import com.diary.smart.dao.MemberDAO;
import com.diary.smart.vo.Diary;
import com.diary.smart.vo.Member;
import com.google.gson.Gson;

@Controller
public class DiaryController {
	private static final Logger logger = LoggerFactory.getLogger(DiaryController.class);

	@Autowired
	private DiaryDAO dao;
	@Autowired
	private MemberDAO mdao;

	@RequestMapping(value = "diary", method = RequestMethod.GET)
	public String diary(HttpSession session, Model model) {
		String id = (String) session.getAttribute("user_id");
		Member member = mdao.selectMember(id);
		List<HashMap<String, Object>> frList = mdao.friendList(member.getUser_no_pk());
		
		model.addAttribute("friendList", new Gson().toJson(frList));
		
		List<HashMap<String, Object>> scheduleList = dao.selectDiaryList(member.getUser_no_pk());
		model.addAttribute("scheduleList", new Gson().toJson(scheduleList));
		return "diary";
	}
	
	@RequestMapping(value="calendar", method=RequestMethod.GET)
	public String calendar() {
		return "calendar";
	}

	@ResponseBody
	@RequestMapping(value = "insertDiary", method = RequestMethod.GET)
	public String insertDiary(Diary diary, int sc_frno) {

		int result = dao.insertDiary(diary);
		int result2 = dao.insertCompagnie(sc_frno);

		return "";
	}

	@RequestMapping(value = "selectDiary", method = RequestMethod.POST)
	public String selectDiary(int sc_no_pk, Model model) {

//		Diary diary = dao.selectDiary(sc_no_pk);
//		model.addAttribute("diary", diary);

		return "";
	}

	@ResponseBody
	@RequestMapping(value = "searchSchedule", method = RequestMethod.POST)
	public ArrayList<HashMap<String, Object>> selectDiaryList(String sc_stdt, HttpSession session) {
		
		System.out.println(sc_stdt);
		String id = (String) session.getAttribute("user_id");
		System.out.println(id);
		Member member = mdao.selectMember(id);
		int user_no_fk = member.getUser_no_pk();
		System.out.println(member.getUser_no_pk());

//		ArrayList<HashMap<String, Object>> scheduleList = dao.selectDiaryList(user_no_fk, sc_stdt);
//		System.out.println(scheduleList);

//		return scheduleList;
		return null;
	}

	@RequestMapping(value = "updateDiary", method = RequestMethod.POST)
	public String updateDiary(Model model, Diary diary) {

		Diary nDiary = dao.updateDiary(diary);
		model.addAttribute("diary", nDiary);

		return "";

	}

	@RequestMapping(value = "deleteDiary", method = RequestMethod.POST)
	public String deleteDiary(int sc_no_pk, Model model) {

		int result = dao.deleteDiary(sc_no_pk);

		return null;

	}

}
