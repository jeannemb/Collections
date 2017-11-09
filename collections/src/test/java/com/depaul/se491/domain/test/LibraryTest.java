package com.depaul.se491.domain.test;

import static org.junit.Assert.*;

import org.junit.Test;

import com.depaul.se491.domain.Library;

//This is a test class for Library Class
public class LibraryTest {

	//This is a test object from Library Class
	Library libraryTest;
	
	//This is a test method for getLibraryId
	@Test
	public void testGetLibraryId() {
		try{
			libraryTest = new Library();
			Long libraryId = 1L;
			libraryTest.setLibraryId(libraryId);
			assertEquals(libraryId, libraryTest.getLibraryId());
		}catch(Exception e){
			fail("Library Id value has been gotten correctly");	
		}	
	}
	
	//This is a test method for setLibraryId
	@Test
	public void testSetLibraryId() {
		try{
			libraryTest = new Library();
			Long libraryId = 1L;
			libraryTest.setLibraryId(libraryId);
			assertEquals(libraryId, libraryTest.getLibraryId());
		}catch(Exception e){
			fail("Library Id value has been set correctly");	
		}
	}
	
	//This is a test method for getUserId
	@Test
	public void testGetUserId() {
		try{
			libraryTest = new Library();
			Long userId = 1L;
			libraryTest.setUserId(userId);
			assertEquals(userId, libraryTest.getUserId());
		}catch(Exception e){
			fail("User Id value has been gotten correctly");	
		}	
	}
	
	//This is a test method for setUserId
	@Test
	public void testSetUserId() {
		try{
			libraryTest = new Library();
			Long userId = 1L;
			libraryTest.setUserId(userId);
			assertEquals(userId, libraryTest.getUserId());
		}catch(Exception e){
			fail("User Id value has been set correctly");	
		}
	}
	
	//This is a test method for getName
		@Test
		public void testGetName() {
			try{
				libraryTest = new Library();
				String name = "myBooks";
				libraryTest.setName(name);
				assertEquals(name, libraryTest.getName());
			}catch(Exception e){
				fail("Name value has been gotten correctly");	
			}	
		}
		
		//This is a test method for setName
		@Test
		public void testSetName() {
			try{
				libraryTest = new Library();
				String name = "myBooks";
				libraryTest.setName(name);
				assertEquals(name, libraryTest.getName());
			}catch(Exception e){
				fail("Name value has been set correctly");	
			}
		}
		
		//This is a test method for getType
		@Test
		public void testGetType() {
			try{
				libraryTest = new Library();
				String type = "Books";
				libraryTest.setType(type);
				assertEquals(type, libraryTest.getType());
			}catch(Exception e){
				fail("Type value has been gotten correctly");	
			}	
		}
		
		//This is a test method for setType
		@Test
		public void testSetType() {
			try{
				libraryTest = new Library();
				String type = "Books";
				libraryTest.setType(type);
				assertEquals(type, libraryTest.getType());
			}catch(Exception e){
				fail("Type value has been set correctly");	
			}
		}

}
