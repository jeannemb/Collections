package com.depaul.se491.domain.test;
import static org.junit.Assert.*;
import org.junit.Test;
import com.depaul.se491.domain.Item;

//This is a test for Item Class
public class ItemTest {

	//This is a test object from Item Class
	Item itemTest;
	
	//This is a test method for setItemId method
	@Test
	public void testSetItemId() {
		try{
			itemTest = new Item();
			Long itemId = 1L;
			itemTest.setItemId(itemId);
			assertEquals(itemId, itemTest.getItemId());
		}catch(Exception e){
			fail("Item Id has not been set correctly");
		}
		
	}
	//This is a test method for getItemId method
	@Test
	public void testGetItemId() {
		try{
			itemTest = new Item();
			Long itemId = 1L;
			itemTest.setItemId(itemId);
			assertEquals(itemId, itemTest.getItemId());
		}catch(Exception e){
			fail("Item Id has not been set correctly");
		}
		
	}

	
	//This is a test method for setGenericLibraryId method
	@Test
	public void testSetGenericLibraryId() {
		try{
			itemTest = new Item();
			Long genericLibraryId = 1L;
			itemTest.setGenericLibraryId(genericLibraryId);
			assertEquals(genericLibraryId, itemTest.getGenericLibraryId());
		}catch(Exception e){
			fail("Generic Library Id has not been set correctly");
		}
		
	}
	//This is a test method for getGenericLibraryId method
	@Test
	public void testGetBooksLibraryId() {
		try{
			itemTest = new Item();
			Long genericLibraryId = 1L;
			itemTest.setGenericLibraryId(genericLibraryId);
			assertEquals(genericLibraryId, itemTest.getGenericLibraryId());
		}catch(Exception e){
			fail("Generic Library Id has not been set correctly");
		}
		
	}
	
	//This is a test method for setTitle method
	@Test
	public void testSetTitle() {
		try{
			itemTest = new Item();
			String title = "GenericTest";
			itemTest.setTitle(title);
			assertEquals(title, itemTest.getTitle());
		}catch(Exception e){
			fail("title has not been set correctly");
		}
		
	}
	//This is a test method for getTitle method
	@Test
	public void testGetTitle() {
		try{
			itemTest = new Item();
			String title = "GenericTest";
			itemTest.setTitle(title);
			assertEquals(title, itemTest.getTitle());
		}catch(Exception e){
			fail("title has not been set correctly");
		}
		
	}

	//This is a test method for setDescription method
	@Test
	public void testSetDescription() {
		try{
			itemTest = new Item();
			String description = "This is item test";
			itemTest.setDescription(description);
			assertEquals(description, itemTest.getDescription());
		}catch(Exception e){
			fail("Description has not been set correctly");
		}
		
	}
	
	//This is a test method for getDescription method
	@Test
	public void testGetDescription() {
		try{
			itemTest = new Item();
			String description = "This is item test";
			itemTest.setDescription(description);
			assertEquals(description, itemTest.getDescription());
		}catch(Exception e){
			fail("Description has not been set correctly");
		}
		
	}
	
	//This is a test method for setOwns method
	@Test
	public void testSetOwns() {
		try{
			itemTest = new Item();
			itemTest.setOwns(true);
			assertEquals(true, itemTest.getOwns());
		}catch(Exception e){
			fail("setOwns has not been set correctly");
		}
		
	}
	
	//This is a test method for getOwns method
	@Test
	public void testGetOwns() {
		try{
			itemTest = new Item();
			itemTest.setOwns(true);
			assertEquals(true, itemTest.getOwns());
		}catch(Exception e){
			fail("getOwns has not been set correctly");
		}
		
	}
	
	//This is a test method for getWantsToOwn method
	@Test
	public void testGetWantsToOwn() {
		try{
			itemTest = new Item();
			itemTest.setWantsToOwn(true);
			assertEquals(true, itemTest.getWantsToOwn());
		}catch(Exception e){
			fail("getWantsToOwn has not been set correctly");
		}
		
	}
	
	//This is a test method for setWantsToOwn method
	@Test
	public void testSetWantsToOwn() {
		try{
			itemTest = new Item();
			itemTest.setWantsToOwn(true);
			assertEquals(true, itemTest.getWantsToOwn());
		}catch(Exception e){
			fail("getWantsToOwn has not been set correctly");
		}
		
	}
	
	//This is a test method for getComplete method
	@Test
	public void testGetComplete() {
		try{
			itemTest = new Item();
			itemTest.setComplete(true);
			assertEquals(true, itemTest.getComplete());
		}catch(Exception e){
			fail("getComplete has not been set correctly");
		}
		
	}
	
	//This is a test method for setComplete method
	@Test
	public void testSetComplete() {
		try{
			itemTest = new Item();
			itemTest.setComplete(true);
			assertEquals(true, itemTest.getComplete());
		}catch(Exception e){
			fail("setComplete has not been set correctly");
		}
		
	}
	
	//This is a test method for getWantsToComplete method
	@Test
	public void testGetWantsToComplete() {
		try{
			itemTest = new Item();
			itemTest.setWantsToComplete(true);
			assertEquals(true, itemTest.getWantsToComplete());
		}catch(Exception e){
			fail("getWantsToComplete has not been set correctly");
		}
		
	}
	
	//This is a test method for setWantsToComplete method
	@Test
	public void testSetWantsToComplete() {
		try{
			itemTest = new Item();
			itemTest.setWantsToComplete(true);
			assertEquals(true, itemTest.getWantsToComplete());
		}catch(Exception e){
			fail("setWantsToComplete has not been set correctly");
		}
		
	}
	
	
}
