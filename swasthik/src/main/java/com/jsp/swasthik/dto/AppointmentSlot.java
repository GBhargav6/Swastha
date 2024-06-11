package com.jsp.swasthik.dto;

import java.sql.Time;


import javax.persistence.CascadeType;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.jsp.swasthik.util.CustomIdGenerator;

import lombok.Data;


@Entity
public class AppointmentSlot {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "slot_seq")
	@GenericGenerator(name = "slot_seq", strategy = "com.jsp.swasthik.util.CustomIdGenerator", parameters = {
			@Parameter(name = CustomIdGenerator.INCREMENT_PARAM, value = "1"),
			@Parameter(name = CustomIdGenerator.VALUE_PREFIX_PARAMETER, value = "Slot_"),
			@Parameter(name = CustomIdGenerator.NUMBER_FORMAT_PARAMETER, value = "%05d") })
	private String id;
	private Time slot;

	@OneToOne(cascade = CascadeType.ALL)
	private Payment payment;

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
	 * @return the slot
	 */
	public Time getSlot() {
		return slot;
	}

	/**
	 * @param slot the slot to set
	 */
	public void setSlot(Time slot) {
		this.slot = slot;
	}

	/**
	 * @return the payment
	 */
	public Payment getPayment() {
		return payment;
	}

	/**
	 * @param payment the payment to set
	 */
	public void setPayment(Payment payment) {
		this.payment = payment;
	}

	public AppointmentSlot(Time slot, Payment payment) {
		super();
		this.slot = slot;
		this.payment = payment;
	}
	

	public AppointmentSlot() {
		super();
	}

	@Override
	public String toString() {
		return "AppointmentSlot [id=" + id + ", slot=" + slot + ", payment=" + payment + "]";
	}
	
	

}
