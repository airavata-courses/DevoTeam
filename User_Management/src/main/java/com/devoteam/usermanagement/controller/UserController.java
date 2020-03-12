package com.devoteam.usermanagement.controller;



import java.io.IOException;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devoteam.usermanagement.entity.UserEntity;
import com.devoteam.usermanagement.repository.UserRepository;

@RestController
@ComponentScan
public class UserController {
	@Autowired
	UserRepository userRepository;
	
	@CrossOrigin
	@RequestMapping("/home")
	public String index() {
		return "Greetings from Spring Boot!";

	}

	// Login Endpoint
	@CrossOrigin
	@PostMapping("/login")
	public String login(@RequestBody UserEntity user) {
		String userEmail = user.getEmail();
		String userPassword = user.getPassword();
		Long userId=user.getId();
		PwdEncoderFile passwordEncoderConfig = new PwdEncoderFile();

		Optional<UserEntity> userLoginObject = userRepository.findByEmail(userEmail);
		//Optional<UserEntity> userLoginObject = userRepository.findById(userId);
		// username doesnt exist
		if (userLoginObject.equals(Optional.empty())) {
			return "Incorrect Username";
		}

		// password matches
		if (passwordEncoderConfig.passwordEncoder().matches(userPassword, userLoginObject.get().getPassword())) {
			return "Login Success";

		} else {
			return "Incorrect Password";
		}
	}

	// Signup Endpoint
	@CrossOrigin
	@PostMapping("/signUp")
	public String saveUser(@RequestBody UserEntity user) {
		String userEmail = user.getEmail();
		PwdEncoderFile passwordEncoderConfig = new PwdEncoderFile();
		if (userRepository.findByEmail(userEmail).equals(Optional.empty())) {
			user.setPassword(passwordEncoderConfig.passwordEncoder().encode(user.getPassword()));
			userRepository.save(user);
			return "success";

		} else {
			return "failure";
		}
	}

	// Get list of all users
	@CrossOrigin
	@GetMapping("/getAllUsers")
	public Iterable<UserEntity> getUsers() {
		return userRepository.findAll();
	}
	
	// extract user profile info
	@CrossOrigin
	@PostMapping("/getUser")
	public Object userDetails(@RequestBody UserEntity user) {
		String userEmail = user.getEmail();
		return userRepository.findByEmail(userEmail);
	}
	
	// Method to update user info
	@CrossOrigin
	@PostMapping("/updateUserProfile")
	public void updateDetails(@RequestBody UserEntity user) {
		String userEmail = user.getEmail();
		PwdEncoderFile passwordEncoderConfig = new PwdEncoderFile();
		Optional<UserEntity> userUpdateObject = userRepository.findByEmail(userEmail);
		userUpdateObject.get().setPassword(passwordEncoderConfig.passwordEncoder().encode(user.getPassword()));
		userUpdateObject.get().setFirstName(user.getFirstName());
		userUpdateObject.get().setLastName(user.getLastName());
		userUpdateObject.get().setContactNumber(user.getContactNumber());
		userRepository.save(userUpdateObject.get());
	}


	
}

