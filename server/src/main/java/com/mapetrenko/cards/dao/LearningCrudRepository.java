package com.mapetrenko.cards.dao;

import com.mapetrenko.cards.model.Card;

import java.util.List;

public interface LearningCrudRepository {
    List<Card> findRandomCards(long userId, int limit);
}
