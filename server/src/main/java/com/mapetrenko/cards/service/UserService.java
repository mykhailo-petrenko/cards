package com.mapetrenko.cards.service;

import com.mapetrenko.cards.dao.UserDAO;
import com.mapetrenko.cards.dao.UserRepository;
import com.mapetrenko.cards.errors.CardForbiddenException;
import com.mapetrenko.cards.model.User;
import com.mapetrenko.cards.model.UserDTO;
import com.mapetrenko.cards.model.UserPasswordDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private UserDAO userDAO;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserDAO userDAO, UserRepository userRepository) {
        this.userDAO = userDAO;
        this.userRepository = userRepository;
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public User doesUserExists(String email) {
        List<User> users = userDAO.findByEmail(email);

        if (users.size() == 0) {
            throw new CardForbiddenException("User not found");
        }

        return users.get(0);
    }

    public UserDTO getUser(String email) {
        User user = doesUserExists(email);

        return UserDTO.FromDomainObject(user);
    }

    public UserDTO updateUser(UserDTO userDTO) {
        User user = doesUserExists(userDTO.getEmail());

        user.setName(userDTO.getName());

        userRepository.save(user);

        return UserDTO.FromDomainObject(user);
    }

    public void updatePassword(String email, UserPasswordDTO passwordDTO) {
        User user = doesUserExists(email);

        user.setPassword(passwordEncoder.encode(passwordDTO.getPassword()));

        userRepository.save(user);
    }
}
