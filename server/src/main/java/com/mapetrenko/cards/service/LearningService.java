package com.mapetrenko.cards.service;


import com.mapetrenko.cards.dao.CardCrudRepository;
import com.mapetrenko.cards.errors.CardNotFoundException;
import com.mapetrenko.cards.model.Card;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;


@Service
public class LearningService {
    private CardCrudRepository crud;

    @Autowired
    public LearningService(CardCrudRepository crud) {
        this.crud = crud;
    }

    public Card getRandomCard(long userId) {
        List<Card> cards = crud.findRandomCards(userId, 1);

        if (cards.size() == 0) {
            throw new CardNotFoundException("There is no Cards available.");
        }

        return cards.get(0);
    }

    public void acknowledge(long cardId, long userId) throws CardNotFoundException {

        Card card = crud.findById(cardId)
            .orElseThrow(() -> new CardNotFoundException("There is no Card with such id."));

        if (card.getUserId() != userId) {
            throw new CardNotFoundException("There is no Card with such id.");
        }

        card.setAcknowledged(new Date());

        crud.save(card);
    }
}
