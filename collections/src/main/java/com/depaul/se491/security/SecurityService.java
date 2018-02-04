package com.depaul.se491.security;

import org.springframework.stereotype.Service;

@Service
public interface SecurityService {

	 String autoLogin(String username, String password);
	 
}
