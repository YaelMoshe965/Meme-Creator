'use strict'

var gElCanvas;
var gCtx;
// var gLineIdx;

function onInit() {
    renderImages();
}

function renderImages() {
    var imgs = getImages();
    var strHTMLs = imgs.map(img => {
        return `
                        <img id="image-${img.id}" onclick="onSelectImage(${img.id})" src="${img.url}" alt="${img.keywords}">
                        `
    })
    document.querySelector('.gallery-container').innerHTML = strHTMLs.join('');
}

function onSelectImage(imageId) {
    document.querySelector('#canvas').hidden = false;

    renderMeme(imageId);
    renderControlBox();
}

function renderControlBox() {
    if (getMemeImageId()) {
        renderControlBoxLines();
        document.querySelector('.control-box').hidden = false;
        // renderControlBoxFontSize();
        // renderControlBoxMovingLine()
    }
}

function renderControlBoxLines() {
    var lines = getMemeLines();
    var linesHTML = [];
    var elLines = document.querySelector('.lines');

    if (lines.length) {
        linesHTML = lines.map((line, index) => {
            return `<input type="text" value="${line.txt}" onkeyup="onChangeLineText(this.value, ${index})" 
            onclick="onSelectedLineIdx(${index})" autofocus />`;
        });
    }

    linesHTML.push(`<input type="submit" value="Add Line" onclick="onAddNewLine()"/>`)
    elLines.innerHTML = linesHTML.join('');
}

// function renderControlBoxFontSize() {
//     var strHTML = '<button onclick="onIncreaseFontSize()">A+</button><button onclick="onDecreaseFontSize()">A-</button>';
//     var elFontSize = document.querySelector('.font-size');
//     elFontSize.innerHTML = strHTML;
// }

// function renderControlBoxMovingLine() {
//     var strHTML = '<button onclick="onMovingLineUp()">Move Up</button><button onclick="onMovingLineDown()">Move Down</button>';
//     var elMoveLine = document.querySelector('.move-line');
//     elMoveLine.innerHTML = strHTML;
// }

function renderMeme(imgId) {
    setMemeImageId(imgId);

    gElCanvas = document.querySelector('#canvas');
    gCtx = gElCanvas.getContext('2d');

    var elImg = document.querySelector(`#image-${imgId}`);
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);

    var lines = getMemeLines();
    if (lines.length) {
        lines.forEach(line => {
            drawTextFromLine(line)
        });
    }
}

function onSelectedLineIdx(lineIdx) {
    setMemeLineIdx(lineIdx);
}

function onChangeLineText(newText, lineIdx) {
    if (!getMemeLineIdx()) setMemeLineIdx(lineIdx);
    updateMemeLine('txt', newText);
    renderMeme(getMemeImageId());
}

function onAddNewLine() {
    addMemeLine('');
    renderControlBox();
}

function onIncreaseFontSize() {
    var lineIdx = getMemeLineIdx();
    var lines = getMemeLines();
    if (lines) {
        updateMemeLine('size', lines[lineIdx].size + 3);
        renderMeme(getMemeImageId());
    }
}

function onDecreaseFontSize() {
    var lineIdx = getMemeLineIdx();
    var lines = getMemeLines();
    if (lines) {
        updateMemeLine('size', lines[lineIdx].size - 3);
        renderMeme(getMemeImageId());
    }
}

function onMovingLineUp() {
    var lineIdx = getMemeLineIdx();
    var lines = getMemeLines();
    if (lines) {
        updateMemeLine('positionY', lines[lineIdx].positionY - 10);
        renderMeme(getMemeImageId());
    }
}

function onMovingLineDown() {
    var lineIdx = getMemeLineIdx();
    var lines = getMemeLines();
    if (lines) {
        updateMemeLine('positionY', lines[lineIdx].positionY + 10);
        renderMeme(getMemeImageId());
    }
}

// function onSwitchLine() {

// }