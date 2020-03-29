import { Card } from '../api/models/card';

/**
 * Local card object. Should be used for view representation
 */
export class CrudCard {
  public id: number;
  public question: string;
  public answer: string;

  constructor() {
  }

  public static fromDto(cardDTO: Card): CrudCard {
    const card = new CrudCard();
    card.id = cardDTO.id;
    card.question = cardDTO.question;
    card.answer = cardDTO.answer;

    return card;
  }

  public toDto(): Card {
    return {
      id: this.id,
      question: this.question,
      answer: this.answer,
    } as Card;
  }
}
