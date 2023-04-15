import Key from "./classes/Key";
import { User } from "./classes/User";
import { keys } from "./constants";
import { createNewKeyWrapper, showModal, triggetFocus } from "./utils";

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



$('.modal_play--again').on('click', function () {
  showModal("show_modal", "close_modal")
  $("userCounts").text(0)
  triggetFocus()
  newKey.defaultStartInterval()
  setTimeout(() => {
    newKey.closedModal = false
    newKey.keyGenerator()
    addKeyValue(newKey.value)
  }, 3000)
})

$(function () {
  triggetFocus()
});

$('#my-input').on('keydown', function (e) {
  const pressedOne = e.key
  if (keys.includes(pressedOne))
    newKey.setPressedKey(pressedOne)

  e.preventDefault();
  e.stopPropagation();
  return false;
});




