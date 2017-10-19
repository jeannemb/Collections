package com.depaul.se491.controllers;

import org.springframework.web.bind.annotation.RequestMapping;  
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {

	@RequestMapping("/hello")  
    public String hello(){  
        return"Hello!";  
	}
}