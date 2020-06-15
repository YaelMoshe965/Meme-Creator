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
    var canvasWidth = window.innerWidth > 540 ? 540 : window.innerWidth;

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
    var lines = getMemeLines();

    if (lines.length) {
        deleteAllLines();
    }

    renderMeme(imageId);
    onAddNewLine();
    renderControlBox();
}

function renderControlBox() {
    if (getMemeImageId()) {
        document.querySelector('.gallery-container').classList.remove('grid');
        document.querySelector('.gallery-container').hidden = true;
        document.querySelector('.saved-memes-container').classList.remove('grid');
        document.querySelector('.saved-memes-container').hidden = true;
        document.querySelector('.meme').hidden = false;
    }
}

function onShowGallery(ev) {
    ev.preventDeafult;
    document.querySelector('.saved-memes-container').classList.remove('grid');
    document.querySelector('.saved-memes-container').hidden = true;
    document.querySelector('.meme').hidden = true;
    document.querySelector('.gallery-container').classList.add('grid');
    document.querySelector('.gallery-container').hidden = false;
}

function renderMeme(imgId) {
    setMemeImageId(imgId);

    gElCanvas = document.querySelector('#canvas');
    gCtx = gElCanvas.getContext('2d');

    setCanvasSize();

    var elImg = document.querySelector(`#image-${imgId}`);
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);

    var lines = getMemeLines();
    if (lines.length) {
        lines.forEach(line => {
            drawTextFromLine(line, window.innerWidth)
        });
    }
}

function onChangeLineText(newText, lineIdx = getMemeLineIdx()) {
    if (!getMemeLineIdx()) setMemeLineIdx(lineIdx);
    updateMemeLine('txt', newText);
    renderMeme(getMemeImageId());
}

function onAddNewLine() {
    var newLinesLength = addMemeLine('');
    setMemeLineIdx(newLinesLength - 1);
    focusOnTextLine()
    renderMeme(getMemeImageId());
}

function focusOnTextLine() {
    var elTextLine = document.querySelector('.text-line input');
    elTextLine.placeholder = "Enter text here...";
    elTextLine.value = '';
    elTextLine.focus();
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
    var elTextLine = document.querySelector('.text-line input');
    var lineIdx = getMemeLineIdx();
    var lines = getMemeLines();
    if (lines) {
        if (lineIdx >= lines.length - 1) {
            lineIdx = 0;
            setMemeLineIdx(lineIdx);
            elTextLine.focus();
            elTextLine.value = getMemeText(lineIdx);
        }
        else if (lineIdx < lines.length - 1) {
            ++lineIdx;
            setMemeLineIdx(lineIdx);
            elTextLine.focus();
            elTextLine.value = getMemeText(lineIdx);
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

function onShowSavedMemes(ev) {
    ev.preventDeafult;
    document.querySelector('.gallery-container').classList.remove('grid');
    document.querySelector('.gallery-container').hidden = true;
    document.querySelector('.meme').hidden = true;
    document.querySelector('.saved-memes-container').classList.add('grid');
    document.querySelector('.saved-memes-container').hidden = false;

    renderSavedMemes()
}

function renderSavedMemes() {
    var memes = getSavedMemes();
    if (!memes) {
        var strHTML = '<p>No Memes</p>'
        document.querySelector('.saved-memes-container').innerHTML = strHTML;
        return;
    }
    var strHTMLs = memes.map(meme => {
        return `<img src="${meme}">`
    });
    document.querySelector('.saved-memes-container').innerHTML = strHTMLs.join('');
}

function onSaveMeme() {
    const data = gElCanvas.toDataURL();

    saveMeme(data);
}