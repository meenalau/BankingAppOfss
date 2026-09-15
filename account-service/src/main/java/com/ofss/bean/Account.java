package com.ofss.bean;




public class Account {
    private Long id;
    private String accountNumber;
    private Long customerId;   
    private Double balance;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}
	public Long getCustomerId() {
		return customerId;
	}
	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}
	public Double getBalance() {
		return balance;
	}
	public void setBalance(Double balance) {
		this.balance = balance;
	}
	public Account(Long id, String accountNumber, Long customerId, Double balance) {
		super();
		this.id = id;
		this.accountNumber = accountNumber;
		this.customerId = customerId;
		this.balance = balance;
	}
	public Account() {
		super();
	}
	@Override
	public String toString() {
		return "Account [id=" + id + ", accountNumber=" + accountNumber + ", customerId=" + customerId + ", balance="
				+ balance + "]";
	}
    
    
}