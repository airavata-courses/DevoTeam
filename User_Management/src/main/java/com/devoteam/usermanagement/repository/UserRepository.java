package com.devoteam.usermanagement.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

import javax.persistence.Id;

import com.devoteam.usermanagement.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {

	Optional<UserEntity> findByEmail(final String email);
	}
