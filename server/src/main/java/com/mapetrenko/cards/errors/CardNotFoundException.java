package com.mapetrenko.cards.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CardNotFoundException extends RuntimeException {
    public CardNotFoundException() {
    }

    public CardNotFoundException(String message) {
        super(message);
    }
}
