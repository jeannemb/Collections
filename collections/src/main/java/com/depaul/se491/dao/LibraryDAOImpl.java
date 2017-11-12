package com.depaul.se491.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;
import org.springframework.stereotype.Repository;

import com.depaul.se491.connection.DatabaseConnection;
import com.depaul.se491.domain.Book;
import com.depaul.se491.domain.Item;
import com.depaul.se491.domain.Library;
import com.depaul.se491.domain.Movie;

@Repository
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
	
	public static class BooksRowMapper implements RowMapper<Book>{

		@Override
		public Book mapRow(ResultSet rs, int idx) throws SQLException {
			Book book = new Book();
			book.setItemId(rs.getLong("item_id"));
			book.setBooksLibraryId(rs.getLong("books_library_id"));
			book.setTitle(rs.getString("title"));
			book.setISBN13(rs.getString("ISBN13"));
			book.setISBN10(rs.getString("ISBN10"));
			book.setISBN13(rs.getString("ISBN13"));
			book.setAuthors(rs.getString("authors"));
			book.setOwns(rs.getBoolean("owns"));
			book.setWantsToOwn(rs.getBoolean("wants_to_own"));
			book.setComplete(rs.getBoolean("complete"));
			book.setWantsToComplete(rs.getBoolean("wants_to_complete"));

			return book;
		}
		
	}
	
	public static class MoviesRowMapper implements RowMapper<Movie>{

		@Override
		public Movie mapRow(ResultSet rs, int idx) throws SQLException {
			Movie movie = new Movie();
			movie.setItemId(rs.getLong("item_id"));
			movie.setMoviesLibraryId(rs.getLong("movies_library_id"));
			movie.setTitle(rs.getString("title"));
			movie.setUPC(rs.getString("UPC"));
			movie.setActors(rs.getString("actors"));
			movie.setOwns(rs.getBoolean("owns"));
			movie.setWantsToOwn(rs.getBoolean("wants_to_own"));
			movie.setComplete(rs.getBoolean("complete"));
			movie.setWantsToComplete(rs.getBoolean("wants_to_complete"));

			return movie;
		}
		
	}
	
	public static class GenericItemsRowMapper implements RowMapper<Item>{

		@Override
		public Item mapRow(ResultSet rs, int idx) throws SQLException {
			Item item = new Item();
			item.setItemId(rs.getLong("item_id"));
			item.setGenericLibraryId(rs.getLong("generic_library_id"));
			item.setTitle(rs.getString("title"));
			item.setDescription(rs.getString("description"));
			item.setOwns(rs.getBoolean("owns"));
			item.setWantsToOwn(rs.getBoolean("wants_to_own"));
			item.setComplete(rs.getBoolean("complete"));
			item.setWantsToComplete(rs.getBoolean("wants_to_complete"));

			return item;
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
	public List<Object> getItemsByLibrary(String libraryType, Long libraryId) throws SQLException {
		String sql;
		try{
		template = new JdbcTemplate(new SingleConnectionDataSource(DatabaseConnection.getConnection(),true));
		switch (libraryType){
			case "books": 
				sql = "SELECT * FROM books WHERE books_library_id = ?";
				List books = template.query(sql, new Object[]{libraryId}, new BooksRowMapper());
				DatabaseConnection.closeConnection();
				return books;
			case "movies": 
				sql = "SELECT * FROM movies WHERE movies_library_id = ?";
				List movies = template.query(sql, new Object[]{libraryId}, new MoviesRowMapper());
				DatabaseConnection.closeConnection();
				return movies;
			default: 
				sql = "SELECT * FROM generic_items WHERE generic_library_id = ?";
				List genericItems = template.query(sql, new Object[]{libraryId}, new GenericItemsRowMapper());
				DatabaseConnection.closeConnection();
				return genericItems;
		}
		}catch(Exception e){
			DatabaseConnection.closeConnection();
			return null;
		}
	}
	
//    public static void main( String[] args ) throws SQLException{
//    	LibraryDAOImpl myImpl = new LibraryDAOImpl();
//    	List myList = myImpl.getItemsByLibrary("Items", (long) 9);
//    	for(int i=0; i<myList.size(); i++){
//    		System.out.println(myList.get(i).toString());
//    	}
//	}

}
