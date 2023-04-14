import { keys } from "./constants";
class User {
  username: string;
  keyCounts: number;
  constructor() {
    this.username = '';
    this.keyCounts = 0
  }
  setUserName(username: string) {
    this.username = username
  }
}

let timeOf = 3000

class Key {
  value: string;
  pressedKey: string;
  isEqual?: boolean;
  user: User;
  timeOf: number;

  constructor(user: User) {
    this.user = user;
    this.value = this.randomKey().toString();
    this.pressedKey = ""
    this.timeOf = 2000;
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
      $(".keyWrapper").css("border-color", "green")
      this.user.keyCounts++;
      console.log(this.user.keyCounts, "this.user.keyCounts ")
      console.log(this.timeOf, "this.timeOf ")
      if (this.user.keyCounts === 1) {
        this.timeOf = 300
      }
    }
  }
}

const newUser = new User()
newUser.setUserName("HACAGA")

const newKey = new Key(newUser)
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

clearInterval(myInterval)
const intervalID = (timeOf?: number) => {
  return setInterval(() => {
    $(".keyWrapper").css("border-color", "red")
    newKey.keyGenerator()
    addKeyValue(newKey?.value)
  }, timeOf)
}

var myInterval = intervalID(3000)


