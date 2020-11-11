"use strict";
const PROMPT = "> ";
// const CARRIER = "█";
const CARRIER = "▒";
const LEGAL_CHARS = " _-/\\|()*=+[]{}#!.,?:;$%&ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ";
const BLINK_TIMING = 500;
const term = document.querySelector("#term");

term.value = PROMPT;

var command_history = [];
var blinking_interval_id;

function curser_blink () {
    if (term.value.slice(-1)==CARRIER) {
        term.value = term.value.slice(0,-1);
    } else {
        term.value += CARRIER;
    }
}
function cursor_blinking_stop () {
    clearInterval(blinking_interval_id);
    if (term.value.slice(-1)==CARRIER) { 
        term.value = term.value.slice(0,-1);
    }
}
function cursor_blinking_start () {
    blinking_interval_id = setInterval(curser_blink, BLINK_TIMING);
}

term.onfocus = function () {
    term.selectionEnd = term.textLength;
    cursor_blinking_start();
}

term.onblur = cursor_blinking_stop;

term.onkeydown = function (e) {
    cursor_blinking_stop();
    e.preventDefault();
    let key = e.key.toUpperCase();
    if (key == 'ENTER') {
        let command_start = Math.max(term.value.lastIndexOf('\n'+PROMPT)+1, 0) + PROMPT.length;
        let commend_end = term.testLenght; 
        let command = term.value.slice(command_start, commend_end);
        command_handler(command);
        term.value += "\n" + PROMPT;
        term.scrollTop = term.scrollHeight;
    } else if (key == 'TAB') {

    } else if (key == 'BACKSPACE') {
        let command_start = Math.max(term.value.lastIndexOf('\n'+PROMPT), 0) + PROMPT.length + 1;
        if (term.selectionEnd > command_start) {
            term.value = term.value.slice(0,-1);
        }
    } else if (LEGAL_CHARS.indexOf(key)>-1) {
        term.value += key;
    }
    cursor_blinking_start();
}
function action_help (args) {
    if (args.length == 1) {
        return "help with what?"
    }
    let help_topic = args.slice(1,args.length).join(" ");
    switch (help_topic) {
        case "BEATLES": return "i need somebody";
        case "BEER": return "cheers";
        default: return "i dont know how to help with " + help_topic + "\n go, see a doctor, please.";
    };
}

function command_handler (command) {
    term.value += "\n";
    command = command.trim();
    console.log ("»"+command+"«");
    let command_stack = command.split(" ").filter(i => i.length>0);
    let action = command_stack[0];
    console.log(command_stack);
    if (action == "HELP" || action == "H") {
        term.value += action_help(command_stack);
    } else {
        term.value += "ERR";
    }
    term.value += "\n";
}
