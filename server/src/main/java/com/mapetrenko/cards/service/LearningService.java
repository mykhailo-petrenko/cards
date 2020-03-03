package com.mapetrenko.cards.service;

import com.mapetrenko.cards.dao.CardCrudRepository;
import com.mapetrenko.cards.errors.CardNotFoundException;
import com.mapetrenko.cards.model.Card;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TemporalType;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class LearningService {
    private CardCrudRepository crud;

    @PersistenceContext
    private EntityManager entityManager;

    public List<Card> findRandomCard(int limit) {
        // @TODO: good enough for small db.
        // @TODO: receive count of not acknowledged cards and generate random offset
        LocalDate dateLimit = LocalDate.now().minusDays(10);
        return entityManager
            .createQuery(
                "select c from Card c where c.acknowledged is null or c.acknowledged < :dateLimit ORDER BY RAND()",
                Card.class
            )
            .setParameter("dateLimit", new Date(dateLimit.toEpochDay()), TemporalType.TIMESTAMP)
            .setMaxResults(limit).getResultList();
    }

    public Card getRandomCard() {
        List<Card> cards = findRandomCard(1);

        if (cards.size() == 0) {
            throw new CardNotFoundException("There is no Cards available.");
        }

        return cards.get(0);
    }

    public void acknowledge(long cardId) throws CardNotFoundException {
        Optional<Card> existingCard = crud.findById(cardId);

        if (!existingCard.isPresent()) {
            throw new CardNotFoundException("There is no Card with such id.");
        }

        Card card = existingCard.get();
        card.setAcknowledged(new Date());

        crud.save(card);
    }

    @Autowired
    public void setCrud(CardCrudRepository crud) {
        this.crud = crud;
    }
}
