package com.depaul.se491.controllers;

import java.sql.SQLException;
import java.util.List;

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

import com.depaul.se491.dao.ItemDAO;
import com.depaul.se491.dao.LibraryDAO;
import com.depaul.se491.dao.UserDAO;
import com.depaul.se491.domain.Item;
import com.depaul.se491.domain.Library;
import com.depaul.se491.domain.User;
import com.depaul.se491.security.SecurityConfig;
import com.depaul.se491.security.SecurityService;

@RestController
@RequestMapping(value = "/user")
public class UserController {
	
    @Autowired
	private LibraryDAO libraryDAO;
    
    @Autowired
    private UserDAO userDAO;
    
    @Autowired
    private ItemDAO itemDAO;
    
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
	
	@RequestMapping(value = "/deleteUser", method = RequestMethod.DELETE, produces = "application/json")
    public ResponseEntity<String> deleteUser() throws SQLException {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    String username = auth.getName();
		List<Library> libs = libraryDAO.getLibrariesByUser(username);
		String result;
		for(Library lib: libs){
			Long libraryId = lib.getLibraryId();
			String libraryType = libraryDAO.getLibraryTypeByLibraryId(libraryId);
			if (!libraryType.equals("Error occured or Library not Existed")){
				switch (libraryType){
					case "books": 
						itemDAO.deleteAllBooksByLibraryId(libraryId);
						result =  libraryDAO.deleteLibrary(libraryId);
					case "movies":
						itemDAO.deleteAllMoviesByLibraryId(libraryId);
						result = libraryDAO.deleteLibrary(libraryId);
					default:
						libraryType = "generic_items";
						itemDAO.deleteAllGenericByLibraryId(libraryId);	
						result = libraryDAO.deleteLibrary(libraryId);
				}
			}else{
				result = "Error occured or Library not Existed";
			}
		}
		if (result == "SUCCESS"){
			result = userDAO.deleteUser(username);
			if(result == "SUCCESS"){
				return new ResponseEntity<>(HttpStatus.OK);
			}
			else{
				return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);	
			}
		}else{
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);	
		} 
		
	}
	
}
