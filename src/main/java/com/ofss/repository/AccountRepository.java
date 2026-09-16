package com.ofss.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ofss.bean.Account;

import java.util.*;
public interface AccountRepository extends JpaRepository<Account, Long> {
	
    List<Account> findByCustomerId(Long customerId);   // "show all accounts for this customer"
}