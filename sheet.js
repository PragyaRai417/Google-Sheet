// Add event listener to the "New Sheet" button
document.querySelector('.new-sheet').addEventListener('click', createNewSheet);

// Function to create a new sheet
function createNewSheet(event) {
    let newCellStateObject = {};

    // Initialize all cells in the new sheet with default styles and content
    for (let i = 1; i <= 100; i++) {
        for (let j = 65; j <= 90; j++) {
            let key = String.fromCharCode(j) + i; // Generate cell ID (A1, B1, ..., Z100)
            newCellStateObject[key] = { ...initialCellState }; // Copy default cell state
        }
    }

    // If there is an active sheet, remove the active class before switching
    if (activeSheetIndex !== -1) {
        document.getElementById('s' + (activeSheetIndex + 1)).classList.remove('active-sheet');
    }

    // Add new sheet data to the array and set it as the active sheet
    sheetsArray.push(newCellStateObject);
    let n = sheetsArray.length;
    activeSheetIndex = n - 1;
    activeSheetObject = sheetsArray[activeSheetIndex];

    // Create a new sheet tab in the footer (navigation menu)
    let sheetMenu = document.createElement('div');
    sheetMenu.className = 'sheet-menu active-sheet';
    sheetMenu.id = 's' + n;
    sheetMenu.innerText = 'Sheet ' + n;

    // Add event listener for switching between sheets
    sheetMenu.addEventListener('click', (event) => {
        event.stopPropagation();

        // Remove active class from the previous sheet
        document.getElementById('s' + (activeSheetIndex + 1)).classList.remove('active-sheet');
        sheetMenu.classList.add('active-sheet'); // Highlight the selected sheet

        // Update the active sheet index
        activeSheetIndex = Number(event.target.id.slice(1)) - 1;

        // If the clicked sheet is already active, just focus on the active cell
        if (sheetsArray[activeSheetIndex] === activeSheetObject) {
            if (activeCell) activeCell.focus();
            return;
        }

        // Set the active sheet object and update the UI
        activeSheetObject = sheetsArray[activeSheetIndex];
        changeSheet();
    });

    // Add the new sheet tab to the footer section
    document.querySelector('.footer').append(sheetMenu);

    // Apply the new sheet's data to the grid
    changeSheet();
}

// Function to update the grid with the active sheet's values and styles
function changeSheet() {
    // Apply saved styles and content to each cell in the sheet
    for (let key in activeSheetObject) {
        let cell = document.getElementById(key);
        let thisCell = activeSheetObject[key];

        // Set cell properties based on saved sheet data
        cell.innerText = thisCell.content;
        cell.style.fontFamily = thisCell.fontFamily_data;
        cell.style.fontSize = thisCell.fontSize_data;
        cell.style.fontWeight = thisCell.isBold ? '600' : '400';
        cell.style.fontStyle = thisCell.isItalic ? 'italic' : 'normal';
        cell.style.textDecoration = thisCell.isUnderlined ? 'underline' : 'none';
        cell.style.textAlign = thisCell.textAlign;
        cell.style.color = thisCell.color;
        cell.style.backgroundColor = thisCell.backgroundColor;
    }

    // Reset active formatting options
    resetFunctionality();
}

// Function to reset all formatting options in the toolbar
function resetFunctionality() {
    let activeBg = '#c9c8c8';
    let inactiveBg = '#ecf0f1';

    // Reset active cell reference
    activeCell = false;
    addressBar.innerHTML = 'Null';

    // Reset font settings to default values
    fontFamilyBtn.value = initialCellState.fontFamily_data;
    fontSizeBtn.value = initialCellState.fontSize_data;

    // Reset text styling buttons
    boldBtn.style.backgroundColor = inactiveBg;
    italicBtn.style.backgroundColor = inactiveBg;
    underlineBtn.style.backgroundColor = inactiveBg;
    
    // Reset alignment buttons
    setAlignmentBg(false, activeBg, inactiveBg);

    // Reset text and background color pickers
    colorBtn.value = initialCellState.color;
    bgColorBtn.value = initialCellState.backgroundColor;

    // Clear the formula bar
    formula.value = '';
}

// Create the first sheet when the page loads
createNewSheet();

// Uncomment below lines to create multiple sheets on load for testing
// createNewSheet();
// createNewSheet();

// Uncomment below line to automatically activate Sheet 1 on load
// document.getElementById('s1').click();