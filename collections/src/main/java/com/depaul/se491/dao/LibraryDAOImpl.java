package com.depaul.se491.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

//import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
//import org.springframework.jdbc.datasource.SingleConnectionDataSource;
import org.springframework.stereotype.Repository;

//import com.depaul.se491.connection.DatabaseConnection;
import com.depaul.se491.domain.Library;

@Repository
public class LibraryDAOImpl implements LibraryDAO{

	@Autowired
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
	public List<Library> getLibrariesByUser(String username) throws SQLException {
		try{
		String sql = "SELECT l.library_id, l.user_id, l.name, l.type FROM libraries l left join users u on l.user_id = u.user_id WHERE u.EMAIL = ?";
		List<Library> libraries = template.query(sql, new Object[]{username}, new LibraryRowMapper());
		return libraries;
		}catch(Exception e){
			System.out.println(e);
			return null;
		}
		
	}
	
 	@Override
	public List<Library> getLibrariesByUser(Long userId) throws SQLException {
 		try{
		String sql = "SELECT * FROM libraries WHERE USER_ID = ?";
		List<Library> libraries = template.query(sql, new Object[]{userId}, new LibraryRowMapper());
 		return libraries;
 		}catch(Exception e){
 			System.out.println(e);
 			return null;
 		}		
 	}

	
	public String createLibraryForUser(Library lib) throws SQLException{
		String sql;
		try{
		sql = "INSERT INTO libraries (user_id, name, type) VALUES (?, ? ,?)";
		int result = template.update(sql, new Object[]{lib.getUserId(), lib.getName(),lib.getType()});
		System.out.println(result);
		return "SUCCESS";
		}catch(Exception e){
			return "FAILIED"+e;
		}		
	}
	
	
	// new Mohammed
	public String getLibraryTypeByLibraryId(Long libraryId) throws SQLException{
		String sql;
		try{
			sql = "SELECT type FROM libraries WHERE library_id = ?";
		    String libraryType = template.queryForObject(sql, new Object[] { libraryId }, String.class);
		    return libraryType;
		}catch(Exception e){
			return "Error occured or library does not exist";
		}		
		
	}
	
	public String deleteLibrary(Long libraryId) throws SQLException{
		String sql;
		try{			
			sql = "DELETE FROM libraries WHERE library_id = ?";
			int result = template.update(sql, new Object[] { libraryId });
			System.out.println(result);
		return "SUCCESS";
		}catch(Exception e){
			return "Deletion failed"+e;
		}		
	}
	
	@Override
	public String updateLibrary(Library library) throws SQLException {
		String sql;
		System.out.println(library.toString());
		try{
			if(library.getName() !=null){
				System.out.println("Library");
				sql = "UPDATE libraries SET name = ? WHERE library_id = ?;";
				int result = template.update(sql, new Object[]{library.getName(), library.getLibraryId()});
			}	
			return "Successfully updated";
		}
		catch(Exception e){
			return "Unkown error";
		}
	}

}
