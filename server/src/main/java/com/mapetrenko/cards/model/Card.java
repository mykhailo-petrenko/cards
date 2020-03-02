package com.mapetrenko.cards.model;

import java.util.Date;

public class Card {
    private String id;
    private String question;
    private String answer;
    private Date acknowledged;
    private Date created;

    public Card() {
        acknowledged = null;
        created = new Date();
    }

    public Card(String question, String answer) {
        this.question = question;
        this.answer = answer;
        acknowledged = null;
        created = new Date();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Date getAcknowledged() {
        return acknowledged;
    }

    public void setAcknowledged(Date acknowledged) {
        this.acknowledged = acknowledged;
    }
}
