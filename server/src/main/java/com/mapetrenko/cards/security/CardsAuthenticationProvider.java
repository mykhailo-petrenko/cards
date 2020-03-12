package com.mapetrenko.cards.security;

import com.mapetrenko.cards.model.User;
import com.mapetrenko.cards.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.ArrayList;
import java.util.Collection;

@Component
public class CardsAuthenticationProvider implements AuthenticationProvider {
    UserService userService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = (String)authentication.getCredentials();

        User user = null;

        try {
            user = userService.doesUserExists(username);
        } catch (UserPrincipalNotFoundException e) {
            // @TODO: Catch exception
        }

        if (user == null) {
            throw new BadCredentialsException("User not found.");
        }

        if (!user.getPassword().equals(password)) {
            throw new BadCredentialsException("User or password incorrect.");
        }

        Collection<? extends GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();

        return new UsernamePasswordAuthenticationToken(user, password, authorities);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }
}
