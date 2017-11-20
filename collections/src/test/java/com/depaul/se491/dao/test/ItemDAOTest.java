package com.depaul.se491.dao.test;

import static org.junit.Assert.*;

import java.util.List;
import org.junit.Test;

import com.depaul.se491.dao.ItemDAO;
import com.depaul.se491.dao.ItemDAOImpl;
import com.depaul.se491.domain.Book;
import com.depaul.se491.domain.Item;
import com.depaul.se491.domain.Movie;

public class ItemDAOTest {

	public ItemDAO itemDAO;

	@Test
	public void getItemsByLibraryTest() {
		try{
			itemDAO = new ItemDAOImpl();
			String libraryType = "books";
			Long libraryId = (long) 1;
			List myitem = itemDAO.getItemsByLibrary(libraryType, libraryId);
			System.out.println(myitem.get(0).toString());
			assertNotNull(myitem);
		}catch(Exception e){
			System.out.println(e);
			fail("Getting items Failed");
		}
		
	}
	@Test
	public void addBooksInLibraryTest() {
		try{
			itemDAO = new ItemDAOImpl();
			Book book = new Book();
			book.setTitle("Junit Testing Book");
			Long booksLibraryId = (long) 23;
			book.setBooksLibraryId(booksLibraryId);
			String result = itemDAO.addBooksInLibrary(book);
			assertEquals("SUCCESS",result);
		}catch(Exception e){
			System.out.println(e);
			fail("adding book to Library Failed");
		}
		
	}
	
	@Test
	public void addMoviesInLibraryTest() {
		try{
			itemDAO = new ItemDAOImpl();
			Movie movie = new Movie();
			movie.setTitle("Junit Testing Movie");
			Long moviesLibraryId = (long) 33;
			movie.setMoviesLibraryId(moviesLibraryId);
			String result = itemDAO.addMoviesInLibrary(movie);
			assertEquals("SUCCESS",result);
		}catch(Exception e){
			System.out.println(e);
			fail("adding movie to Library Failed");
		}
		
	}
	
	@Test
	public void addGenericItemInLibraryTest() {
		try{
			itemDAO = new ItemDAOImpl();
			Item item = new Item();
			item.setTitle("Junit Testing Generic");
			Long genericLibraryId = (long) 34;
			item.setGenericLibraryId(genericLibraryId);
			String result = itemDAO.addGenericItemInLibrary(item);
			assertEquals("SUCCESS",result);
		}catch(Exception e){
			System.out.println(e);
			fail("adding gernric item to Library Failed");
		}
		
	}
	

}
