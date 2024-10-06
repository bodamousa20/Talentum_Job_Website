package com.Talentum.TalentumApplication.model;

import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
public class LoginRequest {

    private String Email;
    private String password ;
    public LoginRequest(){}

    public LoginRequest(String email, String password) {
        Email = email;
        this.password = password;
    }

}
