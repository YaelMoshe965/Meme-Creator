'use strict'

var gElCanvas;
var gCtx;

function onInit() {
    renderImages();
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

function onChangeLineText(newText, lineIdx = getMemeLineIdx()) {
    if (!getMemeLineIdx()) setMemeLineIdx(lineIdx);
    updateMemeLine('txt', newText);
    renderMeme(getMemeImageId());
}

function onAddNewLine() {
    // delete the render control box line from js, but before - think how do you get details about the line
    // get autofocus on input line
    // clear input line
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
    var lines = getMemeLines();
    if (lines) {
        updateMemeLine('stroke', gElStrokeColor.value);
        renderMeme(getMemeImageId());
    }
}

function onChangeFontColor() {
    var gElFontColor = document.getElementById('font-color');
    var lines = getMemeLines();
    if (lines) {
        updateMemeLine('color', gElFontColor.value);
        renderMeme(getMemeImageId());
    }
}

function onDownloadMeme(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my_meme';
}

function setFont(elFont) {
    var lines = getMemeLines();
    if (lines) {
        updateMemeLine('font', elFont);
        renderMeme(getMemeImageId());
    }
}

function onTextAlignLeft() {
    var lines = getMemeLines();
    if (lines) {
        updateMemeLine('align', 'left');
        renderMeme(getMemeImageId());
    }
}

function onTextAlignCenter() {
    var lines = getMemeLines();
    if (lines) {
        updateMemeLine('align', 'center');
        renderMeme(getMemeImageId());
    }
}

function onTextAlignRight() {
    var lines = getMemeLines();
    if (lines) {
        updateMemeLine('align', 'right');
        renderMeme(getMemeImageId());
    }
}

function onDeleteLine() {
    var lineIdx = getMemeLineIdx();
    deleteLine(lineIdx);
    renderMeme(getMemeImageId());
}