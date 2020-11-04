import { Sorter } from './Sorter';

export class CharactersCollection extends Sorter {
  constructor(public data: string) {
    super();
  }

  get length(): number {
    return this.data.length;
  }

  compare(leftIndex: number): boolean {
    return (
      this.data[leftIndex].toLowerCase() >
      this.data[leftIndex + 1]?.toLowerCase()
    );
  }

  swap(leftIndex: number): void {
    const chars = this.data.split('');

    const leftHand = chars[leftIndex];
    chars[leftIndex] = chars[leftIndex + 1];
    chars[leftIndex + 1] = leftHand;

    this.data = chars.join('');
  }
}
