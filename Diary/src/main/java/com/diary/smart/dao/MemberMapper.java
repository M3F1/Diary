package com.diary.smart.dao;

import java.util.ArrayList;
import java.util.HashMap;

import com.diary.smart.vo.Member;

public interface MemberMapper {
	
	
	/**
	 * @param member 회원가입할 회원의 정보
	 * @return  DB에 insert된 회원의 명수
	 */
	public int joinMember(Member member); 					// 회원가입
	
	
	/**
	 * @param member 정보수정할 회원의 정보
	 * @return	수정된 회원의 명수
	 */
	public int updateMember(Member member);					// 회원정보수정
	
	
	/**
	 * @param idno	탈퇴할 회원의 회원번호
	 * @return		탈퇴된 회원의 명수 (실제 삭제가아닌 업데이트로 탈퇴플래그를 바꾸기 때문에 업데이트 된 개수)
	 */
	public int deleteMember(int idno);   				// 실제 삭제가아닌 delete flag만 
														// update해준다.
	
	
	/**
	 * @param idno 친구리스트를 가져올 회원의 회원번호
	 * @return 친구 리스트
	 */
	public ArrayList<HashMap<String, Object>> friendList(int idno);	// 멤버의 친구리스트를 조회한다.
	
	
	
	public int addFriend(int user_no_fk, int user_frno); //친구 등록
	
	
	/**
	 * @param id 조회할 회원의 아이디
	 * @return  조회된 회원정보
	 */
	public Member selectMember(String id);					// 한명의 회원조회(id중복검사 등)
	
	
	public int authenticated(String id); // 회원 인증처리
	

}
