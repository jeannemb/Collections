package com.depaul.se491.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

	@Override
	public String updateUser(User user) throws SQLException {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    String username = auth.getName();
		String sql;
		sql = "SELECT user_id FROM users WHERE username = ?";
		Long userId = template.queryForObject(sql, new Object[]{username}, Long.class);
		System.out.println(username);
		System.out.println(userId);
		System.out.println(user.toString());
		try{
			if(user.getEmail() !=null){
				System.out.println("Email");
				sql = "UPDATE users SET email = ?, username = ? WHERE user_id = ?;";
				int result = template.update(sql, new Object[]{user.getEmail(), user.getEmail(), userId});
			}
			if(user.getFirstName() !=null){
				System.out.println("FirstName");
				sql = "UPDATE users SET first_name = ? WHERE user_id = ?;";
				int result = template.update(sql, new Object[]{user.getFirstName(), userId});
			}
			if(user.getLastName() !=null){
				System.out.println("LastName");
				sql = "UPDATE users SET last_name = ? WHERE user_id = ?;";
				int result = template.update(sql, new Object[]{user.getLastName(), userId});
			}
			if(user.getPassword() !=null){
				System.out.println("Password");
				String password = new BCryptPasswordEncoder().encode(user.getPassword());
				sql = "UPDATE users SET password = ? WHERE user_id = ?;";
				int result = template.update(sql, new Object[]{password, userId});
			}
				
			return "Successfully updated";
		}
		catch(Exception e){
			return "Unkown error";
		}
	}

}
