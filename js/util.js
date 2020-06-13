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
