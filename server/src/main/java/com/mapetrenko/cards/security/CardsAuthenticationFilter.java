package com.mapetrenko.cards.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mapetrenko.cards.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

@Component
public class CardsAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    @Autowired
    @Override
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        super.setAuthenticationManager(authenticationManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        UsernamePasswordAuthenticationToken authenticationRequest = null;

        try {
            authenticationRequest = getCarsAuthenticationToken(request);
        } catch (IOException e) {
            // @TODO: Catch IO Exception.
        }
        setDetails(request, authenticationRequest);
        return this.getAuthenticationManager().authenticate(authenticationRequest);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        super.successfulAuthentication(request, response, chain, authResult);
    }

    protected UsernamePasswordAuthenticationToken getCarsAuthenticationToken(HttpServletRequest request) throws IOException {
        StringBuffer b = new StringBuffer();
        BufferedReader reader = null;
        String content;
        User user;

        try {
            reader = request.getReader();
            char[] charBuffer = new char[128];
            int bytesRead;

            while((bytesRead = reader.read(charBuffer)) != -1) {
                b.append(charBuffer, 0, bytesRead);
            }

            content = b.toString();

            ObjectMapper mapper = new ObjectMapper();

            try {
                user = mapper.readValue(content, User.class);

            } catch (Throwable e) {
                throw new IOException(e.getMessage(), e);
            }
        } catch (IOException e) {
            throw e;
        } finally {
            if (reader != null) {
                reader.close();
            }
        }

        return new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
    }
}
