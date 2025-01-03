package com.Talentum.TalentumApplication.Config;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;
/*
@RestController
public class auth {


    private JwtEncoder jwtEncoder;

    public auth(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    @PostMapping("/authenticate")
    public JwtRespnonse authentication(Authentication authentication) {
    return new JwtRespnonse(createToken(authentication));
    }

    private String createToken(Authentication authentication) {
      var claims =   JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(10))
                .subject(authentication.getName())
                .claim("scope",createScope(authentication))
                .build();
        JwtEncoderParameters parameters = JwtEncoderParameters.from(claims);
        return jwtEncoder.encode(parameters).getTokenValue();
    }

    private String createScope(Authentication authentication) {
      return  authentication.getAuthorities().stream()
                .map(a->a.getAuthority())
                .collect(Collectors.joining(" "));
    }
}
record JwtRespnonse(String token){}
*/