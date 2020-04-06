package com.mapetrenko.cards;

import java.security.Principal;

import com.mapetrenko.cards.service.CardsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import com.mapetrenko.cards.model.Card;
import javax.websocket.server.PathParam;

@RestController
@RequestMapping("/api/v1/cards")
public class CardsController {
    private CardsService cardsService;

    @Autowired
    public CardsController(CardsService cardsService) {
        this.cardsService = cardsService;
    }

    @GetMapping("")
    public Page<Card> getCards(@PathParam("pageIndex") Integer pageIndex, Principal principal) {

        if (pageIndex == null) {
            pageIndex = 0;
        }

        return cardsService.getCards(pageIndex, principal.getName());
    }

    @GetMapping("/{cardId}")
    public Card getCard(@PathVariable("cardId") Long cardId, Principal principal) {
        return cardsService.getCardById(cardId, principal.getName());
    }

    @PostMapping()
    public Card createCard(@RequestBody Card card, Principal principal) {
        return cardsService.createCard(card, principal.getName());
    }

    @PostMapping("/{cardId}")
    public Card updateCard(@PathVariable("cardId") Long cardId, @RequestBody Card card, Principal principal) {
        return cardsService.updateCard(cardId, card, principal.getName());
    }

    @DeleteMapping("/{cardId}")
    public Card deleteCard(@PathVariable("cardId") Long cardId, Principal principal) {
        return cardsService.deleteCard(cardId, principal.getName());
    }

}
