package com.kritika_roy.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kritika_roy.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	Optional<User> findByUserName(String userName);

}