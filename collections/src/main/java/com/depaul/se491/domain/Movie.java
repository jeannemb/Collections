package com.depaul.se491.domain;

import java.io.Serializable;

public class Movie implements Serializable{

	private static final long serialVersionUID = 1L;
	private Long itemId;
	private Long moviesLibraryId;
	private String title;
	private String UPC;
	private String actors;
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
