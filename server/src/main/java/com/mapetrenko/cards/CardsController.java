package com.mapetrenko.cards;

import java.security.Principal;

import com.mapetrenko.cards.dao.CardCrudRepository;
import com.mapetrenko.cards.dao.UserDAO;
import com.mapetrenko.cards.errors.CardNotFoundException;
import com.mapetrenko.cards.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import com.mapetrenko.cards.model.Card;
import javax.websocket.server.PathParam;

@RestController
@RequestMapping("/api/v1/cards")
public class CardsController {
    private CardCrudRepository crud;
    private UserDAO userDAO;

    @Autowired
    public CardsController(CardCrudRepository crud, UserDAO userDAO) {
        this.crud = crud;
        this.userDAO = userDAO;
    }

    @GetMapping("/")
    public Page<Card> getCards(@PathParam("pageIndex") Integer pageIndex, Principal principal) {
        User user = (User)userDAO.loadUserByUsername(principal.getName());

        if (pageIndex == null) {
            pageIndex = 0;
        }

        Pageable pageable = PageRequest.of(pageIndex, 20);
        Page<Card> cards = crud.findAllByUserId(user.getId(), pageable);

        System.out.println(principal);

        return cards;
    }

    @GetMapping("/{cardId}")
    public Card getCard(@PathVariable("cardId") Long cardId, Principal principal) {
        User user = (User)userDAO.loadUserByUsername(principal.getName());

        Card card = crud.findById(cardId)
            .orElseThrow(() -> new CardNotFoundException("There is no Card  with such id."));

        if (card.getUserId() != user.getId()) {
            throw new CardNotFoundException("There is no Card  with such id.");
        }

        return card;
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
        Card existingCard = crud.findById(cardId)
            .orElseThrow(() -> new CardNotFoundException("There is no Card  with such id."));


        card.setId(existingCard.getId());

        User user = (User)userDAO.loadUserByUsername(principal.getName());
        if (card.getUserId() != user.getId()) {
            throw new CardNotFoundException("There is no Card  with such id.");
        }

        Card savedCard = crud.save(card);

        return savedCard;
    }

    @DeleteMapping("/{cardId}")
    public Card deleteCard(@PathVariable("cardId") Long cardId, Principal principal) {
        Card existingCard = crud.findById(cardId)
            .orElseThrow(() -> new CardNotFoundException("There is no Card  with such id."));

        User user = (User)userDAO.loadUserByUsername(principal.getName());
        if (existingCard.getUserId() != user.getId()) {
            throw new CardNotFoundException("There is no Card  with such id.");
        }

        crud.deleteById(cardId);

        return existingCard;
    }

}
