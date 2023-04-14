import { keys } from "./constants";

class Key {
  value: string;

  constructor() {
    this.value = Math.floor(Math.random() * 36).toString();
  }
  keyGenerator() {
    const radomKey = Math.floor(Math.random() * 36);
    const keyValue = keys[radomKey]
    this.value = keyValue
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
}, 1000)
