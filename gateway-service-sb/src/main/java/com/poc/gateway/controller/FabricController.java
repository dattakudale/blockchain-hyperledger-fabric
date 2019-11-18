package com.poc.gateway.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.RequestMethod;

@Api
@RestController
public class FabricController{

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public @ResponseBody String sampleApi(){
        return "Sample REST API";
    }

    @RequestMapping(value = "/submitTransaction", method = RequestMethod.POST)
    public @ResponseBody String submitTransaction(){
        return "Submit Transaction API";
    }

    @RequestMapping(value = "/queryTransaction", method = RequestMethod.POST)
    public @ResponseBody String queryTransaction(){
        return "Query Transaction API";
    }

}