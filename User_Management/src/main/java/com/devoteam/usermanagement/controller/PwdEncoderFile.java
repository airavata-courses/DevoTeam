package com.devoteam.usermanagement.controller;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PwdEncoderFile {
	@Bean
	public PwdEncoder passwordEncoder() {
		return new PwdEncoder() {
			// Method to encrypt user password
			@Override
			public String encode(CharSequence rawPassword) {
				return BCrypt.hashpw(rawPassword.toString(), BCrypt.gensalt(4));

			}

			// Method to check if password matches
			@Override
			public boolean matches(CharSequence rawPassword, String encodedPassword) {
				return BCrypt.checkpw(rawPassword.toString(), encodedPassword);

			}
		};
	}

	
}
