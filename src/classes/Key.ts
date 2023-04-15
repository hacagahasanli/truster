import { keys, levels } from "../constants";
import { addKeyValue } from "../main";
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
        if (this.pressedKey === this.value && this.gamePos) {

            this.isEqual = true
            this.setWrapperStyles({ bdColor: "green", color: "green" })

            this.user.keyCounts++;
            $("#userCounts").text(this.user.keyCounts)

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
        else {
            this.setWrapperStyles({ bdColor: "red", color: "red", bgColor: "white" })
            this.user.keyCounts = 0;
            this.timeOf = levels[1];
            this.isEqual = false
            this.gamePos = false
            clearInterval(this.intervalID);
            this.startInterval(3000)
            addKeyValue()
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

export default Key