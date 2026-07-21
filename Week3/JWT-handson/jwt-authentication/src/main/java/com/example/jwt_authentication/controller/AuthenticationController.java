package com.example.jwt_authentication.controller;

import java.util.Map;

import com.example.jwt_authentication.service.AuthenticationService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @GetMapping("/authenticate")
    public Map<String, String> authenticate(Authentication authentication) {
        return Map.of("token", authenticationService.generateToken(authentication));
    }
}
