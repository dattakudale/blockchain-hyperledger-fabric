package com.poc.gateway.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FabricController{

    @RequestMapping("/")
    public @ResponseBody String sampleApi(){
        return "Sample API";
    }

}