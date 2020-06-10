'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 };

var gImgs = [{ id: 1, url: './img/1.jpg', keywords: ['happy'] }]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
};

console.log(gMeme.lines[0].txt);


// function _createMeme(imgId) {
//     var meme = {
//         selectedImgId: imgId,
//         selectedLineIdx: 0,

//         lines: [
//             {
//                 txt: 'I never eat Falafel'
//             }
//         ]
//     }
//     gMeme = meme;
// }

function getMemeImg() {
    return gImgs.find(img => img.id === gMeme.selectedImgId)
}

function getImgs() {
    return gImgs;
}


