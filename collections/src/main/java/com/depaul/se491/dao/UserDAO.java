package com.depaul.se491.dao;

import java.sql.SQLException;

import org.springframework.stereotype.Service;
import com.depaul.se491.domain.User;


@Service
public interface UserDAO {
	
	User getUserDetails(String username) throws SQLException;

}
