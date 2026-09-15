package com.ofss.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ofss.bean.Transaction;
import com.ofss.service.TransactionService;
import org.springframework.http.HttpStatus;
import java.util.List;

@RestController
@RequestMapping("/transactions")
@CrossOrigin(origins = "http://localhost:8000") 
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    /*{ "id": 1, "accountId": 1, "amount": 1500.0, "type": "CREDIT", "transactionDate": "2026-08-10T14:32:05.123" } */
    @PostMapping
    public ResponseEntity<?> createTransaction(@RequestBody Transaction transaction) {
        try {
            return ResponseEntity.ok(transactionService.createTransaction(transaction));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Long id) {
        return transactionService.getTransactionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/type/{type}")
    public List<Transaction> getByType(  @PathVariable("type") String type) {
        System.out.println("TYPE RECEIVED = [" + type + "]");
        return transactionService.getByType(type);
    }
}

