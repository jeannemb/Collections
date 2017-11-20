package com.depaul.se491.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;
import org.springframework.stereotype.Repository;

import com.depaul.se491.connection.DatabaseConnection;
import com.depaul.se491.domain.Book;
import com.depaul.se491.domain.Item;
import com.depaul.se491.domain.Movie;

@Repository
public class ItemDAOImpl implements ItemDAO{

	@Autowired
	private JdbcTemplate template;
	
	public JdbcTemplate getTemplate(){
		return template;
	}
	
	public void setTemplate(JdbcTemplate template){
		this.template = template;
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
	public List<Object> getItemsByLibrary(String libraryType, Long libraryId) throws SQLException {
		String sql;
		try{
		switch (libraryType){
			case "books": 
				sql = "SELECT * FROM books WHERE books_library_id = ?";
				List books = template.query(sql, new Object[]{libraryId}, new BooksRowMapper());
				return books;
			case "movies": 
				sql = "SELECT * FROM movies WHERE movies_library_id = ?";
				List movies = template.query(sql, new Object[]{libraryId}, new MoviesRowMapper());
				return movies;
			default: 
				sql = "SELECT * FROM generic_items WHERE generic_library_id = ?";
				List genericItems = template.query(sql, new Object[]{libraryId}, new GenericItemsRowMapper());
				return genericItems;
		}
		}catch(Exception e){
			return null;
		}
	}
	
	
	public String addBooksInLibrary(Book book) throws SQLException{
		String sql;
		try{
		sql = "INSERT INTO books (books_library_id, title, ISBN13, ISBN10, authors, owns, wants_to_own, complete, wants_to_complete) "
				+ "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
		int result = template.update(sql, new Object[]{book.getBooksLibraryId(),book.getTitle(),
				book.getISBN13(),book.getISBN10(),book.getAuthors(),
				book.getOwns(),book.getWantsToOwn(),book.getComplete(),book.getWantsToComplete()});
		System.out.println(result);
		return "SUCCESS";
		}catch(Exception e){
			return "FAILIED";
		}		
	}
	
	public String addMoviesInLibrary(Movie movie) throws SQLException{
		String sql;
		try{
		sql = "INSERT INTO movies (movies_library_id, title, UPC, actors, owns, wants_to_own, complete, wants_to_complete) "
				+ "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
		int result = template.update(sql, new Object[]{movie.getMoviesLibraryId(),movie.getTitle(),
				movie.getUPC(),movie.getActors(),
				movie.getOwns(),movie.getWantsToOwn(),movie.getComplete(),movie.getWantsToComplete()});
		System.out.println(result);
		return "SUCCESS";
		}catch(Exception e){
			return "FAILIED";
		}		
	}
	
	public String addGenericItemInLibrary(Item item) throws SQLException{
		String sql;
		try{
		sql = "INSERT INTO generic_items (generic_library_id, title, description, owns, wants_to_own, complete, wants_to_complete) "
				+ "VALUES (?, ?, ?, ?, ?, ?, ?)";
		int result = template.update(sql, new Object[]{item.getGenericLibraryId(),item.getTitle(),
				item.getDescription(),
				item.getOwns(),item.getWantsToOwn(),item.getComplete(),item.getWantsToComplete()});
		System.out.println(result);
		return "SUCCESS";
		}catch(Exception e){
			return "FAILIED";
		}		
	}

}
