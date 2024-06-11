package com.jsp.swasthik.dto;

import java.sql.Date;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.OneToMany;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.jsp.swasthik.util.CustomIdGenerator;

import lombok.Data;


@Entity
public class AppointmentDate {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "date_seq")
	@GenericGenerator(name = "date_seq", strategy = "com.jsp.swasthik.util.CustomIdGenerator", parameters = {
			@Parameter(name = CustomIdGenerator.INCREMENT_PARAM, value = "1"),
			@Parameter(name = CustomIdGenerator.VALUE_PREFIX_PARAMETER, value = "AppointmentDate_"),
			@Parameter(name = CustomIdGenerator.NUMBER_FORMAT_PARAMETER, value = "%05d") })
	private String id;
	private Date appointmentDate;

	@OneToMany(cascade = CascadeType.ALL)
	private List<AppointmentSlot> slots;

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the appointmentDate
	 */
	public Date getAppointmentDate() {
		return appointmentDate;
	}

	/**
	 * @param appointmentDate the appointmentDate to set
	 */
	public void setAppointmentDate(Date appointmentDate) {
		this.appointmentDate = appointmentDate;
	}

	/**
	 * @return the slots
	 */
	public List<AppointmentSlot> getSlots() {
		return slots;
	}

	/**
	 * @param slots the slots to set
	 */
	public void setSlots(List<AppointmentSlot> slots) {
		this.slots = slots;
	}

	public AppointmentDate(Date appointmentDate, List<AppointmentSlot> slots) {
		super();
		this.appointmentDate = appointmentDate;
		this.slots = slots;
	}

	public AppointmentDate() {
		super();
	}

	@Override
	public String toString() {
		return "AppointmentDate [id=" + id + ", appointmentDate=" + appointmentDate + ", slots=" + slots + "]";
	}
	
}
