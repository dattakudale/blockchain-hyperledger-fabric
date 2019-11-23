package com.poc.gateway.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.poc.gateway.service.FabricService;

import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.RequestMethod;

@Api
@RestController
public class FabricController{

    @Autowired
    private FabricService fabricService;

    @RequestMapping(value = "/submitTransaction", method = RequestMethod.POST)
    public @ResponseBody String submitTransaction(@RequestBody String asset) throws Exception{
        return fabricService.createTradeTsAsset(asset , "");
    }

    @RequestMapping(value = "/queryTransaction", method = RequestMethod.POST)
    public @ResponseBody String queryTransaction(@RequestBody String value) throws Exception{
        return fabricService.readTradeTsAsset(value);
    }

}