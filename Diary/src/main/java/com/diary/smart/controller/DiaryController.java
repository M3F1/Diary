package com.diary.smart.controller;

import java.util.ArrayList;

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

@Controller
public class DiaryController {
	private static final Logger logger = LoggerFactory.getLogger(DiaryController.class);

	@Autowired
	private DiaryDAO dao;
	private MemberDAO mdao;

	@RequestMapping(value = "diary", method = RequestMethod.GET)
	public String diary() {
		return "diary";
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

		Diary diary = dao.selectDiary(sc_no_pk);
		model.addAttribute("diary", diary);

		return "";
	}

	@RequestMapping(value = "selectDiaryList", method = RequestMethod.POST)
	public String selectDiaryList(Model model, HttpSession session) {

		String id = (String) session.getAttribute("user_id");
		Member member = mdao.selectMember(id);

		int user_no_pk = member.getUser_no_pk();
		ArrayList<Diary> diaryList = dao.selectDiaryList(user_no_pk);
		model.addAttribute("diaryList", diaryList);

		return "";
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
