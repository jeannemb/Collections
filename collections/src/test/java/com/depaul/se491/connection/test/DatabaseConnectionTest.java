package com.depaul.se491.connection.test;
import static org.junit.Assert.*;
import java.sql.DriverManager;
import org.junit.Test;

import com.depaul.se491.connection.DatabaseConnection;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import com.mysql.jdbc.Connection;

public class DatabaseConnectionTest {
	
	@Test
	public void getConnectionTest() {
		try{
		DatabaseConnection.getConnection();
		
		assertNotNull(DatabaseConnection.session);
		System.out.println(DatabaseConnection.session.getHost());
		assertEquals("Wrong Connection", "ec2-54-205-47-135.compute-1.amazonaws.com",DatabaseConnection.session.getHost());
		assertEquals("Wrong Connection", 22,DatabaseConnection.session.getPort());

		assertNotNull(DatabaseConnection.conn);
		assertEquals("Wrong Connection", "collections",DatabaseConnection.conn.getCatalog());

		DatabaseConnection.closeConnection();
		}catch(Exception e){
			System.out.println(e);
			fail("Connection Failed");
		}
	}
	@Test
	public void closeConnectionTest(){
		try{
			DatabaseConnection.closeConnection();
			assertFalse(DatabaseConnection.session.isConnected());
			assertTrue(DatabaseConnection.conn.isClosed());
			
		}catch(Exception e){
			System.out.println(e);
			fail("Connection Failed");
		}
	}


	

}
