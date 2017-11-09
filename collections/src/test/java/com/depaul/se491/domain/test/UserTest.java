package com.depaul.se491.domain.test;

import static org.junit.Assert.*;

import org.junit.Test;
import com.depaul.se491.domain.User;

//This is a test class for User Class
public class UserTest {

	//This is a test object from User Class
	User userTest;
	
	//This is a test method for getUserId
	@Test
	public void testGetUserId() {
		try{
			userTest = new User();
			Long userId = 1L;
			userTest.setUserId(userId);
			assertEquals(userId, userTest.getUserId());
		}catch(Exception e){
			fail("User Id value has been gotten correctly");	
		}	
	}
		
	//This is a test method for setUserId
	@Test
	public void testSetUserId() {
		try{
			userTest = new User();
			Long userId = 1L;
			userTest.setUserId(userId);
			assertEquals(userId, userTest.getUserId());
		}catch(Exception e){
			fail("User Id value has been set correctly");	
		}
	}

	//This is a test method for getFirstName
	@Test
	public void testGetFirstName() {
		try{
			userTest = new User();
			String firstName = "Mohammed";
			userTest.setFirstName(firstName);
			assertEquals(firstName, userTest.getFirstName());
			}catch(Exception e){
				fail("First Name value has been gotten correctly");	
			}	
		}
			
	//This is a test method for setFirstName
	@Test
	public void testSetFirstName() {
		try{
			userTest = new User();
			String firstName = "Mohammed";
			userTest.setFirstName(firstName);
			assertEquals(firstName, userTest.getFirstName());
		}catch(Exception e){
			fail("First Name value has been gotten correctly");	
		}
	}
	
	//This is a test method for getLastName
	@Test
	public void testGetLastName() {
		try{
			userTest = new User();
			String lastName = "Alharbi";
			userTest.setLastName(lastName);
			assertEquals(lastName, userTest.getLastName());
			}catch(Exception e){
				fail("Last Name value has been gotten correctly");	
			}	
		}
			
	//This is a test method for setLastName
	@Test
	public void testSetLastName() {
		try{
			userTest = new User();
			String lastName = "Alharbi";
			userTest.setLastName(lastName);
			assertEquals(lastName, userTest.getLastName());
			}catch(Exception e){
				fail("Last Name value has been gotten correctly");	
			}	
	}
	
	//This is a test method for getEmail
	@Test
	public void testGetEmail() {
		try{
			userTest = new User();
			String email = "meharbi88@gmail.com";
			userTest.setEmail(email);
			assertEquals(email, userTest.getEmail());
			}catch(Exception e){
				fail("Email value has been gotten correctly");	
			}	
		}
			
	//This is a test method for setEmail
	@Test
	public void testSetEmail() {
		try{
			userTest = new User();
			String email = "meharbi88@gmail.com";
			userTest.setEmail(email);
			assertEquals(email, userTest.getEmail());
			}catch(Exception e){
				fail("Email value has been gotten correctly");	
			}	
		}
}

