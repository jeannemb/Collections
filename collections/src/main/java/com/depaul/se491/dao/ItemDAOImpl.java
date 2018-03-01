package com.depaul.se491.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
//import org.springframework.jdbc.datasource.SingleConnectionDataSource;
import org.springframework.stereotype.Repository;

//import com.depaul.se491.connection.DatabaseConnection;
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
			book.setIsbn13(rs.getString("isbn13"));
			book.setIsbn10(rs.getString("isbn10"));
			book.setAuthors(rs.getString("authors"));
			book.setOwns(rs.getBoolean("owns"));
			book.setWantsToOwn(rs.getBoolean("wants_to_own"));
			book.setComplete(rs.getBoolean("complete"));
			book.setWantsToComplete(rs.getBoolean("wants_to_complete"));
			book.setPosterUrl(rs.getString("poster_url"));

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
			movie.setUpc(rs.getString("upc"));
			movie.setActors(rs.getString("actors"));
			movie.setOwns(rs.getBoolean("owns"));
			movie.setWantsToOwn(rs.getBoolean("wants_to_own"));
			movie.setComplete(rs.getBoolean("complete"));
			movie.setWantsToComplete(rs.getBoolean("wants_to_complete"));
			movie.setPosterUrl(rs.getString("poster_url"));

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
			item.setPosterUrl(rs.getString("poster_url"));
			return item;
		}
		
	}
	

	@Override
	public List<Object> getItemsByLibrary(String libraryType, Long libraryId) throws SQLException {
		String sql;
		try{
		switch (libraryType){
			case "books": 
				sql = "SELECT * FROM books WHERE books_library_id = ? order by title asc";
				List books = template.query(sql, new Object[]{libraryId}, new BooksRowMapper());
				return books;
			case "movies": 
				sql = "SELECT * FROM movies WHERE movies_library_id = ? order by title asc";
				List movies = template.query(sql, new Object[]{libraryId}, new MoviesRowMapper());
				return movies;
			default: 
				sql = "SELECT * FROM generic_items WHERE generic_library_id = ? order by title asc";
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
		sql = "INSERT INTO books (books_library_id, title, isbn13, isbn10, authors, owns, wants_to_own, complete, wants_to_complete, poster_url) "
				+ "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		int result = template.update(sql, new Object[]{book.getBooksLibraryId(),book.getTitle(),
				book.getIsbn13(),book.getIsbn10(),book.getAuthors(),
				book.getOwns(),book.getWantsToOwn(),book.getComplete(),book.getWantsToComplete(),book.getPosterUrl()});
		System.out.println(result);
		return "SUCCESS";
		}catch(Exception e){
			return "FAILIED";
		}		
	}
	
	public String addMoviesInLibrary(Movie movie) throws SQLException{
		String sql;
		try{
		sql = "INSERT INTO movies (movies_library_id, title, upc, actors, owns, wants_to_own, complete, wants_to_complete, poster_url) "
				+ "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
		int result = template.update(sql, new Object[]{movie.getMoviesLibraryId(),movie.getTitle(),
				movie.getUpc(),movie.getActors(),
				movie.getOwns(),movie.getWantsToOwn(),movie.getComplete(),movie.getWantsToComplete(),movie.getPosterUrl()});
		System.out.println(result);
		return "SUCCESS";
		}catch(Exception e){
			return "FAILIED";
		}		
	}
	
	public String addGenericItemInLibrary(Item item) throws SQLException{
		String sql;
		try{
		sql = "INSERT INTO generic_items (generic_library_id, title, description, owns, wants_to_own, complete, wants_to_complete, poster_url) "
				+ "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
		int result = template.update(sql, new Object[]{item.getGenericLibraryId(),item.getTitle(),
				item.getDescription(),
				item.getOwns(),item.getWantsToOwn(),item.getComplete(),item.getWantsToComplete(),item.getPosterUrl()});
		System.out.println(result);
		return "SUCCESS";
		}catch(Exception e){
			return "FAILIED";
		}		
	}
	
	// new Mohammed
	
	public String deleteItemByItemId (String libraryType, Long itemId) throws SQLException{
		String sql = "";
		try{
			System.out.println(libraryType);
			if(libraryType.equals("books")){
				sql = "DELETE FROM books WHERE item_id = ?";
			}else if (libraryType.equals("movies")){
				sql = "DELETE FROM movies WHERE item_id = ?";
			}else if (libraryType.equals("generic_items")){
				sql = "DELETE FROM generic_items WHERE item_id = ?";
			}
			int result = template.update(sql, new Object[] { itemId });
			System.out.println(result);
			if (result==1){
				return "SUCCESS";
			}else {
				return "Deletion FAILIED";
			}
		}catch(Exception e){
			return "Deletion FAILIED"+e;
		}		
	}
		
	public String deleteAllBooksByLibraryId(Long libraryId) throws SQLException{
		String sql;
		try{
			sql = "DELETE FROM books WHERE books_library_id=?";
			int result = template.update(sql, new Object[] {libraryId });
			System.out.println(result);
		return "SUCCESS";
		}catch(Exception e){
			return "Deletion FAILIED OR Empty Library";
		}		
	}
	
	public String deleteAllMoviesByLibraryId(Long libraryId) throws SQLException{
		String sql;
		try{
			sql = "DELETE FROM movies WHERE movies_library_id=?";
			int result = template.update(sql, new Object[] {libraryId });
			System.out.println(result);
		return "SUCCESS";
		}catch(Exception e){
			return "Deletion FAILIED OR Empty Library";
		}		
	}
	
	public String deleteAllGenericByLibraryId(Long libraryId) throws SQLException{
		String sql;
		try{
			sql = "DELETE FROM generic_items WHERE generic_library_id=?";
			int result = template.update(sql, new Object[] {libraryId });
			System.out.println(result);
		return "SUCCESS";
		}catch(Exception e){
			return "Deletion FAILIED OR Empty Library";
		}		
	}

}
