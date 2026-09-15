package com.ofss.repository;

import org.springframework.stereotype.Repository;

import com.ofss.bean.Account;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class AccountRepository {

    private final Map<Long, Account> store = new ConcurrentHashMap<>();
    private final AtomicLong idGen = new AtomicLong(1);

    public Account save(Account account) {
        account.setId(idGen.getAndIncrement());
        store.put(account.getId(), account);
        return account;
    }

    public Optional<Account> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }

    public List<Account> findAll() {
        return new ArrayList<>(store.values());
    }
}