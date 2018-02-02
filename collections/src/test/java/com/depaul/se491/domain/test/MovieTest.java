package com.depaul.se491.domain.test;
import static org.junit.Assert.*;
import org.junit.Test;
import com.depaul.se491.domain.Movie;

//This is a test for Movie Class
public class MovieTest {

	//This is a test object from Movie Class
	Movie movieTest;
	
	//This is a test method for setItemId method
	@Test
	public void testSetItemId() {
		try{
			movieTest = new Movie();
			Long itemId = 1L;
			movieTest.setItemId(itemId);
			assertEquals(itemId, movieTest.getItemId());
		}catch(Exception e){
			fail("Item Id has not been set correctly");
		}
		
	}
	//This is a test method for getItemId method
	@Test
	public void testGetItemId() {
		try{
			movieTest = new Movie();
			Long itemId = 1L;
			movieTest.setItemId(itemId);
			assertEquals(itemId, movieTest.getItemId());
		}catch(Exception e){
			fail("Item Id has not been set correctly");
		}
		
	}

	
	//This is a test method for setMoviesLibraryId method
	@Test
	public void testSetMoviesLibraryId() {
		try{
			movieTest = new Movie();
			Long moviesLibraryId = 1L;
			movieTest.setMoviesLibraryId(moviesLibraryId);
			assertEquals(moviesLibraryId, movieTest.getMoviesLibraryId());
		}catch(Exception e){
			fail("Movies Library Id has not been set correctly");
		}
		
	}
	//This is a test method for getMoviesLibraryId method
	@Test
	public void testGetMoviesLibraryId() {
		try{
			movieTest = new Movie();
			Long moviesLibraryId = 1L;
			movieTest.setMoviesLibraryId(moviesLibraryId);
			assertEquals(moviesLibraryId, movieTest.getMoviesLibraryId());
		}catch(Exception e){
			fail("Movies Library Id Id has not been set correctly");
		}
		
	}
	
	//This is a test method for setTitle method
	@Test
	public void testSetTitle() {
		try{
			movieTest = new Movie();
			String title = "MovieTest";
			movieTest.setTitle(title);
			assertEquals(title, movieTest.getTitle());
		}catch(Exception e){
			fail("title has not been set correctly");
		}
		
	}
	//This is a test method for getTitle method
	@Test
	public void testGetTitle() {
		try{
			movieTest = new Movie();
			String title = "MovieTest";
			movieTest.setTitle(title);
			assertEquals(title, movieTest.getTitle());
		}catch(Exception e){
			fail("title has not been set correctly");
		}
		
	}
	
	//This is a test method for setUPC method
	@Test
	public void testSetUPC() {
		try{
			movieTest = new Movie();
			String uPC = "978-3-16-148410-0";
			movieTest.setUpc(uPC);
			assertEquals(uPC, movieTest.getUpc());
		}catch(Exception e){
			fail("ISBN13 has not been set correctly");
		}
		
	}
	
	//This is a test method for getUPC method
	@Test
	public void testGetUPC() {
		try{
			movieTest = new Movie();
			String uPC = "978-3-16-148410-0";
			movieTest.setUpc(uPC);
			assertEquals(uPC, movieTest.getUpc());
		}catch(Exception e){
			fail("ISBN13 has not been set correctly");
		}
		
	}
	
	
	//This is a test method for setActors method
	@Test
	public void testSetAuthors() {
		try{
			movieTest = new Movie();
			String actors = "Mohammed Alharbi";
			movieTest.setActors(actors);
			assertEquals(actors, movieTest.getActors());
		}catch(Exception e){
			fail("setActors has not been set correctly");
		}
		
	}
	
	//This is a test method for getActors method
	@Test
	public void testGetAuthors() {
		try{
			movieTest = new Movie();
			String actors = "Mohammed Alharbi";
			movieTest.setActors(actors);
			assertEquals(actors, movieTest.getActors());
		}catch(Exception e){
			fail("setActors has not been set correctly");
		}
		
	}
	//This is a test method for setOwns method
	@Test
	public void testSetOwns() {
		try{
			movieTest = new Movie();
			movieTest.setOwns(true);
			assertEquals(true, movieTest.getOwns());
		}catch(Exception e){
			fail("setOwns has not been set correctly");
		}
		
	}
	
	//This is a test method for getOwns method
	@Test
	public void testGetOwns() {
		try{
			movieTest = new Movie();
			movieTest.setOwns(true);
			assertEquals(true, movieTest.getOwns());
		}catch(Exception e){
			fail("getOwns has not been set correctly");
		}
		
	}
	
	//This is a test method for getWantsToOwn method
	@Test
	public void testGetWantsToOwn() {
		try{
			movieTest = new Movie();
			movieTest.setWantsToOwn(true);
			assertEquals(true, movieTest.getWantsToOwn());
		}catch(Exception e){
			fail("getWantsToOwn has not been set correctly");
		}
		
	}
	
	//This is a test method for setWantsToOwn method
	@Test
	public void testSetWantsToOwn() {
		try{
			movieTest = new Movie();
			movieTest.setWantsToOwn(true);
			assertEquals(true, movieTest.getWantsToOwn());
		}catch(Exception e){
			fail("getWantsToOwn has not been set correctly");
		}
		
	}
	
	//This is a test method for getComplete method
	@Test
	public void testGetComplete() {
		try{
			movieTest = new Movie();
			movieTest.setComplete(true);
			assertEquals(true, movieTest.getComplete());
		}catch(Exception e){
			fail("getComplete has not been set correctly");
		}
		
	}
	
	//This is a test method for setComplete method
	@Test
	public void testSetComplete() {
		try{
			movieTest = new Movie();
			movieTest.setComplete(true);
			assertEquals(true, movieTest.getComplete());
		}catch(Exception e){
			fail("setComplete has not been set correctly");
		}
		
	}
	
	//This is a test method for getWantsToComplete method
	@Test
	public void testGetWantsToComplete() {
		try{
			movieTest = new Movie();
			movieTest.setWantsToComplete(true);
			assertEquals(true, movieTest.getWantsToComplete());
		}catch(Exception e){
			fail("getWantsToComplete has not been set correctly");
		}
		
	}
	
	//This is a test method for setWantsToComplete method
	@Test
	public void testSetWantsToComplete() {
		try{
			movieTest = new Movie();
			movieTest.setWantsToComplete(true);
			assertEquals(true, movieTest.getWantsToComplete());
		}catch(Exception e){
			fail("setWantsToComplete has not been set correctly");
		}
		
	}
	
	
}
