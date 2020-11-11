"use strict";
var canvas = document.querySelector("#canvas");
canvas.width = 400;
canvas.height = 300;
var click_x = 0;
var click_y = 0;
canvas.onclick = function (e) {
    click_x = e.clientX - canvas.offsetLeft + document.scrollingElement.scrollLeft;
    click_y = e.clientY - canvas.offsetTop + document.scrollingElement.scrollTop;
    // alternative:  e.offsetX and e.offsetY ... 
}
var ctx = canvas.getContext("2d");
ctx.fillStyle = "rgba(200,200,0,0.4)";
ctx.fillRect(10,10,50,50);
ctx.fillStyle = "rgba(0,0,200,0.5)";
ctx.fillRect(30,30,80,80);
var img_guy = new Image;
img_guy.src = "pic/guy.png";
img_guy.onload = function () {
    setInterval(animate_guy, 250);
}
var img_guy_frame_positions = [0,15,30,45];
var img_guy_frame_index = 0;
var img_guy_pos_x = 100;
var img_guy_pos_y = 100;
click_x = img_guy_pos_x;
click_y = img_guy_pos_y;
var img_guy_move_speed = 20;
function animate_guy () {
    if ( Math.abs(click_x - img_guy_pos_x) > img_guy_move_speed || Math.abs(click_y - img_guy_pos_y) > img_guy_move_speed) {
        let _scalar = img_guy_move_speed / Math.hypot((click_x-img_guy_pos_x),(click_y-img_guy_pos_y));
        img_guy_pos_x += _scalar * (click_x-img_guy_pos_x);
        img_guy_pos_y += _scalar * (click_y-img_guy_pos_y);
        console.log(img_guy_pos_x, img_guy_pos_y);
    }
    img_guy_frame_index++;
    if (img_guy_frame_index >= img_guy_frame_positions.length) {
        img_guy_frame_index = 0;
    }
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(img_guy, // img object 
        img_guy_frame_positions[img_guy_frame_index], // x-coord of frame in img
        0, // y-coord of frame in img
        15, // frame width in img
        30, //frame height in img
        img_guy_pos_x - 7, // x-coord on canvas
        img_guy_pos_y - 15, // y-coord on canvas
        75, // frame width on canvas
        150 // frame height on canvas 
    );
}