package com.depaul.se491.controllers;

import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.depaul.se491.dao.UserDAO;
import com.depaul.se491.domain.Item;
import com.depaul.se491.domain.User;
import com.depaul.se491.security.SecurityConfig;
import com.depaul.se491.security.SecurityService;

@RestController
@RequestMapping(value = "/user")
public class UserController {
	
    @Autowired
	private UserDAO userDAO;
    @Autowired
    private SecurityService security;
	
	@RequestMapping(value = "/currentUser", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<User> getCurrentUser() throws SQLException {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    String username = auth.getName();
		User user = userDAO.getUserDetails(username);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/createUser", method = RequestMethod.POST, produces = "application/json")
	public ResponseEntity<String> createUser(@RequestBody User user) throws SQLException {
		String result = userDAO.createUser(user);
		if (result.equals("New user created")){
			String login = security.autoLogin(user.getEmail(), user.getPassword());
			return new ResponseEntity<>(HttpStatus.OK);	
		}else{
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);	
		}
	}
	
	@RequestMapping(value = "/updateUser", method = RequestMethod.POST, produces = "application/json")
	public ResponseEntity<String> updateUser(@RequestBody User user) throws SQLException {
		String result = userDAO.updateUser(user);
		System.out.println(result);
		if (result.equals("Successfully updated")){
			return new ResponseEntity<>(HttpStatus.OK);	
		}else{
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);	
		}
	}
	
}
