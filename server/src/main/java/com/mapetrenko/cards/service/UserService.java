package com.mapetrenko.cards.service;

import com.mapetrenko.cards.dao.UserDAO;
import com.mapetrenko.cards.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

@Service
public class UserService {

    private UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public User doesUserExists(String email) throws UserPrincipalNotFoundException {
        List<User> users = userDAO.findByEmail(email);

        if (users.size() == 0) {
            throw new UserPrincipalNotFoundException("User not found");
        }

        return users.get(0);
    }
}
