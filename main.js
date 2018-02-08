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
    //As of right now, there are 4 key "escape" characters this function looks for:
    //@: declare the position(s) of pixels to make active
    //#: declare the color to draw with
    //.: declare that we should draw the active pixels with the active color after a delay
    //!: declare that we should draw the active pixels with the active color immediately
    var i = 0;
    while (i < b.length) {
        var c = b.charAt(i);
        if (c == '@') {
            // If the parser comes across the '@' character, we're going to look for at least one, but up to 8 values
            //between 0-7, corresponding to each pixel on our display, and create an array of these values, which we
            //will use once we come across a draw command. We will also look for some special characters: "*", which
            //informs us that we should set all pixels as active, and "-", which informs us that we should set all
            //pixels between the value of the preceeding character and the value of the suceeding character as active.
            // Any other characters are simply ignored, with no errors or warnings.
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
            // If the parser comes across the '#'character, we're going to look for at least one, but up to 6 values,
            // between 0-F, corresponding to a color to use on the next draw command. Colors can be declared using
            // a couple of different methods.

            // Single-character declarations are keyed to a default 16-color palette.
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
            // Colors can also be declared using hexadecimal RGB triplets. If we find three valid values after the '#',
            // it will be assumed that we are using shorthand RGB values. For instance, "#F00"" will be interpreted as
            // "#FF0000", which in turn declares that the active color should be set to rgb(255,0,0), or solid red.
            // If we find six valid values after the '#', each pair will be converted to a decimal value in order to
            // declare a custom color value.
            // Any invalid declarations will be ignored.
        } else if (c == '.') {
            // If the parser comes across the '.' value, we're going to look for up to three values between 0-9. If no
            // valid characters follow, we will call our draw function after a one second delay. Valid values equate to a
            // a delay of 1 * .*n*, so that '.8' would impose a delay of 8/10ths of a second, ".02" would
            // impose a delay of 2/100ths of a second, etc.
        } else if (c == '!') {
            // If the parser comes across the '!' value, we're going to draw the active color to all active pixels
            // right away.
            BLiNK.draw();
        }
        i++;
    }
}

(function () {
    //    stringParser('@0#0!@1#1!@2#2!@3#3!@4#4!@5#5!@6#6!@7#7!');
    stringParser('@0#4!@1#0!@2!#0@3#0!@4#4!@5#0!@6#0!@7#0!');
})();