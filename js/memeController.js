'use strict'

var gCanvas;
var gCtx;

function onInit() {
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d');

    // renderImgs()
    drawText(gMeme.lines[0].txt, 180, 50)
    // onDrawImg()
}

function renderImgs() {
    var imgs = getImgs();
    var strHTMLs = imgs.map(img => {
        return `
        <img onclick= onCreateMeme(${img.id}) src="${img.url}" alt="${img.keywords}">
        `
    })
    document.querySelector('.gallery-container').innerHTML = strHTMLs.join('');
}

function onCreateMeme(imgId) {
    _createMeme(imgId);
}

function onDrawImg() {
    var memeImg = getMemeImg();
    var elImg = new Image();
    elImg.src = memeImg.url;
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
    }
}

function drawText(text, x, y) {
    var memeImg = getMemeImg()
    gCtx.lineWidth = '2';
    gCtx.font = '40px Impact';
    gCtx.textAlign = 'center';
    gCtx.fillText(text, x, y);
    // gCtx.strokeText(text, x, y);
}

