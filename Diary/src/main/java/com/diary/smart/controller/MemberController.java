package com.diary.smart.controller;

import java.util.ArrayList;
import java.util.HashMap;

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
import com.diary.smart.util.SendMail;
import com.diary.smart.vo.Member;

@Controller
public class MemberController {

	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);

	@Autowired
	private MemberDAO dao;

	@RequestMapping(value = "signUpForm", method = RequestMethod.GET)
	public String signUpForm() {

		return "signUpForm";
	}

	@RequestMapping(value = "mypage", method = RequestMethod.GET)
	public String mypage(Model model, HttpSession session) {

		String user_id = (String) session.getAttribute("user_id");
		Member member = dao.selectMember(user_id);

		int user_no_pk = member.getUser_no_pk();
		ArrayList<HashMap<String, Object>> frlist = dao.friendList(user_no_pk);
		model.addAttribute("frlist", frlist);

		return "mypage";
	}
	
	@RequestMapping(value = "signUp", method = RequestMethod.POST)
	public String joinMember(Member member) {
		SendMail mail = new SendMail("", null, null);
		mail.test(member.getUser_id());

		int result = dao.joinMember(member);
			return "redirect:/";
	}

	@RequestMapping(value = "authenticated", method = RequestMethod.GET)
	public String emailCheck(String user_id) {

		int result = dao.authenticated(user_id);

		return "home";
	}

	@ResponseBody
	@RequestMapping(value = "selectMember", method = RequestMethod.POST)
	public Member selectMember(String user_id) {
		Member member = dao.selectMember(user_id);

		if (member == null)
			return new Member();

		return member;
	}

	@RequestMapping(value = "addFriend", method = RequestMethod.GET)
	public String addFriend(String user_id, HttpSession session) {

		String my_id = (String) session.getAttribute("user_id");

		Member me = dao.selectMember(my_id);
		Member frnd = dao.selectMember(user_id);

		ArrayList<HashMap<String, Object>> frlist = dao.friendList(me.getUser_no_pk());

		int user_no_fk = me.getUser_no_pk();
		int user_frno = frnd.getUser_no_pk();

/*		boolean flag = false;
		for (HashMap<String, Object> hashMap : frlist) {

			for (Object a : hashMap.values()) {
				if (user_frno == Integer.parseInt(a.toString())) {
					flag = true;
				}
			}
		}

		if (flag) {
			return "mypage";
		}*/
			int result = dao.addFriend(user_no_fk, user_frno);
	
		return "mypage";
	}

	@RequestMapping(value = "login", method = RequestMethod.POST)
	public String login(String id, String pw, String movieList, Model model, HttpSession session) {

		Member member = dao.selectMember(id);
		int aflag = member.getUser_aflag();
		if (aflag == 0)
			return "redirect:/";

		if (member == null) {
			return "redirect:/";
		} else {
			if (pw.equals(member.getUser_pw())) {
				//model.addAttribute("member", member);
				session.setAttribute("movieList", movieList);
				session.setAttribute("user_id", member.getUser_id());
				session.setAttribute("mvset", 1);
				return "redirect:diary";
			} else {
				return "redirect:/";
			}
		}
	}
	
	
	@RequestMapping(value = "logout", method = RequestMethod.GET)
	public String logout(HttpSession session) {
		session.removeAttribute("user_id");
		return "redirect:/";
	}

	@ResponseBody
	@RequestMapping(value = "frlist", method = RequestMethod.GET)
	public ArrayList<HashMap<String, Object>> friendList(String user_id) {

		System.out.println(user_id);
		Member member = dao.selectMember(user_id);

		int user_no_fk = member.getUser_no_pk();
		ArrayList<HashMap<String, Object>> frlist = dao.friendList(user_no_fk);

		System.out.println(frlist);

		return frlist;
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

	@RequestMapping(value = "deleteMember", method = RequestMethod.POST)
	public String deleteMember(int idno, Model model, HttpSession session) {

		int result = dao.deleteMember(idno);
		if (result > 0) {
			session.removeAttribute("user_id");
			return "home";
		} else {
			return "";
		}
	}
}
