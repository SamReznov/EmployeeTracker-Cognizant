package com.auth0.controller;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.dto.ResponseDTO;



@RestController
@CrossOrigin("*")
@RequestMapping("/auth0")
public class Auth0TestController {
    private static final Logger LOGGER = LogManager.getLogger(Auth0TestController.class);
    @GetMapping("/hello")
    public String getHello(){
        LOGGER.info("Hello is Called");
        return "Hello";
    }

	@GetMapping(value = "/public")
    public ResponseEntity<ResponseDTO> publicEndpoint() {
        LOGGER.info("public req called");
        System.out.println("public request called");
        return ResponseEntity.ok(new ResponseDTO("Public Endpoint Working fine !"));
    }

    @GetMapping(value = "/private")
    public ResponseEntity<ResponseDTO> privateEndpoint() {
        System.out.println("private request called");
    	return ResponseEntity.ok(new ResponseDTO("Private Endpoint Working fine !"));

    }
}