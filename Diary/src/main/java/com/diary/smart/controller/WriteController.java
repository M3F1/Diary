package com.diary.smart.controller;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.diary.smart.dao.DiaryDAO;
import com.diary.smart.dao.MemberDAO;
import com.diary.smart.vo.Diary;
import com.diary.smart.vo.Member;

@Controller
public class WriteController {

	@Autowired
	MemberDAO mdao;
	@Autowired
	DiaryDAO dao;
	
	@ResponseBody
	@RequestMapping(value = "write", method = RequestMethod.POST)
	public void write(@RequestBody HashMap<String, Object> object, HttpSession session) {
		ArrayList<String> data = (ArrayList<String>) object.get("selectedFriendList");
		int user_no_fk = mdao.selectMember((String) session.getAttribute("user_id")).getUser_no_pk();
		String sc_stdt = data.get(data.size() - 2);
		String sc_con = data.get(data.size() - 1);
		data.remove(data.size() - 1);
		data.remove(data.size() - 1);
		
		ArrayList<Integer> frnoList = new ArrayList<>();
		
		for (String friend : data) {
			frnoList.add(mdao.selectMember(friend).getUser_no_pk());
		}
		
		Diary diary = new Diary();
		diary.setUser_no_fk(user_no_fk);
		diary.setSc_stdt(sc_stdt);
		diary.setSc_con(sc_con);
		diary.setSc_wt("SU");
		diary.setSc_fin("Y");
		
		// diary 객체의 sc_no_pk에 스케쥴 번호 넣어주기
		dao.insertDiary(diary);
		
		for (Integer frno : frnoList) {
			dao.insertCompanions(diary.getSc_no_pk(), user_no_fk, frno);
		}
	}
}
