import { Subscription } from 'rxjs';

/**
 * Unsubscribe from list of subscription
 *
 * @param subscriptions: Subscription[] Array of subscriptions to unsubscribe from.
 */
export const unsubscribe = (subscriptions: Subscription[]): void => {
  while (subscriptions.length > 0) {
    const subscription = subscriptions.pop();

    if (subscription && !subscription.closed) {
      subscription.unsubscribe();
    }
  }
};
