package com.mapetrenko.cards.dao.impl;

import com.mapetrenko.cards.dao.LearningCrudRepository;
import com.mapetrenko.cards.model.Card;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TemporalType;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public class LearningCrudRepositoryImpl implements LearningCrudRepository {
    @PersistenceContext
    private EntityManager entityManager;

    public List<Card> findRandomCards(long userId, int limit) {
        // @TODO: good enough for small db.
        // @TODO: receive count of not acknowledged cards and generate random offset
        LocalDate dateLimit = LocalDate.now().minusDays(10);
        return entityManager
            .createQuery(
                "select c from Card c where c.userId = :userid AND c.acknowledged is null or c.acknowledged < :dateLimit ORDER BY RAND()",
                Card.class
            )
            .setParameter("dateLimit", new Date(dateLimit.toEpochDay()), TemporalType.TIMESTAMP)
            .setParameter("userid", userId)
            .setMaxResults(limit).getResultList();
    }
}
