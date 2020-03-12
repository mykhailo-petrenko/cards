package com.mapetrenko.cards.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@Order(SecurityProperties.IGNORED_ORDER)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
//    @Autowired
//    private RestAuthenticationEntryPoint authenticationEntryPoint;

    CardsAuthenticationProvider authenticationProvider;

    @Override
    protected void configure(AuthenticationManagerBuilder builder) {
        authenticationProvider.
    }


    @Autowired
    public void setAuthenticationProvider(CardsAuthenticationProvider authenticationProvider) {
        this.authenticationProvider = authenticationProvider;
    }
}
