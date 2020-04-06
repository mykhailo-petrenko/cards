package com.mapetrenko.cards.service;

import com.mapetrenko.cards.dao.CardCrudRepository;
import com.mapetrenko.cards.errors.CardNotFoundException;
import com.mapetrenko.cards.errors.CardForbiddenException;
import com.mapetrenko.cards.model.Card;
import com.mapetrenko.cards.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service
public class CardsService {
    private CardCrudRepository crud;
    private UserService userService;

    @Autowired
    public CardsService(CardCrudRepository crud, UserService userService) {
        this.crud = crud;
        this.userService = userService;
    }

    public Page<Card> getCards(Integer pageIndex, String userEmail) {
        User user = userService.doesUserExists(userEmail);

        Pageable pageable = PageRequest.of(pageIndex, 20);

        return crud.findAllByUserId(user.getId(), pageable);
    }

    public Card getCardById(Long cardId, String userEmail) {
        User user = userService.doesUserExists(userEmail);

        Card card = crud.findById(cardId)
            .orElseThrow(() -> new CardNotFoundException("There is no Card  with such id."));

        if (card.getUserId() != user.getId()) {
            throw new CardNotFoundException("There is no Card  with such id.");
        }

        return card;
    }

    public Card createCard(Card card, String userEmail) {
        User user = userService.doesUserExists(userEmail);

        card.setUserId(user.getId());
        card.setCreated(new Date());

        return crud.save(card);
    }

    public Card updateCard(Long cardId, Card card, String userEmail) {
        Card existingCard = crud.findById(cardId)
            .orElseThrow(() -> new CardNotFoundException("There is no Card  with such id."));

        User user = userService.doesUserExists(userEmail);

        if (existingCard.getUserId() != user.getId()) {
            throw new CardForbiddenException("There is no Card  with such id.");
        }

        existingCard.setQuestion(card.getQuestion());
        existingCard.setAnswer(card.getAnswer());
        existingCard.setUpdated(new Date());

        return crud.save(existingCard);
    }

    public Card deleteCard(Long cardId, String userEmail) {
        Card existingCard = crud.findById(cardId)
            .orElseThrow(() -> new CardNotFoundException("There is no Card  with such id."));

        User user = userService.doesUserExists(userEmail);

        if (existingCard.getUserId() != user.getId()) {
            throw new CardForbiddenException("There is no Card  with such id.");
        }

        crud.deleteById(cardId);

        return existingCard;
    }
}
