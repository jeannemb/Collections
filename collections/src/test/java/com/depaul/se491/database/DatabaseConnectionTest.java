package com.depaul.se491.database;
import static org.junit.Assert.*;
import java.sql.DriverManager;
import org.junit.Test;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import com.mysql.jdbc.Connection;

public class DatabaseConnectionTest {

	@Test
	public void databaseConnectionTest() {
		try{
		// set up SSH connection with EC2 	
		JSch jsch = new JSch();
		Session session = jsch.getSession("ec2-user", "ec2-54-205-47-135.compute-1.amazonaws.com", 22);
		// add the SSH Access Pair Key to the JSCH object
		jsch.addIdentity("/Users/mohammadalharbi/Downloads/SSHAccess.pem.txt");
		
		// define the remote host (RDS database), remote port, and local port, from the server EC2
		String rhost = "se491-mysql-collections.cwxyxwc6zgxm.us-east-1.rds.amazonaws.com";
		int rport = 3306;
        int lport = 9000;
        
        // set up session configuration to ignore SSH connection warning  
        session.setConfig("StrictHostKeyChecking", "no");
        System.out.println("Establishing Connection...");
        session.connect();
        System.out.println(session.isConnected());
        // set up port from the server to forward connection to the remote host (RDS database)
        session.setPortForwardingL(lport, rhost, rport);

        // set up configuration needed to connect to database using JDBC
        String driver = "com.mysql.jdbc.Driver";
		String url = "jdbc:mysql://localhost:9000/collections";
		String username = "collectionsadmin";
		String password = "collectionsadmin";
		Class.forName(driver);
		Connection conn = (Connection) DriverManager.getConnection(url,username,password);
		System.out.println ("Connection to database established!");
		
		assertNotNull(session);
		System.out.println(session.getHost());
		assertEquals("Wrong Connection", "ec2-54-205-47-135.compute-1.amazonaws.com",session.getHost());
		assertEquals("Wrong Connection", 22,session.getPort());

		assertNotNull(conn);
		assertEquals("Wrong Connection", "collections",conn.getCatalog());
		
		conn.close();
		session.disconnect();
		
		}catch(Exception e){
			System.out.println(e);
			fail("Connection Failed");
		}
	}
	

}
