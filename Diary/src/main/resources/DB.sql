
SELECT * FROM v$PARAMETERS;

SELECT * FROM ID_USER_TB;
SELECT * FROM ID_USERFRNO_TB;
SELECT * FROM ID_SC_TB;
SELECT * FROM ID_SCFRNO_TB;

delete from ID_SC_TB where sc_no_pk = 21;

select user_no_pk, user_id, user_nm from id_user_tb where user_nm = '한진수';
update id_user_tb set user_aflag = 1 where user_nm = '이뿡치';
ALTER TABLE ID_USER_TB modify (user_aflag number DEFAULT 0);

ALTER TABLE ID_SC_TB modify (sc_endt NOT NULL);
ALTER TABLE ID_USER_TB DROP COLUMN user_transeat;

DELETE ID_SC_TB WHERE SC_NO_PK = 22;

DESC ID_USER_TB;

select sc_no_pk
		,
		user_no_fk
		, to_char(sc_stdt, 'YYYY/MM/DD') as sc_stdt 
		, to_char(sc_endt, 'YYYY/MM/DD') as sc_endt 
		, sc_con 
		, sc_fin
		, sc_insdt
		, CASE WHEN sc_wt='SU' THEN 'SUNNY'
					  WHEN sc_wt='CL' THEN 'CLOUDED'
					  WHEN sc_wt='RA' THEN 'RAINY'
					  WHEN sc_wt='SN' THEN 'SNOWY' 
					  WHEN sc_wt='DU' THEN 'FINE_DUST'
					  END AS sc_wt  
		from ID_SC_TB
		where
		user_no_fk = 2
		and
		sc_stdt = '2017-04-04';
				
		select sc_no_pk
		,
		user_no_fk
		, sc_stdt
		, sc_endt
		, sc_con
		, sc_wt
		, sc_fin
		, sc_insdt
		from ID_SC_TB
		where
		user_no_fk = 2
		and
		sc_stdt = '2017-04-13';

INSERT INTO ID_SCFRNO_TB(
sc_no_fk, 
sc_frno)
VALUES (2, 2);

select sc_no_fk, sc_frno from ID_SCFRNO_TB where sc_no_fk = 1;

select * from ID_USER_TB where user_no_pk = 2;

update ID_SC_TB set sc_dflag = 'N' where sc_no_pk = 1;

insert into ID_SC_TB (
		sc_no_pk, user_no_fk, sc_stdt, sc_endt, sc_con, sc_wt,
		sc_fin, sc_insdt, sc_dflag)
		values (
		SEQ_ID_SC_TB_sc_no_pk.nextval
		, 2
		, '17-6-5'
		, '17-6-8'
		, '대전역,결혼식,성심당'
		, 'SU'
		, 'N'
		, '170422'
		, 'Y');
		
insert into ID_SC_TB (
		sc_no_pk, user_no_fk, sc_stdt, sc_endt, sc_con, sc_wt,
		sc_fin, sc_insdt, sc_dflag)
		values (
		2
		, 2
		, '170404'
		, '170404'
		, '명동_20시_영화'
		, 'CL'
		, 'N'
		, '170404'
		, 'Y');
		
SELECT s.sc_no_pk, s.user_no_fk, u.user_nm, sc_stdt, sc_con, sc_wt,
		sc_fin, sc_insdt, sc_dflag 
FROM ID_SC_TB s, ID_USER_TB u
WHERE s.user_no_fk = u.user_no_pk
AND s.sc_no_pk = 2;
		

insert into ID_USERFRNO_TB values (8, 11);

insert into ID_SCFRNO_TB values (1, 11);

select f.user_frno, u.user_id, u.user_nm, u.user_phone
		from ID_USER_TB
		u, ID_USERFRNO_TB f
		where f.user_no_fk = u.user_no_pk
		and
		u.user_no_pk = 11;

select u.user_nm, u.user_phone
		from ID_USERFRNO_TB f, ID_USER_TB u
		where f.user_frno = u.user_no_pk
		and f.user_no_fk = 11;

select u.user_nm, u.user_phone 
		from id_user_tb u, id_scfrno_tb s 
		where u.user_no_pk = s.sc_frno
		and s.sc_no_fk = 

alter table ID_SCFRNO_TB rename column sc_no_pk to sc_no_fk;
		
/* Drop Tables */

DROP TABLE ID_SCFRNO_TB CASCADE CONSTRAINTS;
DROP TABLE ID_SC_TB CASCADE CONSTRAINTS;
DROP TABLE ID_USERFRNO_TB CASCADE CONSTRAINTS;
DROP TABLE ID_USER_TB CASCADE CONSTRAINTS;


/* Drop Sequences */

DROP SEQUENCE SEQ_ID_USER_TB_user_no_pk;
DROP SEQUENCE SEQ_ID_SC_TB_sc_no_pk;


/* Create Sequences */

CREATE SEQUENCE SEQ_ID_SC_TB_sc_no_pk INCREMENT BY 1 START WITH 1;
CREATE SEQUENCE SEQ_ID_USER_TB_user_no_pk INCREMENT BY 1 START WITH 1;


/* Create Tables */

CREATE TABLE ID_SCFRNO_TB      -- 일정에 동행하는 친구정보 테이블
(	
	sc_no_fk number NOT NULL,
	user_no_fk number NOT NULL,  -- 일정의 일정번호
	sc_frno number 			   -- 일정에 동행하는 친구 idno 정보
);


