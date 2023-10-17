function alarm_sound () {
    music.playTone(587, music.beat(BeatFraction.Whole))
    music.playTone(659, music.beat(BeatFraction.Whole))
    basic.showIcon(IconNames.Heart)
}
function turn_off_alarm () {
    music.stopAllSounds()
    basic.clearScreen()
}
function snooze () {
    if (Alarm_status == 1) {
        Alarm_status = 0
        // Set the snooze duration
        // 
        // 5 min = 300000 ms
        basic.pause(300000)
        Alarm_status = 1
    }
}
let Alarm_status = 0
esp8266.init(SerialPin.P16, SerialPin.P15, BaudRate.BaudRate115200)
// Insert your WiFi SSID and Password
esp8266.connectWiFi("", "")
if (esp8266.isWifiConnected()) {
    basic.showIcon(IconNames.Happy)
} else {
    basic.showIcon(IconNames.Sad)
}
// Set your time zone
// 
// - the time zone in Malaysia is (GMT+8)
esp8266.initInternetTime(8)
Alarm_status = 0
basic.forever(function () {
    esp8266.updateInternetTime()
    // Always check the alarm status;
    // 
    // if it's 0, then call (turn off alarm) function
    // 
    // else if 1, then call (alarm sound) function
    if (Alarm_status == 0) {
        turn_off_alarm()
    } else if (Alarm_status == 1) {
        alarm_sound()
    }
    // When button A is pressed, turn off alarm
    // When button B is pressed, call (snooze) function 
    // Here set the alarm at a certain hour and minute.
    if (input.buttonIsPressed(Button.A)) {
        Alarm_status = 0
        basic.pause(60000)
    } else if (input.buttonIsPressed(Button.B)) {
        snooze()
    } else if (esp8266.getHour() == 6 && esp8266.getMinute() == 30) {
        Alarm_status = 1
    }
})
