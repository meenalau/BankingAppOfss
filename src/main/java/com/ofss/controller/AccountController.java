package com.ofss.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ofss.bean.Account;
import com.ofss.service.AccountService;

import java.util.List;

@RestController
@RequestMapping("/accounts")
@CrossOrigin(origins = "http://localhost:8000")  // not 8080 , instead we have api-gateway , configure it  there
public class AccountController {

    @Autowired
    private AccountService accountService;

    //http://localhost:8080/accounts  
    @PostMapping
    public Account createAccount(@RequestBody Account account) {
        return accountService.createAccount(account);
    }

    @GetMapping
    public List<Account> getAllAccounts() {
    	System.out.println(accountService.getAllAccounts());
        return accountService.getAllAccounts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable Long id) {
        return accountService.getAccountById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
/* post 
{
    "accountNumber": "AC1001",
    "customerId": 1,
    "balance": 5000.0
}
*/