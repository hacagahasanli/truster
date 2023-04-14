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
  intervalID: any;
  timeOf: number;
  timeoutID: any;
  gamePos: boolean;

  constructor(user: User) {
    this.user = user;
    this.value = this.randomKey().toString();
    this.pressedKey = ""
    this.timeOf = levels[1]
    this.isEqual = true
    this.gamePos = true

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
  setWrapperStyles(
    { bdColor, color, bgColor = "white", opacity = 1 }
      : { bdColor: string; color: string; bgColor?: string, opacity?: number }) {

    $(".keyWrapper")
      .css("border-color", `${bdColor}`)
      .css("background-color", `${bgColor}`)
      .css("color", `${color}`)
      .css("opacity", `${opacity}`)
  }
  keysAreEqual() {
    if (this.pressedKey === this.value) {
      this.isEqual = true

      if (this.gamePos) {
        this.setWrapperStyles({ bdColor: "green", color: "green" })

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
    else {
      this.setWrapperStyles({ bdColor: "red", color: "red", bgColor: "white" })
      this.user.keyCounts = 0;
      this.timeOf = levels[1];
      this.isEqual = false
      this.gamePos = false
      clearInterval(this.intervalID);
    }
  }
  startInterval(timeOf: number) {
    this.intervalID = setInterval(() => {
      this.setWrapperStyles({ bdColor: "red", color: "red", bgColor: "white" })
      this.keyGenerator()
      addKeyValue(this.value)
    }, timeOf)
  }
}

const newUser = new User()
newUser.setUserName("Hacaga")

const newKey = new Key(newUser)
newKey.startInterval(3000);

const app = $(".keyContainer")

const addKeyValue = (value?: string) => {
  const color = newKey.isEqual ? "green" : "red"
  newKey.setWrapperStyles({ bgColor: `${color}`, bdColor: `${color}`, color: "black" })

  $(".keyWrapper").fadeOut(400, function () {
    $(this).remove();
  });

  if (!newKey.isEqual) {
    clearInterval(newKey.intervalID)
  }

  newKey.isEqual = false

  const keyWrapper = $('<div>').addClass('keyWrapper flexCenterJustify');
  const keySpan = $('<span>').attr('id', 'IamKey');
  keySpan.text(value ?? "??");
  keyWrapper.append(keySpan);
  app.append(keyWrapper);
}

addKeyValue()

$(function () {
  $('#my-input').trigger("focus");
});

$('#my-input').on('keydown', function (e) {
  const pressedOne = e.key
  if (keys.includes(pressedOne))
    newKey.setPressedKey(pressedOne)

  e.preventDefault();
  e.stopPropagation();
  return false;
});




