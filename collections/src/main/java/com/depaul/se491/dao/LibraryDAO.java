package com.depaul.se491.dao;

import java.util.List;

import com.depaul.se491.domain.Item;
import com.depaul.se491.domain.Library;

public interface LibraryDAO {
	
	List<Library> getLibrariesByUser(Long userId);
	List<Item> getItemsByLibrary(Long libraryId);

}
