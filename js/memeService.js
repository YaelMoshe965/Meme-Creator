'use strict'

// var gKeywords = { 'happy': 12, 'funny puk': 1 };

var gImages = [
    { id: 1, url: './img/1.jpg', keywords: ['happy'] },
    { id: 2, url: './img/2.jpg', keywords: ['crazy'] }
]
var gMeme = {
    selectedImgId: null,
    selectedLineIdx: null,
    lines: []
};

function getMeme() {
    return gMeme;
}

function getMemeImageId() {
    return gMeme.selectedImgId;
}

function setMemeImageId(imageId) {
    return gMeme.selectedImgId = imageId;
}

function getMemeLineIdx() {
    return gMeme.selectedLineIdx;
}

function setMemeLineIdx(lineIdx) {        
    return gMeme.selectedLineIdx = lineIdx;
}

function getImages() {
    return gImages;
}

function getMemeLines() {
    return gMeme.lines;
}

function updateMemeLine(key, value) {
    gMeme.lines[gMeme.selectedLineIdx][key] = value;
}

function addMemeLine(text) {
    let line = {
        txt: text,
        size: 40,
        align: 'center',
        font: 'Impact',
        color: 'white',
        positionY: null
    };

    if (gMeme.lines.length === 0) line.positionY = 50;
    if (gMeme.lines.length === 1) line.positionY = 350; // Calculate from canvas size
    if (gMeme.lines.length > 1) line.positionY = 200; // Calculate from canvas size

    gMeme.lines.push(line);
}


