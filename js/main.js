/**
 * Creates a list of words based on text populating div elements.
 * @param {Array} divArray 
 */
const buildWordList = (divArray) => {
    let textArray = [];
    for (let i = 0; i < divArray.length; i++) {
        textArray[i] = divArray[i].innerHTML;
    }
    return textArray;
}

/**
 * Adds the zoomAnimation class to each child node of the parent if
 * the zoomState is false (not active). If the zoomState is true (active),
 * the class is removed from the class list of each child.
 * @param {HTMLElement} parentNode 
 * @param {boolean} zoomState 
 */
const toggleChildZoom = (parentNode, zoomState) => {
    for (let i = 0; i < parentNode.children.length; i++) {
        if (zoomState) {
            parentNode.children[i].classList.remove("zoomAnimation");
        } else {
            parentNode.children[i].classList.add("zoomAnimation");
        }
    }
}

/**
 * Shuffles the array randomly.
 * @param {Array} wordArr
 */
const shuffleWordList = (wordArr) => {
  let len = wordArr.length;
  wordArr.forEach((element) => {
    let temp = element;
    let index = wordArr.indexOf(element);
    wordArr.splice(index, 1);
    wordArr.splice(Math.random() * (len - 1), 0, temp);
  });
};

/**
 * Updates innerHTML for every child of the parent node to contain
 * the correct word for its position.
 * @param {HTMLElement} parentNode
 * @param {Array} wordArr
 */
const updateList = (parentNode, wordArr) => {
    for (let i = 0; i < wordArr.length; i++) {
        parentNode.children[i].innerHTML = wordArr[i];
    }
};

const TIME_ZOOM_OUT = 750;
const TIME_ZOOM_IN = 1500;

const wordContainer = document.getElementById("wordList");
const sortButtonElement = document.getElementById("sortButton");
const shuffleButtonElement = document.getElementById("shuffletButton");

let wordArray = buildWordList(wordContainer.querySelectorAll('div'));
let isAnimating = false;
let isZoomed = false;

document.getElementById("sortButton").addEventListener("click", () => {
  if (isAnimating) return;
  isAnimating = true;
  toggleChildZoom(wordContainer, isZoomed);
  isZoomed = true;
  setTimeout(() => {
    wordArray.sort();
    updateList(wordContainer, wordArray);
  }, TIME_ZOOM_OUT);
  setTimeout(() => {
    toggleChildZoom(wordContainer, isZoomed);
    isZoomed = false;
    isAnimating = false;
  }, TIME_ZOOM_IN);
});

document.getElementById("shuffleButton").addEventListener("click", () => {
  if (isAnimating) return;
  isAnimating = true;
  toggleChildZoom(wordContainer, isZoomed);
  isZoomed = true;
  setTimeout(() => {
    shuffleWordList(wordArray);
    updateList(wordContainer, wordArray);
  }, TIME_ZOOM_OUT);
  setTimeout(() => {
    toggleChildZoom(wordContainer, isZoomed);
    isZoomed = false;
    isAnimating = false;
  }, TIME_ZOOM_IN);
});
