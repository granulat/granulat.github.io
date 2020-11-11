"use strict";
import { quotes } from "./quotes.js";
(function () {

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

    function gen_info() {
        let i = rand_int(quotes.length);
        let j = i;
        do {
            j = rand_int(quotes.length);
        } while (i === j)
        return quotes[i] + ' ' + quotes[j];
    }

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }


    let names = ['Cruizer', 'Ralle', 'Rassel','Pocke','Volker'];
    let url = "https://thispersondoesnotexist.com/image?"; 

    let band = document.querySelector("#band");
    let bandMemberTemplate = document.querySelector("#band_member_template").content;
    let loading = document.querySelector("#loading");

    loading.testContent = 'loading.';

    names = shuffle_arr (names);


    async function gen_band() {
        for (name of names) {
            let nextMember = bandMemberTemplate.cloneNode(true);
            nextMember.querySelector("h2").textContent = name;
            // nextMember.querySelector("img").src = url + name;
            nextMember.querySelector("figcaption").textContent = gen_info();
            band.appendChild(nextMember);
            for (let i=0; i<4; i++) {
                // await sleep(500);
                loading.textContent +='.';
            }
        }
        loading.textContent = '';
    }
    gen_band();
})();
