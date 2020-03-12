package com.mapetrenko.cards;

import com.mapetrenko.cards.dao.UserRepository;
import com.mapetrenko.cards.model.Role;
import com.mapetrenko.cards.model.User;
import com.mapetrenko.cards.security.CardsPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/v1/registration")
public class RegistrationController {
    private UserRepository userRepo;

    private PasswordEncoder passwordEncoder;

    @PostMapping()
    public void addUser(String name, String email, String password)
    {
        List<User> existingUsers =  userRepo.findByEmail(email);

        if (existingUsers.size() > 0) {
            throw new RuntimeException("User already exists");
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setActive(true);
        user.setRoles(Collections.singleton(Role.USER));

        userRepo.save(user);
    }

    @Autowired
    public void setUserRepo(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Autowired
    public void setPasswordEncoder(CardsPasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
}
