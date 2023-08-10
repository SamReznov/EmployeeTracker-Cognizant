package com.auth0.controller;

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

    @GetMapping("/hello")
    public String getHello(){
        return "Hello";
    }

	@GetMapping(value = "/public")
    public ResponseEntity<ResponseDTO> publicEndpoint() {
        System.out.println("public request called");
        return ResponseEntity.ok(new ResponseDTO("Public Endpoint Working fine !"));
    }

    @GetMapping(value = "/private")
    public ResponseEntity<ResponseDTO> privateEndpoint() {
        System.out.println("private request called");
    	return ResponseEntity.ok(new ResponseDTO("Private Endpoint Working fine !"));

    }
}