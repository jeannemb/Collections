package com.depaul.se491.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.depaul.se491.domain.User;

@Repository
public class UserDAOImpl implements UserDAO{
	
	@Autowired
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
		String sql = "SELECT user_id, first_name, last_name, email FROM users WHERE username = ?";
		User user = template.queryForObject(sql, new Object[]{username}, new UserRowMapper());
		return user;
		}catch(Exception e){
			return null;
		}
		
	}

	@Override
	public String createUser(User user) throws SQLException{
		
		String password = new BCryptPasswordEncoder().encode(user.getPassword());
		String sql;
		try{
		sql = "INSERT INTO users (first_name, last_name, email, username, password) VALUES (?, ? ,?, ?, ?)";
		int result = template.update(sql, new Object[]{user.getFirstName(), user.getLastName(), user.getEmail(), user.getEmail(), password});
		System.out.println(result);
		return "New user created";
		}catch(Exception e){
			if(e.toString().contains("Duplicate")){
				return "Failed: email already exists";
			}
			else{
				return "Unknown error";
			}
		}		
	}

}
