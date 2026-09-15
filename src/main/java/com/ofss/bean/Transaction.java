package com.ofss.bean;

import java.time.LocalDateTime;


import jakarta.persistence.*;

@Entity
@Table(name = "TRANSACTIONOJET")
public class Transaction {

    @Id
    @SequenceGenerator(name = "trn_seq", sequenceName = "TRN_SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "trn_seq")
    private Long transactionId;

    private Long accountId;    // plain FK, not customerId
    private Double amount;
    private String type;
    private LocalDateTime transactionDate;
	public Transaction(Long transactionId, Long accountId, Double amount, String type, LocalDateTime transactionDate) {
		super();
		this.transactionId = transactionId;
		this.accountId = accountId;
		this.amount = amount;
		this.type = type;
		this.transactionDate = transactionDate;
	}
	public Transaction() {
		super();
	}
	public Long getTransactionId() {
		return transactionId;
	}
	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}
	public Long getAccountId() {
		return accountId;
	}
	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public LocalDateTime getTransactionDate() {
		return transactionDate;
	}
	public void setTransactionDate(LocalDateTime transactionDate) {
		this.transactionDate = transactionDate;
	}
	@Override
	public String toString() {
		return "Transaction [transactionId=" + transactionId + ", accountId=" + accountId + ", amount=" + amount
				+ ", type=" + type + ", transactionDate=" + transactionDate + "]";
	}

  
    
    
    
    
}