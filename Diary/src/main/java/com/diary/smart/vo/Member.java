package com.diary.smart.vo;

import java.util.ArrayList;

public class Member {
	private int idno;		   //회원번호
	private String id;         //회원의 아이디 아이디는 현존하는 이메일주소로 한다.(50자 미만)
	private String pw;         //비밀번호는 대소문자 및 특수문자 포함이다.(최소 6자 이상 16자 이하)
	private String name;       //회원의 이름
	private String birth;      //회원의 생년월일 정보 (형식은 YYMMDD 6자)
	private int phone;		   //핸드폰 번호 ex)01011111111 (only number)
	private String mvseat;     //영화관 좌석 설정정보 가운데 기준으로.. 
	                           //CC:가운데  NN:뒤쪽  SS:앞쪽  EE:오른쪽  WW:왼쪽
							   //NE:오른쪽뒤 NW:왼쪽뒤 SE:오른쪽앞 SW:오른쪽뒤  8군데
	private String joindate;   //가입날짜 YYMMDD HH24MISS
	private String transeat;   //교통 좌석 정보  창측 : W 내측 : I
	private String address1;   //첫번째 주소 정보(시,군,구)
	private String address2;   //두번째 주소 정보(시,군,구)
	private String address3;   //세번째 주소 정보(시,군,구)
	private ArrayList<Integer> friendno;  //회원의 친구 번호 정보.
	
	public Member() {
		super();
	}
	
	public Member(int idno, String id, String pw, String name, String birth, int phone, String mvseat, String joindate,
			String transeat, String address1, String address2, String address3, ArrayList<Integer> friendno) {
		super();
		this.idno = idno;
		this.id = id;
		this.pw = pw;
		this.name = name;
		this.birth = birth;
		this.phone = phone;
		this.mvseat = mvseat;
		this.joindate = joindate;
		this.transeat = transeat;
		this.address1 = address1;
		this.address2 = address2;
		this.address3 = address3;
		this.friendno = friendno;
	}

	public int getIdno() {
		return idno;
	}

	public void setIdno(int idno) {
		this.idno = idno;
	}

	public ArrayList<Integer> getFriendno() {
		return friendno;
	}

	public void setFriendno(ArrayList<Integer> friendno) {
		this.friendno = friendno;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPw() {
		return pw;
	}

	public void setPw(String pw) {
		this.pw = pw;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBirth() {
		return birth;
	}

	public void setBirth(String birth) {
		this.birth = birth;
	}

	public int getPhone() {
		return phone;
	}

	public void setPhone(int phone) {
		this.phone = phone;
	}

	public String getMvseat() {
		return mvseat;
	}

	public void setMvseat(String mvseat) {
		this.mvseat = mvseat;
	}

	public String getTranseat() {
		return transeat;
	}

	public void setTranseat(String transeat) {
		this.transeat = transeat;
	}

	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public String getAddress3() {
		return address3;
	}

	public void setAddress3(String address3) {
		this.address3 = address3;
	}

	public String getJoindate() {
		return joindate;
	}

	public void setJoindate(String joindate) {
		this.joindate = joindate;
	}

	@Override
	public String toString() {
		return "Member [idno=" + idno + ", id=" + id + ", pw=" + pw + ", name=" + name + ", birth=" + birth + ", phone="
				+ phone + ", mvseat=" + mvseat + ", joindate=" + joindate + ", transeat=" + transeat + ", address1="
				+ address1 + ", address2=" + address2 + ", address3=" + address3 + ", friendno=" + friendno + "]";
	}

}
