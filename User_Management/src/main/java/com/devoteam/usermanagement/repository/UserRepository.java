package com.devoteam.usermanagement.repository;



import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devoteam.usermanagement.entity.UserEntity;

@Repository
@ComponentScan
public interface UserRepository extends JpaRepository<UserEntity, String> {

}
