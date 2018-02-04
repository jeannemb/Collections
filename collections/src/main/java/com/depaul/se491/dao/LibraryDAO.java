package com.depaul.se491.dao;

import java.sql.SQLException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.depaul.se491.domain.Library;

@Service
public interface LibraryDAO {
	
	List<Library> getLibrariesByUser(String username) throws SQLException;
	List<Library> getLibrariesByUser(Long userId) throws SQLException;
	String createLibraryForUser(Library lib) throws SQLException;
	
	// new Mohammed
	String getLibraryTypeByLibraryId(Long libraryId) throws SQLException;
	String deleteLibrary(Long libraryId) throws SQLException;

}
