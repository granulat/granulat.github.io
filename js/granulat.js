"use strict";

function fill_gallery(data) {
    var gallery_template = `
                            <a href='{{link}}' target='_blank' style="text-decoration: none;">
                                <img class="gallery_image" src='{{image}}'></img>
                            </a>
                            `;
    for (var i = 0; i < data.data.length; i++) {
        var rendered = gallery_template
                            .replace('{{image}}',data.data[i].images.low_resolution.url)
                            .replace('{{link}}',data.data[i].link);
        document.getElementById('granulat_gallery').innerHTML += rendered;
     }
}




var instagram_gallery = document.createElement('script');
instagram_gallery.src = 'https://api.instagram.com/v1/users/granulatpunk/media/recent/?access_token=5524419453.ea37b3a.25fcce19a525482fad173b017986d8cf&count=18&callback=fill_gallery';


document.getElementsByTagName('head')[0].appendChild(instagram_gallery);

