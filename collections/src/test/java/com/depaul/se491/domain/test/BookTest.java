package com.depaul.se491.domain.test;

import static org.junit.Assert.*;

import org.junit.Test;

import com.depaul.se491.domain.Book;

//This is a test for Book Class
public class BookTest {

	//This is a test object from Book Class
	Book bookTest;
	
	//This is a test method for setItemId method
	@Test
	public void testSetItemId() {
		try{
			bookTest = new Book();
			Long itemId = 1L;
			bookTest.setItemId(itemId);
			assertEquals(itemId, bookTest.getItemId());
		}catch(Exception e){
			fail("Item Id has not been set correctly");
		}
		
	}
	//This is a test method for getItemId method
	@Test
	public void testGetItemId() {
		try{
			bookTest = new Book();
			Long itemId = 1L;
			bookTest.setItemId(itemId);
			assertEquals(itemId, bookTest.getItemId());
		}catch(Exception e){
			fail("Item Id has not been set correctly");
		}
		
	}

	
	//This is a test method for setBooksLibraryId method
	@Test
	public void testSetBooksLibraryId() {
		try{
			bookTest = new Book();
			Long booksLibraryId = 1L;
			bookTest.setBooksLibraryId(booksLibraryId);
			assertEquals(booksLibraryId, bookTest.getBooksLibraryId());
		}catch(Exception e){
			fail("Books Library Id has not been set correctly");
		}
		
	}
	//This is a test method for getBooksLibraryId method
	@Test
	public void testGetBooksLibraryId() {
		try{
			bookTest = new Book();
			Long booksLibraryId = 1L;
			bookTest.setBooksLibraryId(booksLibraryId);
			assertEquals(booksLibraryId, bookTest.getBooksLibraryId());
		}catch(Exception e){
			fail("Books Library Id Id has not been set correctly");
		}
		
	}
	
	//This is a test method for setTitle method
	@Test
	public void testSetTitle() {
		try{
			bookTest = new Book();
			String title = "BookTest";
			bookTest.setTitle(title);
			assertEquals(title, bookTest.getTitle());
		}catch(Exception e){
			fail("title has not been set correctly");
		}
		
	}
	//This is a test method for getTitle method
	@Test
	public void testGetTitle() {
		try{
			bookTest = new Book();
			String title = "BookTest";
			bookTest.setTitle(title);
			assertEquals(title, bookTest.getTitle());
		}catch(Exception e){
			fail("title has not been set correctly");
		}
		
	}
	
	//This is a test method for setISBN13 method
	@Test
	public void testSetISBN13() {
		try{
			bookTest = new Book();
			String iSBN13 = "978-3-16-148410-0";
			bookTest.setISBN13(iSBN13);
			assertEquals(iSBN13, bookTest.getISBN13());
		}catch(Exception e){
			fail("ISBN13 has not been set correctly");
		}
		
	}
	
	//This is a test method for getISBN13 method
	@Test
	public void testGetISBN13() {
		try{
			bookTest = new Book();
			String iSBN13 = "978-3-16-148410-0";
			bookTest.setISBN13(iSBN13);
			assertEquals(iSBN13, bookTest.getISBN13());
		}catch(Exception e){
			fail("ISBN13 has not been set correctly");
		}
		
	}
	
	//This is a test method for setISBN10 method
	@Test
	public void testSetISBN10() {
		try{
			bookTest = new Book();
			String iSBN10 = "978-3-16-148410-0";
			bookTest.setISBN10(iSBN10);
			assertEquals(iSBN10, bookTest.getISBN10());
		}catch(Exception e){
			fail("ISBN10 has not been set correctly");
		}
		
	}
	
	//This is a test method for getISBN10 method
	@Test
	public void testGetISBN10() {
		try{
			bookTest = new Book();
			String iSBN10 = "032157351X";
			bookTest.setISBN10(iSBN10);
			assertEquals(iSBN10, bookTest.getISBN10());
		}catch(Exception e){
			fail("ISBN10 has not been set correctly");
		}
		
	}
	
	//This is a test method for setAuthors method
	@Test
	public void testSetAuthors() {
		try{
			bookTest = new Book();
			String authors = "Mohammed Alharbi";
			bookTest.setAuthors(authors);
			assertEquals(authors, bookTest.getAuthors());
		}catch(Exception e){
			fail("setAuthors has not been set correctly");
		}
		
	}
	
	//This is a test method for getAuthors method
	@Test
	public void testGetAuthors() {
		try{
			bookTest = new Book();
			String authors = "Mohammed Alharbi";
			bookTest.setAuthors(authors);
			assertEquals(authors, bookTest.getAuthors());
		}catch(Exception e){
			fail("getAuthors has not been set correctly");
		}
		
	}
	//This is a test method for setOwns method
	@Test
	public void testSetOwns() {
		try{
			bookTest = new Book();
			bookTest.setOwns(true);
			assertEquals(true, bookTest.getOwns());
		}catch(Exception e){
			fail("setOwns has not been set correctly");
		}
		
	}
	
	//This is a test method for getOwns method
	@Test
	public void testGetOwns() {
		try{
			bookTest = new Book();
			bookTest.setOwns(true);
			assertEquals(true, bookTest.getOwns());
		}catch(Exception e){
			fail("getOwns has not been set correctly");
		}
		
	}
	
	//This is a test method for getWantsToOwn method
	@Test
	public void testGetWantsToOwn() {
		try{
			bookTest = new Book();
			bookTest.setWantsToOwn(true);
			assertEquals(true, bookTest.getWantsToOwn());
		}catch(Exception e){
			fail("getWantsToOwn has not been set correctly");
		}
		
	}
	
	//This is a test method for setWantsToOwn method
	@Test
	public void testSetWantsToOwn() {
		try{
			bookTest = new Book();
			bookTest.setWantsToOwn(true);
			assertEquals(true, bookTest.getWantsToOwn());
		}catch(Exception e){
			fail("getWantsToOwn has not been set correctly");
		}
		
	}
	
	//This is a test method for getComplete method
	@Test
	public void testGetComplete() {
		try{
			bookTest = new Book();
			bookTest.setComplete(true);
			assertEquals(true, bookTest.getComplete());
		}catch(Exception e){
			fail("getComplete has not been set correctly");
		}
		
	}
	
	//This is a test method for setComplete method
	@Test
	public void testSetComplete() {
		try{
			bookTest = new Book();
			bookTest.setComplete(true);
			assertEquals(true, bookTest.getComplete());
		}catch(Exception e){
			fail("setComplete has not been set correctly");
		}
		
	}
	
	//This is a test method for getWantsToComplete method
	@Test
	public void testGetWantsToComplete() {
		try{
			bookTest = new Book();
			bookTest.setWantsToComplete(true);
			assertEquals(true, bookTest.getWantsToComplete());
		}catch(Exception e){
			fail("getWantsToComplete has not been set correctly");
		}
		
	}
	
	//This is a test method for setWantsToComplete method
	@Test
	public void testSetWantsToComplete() {
		try{
			bookTest = new Book();
			bookTest.setWantsToComplete(true);
			assertEquals(true, bookTest.getWantsToComplete());
		}catch(Exception e){
			fail("setWantsToComplete has not been set correctly");
		}
		
	}
	
	
}
