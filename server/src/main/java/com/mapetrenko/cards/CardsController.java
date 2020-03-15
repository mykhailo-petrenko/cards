package com.mapetrenko.cards;

import java.security.Principal;
import java.util.Optional;

import com.mapetrenko.cards.dao.CardCrudRepository;
import com.mapetrenko.cards.dao.CardSearchRepository;
import com.mapetrenko.cards.dao.UserDAO;
import com.mapetrenko.cards.errors.CardNotFoundException;
import com.mapetrenko.cards.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import com.mapetrenko.cards.model.Card;

@RestController
@RequestMapping("/api/v1/cards")
public class CardsController {
    private CardCrudRepository crud;
    private CardSearchRepository search;
    private UserDAO userDAO;

    @GetMapping()
    public Page<Card> getCards(Pageable pageable, Principal principal) {
        User user = (User)userDAO.loadUserByUsername(principal.getName());

        Page<Card> cards = search.findAllByUserId(user.getId(), pageable);

        System.out.println(principal);

        return cards;
    }

    @GetMapping("/{cardId}")
    public Card getCard(@PathVariable("cardId") Long cardId, Principal principal) {
        User user = (User)userDAO.loadUserByUsername(principal.getName());
        Optional<Card> card = crud.findById(cardId);

        if (!card.isPresent()) {
            throw new CardNotFoundException("There is no Card  with such id.");
        }

        if (card.get().getUserId() != user.getId()) {
            throw new CardNotFoundException("There is no Card  with such id.");
        }

        return card.orElse(null);
    }

    @PostMapping()
    public Card createCard(@RequestBody Card card, Principal principal) {
        User user = (User)userDAO.loadUserByUsername(principal.getName());

        card.setUserId(user.getId());
        Card newCard = crud.save(card);

        return newCard;
    }

    @PostMapping("/{cardId}")
    public Card updateCard(@PathVariable("cardId") Long cardId, @RequestBody Card card, Principal principal) {
        Optional<Card> existingCard = crud.findById(cardId);
        User user = (User)userDAO.loadUserByUsername(principal.getName());

        if (!existingCard.isPresent()) {
            throw new CardNotFoundException("There is no Card  with such id.");
        }

        card.setId(existingCard.get().getId());

        if (card.getUserId() != user.getId()) {
            throw new CardNotFoundException("There is no Card  with such id.");
        }

        Card savedCard = crud.save(card);

        return savedCard;
    }

    @DeleteMapping("/{cardId}")
    public Card deleteCard(@PathVariable("cardId") Long cardId, Principal principal) {
        Optional<Card> existingCard = crud.findById(cardId);
        User user = (User)userDAO.loadUserByUsername(principal.getName());

        if (!existingCard.isPresent()) {
            throw new CardNotFoundException("There is no Card  with such id.");
        }

        if (existingCard.get().getUserId() != user.getId()) {
            throw new CardNotFoundException("There is no Card  with such id.");
        }

        crud.deleteById(cardId);

        return existingCard.get();
    }

    @Autowired
    public void setCrud(CardCrudRepository crud) {
        this.crud = crud;
    }

    @Autowired
    public void setSearch(CardSearchRepository search) {
        this.search = search;
    }

    @Autowired
    public void setUserDAO(UserDAO user) {
        this.userDAO = user;
    }
}
