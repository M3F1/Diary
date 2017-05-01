package com.diary.smart.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.diary.smart.dao.DiaryDAO;
import com.diary.smart.dao.MemberDAO;
import com.diary.smart.util.TrainNavigator;
import com.diary.smart.vo.Diary;
@Controller
public class TrainController {
	@Autowired
	private DiaryDAO diaryDAO;
	
	@Autowired
	private TrainNavigator tn;
	
	@Autowired
	private MemberDAO memberDAO;
	
	@ResponseBody
	@RequestMapping(value = "setStartAndDestPoint", method=RequestMethod.GET)
	public void setStartAndDestPoint(String area1, String area2){
		tn.setStartAndDestPoint(area1, area2);
	}
	
	@ResponseBody
	@RequestMapping(value = "setDate", method=RequestMethod.GET)
	public ArrayList<String> setDate(String date){
		return tn.setDate(date);
	}
	
	@ResponseBody
	@RequestMapping(value = "setKTXSeat", method=RequestMethod.GET)
	public boolean setKTXSeat(String date){
		return tn.setKTXSeat(date);
	}
	
	@ResponseBody
	@RequestMapping(value = "setPeople", method=RequestMethod.GET)
	public void setPeople(String count){
		tn.setPeople(count);
	}
	
	@ResponseBody
	@RequestMapping(value = "loginTrain", method=RequestMethod.POST)
	public ArrayList<String> loginTrain(String type, String trid, String trkey){
		ArrayList<String> info = new ArrayList<>();
		info.add(type);
		info.add(trid);
		info.add(trkey);
		return tn.login(info);
	}
	
	@ResponseBody
	@RequestMapping(value = "KTXwriteCardInfo", method=RequestMethod.POST)
	public boolean KTXwriteCardInfo(String type, String cardno, String year, String month, 
			String key, String birth, String paymentInfo, String date, HttpSession session){

		ArrayList<String> cardInfo = new ArrayList<String>();
		cardInfo.add(type);
		cardInfo.add(cardno);
		cardInfo.add(year);
		cardInfo.add(month);
		cardInfo.add(key);
		cardInfo.add(birth);
		if(tn.pay(cardInfo)){
			Diary diary = new Diary();
			diary.setUser_no_fk(memberDAO.selectMember((String)session.getAttribute("user_id")).getUser_no_pk());
			diary.setSc_con(paymentInfo);
			diary.setSc_wt("SU");
			diary.setSc_stdt(date);
			diaryDAO.insertDiary(diary);
			return true;
		}else{
			return false;
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "cancelLoginCheckKTX", method=RequestMethod.GET)
	public boolean cancelLoginCheckKTX(){
		return tn.cancelCheck();
	}
	
	@ResponseBody
	@RequestMapping(value = "cancelKTX", method=RequestMethod.GET)
	public boolean cancelKTX(String date, String time, int scno, HttpSession session){
		
		if(tn.cancelKTX(date, time)){
			if(diaryDAO.deleteDiary(scno)==1)
				return true;
		}//outer if
		return false;
	}
	
}
