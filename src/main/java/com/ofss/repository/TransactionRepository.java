package com.ofss.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ofss.bean.Transaction;

import java.util.*;
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
	
	
    List<Transaction> findByAccountId(Long accountId); // "show all transactions for this account"
    
    List<Transaction> findByType(String type);
}