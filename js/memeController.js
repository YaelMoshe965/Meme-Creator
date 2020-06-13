'use strict'

var gElCanvas;
var gCtx;

function onInit() {
    renderImages();
}

function onResize() {
    if (gElCanvas) renderMeme(getMemeImageId())
}

function setCanvasSize() {
    const canvasWidth = window.innerWidth > 540 ? 540 : window.innerWidth;

    gElCanvas.width = canvasWidth;
    gElCanvas.height = canvasWidth;
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open');
}

function renderImages() {
    var imgs = getImages();
    var strHTMLs = imgs.map(img => {
        return `<img id="image-${img.id}" onclick="onSelectImage(${img.id})" src="${img.url}" alt="${img.keywords}">`
    })
    document.querySelector('.gallery-container').innerHTML = strHTMLs.join('');
}

function onSelectImage(imageId) {
    renderMeme(imageId);
    renderControlBox();
}

function renderControlBox() {
    if (getMemeImageId()) {
        document.querySelector('.gallery-container').classList.remove('grid');
        document.querySelector('.gallery-container').hidden = true;
        document.querySelector('.meme').hidden = false;
    }
}

function showGallery(event) {
    event.preventDeafult;
    document.querySelector('.gallery-container').classList.add('grid');
    document.querySelector('.gallery-container').hidden = false;
    document.querySelector('.meme').hidden = true;
}

function renderMeme(imgId) {
    setMemeImageId(imgId);

    gElCanvas = document.querySelector('#canvas');
    gCtx = gElCanvas.getContext('2d');

    setCanvasSize()

    var elImg = document.querySelector(`#image-${imgId}`);
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);

    var lines = getMemeLines();
    if (lines.length) {
        lines.forEach(line => {
            drawTextFromLine(line, window.innerWidth)
        });
    }
}

function onSelectedLineIdx(lineIdx) {
    setMemeLineIdx(lineIdx);
}

function onChangeLineText(newText, lineIdx = getMemeLineIdx()) {
    if (!getMemeLineIdx()) setMemeLineIdx(lineIdx);
    updateMemeLine('txt', newText);
    renderMeme(getMemeImageId());
}

function onAddNewLine() {
    const newLinesLength = addMemeLine('');
    setMemeLineIdx(newLinesLength - 1);
    focusOnTextLine()
    renderMeme(getMemeImageId());
}

function focusOnTextLine() {
    const elTextLine = document.querySelector('.text-line input');
    elTextLine.placeholder = "Enter text here...";
    elTextLine.value = '';
    elTextLine.disabled = false;
    elTextLine.focus();
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

function onIncreaseFontSize() {
    modifyLineProperty('size', 'increment', 3);
}

function onDecreaseFontSize() {
    modifyLineProperty('size', 'decrement', 3);

}

function onMovingLineUp() {
    modifyLineProperty('positionY', 'decrement', 10);

}

function onMovingLineDown() {
    modifyLineProperty('positionY', 'increment', 10);
}

function onSwitchLine() {
    var lineIdx = getMemeLineIdx();
    var lines = getMemeLines();
    if (lines) {
        if (lineIdx >= lines.length - 1) {
            lineIdx = 0;
            setMemeLineIdx(lineIdx);
            focusOnTextLine();
        }
        else if (lineIdx < lines.length - 1) {
            ++lineIdx;
            setMemeLineIdx(lineIdx);
            focusOnTextLine();
        }
    }
}

function onChangeStroke() {
    var gElStrokeColor = document.getElementById('stroke-color');
    modifyLineProperty('stroke', 'setValue', gElStrokeColor.value);
}

function onChangeFontColor() {
    var gElFontColor = document.getElementById('font-color');
    modifyLineProperty('color', 'setValue', gElFontColor.value);
}

function onDownloadMeme(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my_meme';
}

function setFont(elFont) {
    modifyLineProperty('font', 'setValue', elFont);
}

function onTextAlignLeft() {
    modifyLineProperty('align', 'setValue', 'right');
}

function onTextAlignCenter() {
    modifyLineProperty('align', 'setValue', 'center');
}

function onTextAlignRight() {
    modifyLineProperty('align', 'setValue', 'left');
}

function onDeleteLine() {
    var lineIdx = getMemeLineIdx();
    deleteLine(lineIdx);
    renderMeme(getMemeImageId());
}