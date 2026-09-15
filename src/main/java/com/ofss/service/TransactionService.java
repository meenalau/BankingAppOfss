package com.ofss.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.ofss.bean.Account;
import com.ofss.bean.Transaction;
import com.ofss.repository.AccountRepository;
import com.ofss.repository.TransactionRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Map;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private final AccountRepository accountRepository;

    public TransactionService(TransactionRepository transactionRepository, AccountRepository accountRepository) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
    }

    public Transaction createTransaction(Transaction txn) {
        Account account = accountRepository.findById(txn.getAccountId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Account not found: " + txn.getAccountId()));
        txn.setTransactionDate(LocalDateTime.now());
        return transactionRepository.save(txn);
    }
   
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Optional<Transaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }

	public List<Transaction> getByType(String type) {
		
		return transactionRepository.findByType(type);
	}
  
   
    
    
}