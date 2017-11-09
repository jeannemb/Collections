package com.depaul.se491.domain;

import java.io.Serializable;

public class Movie implements Serializable{

	private static final long serialVersionUID = 1L;
	private Long itemId;
	private Long moviesLibraryId;
	private String title;
	private String UPC;
	private String actors;
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
	public Long getMoviesLibraryId() {
		return moviesLibraryId;
	}
	public void setMoviesLibraryId(Long moviesLibraryId) {
		this.moviesLibraryId = moviesLibraryId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getUPC() {
		return UPC;
	}
	public void setUPC(String uPC) {
		UPC = uPC;
	}
	public String getActors() {
		return actors;
	}
	public void setActors(String actors) {
		this.actors = actors;
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
		return "Movie [itemId=" + itemId + ", moviesLibraryId=" + moviesLibraryId + ", title=" + title + ", UPC=" + UPC
				+ ", actors=" + actors + ", owns=" + owns + ", wantsToOwn=" + wantsToOwn + ", complete=" + complete
				+ ", wantsToComplete=" + wantsToComplete + "]";
	}
	
	
}
