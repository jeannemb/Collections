package com.depaul.se491.controllers;

import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.depaul.se491.dao.UserDAO;
import com.depaul.se491.domain.User;

@RestController
@RequestMapping(value = "/user")
public class UserController {
	
    @Autowired
	private UserDAO userDAO;
	
	@RequestMapping(value = "/details", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<User> getUserDetails( @RequestParam(required=true, value="username") String username) throws SQLException {
		User user = userDAO.getUserDetails(username);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
}
