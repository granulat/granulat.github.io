cat texte.txt | fmt -w 24 -g 24 -s | iconv -s -t 437 -c | unix2dos > /dev/usb/lp0
