package com.depaul.se491.domain;

import java.io.Serializable;

public class Book implements Serializable{

	private static final long serialVersionUID = 1L;
	private Long itemId;
	private Long booksLibraryId;
	private String title;
	private String isbn13;
	private String isbn10;
	private String authors;
	private boolean owns;
	private boolean wantsToOwn;
	private boolean complete;
	private boolean wantsToComplete;
	
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
	public String getIsbn13() {
		return isbn13;
	}
	public void setIsbn13(String iSBN13) {
		isbn13 = iSBN13;
	}
	public String getIsbn10() {
		return isbn10;
	}
	public void setIsbn10(String iSBN10) {
		isbn10 = iSBN10;
	}
	public String getAuthors() {
		return authors;
	}
	public void setAuthors(String authors) {
		this.authors = authors;
	}
	public boolean getOwns() {
		return owns;
	}
	public void setOwns(boolean owns) {
		this.owns = owns;
	}
	public boolean getWantsToOwn() {
		return wantsToOwn;
	}
	public void setWantsToOwn(boolean wantsToOwn) {
		this.wantsToOwn = wantsToOwn;
	}
	public boolean getComplete() {
		return complete;
	}
	public void setComplete(boolean complete) {
		this.complete = complete;
	}
	public boolean getWantsToComplete() {
		return wantsToComplete;
	}
	public void setWantsToComplete(boolean wantsToComplete) {
		this.wantsToComplete = wantsToComplete;
	}
	@Override
	public String toString() {
		return "Book [itemId=" + itemId + ", booksLibraryId=" + booksLibraryId + ", title=" + title + ", ISBN13="
				+ isbn13 + ", ISBN10=" + isbn10 + ", authors=" + authors + ", owns=" + owns + ", wantsToOwn="
				+ wantsToOwn + ", complete=" + complete + ", wantsToComplete=" + wantsToComplete + "]";
	}

	
}
