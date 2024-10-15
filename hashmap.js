class HashMap {
  constructor() {
    this.bucket = new Array(8);
    this.loadFactor = 0.75;
    this.size = 0;
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.bucket.length;
    }
    return hashCode;
  }
  set(key, value) {
    const index = this.hash(key);

    if (!this.bucket[index]) {
      this.bucket[index] = [];
    }

    const bucket = this.bucket[index];
    const existingEntry = bucket.find(([k]) => k === key);

    if (existingEntry) {
      existingEntry[1] = value;
    } else {
      bucket.push([key, value]);
      this.size++;
    }
    if (this.size / this.bucket.length > this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    let index = this.hash(key);
    let bucket = this.bucket[index];

    if (!bucket) return null;

    const entry = bucket.find(([k]) => k === key);
    return entry ? entry[1] : null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.bucket[index];

    if (!bucket) return false;

    return bucket.some(([k]) => k === key);
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.bucket[index];

    if (!bucket) return false;

    const entryIndex = bucket.findIndex(([k]) => k === key);
    if (entryIndex === -1) return false;

    bucket.splice(entryIndex, 1);
    this.size--;
    return true;
  }

  length() {
    return this.size;
  }

  clear() {
    this.bucket = new Array(8);
    this.size = 0;
  }

  keys() {
    const arrayKeys = [];

    for (const bucket of this.bucket) {
      if (bucket) {
        for (const [key] of bucket) {
          arrayKeys.push(key);
        }
      }
    }
    return arrayKeys;
  }

  values() {
    const arrayVal = [];

    for (const bucket of this.bucket) {
      if (bucket) {
        for (const [key, val] of bucket) {
          arrayVal.push(val);
        }
      }
    }
    return arrayVal;
  }

  entries() {
    const arrayEntries = [];

    for (const bucket of this.bucket) {
      if (bucket) {
        for (const entry of bucket) {
          arrayEntries.push(entry);
        }
      }
    }
    return arrayEntries;
  }

  resize() {
    const oldBuckets = this.bucket;
    this.bucket = new Array(oldBuckets.length * 2);
    this.size = 0;

    for (const bucket of oldBuckets) {
      if (bucket) {
        for (const [key, value] of bucket) {
          this.set(key, value);
        }
      }
    }
  }
}

let test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("hats", "black");
test.set("ices cream", "white");
test.set("jackets", "blue");
test.set("kites", "pink");
test.set("lions", "golden");
console.log(test);
