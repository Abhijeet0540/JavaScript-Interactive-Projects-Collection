var nbDrops = 858;

function randRange(minNum, maxNum) {
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

function createRain() {
    for (i = 1; i <= nbDrops; i++) {
        var dropLeft = randRange(1, 1600);
        var dropTop = randRange(-1000, 1400);

        // Correctly appending the drop div to the rain section
        $('<div class="drop" id="drop' + i + '"></div>').appendTo('.rain');
        
        // Corrected CSS assignment
        $('#drop' + i).css('left', dropLeft);
        $('#drop' + i).css('top', dropTop);
    }
}
