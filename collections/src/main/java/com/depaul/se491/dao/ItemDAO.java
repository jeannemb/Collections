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
	String addBooksInlibrary(Book book) throws SQLException;
	String addMoviesInlibrary(Movie movie) throws SQLException;
	String addGenericItemInlibrary(Item item) throws SQLException;


}
