BLiNK
=====
BLiNK is a parsing engine that takes a BLiNK-formatted string and outputs the result to a [Pimoroni Blinkt!](https://shop.pimoroni.com/products/blinkt) module for Raspberry Pi. It can also output the result to a webpage for testing purposes.

BLiNK escape sequences
----------------------

**@*x*** : \@ controls which LED on the blinkt! should be the target of the following instruction. **@0** is "pixel" 0, **@1** is pixel 1, etc.

**#*x*** : \# controls the color to draw with. See Color Table below.

**!**: \! output the sequence to the blinkt!.


Color Table
------------

|Color Code| Color                   |
|----------|-------------------------|
| 0 | Black (off) |
| 1 | Dark red    |
| 2 | Dark orange |
| 3 | Dark yellow |
| 4 | Dark green  |
| 5 | Dark blue   |
| 6 | Dark indigo |
| 7 | Dark violet |
| 8 | Light red   |
| 9 | Light orange|
| A | Light yellow|
| B | Light green |
| C | Light blue  |
| D | Light indigo|
| E | Light violet|
| F | White       |
------------------