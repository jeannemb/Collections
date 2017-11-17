package com.depaul.se491.connection;

import java.sql.DriverManager;
//import java.sql.ResultSet;
import java.sql.SQLException;
//import java.util.List;

//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.jdbc.core.RowMapper;
//import org.springframework.jdbc.datasource.DriverManagerDataSource;
//import org.springframework.jdbc.datasource.SingleConnectionDataSource;

//import com.depaul.se491.dao.LibraryDAOImpl.LibraryRowMapper;
//import com.depaul.se491.domain.Library;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import com.mysql.jdbc.Connection;

public class DatabaseConnection {
	public static Connection conn;
	public static Session session;
	
	public static Connection getConnection() throws Exception{
		try{
			// set up SSH connection with EC2 	
			JSch jsch = new JSch();
			session = jsch.getSession("ec2-user", "ec2-54-205-47-135.compute-1.amazonaws.com", 22);
			// add the SSH Access Pair Key to the JSCH object
			//jsch.addIdentity("/Users/mohammadalharbi/Downloads/SSHAccess.pem.txt");
			jsch.addIdentity("/Users/Mark/Documents/SSHAccess.pem.txt");
			
			// define the remote host (RDS database), remote port, and local port, from the server EC2
			String rhost = "se491-mysql-collections.cwxyxwc6zgxm.us-east-1.rds.amazonaws.com";
			int rport = 3306;
	        int lport = 8040;
	        
	        // set up session configuration to ignore SSH connection warning  
	        session.setConfig("StrictHostKeyChecking", "no");
	        System.out.println("Establishing Connection...");
	        session.connect();
	        System.out.println(session.isConnected());
	        // set up port from the server to forward connection to the remote host (RDS database)
	        session.setPortForwardingL(lport, rhost, rport);

	        // set up configuration needed to connect to database using JDBC
	        String driver = "com.mysql.jdbc.Driver";
			String url = "jdbc:mysql://localhost:8040/collections";
			String username = "collectionsadmin";
			String password = "collectionsadmin";
//			DriverManagerDataSource dataSource = new DriverManagerDataSource();
//	        dataSource.setDriverClassName(driver);
//	        dataSource.setUrl(url);
//	        dataSource.setUsername(username);
//	        dataSource.setPassword(password);
//			
	        
			Class.forName(driver);
			conn = (Connection) DriverManager.getConnection(url,username,password);
			System.out.println ("Connection to database established!");
						
			return conn;
			
			}catch(Exception e){
				return null;
			}
		}
	
	public static void closeConnection() throws SQLException{
		conn.close();
		session.disconnect();
	}
	
//	public static class LibraryRowMapper implements RowMapper<Library>{
//
//		@Override
//		public Library mapRow(ResultSet rs, int idx) throws SQLException {
//			Library lib = new Library();
//			lib.setLibraryId(rs.getLong("library_id"));
//			lib.setName(rs.getString("name"));
//			lib.setType(rs.getString("type"));
//			lib.setUserId(rs.getLong("user_id"));
//			return lib;
//		}
//		
//	}
	
//	public static void main( String[] args ) throws Exception
//    {
//		try{
//		JdbcTemplate template = new JdbcTemplate(new SingleConnectionDataSource(DatabaseConnection.getConnection(),true));
//		List<Library> libraries = template.query("SELECT * FROM libraries WHERE USER_ID = 3", new LibraryRowMapper());
//		for(int i=0; i< libraries.size();i++){
//			System.out.println(libraries.get(i).getLibraryId());
//			System.out.println(libraries.get(i).getUserId());
//			System.out.println(libraries.get(i).getName());
//			System.out.println(libraries.get(i).getType());
//
//		}
//		DatabaseConnection.closeConnection();
//		}catch(Exception e){
//			DatabaseConnection.closeConnection();
//		}
//    
//    
//    } 
	
}
