package com.mapetrenko.cards.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(HttpStatus.FORBIDDEN)
public class CardForbiddenException extends RuntimeException {
    public CardForbiddenException() {
    }

    public CardForbiddenException(String message) {
        super(message);
    }
}
