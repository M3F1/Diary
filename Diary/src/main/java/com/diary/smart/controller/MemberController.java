package com.diary.smart.controller;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
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

	@RequestMapping(value = "signUpForm", method = RequestMethod.GET)
	public String signUpForm(Model model, HttpSession session, HttpServletResponse response) {

		return "signUpForm";
	}

	@RequestMapping(value = "signUp", method = RequestMethod.POST)
	public String joinMember(Member member) {
		System.out.println(member);

		int result = dao.joinMember(member);
		if (result == 1) {
			return "home";
		} else {
			return "redirect:signUpForm";
		}
	}

	@ResponseBody
	@RequestMapping(value = "selectMember", method = RequestMethod.GET)
	public Member selectMember(String user_id) {
		System.out.println(user_id);

		Member member = dao.selectMember(user_id);

		if (member == null)
			return new Member();

		return member;
	}

	@RequestMapping(value = "login", method = RequestMethod.POST)
	public String login(String user_id, String user_pw, Model model, HttpSession session) {
		System.out.println(user_id);

		Member member = dao.selectMember(user_id);
		if (member == null) {
			return "redirect:/";
		} else {
			if (user_pw.equals(member.getUser_pw())) {
				model.addAttribute("member", member);
				session.setAttribute("user_id", member.getUser_id());
				return "home";
			} else
				return "redirect:/";
		}
	}

	@RequestMapping(value = "frlist", method = RequestMethod.GET)
	public String selectFriendMember(String user_id, Model model, HttpSession session) {

		System.out.println(user_id);
		Member member = dao.selectMember(user_id);
		ArrayList<HashMap<String, Object>> frlist = new ArrayList<HashMap<String, Object>>();
		int user_no_fk = member.getUser_no_pk();
		frlist = dao.selectFriendMember(user_no_fk);
		model.addAttribute("frlist", frlist);

		return "infoForm";
	}

	@RequestMapping(value = "infoForm", method = RequestMethod.POST)
	public String updateForm(String user_pw, Model model, HttpSession session) {

		String id = (String) session.getAttribute("user_id");
		Member member = dao.selectMember(id);
		if (user_pw.equals(member.getUser_pw())) {
			model.addAttribute("member", member);
			return "infoForm";
		} else {
			return "redirect:/";
		}
	}

	@RequestMapping(value = "updateInfo", method = RequestMethod.POST)
	public String updateMember(Member member, Model model, HttpSession session) {

		int result = dao.updateMember(member);
		String id = (String) session.getAttribute("user_id");
		Member upMember = dao.selectMember(id);
		model.addAttribute("member", upMember);
		return "";
	}
	
	@RequestMapping(value="deleteMember", method=RequestMethod.POST)
	public String deleteMember(int idno, Model model, HttpSession session){
		
		int result = dao.deleteMember(idno);
		if (result > 0) {
			session.removeAttribute("user_id");
			return "home";
		} else {
			return "";
		}
	}
}
