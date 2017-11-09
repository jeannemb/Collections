package com.depaul.se491.dao;

import java.sql.SQLException;
import java.util.List;

import com.depaul.se491.domain.Item;
import com.depaul.se491.domain.Library;

public interface LibraryDAO {
	
	List<Library> getLibrariesByUser(Long userId) throws SQLException;
	List getItemsByLibrary(String libraryType, Long libraryId) throws SQLException;

}
