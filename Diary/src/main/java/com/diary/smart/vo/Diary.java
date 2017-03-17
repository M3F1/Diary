package com.diary.smart.vo;

import java.util.ArrayList;

public class Diary {

	private int scid; // 일정의 일정번호
	private int id; // 회원의 회원번호
	private String scdate; // 일정의 날짜 YYMMDD HH24MISS
	private String content; // 일정 내용 정보 (장소, 시간, 목적 등)
	private String weather; // 날씨 정보 SU:맑음, CL:흐림, RA:비, SN:눈, DU:미세먼지
	private String finish; // 결제완료 정보 컬럼 완료시 Y 아니면 N
	private String inputdate; // 최조 등록일자 YYMMDD HH24MISS
	private String updatedate; // 수정날짜 YYMMDD HH24MISS
	private ArrayList<Integer> scfriendno; // 일정에 동행하는 친구 번호 정보.

	public Diary() {
		super();
	}

	public Diary(int scid, int id, String scdate, String content, String weather, String finish, String inputdate,
			String updatedate, ArrayList<Integer> scfriendno) {
		super();
		this.scid = scid;
		this.id = id;
		this.scdate = scdate;
		this.content = content;
		this.weather = weather;
		this.finish = finish;
		this.inputdate = inputdate;
		this.updatedate = updatedate;
		this.scfriendno = scfriendno;
	}

	public int getScid() {
		return scid;
	}

	public void setScid(int scid) {
		this.scid = scid;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getScdate() {
		return scdate;
	}

	public void setScdate(String scdate) {
		this.scdate = scdate;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getWeather() {
		return weather;
	}

	public void setWeather(String weather) {
		this.weather = weather;
	}

	public String getFinish() {
		return finish;
	}

	public void setFinish(String finish) {
		this.finish = finish;
	}

	public String getInputdate() {
		return inputdate;
	}

	public void setInputdate(String inputdate) {
		this.inputdate = inputdate;
	}

	public String getUpdatedate() {
		return updatedate;
	}

	public void setUpdatedate(String updatedate) {
		this.updatedate = updatedate;
	}

	public ArrayList<Integer> getScfriendno() {
		return scfriendno;
	}

	public void setScfriendno(ArrayList<Integer> scfriendno) {
		this.scfriendno = scfriendno;
	}

	@Override
	public String toString() {
		return "Diary [scid=" + scid + ", id=" + id + ", scdate=" + scdate + ", content=" + content + ", weather="
				+ weather + ", finish=" + finish + ", inputdate=" + inputdate + ", updatedate=" + updatedate
				+ ", scfriendno=" + scfriendno + "]";
	}

}
