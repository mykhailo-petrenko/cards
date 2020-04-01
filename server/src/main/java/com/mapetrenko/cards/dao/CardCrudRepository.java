package com.mapetrenko.cards.dao;

import com.mapetrenko.cards.model.Card;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardCrudRepository extends CrudRepository<Card, Long>, LearningCrudRepository {
    List<Card> findAll();

    Page<Card> findAllByUserId(long userId, Pageable pageable);
}
