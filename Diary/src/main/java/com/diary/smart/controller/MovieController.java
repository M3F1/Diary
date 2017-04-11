package com.diary.smart.controller;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.diary.smart.dao.DiaryDAO;
import com.diary.smart.util.CGVNavigator;
import com.diary.smart.vo.Member;

@Controller
public class MovieController {

	@Autowired
	private DiaryDAO dao;
	
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
	public HashMap<String,ArrayList<String>> settheater(String theater){
		cn.movieSelectHelper(theater);
		
		return null;
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
		cn.nextStep();
		Member member = new Member();
		member.setUser_nm("김김김");
		member.setUser_birth("900226");
		member.setUser_phone("01044543631");
		cn.movieInput(member);
	}
	
	@ResponseBody
	@RequestMapping(value = "getseat", method=RequestMethod.GET)
	public HashMap<String,Object> getseat2(String humanCount){
		return cn.showMovieSeat(humanCount);
	}
	
	@ResponseBody
	@RequestMapping(value = "setseat", method=RequestMethod.POST)
	public Object setseat(@RequestBody Object obj){
		HashMap<String, Object> map = (HashMap<String, Object>) obj;
		cn.selectSeats((ArrayList<Integer>)map.get("seats"));
		
		return null;
	}
	
	@ResponseBody
	@RequestMapping(value = "payment", method=RequestMethod.GET)
	public Object payment(){
		//HashMap<String, Object> map = (HashMap<String, Object>) obj;
//		wc.selectSeats((ArrayList<Integer>)map.get("seats"));
		ArrayList<String> ex = new ArrayList<String>();
		ex.add("국민카드");
		ex.add("1111");
		ex.add("2222");
		ex.add("3333");
		ex.add("4444");
		ex.add("55");
		ex.add("11");
		ex.add("21");
		ex.add("901212");
		cn.payment(ex);
		
		return null;
	}
	
	
	@RequestMapping(value = "test", method=RequestMethod.GET)
	public String aaa(){
		
		return "test";
	}
}
