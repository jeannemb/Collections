package com.depaul.se491.domain;

import java.io.Serializable;

public class Item implements Serializable{

	private static final long serialVersionUID = 1L;
	private Long itemId;
	private Long genericLibraryId;
	private String title;
	private String description;
	private boolean owns;
	private boolean wantsToOwn;
	private boolean complete;
	private boolean wantsToComplete;
	private String posterUrl;
	
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
		return "Item [itemId=" + itemId + ", genericLibraryId=" + genericLibraryId + ", title=" + title
				+ ", description=" + description + ", owns=" + owns + ", wantsToOwn=" + wantsToOwn + ", complete="
				+ complete + ", wantsToComplete=" + wantsToComplete + "]";
	}
	
	public String getPosterUrl() {
		return posterUrl;
	}
	public void setPosterUrl(String posterUrl) {
		this.posterUrl = posterUrl;
	}

}
