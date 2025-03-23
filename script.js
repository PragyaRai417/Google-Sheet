// Initial state for each cell
const initialCellState = {
    fontFamily_data: 'monospace',
    fontSize_data: '14',
    isBold: false,
    isItalic: false,
    textAlign: 'start',
    isUnderlined: false,
    color: '#000000',
    backgroundColor: '#ffffff',
    content: ''
};

// Array to hold all sheets
let sheetsArray = [];

// Index of the currently active sheet
let activeSheetIndex = -1;

// Object to store active sheet data
let activeSheetObject = false;

// Variable to track the currently active cell
let activeCell = false;

// Selecting UI elements
let fontFamilyBtn = document.querySelector('.font-family');
let fontSizeBtn = document.querySelector('.font-size');
let boldBtn = document.querySelector('.bold');
let italicBtn = document.querySelector('.italic');
let underlineBtn = document.querySelector('.underline');
let leftBtn = document.querySelector('.start');
let centerBtn = document.querySelector('.center');
let rightBtn = document.querySelector('.end');
let colorBtn = document.querySelector('#color');
let bgColorBtn = document.querySelector('#bgcolor');
let addressBar = document.querySelector('.address-bar');
let formula = document.querySelector('.formula-bar');
let downloadBtn = document.querySelector(".download");
let openBtn = document.querySelector(".open");

// Grid header row element
let gridHeader = document.querySelector('.grid-header');

// Adding the first column header (serial number)
let bold = document.createElement('div');
bold.className = 'grid-header-col';
bold.innerText = 'SL. NO.';
gridHeader.append(bold);

// Creating column headers (A-Z)
for (let i = 65; i <= 90; i++) {
    let bold = document.createElement('div');
    bold.className = 'grid-header-col';
    bold.innerText = String.fromCharCode(i);
    bold.id = String.fromCharCode(i);
    gridHeader.append(bold);
}

// Creating the grid (100 rows)
for (let i = 1; i <= 100; i++) {
    let newRow = document.createElement('div');
    newRow.className = 'row';
    document.querySelector('.grid').append(newRow);

    // Creating row headers (1-100)
    let bold = document.createElement('div');
    bold.className = 'grid-cell';
    bold.innerText = i;
    bold.id = i;
    newRow.append(bold);

    // Creating individual cells (A1 - Z100)
    for (let j = 65; j <= 90; j++) {
        let cell = document.createElement('div');
        cell.className = 'grid-cell cell-focus';
        cell.id = String.fromCharCode(j) + i;
        cell.contentEditable = true;

        // Event listeners for cell interactions
        cell.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent event bubbling
        });
        cell.addEventListener('focus', cellFocus);
        cell.addEventListener('focusout', cellFocusOut);
        cell.addEventListener('input', cellInput);

        newRow.append(cell);
    }
}

// Function to handle cell focus
function cellFocus(event) {
    let key = event.target.id;
    addressBar.innerHTML = key;
    activeCell = event.target;

    let activeBg = '#c9c8c8';  // Highlight color for active buttons
    let inactiveBg = '#ecf0f1'; // Default background color for inactive buttons

    // Update UI with the current cell's styles and content
    fontFamilyBtn.value = activeSheetObject[key].fontFamily_data;
    fontSizeBtn.value = activeSheetObject[key].fontSize_data;
    boldBtn.style.backgroundColor = activeSheetObject[key].isBold ? activeBg : inactiveBg;
    italicBtn.style.backgroundColor = activeSheetObject[key].isItalic ? activeBg : inactiveBg;
    underlineBtn.style.backgroundColor = activeSheetObject[key].isUnderlined ? activeBg : inactiveBg;
    setAlignmentBg(key, activeBg, inactiveBg);
    colorBtn.value = activeSheetObject[key].color;
    bgColorBtn.value = activeSheetObject[key].backgroundColor;

    // Set the formula bar text to the cell content
    formula.value = activeCell.innerText;

    // Highlight the corresponding row and column headers
    document.getElementById(event.target.id.slice(0, 1)).classList.add('row-col-focus');
    document.getElementById(event.target.id.slice(1)).classList.add('row-col-focus');
}

// Function to handle cell input event (when user types)
function cellInput() {
    let key = activeCell.id;
    formula.value = activeCell.innerText; // Update formula bar
    activeSheetObject[key].content = activeCell.innerText; // Save content to active sheet
}

// Function to set the alignment background color for buttons
function setAlignmentBg(key, activeBg, inactiveBg) {
    leftBtn.style.backgroundColor = inactiveBg;
    centerBtn.style.backgroundColor = inactiveBg;
    rightBtn.style.backgroundColor = inactiveBg;

    if (key) {
        document.querySelector('.' + activeSheetObject[key].textAlign).style.backgroundColor = activeBg;
    } else {
        leftBtn.style.backgroundColor = activeBg; // Default to left alignment
    }
}

// Function to handle cell focus out (when user clicks away)
function cellFocusOut(event) {
    document.getElementById(event.target.id.slice(0, 1)).classList.remove('row-col-focus');
    document.getElementById(event.target.id.slice(1)).classList.remove('row-col-focus');
}