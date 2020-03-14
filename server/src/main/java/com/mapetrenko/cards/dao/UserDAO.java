package com.mapetrenko.cards.dao;

import com.mapetrenko.cards.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class UserDAO implements UserDetailsService {

    @PersistenceContext
    private EntityManager entityManager;

    public List<User> findByEmail(String email) {
        Query query = entityManager.createQuery("FROM User u where u.email = :email");

        query.setParameter("email", email);

        return query.getResultList();
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        List<User> users = findByEmail(username);

        if (users.size() == 0) {
            throw new UsernameNotFoundException("User not found");
        }

        return users.get(0);
    }
}
