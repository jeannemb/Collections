package com.depaul.se491.controllers;

import java.sql.SQLException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.depaul.se491.dao.LibraryDAO;
import com.depaul.se491.domain.Item;
import com.depaul.se491.domain.Library;

@RestController
@RequestMapping(value = "/manage")
public class LibraryController {
	
	private LibraryDAO libraryDAO;
	
	@RequestMapping(value = "/library", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<List<Library>> getLibraries( @RequestParam(required=true, value="userId") Long userId) throws SQLException {
		return new ResponseEntity<>(libraryDAO.getLibrariesByUser(userId), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/items", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<List<Item>> getItems( @RequestParam(required=true, value="libraryId") Long libraryId) {
		return new ResponseEntity<>(libraryDAO.getItemsByLibrary(libraryId), HttpStatus.OK);
	}
	
}