CREATE TABLE ID_SC_TB						 	 -- 일정 테이블
(
	sc_no_pk number NOT NULL,        		 	 -- 일정의 일정번호
	user_no_fk number NOT NULL,      		 	 -- 회원의 회원번호   
	sc_stdt date NOT NULL,             		 	 -- 일정의 날짜  YYMMDD HH24MISS
	sc_endt date,
	sc_con varchar2(4000) NOT NULL,  		 	 -- 일정 내용 정보 (장소, 시간, 목적 등)
	sc_wt varchar2(20) NOT NULL,     	         -- 날씨 정보  SU:맑음, CL:흐림, RA:비, SN:눈, DU:미세먼지
	sc_fin varchar2(20) DEFAULT 'N' NOT NULL,    -- 결제완료 정보 컬럼  완료시 Y 아니면 N
	sc_insdt date DEFAULT SYSDATE NOT NULL,      -- 최조 등록일자  YYMMDD HH24MISS
	sc_dflag varchar2(20) DEFAULT 'Y' NOT NULL,  -- 삭제플래그 삭제는 N 아니면 Y
	sc_updt date DEFAULT SYSDATE, 				 -- 수정날짜  YYMMDD HH24MISS
	sc_ddt date,  				 			     -- 일정 삭제 날짜  YYMMDD HH24MISS
	PRIMARY KEY (sc_no_pk, user_no_fk)
);

select user_no_pk, user_id, user_nm, user_phone
from id_user_tb
where user_no_pk in (select user_frno
from id_userfrno_tb
where user_no_fk = 1);

select f.user_frno, u.user_id, u.user_nm, u.user_phone from id_user_tb u, id_userfrno_tb f 
where u.user_no_pk = f.user_frno
and f.user_no_fk = 1;


CREATE TABLE ID_USERFRNO_TB		 -- 회원의 친구정보 테이블
(
	user_no_fk number NOT NULL,  -- 회원의 회원번호
	user_frno number,         	 -- 친구 아이디 번호
	PRIMARY KEY (user_no_fk, user_frno)
);


CREATE TABLE ID_USER_TB								-- 회원 테이블
(
	user_no_pk number NOT NULL,  			 		-- 회원의 회원번호
    user_aflag number DEFAULT '0' NOT NULL,
	user_id varchar2(50) NOT NULL UNIQUE,  			-- 회원의 아이디 아이디는 현존하는 이메일주소로 한다.(50자 미만)
	user_pw varchar2(16) NOT NULL,  				-- 비밀번호는 대소문자 및 특수문자 포함이다.(최소 6자 이상 16자 이하)
	user_nm varchar2(20) NOT NULL,  				-- 회원의 이름
	user_birth varchar2(6) NOT NULL,  				-- 회원의 생년월일 정보 (형식은 YYMMDD 6자)
	user_phone varchar2(20) NOT NULL,  	 			-- 핸드폰 번호 ex)01011111111 (only number)
	user_mvseat varchar2(20),  						-- 영화관 좌석 설정정보 L:왼쪽 R:오른쪽 M:가운데
	user_jodt date DEFAULT SYSDATE NOT NULL,  		-- 가입날짜  YYMMDD HH24MISS
	user_dflag varchar2(20) DEFAULT 'Y' NOT NULL,   -- 탈퇴플래그 탈퇴회원은 N 현재 회원은 Y
	user_add1 varchar2(120) NOT NULL,  				-- 첫번째 주소 정보(시,군,구)
	user_add2 varchar2(120),  					    -- 2번째 주소정보(시,군,구)
	user_add3 varchar2(120),  					    -- 3번째 주소정보(시,군,구)
	user_ddt date,  			   					-- 회원 탈퇴 날짜  YYMMDD HH24MISS
	PRIMARY KEY (user_no_pk)
);

insert into id_user_tb(user_no_pk
				, user_id
				, user_pw
				, user_nm
				, user_birth
				, user_phone
				, user_add1
				) values(
				SEQ_ID_USER_TB_user_no_pk.nextval
				, 'test'
				, 'test'
				, 'test'
				, '890901'
				, '010-1234-5678'
				, '서울시 강남구 삼성동 코엑스'
);

insert into id_user_tb(user_no_pk
				, user_id
				, user_pw
				, user_nm
				, user_birth
				, user_phone
				, user_add1
				) values(
				SEQ_ID_USER_TB_user_no_pk.nextval
				, 'testFriend'
				, 'testFriend'
				, 'testFriend'
				, '891121'
				, '010-4321-8765'
				, '서울시 강남구 수서동 삼익아파트'
);

insert into id_userfrno_tb values(2, 3);

/* Create Foreign Keys */

ALTER TABLE ID_SCFRNO_TB ADD
CONSTRAINT ID_SCFRNO_TB_FK FOREIGN KEY (sc_no_fk, user_no_fk)
REFERENCES ID_SC_TB (sc_no_pk, user_no_fk);

ALTER TABLE ID_SC_TB
	ADD FOREIGN KEY (user_no_fk)
	REFERENCES ID_USER_TB (user_no_pk)
;

ALTER TABLE ID_USERFRNO_TB
	ADD CONSTRAINT ID_USERFRNO_TB_FK FOREIGN KEY (user_no_fk)
REFERENCES ID_USER_TB (user_no_pk)
;

ALTER TABLE ID_SCFRNO_TB DROP CONSTRAINT ID_SCFRNO_TB_FK;

ALTER TABLE ID_SC_TB DROP PRIMARY KEY;
 
ALTER TABLE ID_SC_TB ADD PRIMARY KEY (sc_no_pk, user_no_fk);

ALTER TABLE ID_USERFRNO_TB DROP CONSTRAINT user_frno;
ALTER TABLE ID_USER_TB DROP CONSTRAINT user_frno;

