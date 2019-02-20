"use strict";

function shuffle_arr(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function rand_int(max_int) {
    return Math.floor(Math.random() * max_int)
}

function gen_info( quotes ) {
    let i = rand_int(quotes.length);
    let j = i;
    do {
        j = rand_int(quotes.length);
        console.log(j);
    } while (i === j)
    return quotes[i] + ' ' + quotes[j];
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
