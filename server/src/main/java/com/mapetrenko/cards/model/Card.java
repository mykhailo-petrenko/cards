package com.mapetrenko.cards.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "card")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "card_id_generator")
    @SequenceGenerator(name = "card_id_generator", sequenceName = "card_id_generator", initialValue = 100)
    private long id;

    @Column(name = "question")
    private String question;

    @Column(name = "answer")
    private String answer;

    @Column(name = "acknowledged")
    private Date acknowledged;

    @Column(name = "created")
    private Date created;

    @Column(name = "user_id")
    private long userId;

    public Card() {
    }

    public Card(String question, String answer) {
        this.question = question;
        this.answer = answer;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
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

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long user_id) {
        this.userId = user_id;
    }
}
