import { NumbersCollection } from './NumbersCollection';

interface Sortable {
  length: number;
  compare(leftIndex: number): boolean;
  swap(leftIndex: number): void;
}

export abstract class Sorter {
  abstract length: number;
  abstract compare(leftIndex: number): boolean;
  abstract swap(leftIndex: number): void;

  sort(): void {
    const { length } = this;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i; j++) {
        if (this.compare(j)) {
          this.swap(j);
        }
      }
    }
  }
}
