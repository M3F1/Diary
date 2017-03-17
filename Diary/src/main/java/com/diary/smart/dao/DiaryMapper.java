package com.diary.smart.dao;

import java.util.ArrayList;

import com.diary.smart.vo.Diary;

public interface DiaryMapper {
	
	
	/**
	 * @param diary 입력할 일정 정보
	 * @return 입력된 일정의 개수
	 */
	public int insertDiary(Diary diary);			// 일정 입력
	
	/**
	 * @param scno 삭제할 일정번호
	 * @return 삭제된 일정의 개수 (실제 삭제가아닌 업데이트로 삭제플래그를 바꾸기 때문에 업데이트 된 개수)
	 */
	public int deleteDiary(int scno);			// 일정 삭제
												// 실제 삭제가아니라 delete flag값 update해준다.
	
	
	/**
	 * @param diary 수정된 일정정보
	 * @return 수정된 데이터의 개수
	 */
	public int updateDiary(Diary diary);			// 일정 수정
	
	
	/**
	 * @param idno 회원아이디
	 * @return 특정회원에 대한 일정 출력
	 */
	public ArrayList<Diary> selectDiary(int idno);	// 특정회원에 대한 일정 가져오기.
	
}
