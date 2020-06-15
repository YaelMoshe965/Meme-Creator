'use strict';

function drawTextFromLine(line, windowWitdh) {
    const canvasHeight = windowWitdh > 540 ? 540 : windowWitdh;
    gCtx.textAlign = line.align;
    gCtx.fillStyle = line.color;
    gCtx.strokeStyle = line.stroke;
    gCtx.lineWidth = '2';
    gCtx.font = `${line.size}px ${line.font ? line.font : "Impact"}`;
    gCtx.fillText(line.txt, gElCanvas.width / 2, canvasHeight * (line.positionY / 100));
    gCtx.strokeText(line.txt, gElCanvas.width / 2, canvasHeight * (line.positionY / 100));
}

function modifyLineProperty(propertyName, action, value = 1) {
    var lineIdx = getMemeLineIdx();
    var lines = getMemeLines();
    if (lines) {
        if (action === 'increment') {
            updateMemeLine(propertyName, lines[lineIdx][propertyName] + value);
        } else if (action === 'decrement') {
            updateMemeLine(propertyName, lines[lineIdx][propertyName] - value);
        } else if (action === 'setValue') {
            updateMemeLine(propertyName, value);
        }
        renderMeme(getMemeImageId());
    }
}