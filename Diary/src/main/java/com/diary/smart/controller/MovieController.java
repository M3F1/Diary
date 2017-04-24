package com.diary.smart.controller;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.openqa.selenium.WebElement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.diary.smart.dao.DiaryDAO;
import com.diary.smart.dao.MemberDAO;
import com.diary.smart.util.CGVNavigator;
import com.diary.smart.vo.Diary;
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
		session.setAttribute("mvset", 0);
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
	@RequestMapping(value = "beforePaymentSchedule", method=RequestMethod.GET)
	public void beforePaymentSchedule(String date, String time, String mvname, String mvarea, String seat, String flag,
			HttpSession session){
		Diary diary = new Diary();
		diary.setUser_no_fk(memberDAO.selectMember((String)session.getAttribute("user_id")).getUser_no_pk());
		diary.setSc_con(time+"_"+mvname+"_"+mvarea+"_"+seat+"_"+flag);
		diary.setSc_wt("SU");
		diary.setSc_stdt(date);
		if(diaryDAO.insertDiary(diary)==1){
			session.setAttribute("lastscno", diaryDAO.lastSchedule());
		}
	}
	
	
	@ResponseBody
	@RequestMapping(value = "payment", method=RequestMethod.GET)
	public boolean payment(String card, String cardno, String sno, String year,
			String month, String birth, HttpSession session){
		//HashMap<String, Object> map = (HashMap<String, Object>) obj;
//		wc.selectSeats((ArrayList<Integer>)map.get("seats"));
		ArrayList<String> ex = new ArrayList<String>();
		boolean result = false;
		ex.add(card);
		ex.add(cardno.substring(0, 4));
		ex.add(cardno.substring(4, 8));
		ex.add(cardno.substring(8, 12));
		ex.add(cardno.substring(12, 16));
		ex.add(sno);
		ex.add(month);
		ex.add(year);
		ex.add(birth);
		
		result = cn.payment(ex);
		if(result){
			diaryDAO.paymentFin((Integer)session.getAttribute("lastscno"));
		}
		return result;
	}
	
	@ResponseBody
	@RequestMapping(value = "cancleMovieCGV", method=RequestMethod.GET)
	public boolean cancleMovieCGV(String mvtime, String mvname, int scno, HttpSession session){
		Member member = memberDAO.selectMember((String)session.getAttribute("user_id"));
		if(cn.cancleMovieCGV(mvtime, mvname, member)){
			if(diaryDAO.deleteDiary(scno)==1)
				return true;
			else{
				return false;
			}
		}else{
			return false;
		}
	}
	
	
	@RequestMapping(value = "test", method=RequestMethod.GET)
	public String aaa(){
		
		return "test";
	}
}
