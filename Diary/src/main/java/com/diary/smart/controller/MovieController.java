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
import com.diary.smart.util.CGVNavigator;
import com.diary.smart.vo.Member;
@Controller
public class MovieController {

	@Autowired
	private DiaryDAO diaryDAO;
	
	@Autowired
	private MemberDAO memberDAO;	
	
	private CGVNavigator cn = new CGVNavigator();
	
	@ResponseBody
	@RequestMapping(value = "getmovie", method=RequestMethod.GET)
	public ArrayList<String> test(){
		
		return cn.getMovie();
	}
	
	@ResponseBody
	@RequestMapping(value = "setmovie", method=RequestMethod.GET)
	public HashMap<String,ArrayList<String>> gettheater(String movie){
		cn.setMovie(movie);
		
		return null;
	}
	
	@ResponseBody
	@RequestMapping(value = "setdate", method=RequestMethod.GET)
	public HashMap<String,ArrayList<String>> setdate(String moviedate){
		cn.selectDate(moviedate);
		
		return null;
	}
	
	@ResponseBody
	@RequestMapping(value = "settheater", method=RequestMethod.GET)
	public void settheater(String theater){
		cn.movieSelectHelper(theater);
	}
	
	@ResponseBody
	@RequestMapping(value = "gettime", method=RequestMethod.GET)
	public ArrayList<String> gettime(){
		
		return cn.getMovieTimes();
	}
	@ResponseBody
	@RequestMapping(value = "settime", method=RequestMethod.GET)
	public void settime(String time){
		cn.selectTime(time);
	}
	
	@ResponseBody
	@RequestMapping(value = "mvInfoSetting", method=RequestMethod.GET)
	public void mvInfoSetting(HttpSession session){
		Member member = memberDAO.selectMember((String)session.getAttribute("user_id"));
		cn.movieInput(member);
		
	}
	
	@ResponseBody
	@RequestMapping(value = "getseat", method=RequestMethod.GET)
	public HashMap<String,Object> getseat2(String humanCount){
		return cn.showMovieSeat(humanCount);
	}
	
	@ResponseBody
	@RequestMapping(value = "setseat", method=RequestMethod.POST)
	public ArrayList<String> setseat(@RequestBody Object obj){
		HashMap<String, Object> map = (HashMap<String, Object>) obj;
		return cn.selectSeats((ArrayList<Integer>)map.get("seats"));
	}
	
	@ResponseBody
	@RequestMapping(value = "payment", method=RequestMethod.GET)
	public boolean payment(String card, String cardno, String sno, String year,
			String month, String birth){
		//HashMap<String, Object> map = (HashMap<String, Object>) obj;
//		wc.selectSeats((ArrayList<Integer>)map.get("seats"));
		ArrayList<String> ex = new ArrayList<String>();
		ex.add(card);
		ex.add(cardno.substring(0, 4));
		ex.add(cardno.substring(4, 8));
		ex.add(cardno.substring(8, 12));
		ex.add(cardno.substring(12, 16));
		ex.add(sno);
		ex.add(month);
		ex.add(year);
		ex.add(birth);
		return cn.payment(ex);
	}
	
	@RequestMapping(value = "test", method=RequestMethod.GET)
	public String aaa(){
		
		return "test";
	}
}
