package com.ofss.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "ACCOUNTOJET")
public class Account {

    @Id
    @SequenceGenerator(name = "acc_seq", sequenceName = "ACC_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "acc_seq")
    private Long accountId;

    private Long customerId;   // plain FK, no @ManyToOne
    private Double balance;
	public Long getAccountId() {
		return accountId;
	}
	public void setAccountId(Long accountId) {
		this.accountId = accountId;
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
	public Account(Long accountId, Long customerId, Double balance) {
		super();
		this.accountId = accountId;
		this.customerId = customerId;
		this.balance = balance;
	}
	public Account() {
		super();
	}
	@Override
	public String toString() {
		return "Account [accountId=" + accountId + ", customerId=" + customerId + ", balance=" + balance + "]";
	}

    
    
    
    
}