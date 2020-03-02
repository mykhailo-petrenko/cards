package com.mapetrenko.cards.dao;

import com.mapetrenko.cards.model.Card;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CardCrudRepository extends CrudRepository<Card, Long> {
    List<Card> findAll();
}
