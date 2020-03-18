package com.mapetrenko.cards.service;

import com.mapetrenko.cards.dao.UserDAO;
import com.mapetrenko.cards.dao.UserRepository;
import com.mapetrenko.cards.model.User;
import com.mapetrenko.cards.model.UserDTO;
import com.mapetrenko.cards.model.UserPasswordDTO;
import com.mapetrenko.cards.security.CardsPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipalNotFoundException;
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
    public void setPasswordEncoder(CardsPasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public User doesUserExists(String email) throws UserPrincipalNotFoundException {
        List<User> users = userDAO.findByEmail(email);

        if (users.size() == 0) {
            throw new UserPrincipalNotFoundException("User not found");
        }

        return users.get(0);
    }

    public UserDTO getUser(String email) throws UserPrincipalNotFoundException {
        User user = doesUserExists(email);

        return UserDTO.FromDomainObject(user);
    }

    public UserDTO updateUser(UserDTO userDTO) throws UserPrincipalNotFoundException {
        User user = doesUserExists(userDTO.getEmail());

        user.setName(userDTO.getName());

        userRepository.save(user);

        return UserDTO.FromDomainObject(user);
    }

    public void updatePassword(String email, UserPasswordDTO passwordDTO) throws UserPrincipalNotFoundException {
        User user = doesUserExists(email);

        user.setPassword(passwordEncoder.encode(passwordDTO.getPassword()));

        userRepository.save(user);
    }
}
