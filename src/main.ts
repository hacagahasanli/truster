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


$('#my-input').on('keydown', function (e) {
  console.log('Pressed key:', e.key);
  e.preventDefault();
  e.stopPropagation();
  return false;
});


setInterval(() => {
  newKey.keyGenerator()
  addKeyValue(newKey?.value)
}, 3000)
