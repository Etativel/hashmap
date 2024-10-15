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

    if (bucket) {
      const entry = bucket.find(([k]) => k === key);
      return entry ? entry[1] : null;
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.bucket[index];
    if (bucket) {
      return bucket.some(([k]) => k === key);
    }
    return false;
  }

  resize() {}
}

let newMap = new HashMap();

newMap.set("apple", "buah");
newMap.set("apple", "buah");
newMap.set("key", "benda");

console.log(newMap.has("ad"));
