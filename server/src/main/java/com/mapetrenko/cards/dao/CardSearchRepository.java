package com.mapetrenko.cards.dao;

import com.mapetrenko.cards.model.Card;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CardSearchRepository extends PagingAndSortingRepository<Card, Long> {
    Page<Card> findAllByUserId(long userId, Pageable pageable);
}
