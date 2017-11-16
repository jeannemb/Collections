package com.depaul.se491.dao.test;

import static org.junit.Assert.*;
import java.util.List;
import org.junit.Test;

import com.depaul.se491.dao.LibraryDAO;
import com.depaul.se491.dao.LibraryDAOImpl;
import com.depaul.se491.domain.Library;

public class LibraryDAOTest {

	public LibraryDAO libraryDAO;
	
	@Test
	public void getLibrariesByUserTest() {
		try{
			libraryDAO = new LibraryDAOImpl();
			long userId = (long) 5;
			List<Library> myLibs = libraryDAO.getLibrariesByUser(userId);
			System.out.println(myLibs.get(0).toString());
			assertNotNull(myLibs);
		}catch(Exception e){
			System.out.println(e);
			fail("Getting Libraries Failed");
		}
		
	}
	
	@Test
	public void creatLibraryForUserTest() {
		try{
			libraryDAO = new LibraryDAOImpl();
			long userId = (long) 5;
			Library libBooks = new Library();
			libBooks.setName("Junit Testing");
			libBooks.setType("books");
			libBooks.setUserId(userId);
			String result1 = libraryDAO.creatLibraryForUser(libBooks);
			Library libMovies = new Library();
			libMovies.setName("Junit Testing");
			libMovies.setType("movies");
			libMovies.setUserId(userId);
			String result2 = libraryDAO.creatLibraryForUser(libMovies);
			Library libGeneric = new Library();
			libGeneric.setName("Junit Testing");
			libGeneric.setType("generic");
			libGeneric.setUserId(userId);
			String result3 = libraryDAO.creatLibraryForUser(libGeneric);
			assertEquals("SUCCESS",result1);
			assertEquals("SUCCESS",result2);
			assertEquals("SUCCESS",result3);

		}catch(Exception e){
			System.out.println(e);
			fail("Creation Libraries Failed");
		}
		
	}

}
