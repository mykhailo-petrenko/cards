package com.mapetrenko.cards;

import java.util.Optional;

import com.mapetrenko.cards.dao.CardCrudRepository;
import com.mapetrenko.cards.dao.CardSearchRepository;
import com.mapetrenko.cards.errors.CardNotFoundException;
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

    @GetMapping()
    public Page<Card> getCards(Pageable pageable) {
        Page<Card> cards = search.findAll(pageable);

        return cards;
    }

    @GetMapping("/{cardId}")
    public Card getCard(@PathVariable("cardId") Long cardId) {
        Optional<Card> card = crud.findById(cardId);

        if (!card.isPresent()) {
            throw new CardNotFoundException("There is no Card  with such id.");
        }

        return card.orElse(null);
    }

    @PostMapping()
    public Card createCard(@RequestBody Card card) {

        Card newCard = crud.save(card);

        return newCard;
    }

    @PostMapping("/{cardId}")
    public Card updateCard(@PathVariable("cardId") Long cardId, @RequestBody Card card) {
        Optional<Card> existingCard = crud.findById(cardId);

        if (!existingCard.isPresent()) {
            throw new CardNotFoundException("There is no Card  with such id.");
        }

        card.setId(existingCard.get().getId());

        Card savedCard = crud.save(card);

        return savedCard;
    }

    @DeleteMapping("/{cardId}")
    public Card deleteCard(@PathVariable("cardId") Long cardId) {
        Optional<Card> existingCard = crud.findById(cardId);

        if (!existingCard.isPresent()) {
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
}
