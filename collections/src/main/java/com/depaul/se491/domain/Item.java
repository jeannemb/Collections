package com.depaul.se491.domain;

import java.io.Serializable;

public class Item implements Serializable{

	private static final long serialVersionUID = 1L;
	private Long itemId;
	private Long genericLibraryId;
	private String title;
	private String description;
	private String owns;
	private String wantsToOwn;
	private String complete;
	private String wantsToCompete;
	
	public Long getItemId() {
		return itemId;
	}
	public void setItemId(Long itemId) {
		this.itemId = itemId;
	}
	public Long getGenericLibraryId() {
		return genericLibraryId;
	}
	public void setGenericLibraryId(Long genericLibraryId) {
		this.genericLibraryId = genericLibraryId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getOwns() {
		return owns;
	}
	public void setOwns(String owns) {
		this.owns = owns;
	}
	public String getWantsToOwn() {
		return wantsToOwn;
	}
	public void setWantsToOwn(String wantsToOwn) {
		this.wantsToOwn = wantsToOwn;
	}
	public String getComplete() {
		return complete;
	}
	public void setComplete(String complete) {
		this.complete = complete;
	}
	public String getWantsToCompete() {
		return wantsToCompete;
	}
	public void setWantsToCompete(String wantsToCompete) {
		this.wantsToCompete = wantsToCompete;
	}
	
	

}
