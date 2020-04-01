package com.mapetrenko.cards;

import com.mapetrenko.cards.dao.UserDAO;
import com.mapetrenko.cards.model.Card;
import com.mapetrenko.cards.model.User;
import com.mapetrenko.cards.service.LearningService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/learn")
public class LearnController {
    private LearningService learningService;
    private UserDAO userDAO;

    @Autowired
    public LearnController(LearningService learningService, UserDAO userDAO) {
        this.learningService = learningService;
        this.userDAO = userDAO;
    }

    @GetMapping(path = "/card")
    public Card getRandomCard(Principal principal) {
        User user = (User)userDAO.loadUserByUsername(principal.getName());

        return learningService.getRandomCard(user.getId());
    }

    @PostMapping(path = "/acknowledge/{cardId}")
    public void acknowledge(
        @PathVariable("cardId") long cardId,
        Principal principal
    ) {
        User user = (User)userDAO.loadUserByUsername(principal.getName());

        learningService.acknowledge(cardId, user.getId());
    }
}
