package com.depaul.se491.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.depaul.se491.domain.User;

@Repository
public class UserDAOImpl implements UserDAO{

	private JdbcTemplate template;
	
	public JdbcTemplate getTemplate(){
		return template;
	}
	
	public void setTemplate(JdbcTemplate template){
		this.template = template;
	}
	
	
	public static class UserRowMapper implements RowMapper<User>{

		@Override
		public User mapRow(ResultSet rs, int idx) throws SQLException {
			User user = new User();
			user.setFirstName(rs.getString("first_name"));
			user.setLastName(rs.getString("last_name"));
			user.setEmail(rs.getString("email"));
			user.setUserId(rs.getLong("user_id"));
			return user;
		}
	}	
	
	@Override
	public User getUserDetails(String username) throws SQLException {
		try{
		String sql = "SELECT user_id, first_name, last_name, email FROM user WHERE username = ?";
		User user = template.queryForObject(sql, new Object[]{username}, new UserRowMapper());
		return user;
		}catch(Exception e){
			System.out.println(e);
			return null;
		}
		
	}

}
