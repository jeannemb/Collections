package com.depaul.se491.domain;

import java.io.Serializable;

public class Book implements Serializable{

	private static final long serialVersionUID = 1L;
	private Long itemId;
	private Long booksLibraryId;
	private String title;
	private String ISBN13;
	private String ISBN10;
	private String authors;
	private Long owns;
	private Long wantsToOwn;
	private Long complete;
	private Long wantsToComplete;
	
	public Long getItemId() {
		return itemId;
	}
	public void setItemId(Long itemId) {
		this.itemId = itemId;
	}
	public Long getBooksLibraryId() {
		return booksLibraryId;
	}
	public void setBooksLibraryId(Long booksLibraryId) {
		this.booksLibraryId = booksLibraryId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getISBN13() {
		return ISBN13;
	}
	public void setISBN13(String iSBN13) {
		ISBN13 = iSBN13;
	}
	public String getISBN10() {
		return ISBN10;
	}
	public void setISBN10(String iSBN10) {
		ISBN10 = iSBN10;
	}
	public String getAuthors() {
		return authors;
	}
	public void setAuthors(String authors) {
		this.authors = authors;
	}
	public Long getOwns() {
		return owns;
	}
	public void setOwns(Long owns) {
		this.owns = owns;
	}
	public Long getWantsToOwn() {
		return wantsToOwn;
	}
	public void setWantsToOwn(Long wantsToOwn) {
		this.wantsToOwn = wantsToOwn;
	}
	public Long getComplete() {
		return complete;
	}
	public void setComplete(Long complete) {
		this.complete = complete;
	}
	public Long getWantsToComplete() {
		return wantsToComplete;
	}
	public void setWantsToComplete(Long wantsToComplete) {
		this.wantsToComplete = wantsToComplete;
	}

	
}
