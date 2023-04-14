import { keys } from "./constants";

class Key {
  value: string;
  pressedKey: string;
  constructor() {
    this.value = this.randomKey().toString();
    this.pressedKey = ""
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

$(function () {
  $('#my-input').trigger("focus");
});

$('#my-input').on('keydown', function (e) {
  if (keys.includes(e.key)) console.log("BURADAYAM")
  e.preventDefault();
  e.stopPropagation();
  return false;
});

setInterval(() => {
  newKey.keyGenerator()
  addKeyValue(newKey?.value)
}, 3000)
