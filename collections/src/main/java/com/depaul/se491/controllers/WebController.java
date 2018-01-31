package com.depaul.se491.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class WebController {
	
	@RequestMapping(value="/",method = RequestMethod.GET)
   public String homepage(){
       return "index";
   }

	@RequestMapping(value="/login",method = RequestMethod.GET)
	public String login(){
	   return "login";
	}

	@RequestMapping(value="/about",method = RequestMethod.GET)
	public String about(){
	   return "about";
	}
	
	@RequestMapping(value="/accountCreation",method = RequestMethod.GET)
	public String accountCreation(){
	   return "accountCreation";
	}

	@RequestMapping(value="/libraryCreation",method = RequestMethod.GET)
	public String libraryCreation(){
	   return "libraryCreation";
	}

	@RequestMapping(value="/libraryHome",method = RequestMethod.GET)
	public String libraryHome(){
	   return "libraryHome";
	}
	
	@RequestMapping(value="/itemCreation",method = RequestMethod.GET)
	public String itemCreation(){
	   return "itemCreation";
	}
	
	@RequestMapping(value="/libraryHome2",method = RequestMethod.GET)
	public String libraryHome2(){
	   return "libraryHome2";
	}
	
	@RequestMapping(value="/addBook",method = RequestMethod.GET)
	public String addBook(){
	   return "addBook";
	}
	
	@RequestMapping(value="/addMovie",method = RequestMethod.GET)
	public String addMovie(){
	   return "addMovie";
	}
	
	@RequestMapping(value="/addGeneric",method = RequestMethod.GET)
	public String addGeneric(){
	   return "addGeneric";
	}
}