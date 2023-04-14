import { keys, levels } from "./constants";
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

class Key {
  value: string;
  pressedKey: string;
  isEqual?: boolean;
  user: User;
  level: number;
  intervalID: any;
  timeOf: number;
  timeoutID: any;

  constructor(user: User) {
    this.user = user;
    this.value = this.randomKey().toString();
    this.pressedKey = ""
    this.level = levels[1]
    this.timeOf = 2000
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

      switch (this.user.keyCounts) {
        case 2:
          this.timeOf = levels[2]
          break;
        case 3:
          this.timeOf = levels[3]
          break;
        case 4:
          this.timeOf = levels[4]
          break;
      }

      clearInterval(this.intervalID);
      this.startInterval(this.timeOf)
    }
  }
  startInterval(timeOf: number) {
    this.intervalID = setInterval(() => {
      $(".keyWrapper").css("opacity", 1).css("border-color", "red")
      this.keyGenerator()
      addKeyValue(this.value)
    }, timeOf)
    const $keyWrapper = $(".keyWrapper");
    $keyWrapper.stop().css({ opacity: 1 }).show();
    $keyWrapper.fadeOut(timeOf - 10);
  }
}

const newUser = new User()
newUser.setUserName("HACAGA")

const newKey = new Key(newUser)
newKey.startInterval(3000);
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




