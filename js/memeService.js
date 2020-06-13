'use strict'

var gImages = [
    { id: 1, url: './img/1.jpg'},
    { id: 2, url: './img/2.jpg'},
    { id: 3, url: './img/3.jpg'},
    { id: 4, url: './img/4.jpg'},
    { id: 5, url: './img/5.jpg'},
    { id: 6, url: './img/6.jpg'},
    { id: 7, url: './img/7.jpg'},
    { id: 8, url: './img/8.jpg'},
    { id: 9, url: './img/9.jpg'},
    { id: 10, url: './img/10.jpg'},
    { id: 11, url: './img/11.jpg'},
    { id: 12, url: './img/12.jpg'},
    { id: 13, url: './img/13.jpg'},
    { id: 14, url: './img/14.jpg'},
    { id: 15, url: './img/15.jpg'},
    { id: 16, url: './img/16.jpg'},
    { id: 17, url: './img/17.jpg'},
    { id: 18, url: './img/18.jpg'}
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

function deleteLine(lineIdx) {
    gMeme.lines.splice(lineIdx, 1);
}

function updateMemeLine(key, value) {
    gMeme.lines[gMeme.selectedLineIdx][key] = value;
}

function addMemeLine(text) {
    let line = {
        txt: text,
        size: 50,
        align: 'center',
        font: 'Impact',
        color: 'white',
        stroke: 'black',
        positionY: null,
    };

    if (gMeme.lines.length === 0) line.positionY = 10;
    if (gMeme.lines.length === 1) line.positionY = 95;
    if (gMeme.lines.length > 1) line.positionY = 50;

    return gMeme.lines.push(line);
}


