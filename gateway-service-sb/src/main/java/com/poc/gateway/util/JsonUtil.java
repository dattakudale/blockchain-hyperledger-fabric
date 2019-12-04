package com.poc.gateway.util;

import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUtil {

    private static ObjectMapper mapper = new ObjectMapper();

    public static Object getJsonToObject(String json, Class cls) {
        try {
            return mapper.readValue(json, cls);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}