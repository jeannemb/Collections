package com.depaul.se491.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;
import org.springframework.stereotype.Repository;

import com.depaul.se491.connection.DatabaseConnection;
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

	
	public String creatLibraryForUser(Library lib) throws SQLException{
		String sql;
		try{
		sql = "INSERT INTO libraries (user_id, name, type) VALUES (?, ? ,?)";
		int result = template.update(sql, new Object[]{lib.getUserId(), lib.getName(),lib.getType()});
		return "SUCCESS";
		}catch(Exception e){
			return "FAILIED"+e;
		}		
	}

}
