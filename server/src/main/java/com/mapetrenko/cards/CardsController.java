package com.mapetrenko.cards;

import java.util.List;
import java.util.Optional;

import com.mapetrenko.cards.dao.CardCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.mapetrenko.cards.model.Card;

@RestController
@RequestMapping("/api/v1/cards")
public class CardsController {
    @Autowired
    private CardCrudRepository repository;

    @GetMapping()
    public List<Card> getCards() {
        List<Card> cards = repository.findAll();

        return cards;
    }

    @GetMapping("/{cardId}")
    public Card getCard(@PathVariable("cardId") Long cardId) {
        Optional<Card> card = repository.findById(cardId);

        return card.orElse(null);
    }

    @PostMapping()
    public Card createCard(@RequestBody Card card) {

        Card newCard = repository.save(card);

        return newCard;
    }

    @PostMapping("/{cardId}")
    public Card updateCard(@PathVariable("cardId") Long cardId, @RequestBody Card card) {
        Optional<Card> existingCard = repository.findById(cardId);

        if (!existingCard.isPresent()) {
            return null;
        }

        card.setId(existingCard.get().getId());

        Card savedCard = repository.save(card);

        return savedCard;
    }

    @DeleteMapping("/{cardId}")
    public Card deleteCard(@PathVariable("cardId") Long cardId) {
        Optional<Card> existingCard = repository.findById(cardId);

        if (!existingCard.isPresent()) {
            return null;
        }

        repository.deleteById(cardId);

        return existingCard.get();
    }

    public void setRepository(CardCrudRepository repository) {
        this.repository = repository;
    }
}
