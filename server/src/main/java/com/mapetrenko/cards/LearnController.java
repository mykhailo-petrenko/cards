package com.mapetrenko.cards;

import com.mapetrenko.cards.model.Card;
import com.mapetrenko.cards.service.LearningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/learn")
public class LearnController {
    private LearningService learningService;

    @GetMapping(path = "/card")
    public Card getRandomCard() {
        return learningService.getRandomCard();
    }

    @PostMapping(path = "/acknowledge/{cardId}")
    public void acknowledge(
        @PathVariable("cardId") long cardId
    ) {
        learningService.acknowledge(cardId);
    }

    @Autowired
    public void setLearningService(LearningService learningService) {
        this.learningService = learningService;
    }
}
