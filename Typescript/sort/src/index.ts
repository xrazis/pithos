import { CharactersCollection } from './CharactersCollections';
import { NumbersCollection } from './NumbersCollection';
import { LinkedList } from './LinkedList';

const chars = new CharactersCollection('hello');
chars.sort();
console.log(chars.data);

const nums = new NumbersCollection([1, 500, -20, 10]);
nums.sort();
console.log(nums.data);

const links = new LinkedList();
links.add(-10);
links.add(-210);
links.add(310);
links.add(220);
links.sort();
links.print();
