package com.diary.smart.controller;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class WriteController {

	@ResponseBody
	@RequestMapping(value = "write", method = RequestMethod.POST)
	public void write(@RequestBody HashMap<String, Object> object) {
//		HashMap<String, Object> map = (HashMap<String, Object>) object;
		
		System.out.println(object.get("selectedFriendList"));
	}
}
