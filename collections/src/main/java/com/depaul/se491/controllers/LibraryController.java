package com.depaul.se491.controllers;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.depaul.se491.dao.ItemDAO;
import com.depaul.se491.dao.LibraryDAO;
import com.depaul.se491.dao.UserDAO;
import com.depaul.se491.domain.Book;
import com.depaul.se491.domain.Item;
import com.depaul.se491.domain.Library;
import com.depaul.se491.domain.Movie;
import com.depaul.se491.domain.User;

@RestController
@RequestMapping(value = "/manage")
public class LibraryController {
	
    @Autowired
	private LibraryDAO libraryDAO;
    
    @Autowired
    private UserDAO userDAO;
    
    @Autowired
    private ItemDAO itemDAO;
	
	@RequestMapping(value = "/library", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<List<Library>> getLibraries() throws SQLException {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    String username = auth.getName();
		List<Library> libs = libraryDAO.getLibrariesByUser(username);
		return new ResponseEntity<>(libs, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/items", method = RequestMethod.GET, produces = "application/json")
	public ResponseEntity<List> getItems( @RequestParam(required=true, value="libraryId") Long libraryId, @RequestParam(required=true, value="libraryType") String librarytype) throws SQLException {
		return new ResponseEntity<>(itemDAO.getItemsByLibrary(librarytype, libraryId), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/createlibrary", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
	public ResponseEntity<String> createLibrary(@RequestBody Library jsonLibrary) throws SQLException {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    User user = userDAO.getUserDetails(auth.getName());
		jsonLibrary.setUserId(user.getUserId());
		String result = libraryDAO.createLibraryForUser(jsonLibrary);
		if (result == "SUCCESS"){
			return new ResponseEntity<String>(HttpStatus.OK);
		}else{
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "/addbook", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
	public ResponseEntity<String> addBookInLibrary(@RequestBody Book jsonBook) throws SQLException {
		String result = itemDAO.addBooksInLibrary(jsonBook);
		if (result == "SUCCESS"){
			return new ResponseEntity<String>(HttpStatus.OK);
		}else{
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "/addmovie", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
	public ResponseEntity<String> addMovieInLibrary(@RequestBody Movie jsonMovie) throws SQLException {
		String result = itemDAO.addMoviesInLibrary(jsonMovie);
		if (result == "SUCCESS"){
			return new ResponseEntity<String>(HttpStatus.OK);
		}else{
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "/addgeneric", method = RequestMethod.POST, produces = "application/json", consumes = "application/json")
	public ResponseEntity<String> addBook(@RequestBody Item jsonItem) throws SQLException {
		String result = itemDAO.addGenericItemInLibrary(jsonItem);
		if (result == "SUCCESS"){
			return new ResponseEntity<String>(HttpStatus.OK);
		}else{
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
	
	// new Mohammed
	@RequestMapping(value = "/deleteLibrary", method = RequestMethod.DELETE, produces = "application/json")
    public ResponseEntity<String> deleteLibrary(@RequestParam (required=true, value="libraryId") Long libraryId) throws SQLException {
		String result;
		String libraryType = libraryDAO.getLibraryTypeByLibraryId(libraryId);
		if (!libraryType.equals("Error occured or Library not Existed")){
			switch (libraryType){
				case "books": 
					itemDAO.deleteAllBooksByLibraryId(libraryId);
					result =  libraryDAO.deleteLibrary(libraryId);
				case "moveis":
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
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
	
	@RequestMapping(value = "/deleteItem", method = RequestMethod.DELETE, produces = "application/json")
    public ResponseEntity<String> deleteItem(@RequestParam (required=true, value="libraryId") Long libraryId, @RequestParam (required=true, value="itemId") Long itemId) throws SQLException {
		String result;
		String libraryType = libraryDAO.getLibraryTypeByLibraryId(libraryId);
		if (!libraryType.equals("Error occured or Library not Existed")){
			if(libraryType.equals("books") || libraryType.equals("movies")){
				result = itemDAO.deleteItemByItemId(libraryType, itemId);
				result = result + " " + libraryType;
			}else{
				libraryType = "generic_items";
				result = itemDAO.deleteItemByItemId(libraryType, itemId);
				result = result + " " + libraryType;
			}
		
		}else{
			result = "Error occured or Library not Existed";
		}
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
	
}
