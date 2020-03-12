package com.mapetrenko.cards.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class CardsPasswordEncoder extends BCryptPasswordEncoder implements PasswordEncoder {
}
