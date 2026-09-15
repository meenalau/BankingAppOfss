package com.ofss.repository;

import org.springframework.stereotype.Repository;

import com.ofss.bean.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

   
}