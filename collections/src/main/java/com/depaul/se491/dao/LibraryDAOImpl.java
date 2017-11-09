package com.depaul.se491.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;

import com.depaul.se491.connection.DatabaseConnection;
import com.depaul.se491.domain.Item;
import com.depaul.se491.domain.Library;

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

	@Override
	public List<Item> getItemsByLibrary(Long libraryId) {
		// TODO Auto-generated method stub
		return null;
	}

}
