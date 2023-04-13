import { keys } from "./constants";

class Key {
  value: string;
  id: string;

  constructor(value: string, id: string) {
    this.value = value;
    this.id = id
  }
  keyGenerator() {
    const radomKey = Math.floor(Math.random() * 36);
    const keyValue = keys[radomKey]
    this.value = keyValue
  }
}

const newKey = new Key("hacaga", "id")
const app = $("#app")

const addKeyValue = (value: string) => {
  const keyValueTitle = $("<h2></h2>");
  keyValueTitle.text(value)
  app.append(keyValueTitle)
}

setInterval(() => {
  newKey.keyGenerator()
  addKeyValue(newKey?.value)
}, 1000)