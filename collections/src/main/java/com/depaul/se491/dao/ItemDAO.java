package com.depaul.se491.dao;

import java.sql.SQLException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.depaul.se491.domain.Book;
import com.depaul.se491.domain.Item;
import com.depaul.se491.domain.Movie;


@Service
public interface ItemDAO {
	
	List getItemsByLibrary(String libraryType, Long libraryId) throws SQLException;
	String addBooksInLibrary(Book book) throws SQLException;
	String addMoviesInLibrary(Movie movie) throws SQLException;
	String addGenericItemInLibrary(Item item) throws SQLException;
	
	// new Mohammed
	String deleteItemByItemId (String libraryType, Long itemId) throws SQLException;
	String deleteAllBooksByLibraryId(Long libraryId) throws SQLException;
	String deleteAllMoviesByLibraryId(Long libraryId) throws SQLException;
	String deleteAllGenericByLibraryId(Long libraryId) throws SQLException;
	
}
