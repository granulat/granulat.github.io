"use strict";
/*
 * GPL v3
 * GRANULAT 8bit image converter
 * examples:
 * <img class="to8bit" src="..."/>
 * <img class="to8bit width-176" src="..."/>
 *
 */
(function() {
    const defaultTargetWidth = 80;
    const to8bitImages = document.querySelectorAll("img.to8bit");

    function _convertImage(img, targetWidth) {
        function _down(x) {
            return x - (x % 85)
        }
        function _up(x) {
            return x - (x % 85) + 85
        }
        function _nearest (x) {
            let down = _down(x);
            if ( (x - down) > (85/2) ) {
                return _up(x);
            } else {
                return down;
            }
        }
        let tmpCanvas = document.createElement("canvas");
        tmpCanvas.width = targetWidth;
        tmpCanvas.height = targetWidth * img.naturalHeight/img.naturalWidth;
        console.log(img, tmpCanvas.width, tmpCanvas.height);
        let context = tmpCanvas.getContext("2d");
        context.drawImage(img, 0, 0, tmpCanvas.width, tmpCanvas.height);
        let imageData = context.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height);
        let pixels = imageData.data;
        let numPixels = pixels.length;
        context.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);
        for (var i = 0; i < numPixels; i++) {
            pixels[i*4] = _nearest(pixels[i*4])
            pixels[i*4+1] = _nearest(pixels[i*4+1])
            pixels[i*4+2] = _nearest(pixels[i*4+2])
        }
        context.putImageData(imageData, 0, 0);
        img.src = tmpCanvas.toDataURL();
    }

    for (let img of to8bitImages) {
        let targetWidth = defaultTargetWidth;
        for (let cssClass of img.classList) {
            if (cssClass.startsWith("width-")) {
                targetWidth = parseInt(cssClass.slice(6))
            }
        }
        if (img.complete) {
            _convertImage(img, targetWidth)
        } else {
            img.onload = function() {
                _convertImage(img, targetWidth);
                img.onload = null;
            }
        }
    }
})();
