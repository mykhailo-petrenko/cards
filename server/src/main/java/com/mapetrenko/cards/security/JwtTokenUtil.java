package com.mapetrenko.cards.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtTokenUtil implements Serializable {

    @Value("jwt.secret")
    private String secret;

    private int TOKEN_LIFE_TIME = 1 * (60 * 60);

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    public <T> T getClaimsFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);

        return claimsResolver.apply(claims);
    }

    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token, Claims::getSubject);
    }

    public Date getExpirationDate(String token) {
        return getClaimsFromToken(token, Claims::getExpiration);
    }

    private boolean isTokenExpired(String token) {
        Date expiration = getExpirationDate(token);

        return expiration.before(new Date());
    }

    private String buildJwtToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(subject)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + TOKEN_LIFE_TIME * 1000))
            .signWith(SignatureAlgorithm.HS512, secret)
            .compact();
    }

    public String generateToken(UserDetails user) {
        Map<String, Object> claims = new HashMap<>();

        return buildJwtToken(
            claims,
            user.getUsername()
        );
    }

    public boolean validateToken(String token, UserDetails user) {
        final String username = getUsernameFromToken(token);

        return (user.getUsername().equals(username) && !isTokenExpired(token));
    }
}
