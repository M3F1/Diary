function validationCheck() {
	var id = $("#id");
	var user_pw = $("#user_pw");
	var re_user_pw = $("#re_user_pw");
	var birth = $("#user_birth");
	var day = $("#day");
	var phone = $("#user_phone");
	var address1 = $("#user_add1");

	if (id.val() == "") {
		alert("아이디를 입력하세요");
		$("#id").focus();
		return false;
	} else if (user_pw.val() == "") {
		alert("비밀번호를 입력하세요");
		user_pw.focus();
		return false;
	} else if (re_user_pw.val() == "") {
		alert("비밀번호 확인을 입력하세요");
		re_user_pw.focus();
		return false;
	} else if (user_pw.val() != re_user_pw.val()) {
		alert("비밀번호가 일치하지 않습니다. 다시 입력하세요");
		return false;
	} else if (name.val() == "") {
		alert("이름을 입력하세요");
		name.focus();
		return false;
	} else if (birth.val() == "") {
		alert("주민등록번호 앞자리를 입력하세요");
		birth.focus();
		return false;
	} else if (phone.val() == "") {
		alert("휴대전화 번호를 입력하세요");
		phone.focus();
		return false;
	} else if (address1.val() == "") {
		alert("주소를 입력하세요");
		address1.focus();
		return false;
	}

	return true;
}

$(document).ready(function() {

	$("#user_id").keyup(function() {

		var user_id = $("#user_id").val();

		$.ajax({
			type : "get",
			url : "selectMember",
			data : {
				user_id : user_id
			},
			dataType : "json",
			success : function(data) {
				console.log(data);
				if (data.user_id == null) {
					$("#idLabel").text("* 사용할 수 있는 ID입니다");
				} else {
					$("#idLabel").text("* 사용할 수 없는 ID입니다");
				}
			},
			error : function(e) {
				console.log(e);
			}
		});
	});
});