var convert = require('color-convert'),
    Blinkt = require('node-blinkt/Blinkt');
leds = new Blinkt();
leds.setup();
var BLiNK = {
    "active": [],
    "color": "#000",
    "draw": function () {
        //  td = document.getElementsByTagName("td");
        //  for (var i = 0; i < this.active.length; i++) {
        //     td[this.active[i]].setAttribute("bgcolor", this.color);
        //   }
        for (var i = 0; i < this.active.length; i++) {
            var colors = (convert.hex.rgb(this.color));
            leds.setPixel(this.active[i], colors[0], colors[1], colors[2], .6);
        }
        leds.sendUpdate();
        this.active = [];
    }
}

function stringParser(b) {
    var i = 0;
    while (i < b.length) {
        var c = b.charAt(i);
        if (c == '@') {
            i++;
            c = b.charAt(i);
            while (0 <= c && c <= 7 && i < b.length) {
                BLiNK.active.push(c);
                i++;
                c = b.charAt(i);
            }
            console.log(BLiNK.active);
            i--;
        } else if (c == '#') {
            var colors = ["#000", "#F00", "#F53", "#FF3", "#0F0", "#00F", "#63F", "#C3F"];
            i++;
            BLiNK.color = colors[b.charAt(i)];
            // -------------------
            // | 0 | Black (off) |-------------------
            // | 1 | Dark red    | 8 | Light red    |
            // | 2 | Dark orange | 9 | Light orange |
            // | 3 | Dark yellow | A | Light yellow |
            // | 4 | Dark green  | B | Light green  |
            // | 5 | Dark blue   | C | Light blue   |
            // | 6 | Dark indigo | D | Light indigo |
            // | 7 | Dark violet | E | Light violet |
            // ------------------| F | White        |
            //                   --------------------
        } else if (c == '.') {
            //Not implemented yet
        } else if (c == '!') {
            BLiNK.draw();
        }
        i++;
    }
}

(function () {
    stringParser('@0#0!@1#1!@2#2!@3#3!@4#4!@5#5!@6#6!@7#7!');
})();