package com.fatec.loja.dto;

public class RetornoDTO {
    private boolean success;
    private String message;
    private Object data;
    
    public RetornoDTO(boolean success, String message, Object data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
    
    public static RetornoDTO sucesso(String message, Object data) {
        return new RetornoDTO(true, message, data);
    }
    
    public static RetornoDTO erro(String message) {
        return new RetornoDTO(false, message, null);
    }
    
    // Getters
    public boolean isSuccess() { return success; }
    public String getMessage() { return message; }
    public Object getData() { return data; }
}