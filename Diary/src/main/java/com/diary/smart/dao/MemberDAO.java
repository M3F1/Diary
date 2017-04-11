package com.diary.smart.dao;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.diary.smart.vo.Member;

@Repository
public class MemberDAO {

	@Autowired
	SqlSession sqlSession;
	private static final Logger logger = LoggerFactory.getLogger(MemberDAO.class);

	/**
	 * @param member
	 *            회원가입할 회원의 정보
	 * @return DB에 insert된 회원의 명수
	 */
	public int joinMember(Member member) {
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		int result = 0;

		try {
			result = mapper.joinMember(member);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * @param member
	 *            정보수정할 회원의 정보
	 * @return 수정된 회원의 명수
	 */
	public int updateMember(Member member) {
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		int result = 0;
		try {
			result = mapper.updateMember(member);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;
	}

	/**
	 * @param idno
	 *            탈퇴할 회원의 회원번호
	 * @return 탈퇴된 회원의 명수 (실제 삭제가아닌 업데이트로 탈퇴플래그를 바꾸기 때문에 업데이트 된 개수)
	 */
	public int deleteMember(int idno) {
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		int result = 0;
		try {
			result = mapper.deleteMember(idno);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;
	}

	/**
	 * @param idno
	 *            친구리스트를 가져올 회원의 회원번호
	 * @return 친구 리스트
	 */
	public ArrayList<HashMap<String, Object>> friendList(int idno) {
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		ArrayList<HashMap<String, Object>> result = null;

		try {
			result = mapper.friendList(idno);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;
	}

	/**
	 * @param id
	 *            조회할 회원의 아이디
	 * @return 조회된 회원정보
	 */
	public Member selectMember(String id) {
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		Member result = new Member();
		try {
			result = mapper.selectMember(id);
			System.out.println(result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	public int addFriend(int user_no_fk, int user_frno){
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		int result = 0;
		try {
		result = mapper.addFriend(user_no_fk, user_frno);
		} catch (Exception e) {
		   e.printStackTrace();
		}
		return result;
	}

	public Member login(String id) {
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		Member member = null;
		try {
			member = mapper.selectMember(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return member;
	}
	
	public int authenticated(String id){
		MemberMapper mapper = sqlSession.getMapper(MemberMapper.class);
		int result = 0;
		
		try {
		result = mapper.authenticated(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

}
