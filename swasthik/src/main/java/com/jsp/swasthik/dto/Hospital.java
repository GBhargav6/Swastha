package com.jsp.swasthik.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.jsp.swasthik.util.CustomIdGenerator;

import lombok.Data;

@Entity
public class Hospital {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "hospital_seq")
	@GenericGenerator(name = "hospital_seq", strategy = "com.jsp.swasthik.util.CustomIdGenerator", parameters = {
			@Parameter(name = CustomIdGenerator.INCREMENT_PARAM, value = "1"),
			@Parameter(name = CustomIdGenerator.VALUE_PREFIX_PARAMETER, value = "Hospital_"),
			@Parameter(name = CustomIdGenerator.NUMBER_FORMAT_PARAMETER, value = "%05d") })
	private String id;
	private String name;
	private String founder;
	@Column(unique = true)
	private String email;
	private String password;

	private String phone;
	private String website;
	@OneToOne
	private Address address;
	
	
	@OneToMany
	private List<Doctor> doctors;


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
	 * @return the name
	 */
	public String getName() {
		return name;
	}


	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}


	/**
	 * @return the founder
	 */
	public String getFounder() {
		return founder;
	}


	/**
	 * @param founder the founder to set
	 */
	public void setFounder(String founder) {
		this.founder = founder;
	}


	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}


	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}


	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}


	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}


	/**
	 * @return the phone
	 */
	public String getPhone() {
		return phone;
	}


	/**
	 * @param phone the phone to set
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}


	/**
	 * @return the website
	 */
	public String getWebsite() {
		return website;
	}


	/**
	 * @param website the website to set
	 */
	public void setWebsite(String website) {
		this.website = website;
	}


	/**
	 * @return the address
	 */
	public Address getAddress() {
		return address;
	}


	/**
	 * @param address the address to set
	 */
	public void setAddress(Address address) {
		this.address = address;
	}


	/**
	 * @return the doctors
	 */
	public List<Doctor> getDoctors() {
		return doctors;
	}


	/**
	 * @param doctors the doctors to set
	 */
	public void setDoctors(List<Doctor> doctors) {
		this.doctors = doctors;
	}


	public Hospital(String name, String founder, String email, String password, String phone, String website,
			Address address, List<Doctor> doctors) {
		super();
		this.name = name;
		this.founder = founder;
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.website = website;
		this.address = address;
		this.doctors = doctors;
	}


	public Hospital() {
		super();
	}


	@Override
	public String toString() {
		return "Hospital [id=" + id + ", name=" + name + ", founder=" + founder + ", email=" + email + ", password="
				+ password + ", phone=" + phone + ", website=" + website + ", address=" + address + ", doctors="
				+ doctors + "]";
	}
	
	

}
