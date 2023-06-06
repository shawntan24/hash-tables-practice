const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(numBuckets);
    this.data.fill(null, 0);
  }

  hash(key) {
    let hex = sha256(key).slice(0,8);
    let int = parseInt(hex, 16);
    return int;
  }

  hashMod(key) {
    return this.hash(key)%this.capacity
  }

  insertNoCollisions(key, value) {
    const newPair = new KeyValuePair(key, value);
    const index = this.hashMod(key);
    if(this.data[index]){
      throw new Error ('hash collision or same key/value pair already exists!');
    } else {
      this.data[index] = newPair;
      this.count++;
    }
  }

  insertWithHashCollisions(key, value) {
    const newPair = new KeyValuePair(key, value);
    const index = this.hashMod(key);

    if(this.data[index] === undefined){
      this.data[index] = newPair;
    } else {
      newPair.next = this.data[index];
      this.data[index] = newPair;
    }
    this.count++;
  }

  insert(key, value) {
    const newPair = new KeyValuePair(key, value);
    const index = this.hashMod(key);
    let current = this.data[index];


    while(current){
      if(current.key === key){
        current.value = value;
        return;
      }
      current = current.next;
    }

    newPair.next = this.data[index];
    this.data[index] = newPair;
    this.count++;
  }

}


module.exports = HashTable;