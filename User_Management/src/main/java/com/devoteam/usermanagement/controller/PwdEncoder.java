package com.devoteam.usermanagement.controller;

public interface PwdEncoder {
	String encode(CharSequence rawPassword);

	boolean matches(CharSequence rawPassword, String encodedPassword);
}
