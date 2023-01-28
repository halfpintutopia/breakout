const grid = document.getElementById('grid');
const numberOfBlocks = 15;
const numberOfColumns = 5;
let i = 0,
    num = 0,
    xAxis,
    yAxis;
const blockWidth = 100;
const blockHeight = 20;
const xIncrement = 110;
const yIncrement = 30;
const blocks = [];

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

/*
loop for one row 5 columns
decement y reset x
loop again
 */

function createBlocks() {
    xAxis = 10;
    yAxis = 270;
    while (num < numberOfBlocks) {
        blocks.push(new Block(xAxis, yAxis));
        xAxis += xIncrement;
        num++;

        if (num % numberOfColumns === 0) {
            yAxis -= yIncrement;
            xAxis = 10;
        }
    }
}

function addBlocks() {
    createBlocks();
    while (i < blocks.length) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = `${blocks[i].bottomLeft[0]}px`
        block.style.bottom = `${blocks[i].bottomLeft[1]}px`
        grid.append(block);
        i++;
    }
}

addBlocks();