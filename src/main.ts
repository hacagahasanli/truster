import { keys } from "./constants";

class Key {
  value: string;
  constructor() {
    this.value = this.randomKey().toString();
  }
  keyGenerator() {
    const radomKey = this.randomKey();
    const keyValue = keys[radomKey].toUpperCase()
    this.value = keyValue
  }
  randomKey() {
    return Math.floor(Math.random() * 36)
  }
}

const newKey = new Key()
const app = $("#keyWrapper")

const addKeyValue = (value: string) => {
  const keyValueTitle = $("#IamKey");
  keyValueTitle.text(value)
  app.append(keyValueTitle)
}

setInterval(() => {
  newKey.keyGenerator()
  addKeyValue(newKey?.value)
}, 3000)
