package com.mapetrenko.cards;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.mapetrenko.cards.model.Card;

@RestController
@RequestMapping("/api/v1/cards")
public class CardsController {

    @GetMapping()
    public List<Card> getCards() {
        List<Card> cards = new ArrayList<>();

        cards.add(new Card("Hello", "Dolly"));
        cards.add(new Card("Question", "Answer"));

        return cards;
    }

    @GetMapping("/{cardId}")
    public Card getCard(@PathVariable("cardId") String cardId) {
        Card card = new Card("Q", "A");

        card.setId(cardId);

        return card;
    }

    @PostMapping()
    public Card createCard(@RequestBody Card card) {
        card.setId("asdasd");

        return card;
    }

    @PostMapping("/{cardId}")
    public Card updateCard(@PathVariable("cardId") String cardId, @RequestBody Card card) {
        card.setId(cardId);

        return card;
    }

    @DeleteMapping("/{cardId}")
    public Card deleteCard(@PathVariable("cardId") String cardId) {
        Card card = new Card();
        card.setId(cardId);

        return card;
    }
}
