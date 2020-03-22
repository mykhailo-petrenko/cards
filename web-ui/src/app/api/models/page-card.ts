/* tslint:disable */
import { Card } from './card';
import { Pageable } from './pageable';
import { Sort } from './sort';
export interface PageCard  {
  content?: Array<Card>;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: Pageable;
  size?: number;
  sort?: Sort;
  totalElements?: number;
  totalPages?: number;
}
