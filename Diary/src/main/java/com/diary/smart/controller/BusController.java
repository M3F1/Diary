package com.diary.smart.controller;

import java.util.ArrayList;
import java.util.Collections;
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
import com.diary.smart.util.ExpressBusNavigator;
import com.diary.smart.vo.Diary;
import com.diary.smart.vo.Member;
@Controller
public class BusController {
	@Autowired
	private DiaryDAO diaryDAO;
	
	@Autowired
	private ExpressBusNavigator ebn;
	
	@Autowired
	private MemberDAO memberDAO;
	
	
	@ResponseBody
	@RequestMapping(value = "setStartingPoint", method=RequestMethod.GET)
	public void setStartingPoint(String area){
		ebn.setStartingPoint2(area);
	}
	@ResponseBody
	@RequestMapping(value = "setDestination", method=RequestMethod.GET)
	public void setDestination(String area){
		if(ebn.getNow().equals("kobus")){
			ebn.setDestination2(area);
		}else{
			ebn.setDestination(area);
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "getBusTimes", method=RequestMethod.GET)
	public ArrayList<String> getBusTimes(){
		return ebn.getBusTimes();
	}
	
	
	
	@ResponseBody
	@RequestMapping(value = "showPayWindow", method=RequestMethod.GET)
	public Object showPayWindow(){
		if(ebn.getNow().equals("kobus")){
			return ebn.showPayWindow2();
		}else{
			return ebn.showPayWindow();
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "setBusdate", method=RequestMethod.GET)
	public void setdate(String date){
		if(ebn.getNow().equals("kobus")){
			ebn.setDate2(date);
		}else{
			ebn.setDate(date);
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "setSeatGrade", method=RequestMethod.GET)
	public void setSeatGrade(String grade){
		if(ebn.getNow().equals("kobus")){
			ebn.setSeatGrade2(grade);
		}else{
			ebn.setSeatGrade(grade);
		}
		
	}
	
	@ResponseBody
	@RequestMapping(value = "setHuman", method=RequestMethod.GET)
	public void setHuman2(String count){
		if(ebn.getNow().equals("kobus")){
			ebn.setHuman2(count);
		}else{
			ebn.setHuman(count);
		}
		
	}
	
	@ResponseBody
	@RequestMapping(value = "selectTicket", method=RequestMethod.GET)
	public ArrayList<String> selectTicket(String time){
		if(ebn.getNow().equals("kobus")){
			return ebn.selectTicket2(time);
		}else{
			ebn.selectTicket(time);
			return null;
		}
		
	}
	
	@ResponseBody
	@RequestMapping(value = "showBusSeat", method=RequestMethod.GET)
	public HashMap<String,Object> showBusSeat(String count){
		if(ebn.getNow().equals("kobus")){
			return ebn.showBusSeat2();
		}else{
			return ebn.showBusSeat(count);
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "setBusSeat", method=RequestMethod.POST)
	public ArrayList<String> setBusSeat(@RequestBody HashMap<String, Object> seats){
//		HashMap<String, Object> map = (HashMap<String, Object>) seats;
//		ebn.selectSeats2((ArrayList<Integer>)map.get("seats"));
		if(ebn.getNow().equals("kobus")){
			return ebn.selectSeats2((ArrayList<String>)seats.get("seats"));
		}else{
			return ebn.selectSeats((ArrayList<String>)seats.get("seats"));
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "writeCardInfo", method=RequestMethod.POST)
	public boolean writeCardInfo(String cardno, String year, String month,
			String birth, String paymentInfo, String date, HttpSession session){
		boolean result = false;
		Member member = memberDAO.selectMember((String)session.getAttribute("user_id"));
		//이때만 결제 작업 진행하면돼 진수야 보면지워
		if(ebn.getNow().equals("kobus")){
			ArrayList<String> cardInfo = new ArrayList<String>();
			cardInfo.add(cardno);
			cardInfo.add(year);
			cardInfo.add(month);
			cardInfo.add(birth);
			if(ebn.writeCardInfo2(cardInfo)){
				result = true;
				Diary diary = new Diary();
				diary.setUser_no_fk(memberDAO.selectMember((String)session.getAttribute("user_id")).getUser_no_pk());
				diary.setSc_con(paymentInfo);
				diary.setSc_wt("SU");
				diary.setSc_stdt(date);
				diaryDAO.insertDiary(diary);
				
			}else{
				result = false;
			}
			return result;
			//밑에 엘스는 안해도돼 보면지워
		}else{
			ArrayList<String> cardInfo = new ArrayList<String>();
			cardInfo.add(cardno);
			cardInfo.add(year);
			cardInfo.add(month);
			cardInfo.add(birth);
			cardInfo.add(member.getUser_phone());
			ebn.writeCardInfo(cardInfo);
			if(ebn.paymentCheck()!=null){
				result = true;
				diaryDAO.paymentFin((Integer)session.getAttribute("lastscno"));
			}else{
				result = false;
			}
			return result;
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "cancelBusTicket", method=RequestMethod.GET)
	public boolean cancelBusTicket(String cardno, String terminal){
			//매개변수로 예약번호 넘김.
			//디비에서 꺼내서 전달.
			if(ebn.cancelTicket(cardno,"예약번호 넘기기.")){
				//디비에서 일정 삭제 처리(삭제플래그 업데이트)
				return true;
			}else{
				return false;
			}
	}
	
	@ResponseBody
	@RequestMapping(value = "cancelKOBUS", method=RequestMethod.GET)
	public boolean cancelKOBUS(int scno, String cardno, String startdate, 
			String time, String area, String year, String month){
		if(ebn.cancelTicket2(cardno, startdate, time, area, year, month)){
			if(diaryDAO.deleteDiary(scno)==1){
				return true;
			}
		}
		return false;
		
			
	}
	
}
