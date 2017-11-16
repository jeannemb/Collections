package com.depaul.se491.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;
import org.springframework.stereotype.Repository;

import com.depaul.se491.connection.DatabaseConnection;
import com.depaul.se491.domain.Library;

@Repository
public class LibraryDAOImpl implements LibraryDAO{

	private JdbcTemplate template;
	
	public JdbcTemplate getTemplate(){
		return template;
	}
	
	public void setTemplate(JdbcTemplate template){
		this.template = template;
	}
	
	public static class LibraryRowMapper implements RowMapper<Library>{

		@Override
		public Library mapRow(ResultSet rs, int idx) throws SQLException {
			Library lib = new Library();
			lib.setLibraryId(rs.getLong("library_id"));
			lib.setName(rs.getString("name"));
			lib.setType(rs.getString("type"));
			lib.setUserId(rs.getLong("user_id"));
			return lib;
		}
		
	}
	
	
	@Override
	public List<Library> getLibrariesByUser(Long userId) throws SQLException {
		try{
		template = new JdbcTemplate(new SingleConnectionDataSource(DatabaseConnection.getConnection(),true));
		String sql = "SELECT * FROM libraries WHERE USER_ID = ?";
		List<Library> libraries = template.query(sql, new Object[]{userId}, new LibraryRowMapper());
		DatabaseConnection.closeConnection();
		return libraries;
		}catch(Exception e){
			DatabaseConnection.closeConnection();
			return null;
		}
		
	}

	
	public String createLibraryForUser(Library lib) throws SQLException{
		String sql;
		try{
		template = new JdbcTemplate(new SingleConnectionDataSource(DatabaseConnection.getConnection(),true));
		sql = "INSERT INTO libraries (user_id, name, type) VALUES (?, ? ,?)";
		int result = template.update(sql, new Object[]{lib.getUserId(), lib.getName(),lib.getType()});
		System.out.println(result);
		DatabaseConnection.closeConnection();
		return "SUCCESS";
		}catch(Exception e){
			DatabaseConnection.closeConnection();
			return "FAILIED";
		}		
	}
	
	
//    public static void main( String[] args ) throws SQLException{
//    	LibraryDAOImpl myImpl = new LibraryDAOImpl();
//    	List myList1 = myImpl.getItemsByLibrary("item",(long) 3);
//    	for(int i=0; i<myList1.size(); i++){
//    		System.out.println(myList1.get(i).toString());
//    	}
//    	Item item = new Item();
//    	item.setGenericLibraryId((long) 3);
//    	item.setTitle("TEST Item");
//    	item.setWantsToComplete(true);
//    	item.setOwns(true);
//    	String result = myImpl.addGenericItemInlibrary(item);
//    	System.out.println(result);
//    	List myList2 = myImpl.getItemsByLibrary("item",(long) 3);
//    	for(int i=0; i<myList2.size(); i++){
//    		System.out.println(myList2.get(i).toString());
//    	}
//	}

}
