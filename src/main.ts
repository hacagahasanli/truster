import Key from "./classes/Key";
import { User } from "./classes/User";
import { keys } from "./constants";
import { createNewKeyWrapper } from "./utils";

const newUser = new User()
newUser.setUserName("Nurlan")

const newKey = new Key(newUser)
if (newKey.user.username) {
  newKey.startInterval(3000);
}

export const addKeyValue = (value?: string) => {
  const color = newKey.isEqual ? "green" : "red"
  newKey.setWrapperStyles({ bgColor: `${color}`, bdColor: `${color}`, color: "black" })

  $(".keyWrapper").fadeOut(400, function () {
    $(this).remove();
  });

  !newKey.isEqual && clearInterval(newKey.intervalID)

  newKey.isEqual = false
  createNewKeyWrapper(value)
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




