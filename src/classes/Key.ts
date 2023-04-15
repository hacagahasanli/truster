import { keys, levels } from "../constants";
import { addKeyValue } from "../main";
import { showModal, triggetFocus } from "../utils";
import { User } from "./User";


class Key {
    value: string;
    pressedKey: string;
    isEqual?: boolean;
    user: User;
    intervalID: any;
    timeOf: number;
    timeoutID: any;
    gamePos: boolean;
    closedModal: boolean;

    constructor(user: User) {
        this.user = user;
        this.value = this.randomKey().toString();
        this.pressedKey = ""
        this.timeOf = levels[2]
        this.isEqual = true
        this.gamePos = true
        this.closedModal = true;
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
        if (this.pressedKey === this.value && this.gamePos && this.closedModal) {
            this.isEqual = true
            this.setWrapperStyles({ bdColor: "green", color: "green" })

            this.user.keyCounts++;
            $("#userCounts").text(this.user.keyCounts)
            this.timeOf = levels[this.user.keyCounts] ?? this.timeOf

            clearInterval(this.intervalID);
            this.startInterval(this.timeOf)
        }
        else {
            if (this.closedModal) {
                this.setWrapperStyles({ bdColor: "red", color: "red", bgColor: "white" })
                this.defaultStartInterval()
                showModal("close_modal", "show_modal")
                $("#modal_my-score").text(this.user.keyCounts)
                setTimeout(() => {
                    this.keyGenerator()
                    addKeyValue(this.value)
                }, 3000)
                triggetFocus()
                this.closedModal = false
            }
        }
    }
    defaultStartInterval() {
        this.timeOf = levels[2];
        this.isEqual = false
        this.gamePos = true
        clearInterval(this.intervalID);
        this.startInterval(3000)
        addKeyValue()
    }
    startInterval(timeOf: number) {
        this.intervalID = setInterval(() => {
            this.setWrapperStyles({ bdColor: "red", color: "red", bgColor: "white" })
            this.keyGenerator()
            addKeyValue(this.value)
        }, timeOf)
    }
}

export default Key