import { keys } from "./constants";

class Key {
  value: string;
  pressedKey: string;
  isEqual?: boolean;

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
  setPressedKey(key: string) {
    this.pressedKey = key.toUpperCase()
    this.keysAreEqual()
  }
  keysAreEqual() {
    if (this.pressedKey === this.value) {
      console.log("THEY ARE EQUAL")
    }
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
  const pressedOne = e.key
  if (keys.includes(pressedOne)) {
    newKey.setPressedKey(pressedOne)
  }
  e.preventDefault();
  e.stopPropagation();
  return false;
});

setInterval(() => {
  newKey.keyGenerator()
  addKeyValue(newKey?.value)
}, 3000)
