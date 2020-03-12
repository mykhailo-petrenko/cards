package com.mapetrenko.cards.dao;

import com.mapetrenko.cards.model.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class UserDAO {

    @PersistenceContext
    private EntityManager entityManager;

    public List<User> findByEmail(String email) {
        Query query = entityManager.createQuery("FROM User u where u.email = :email");

        query.setParameter("email", email);

        return query.getResultList();
    }

}
