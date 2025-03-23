// Function to set the font family for the active cell
function setFont(target) {
    if (activeCell) {
        let fontInput = target.value;
        console.log(fontInput); // Debugging log
        activeSheetObject[activeCell.id].fontFamily_data = fontInput;
        activeCell.style.fontFamily = fontInput;
        activeCell.focus();
    }
}

// Function to set the font size for the active cell
function setSize(target) {
    if (activeCell) {
        let sizeInput = target.value;
        activeSheetObject[activeCell.id].fontSize_data = sizeInput;
        activeCell.style.fontSize = sizeInput + 'px';
        activeCell.focus();
    }
}

// Toggle bold formatting for the active cell
boldBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleBold();
});

function toggleBold() {
    if (activeCell) {
        if (!activeSheetObject[activeCell.id].isBold) {
            activeCell.style.fontWeight = '600';
        } else {
            activeCell.style.fontWeight = '400';
        }
        activeSheetObject[activeCell.id].isBold = !activeSheetObject[activeCell.id].isBold;
        activeCell.focus();
    }
}

// Toggle italic formatting for the active cell
italicBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleItalic();
});

function toggleItalic() {
    if (activeCell) {
        if (!activeSheetObject[activeCell.id].isItalic) {
            activeCell.style.fontStyle = 'italic';
        } else {
            activeCell.style.fontStyle = 'normal';
        }
        activeSheetObject[activeCell.id].isItalic = !activeSheetObject[activeCell.id].isItalic;
        activeCell.focus();
    }
}

// Toggle underline formatting for the active cell
underlineBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleUnderline();
});

function toggleUnderline() {
    if (activeCell) {
        if (!activeSheetObject[activeCell.id].isUnderlined) {
            activeCell.style.textDecoration = 'underline';
        } else {
            activeCell.style.textDecoration = 'none';
        }
        activeSheetObject[activeCell.id].isUnderlined = !activeSheetObject[activeCell.id].isUnderlined;
        activeCell.focus();
    }
}

// Prevent event propagation when clicking on color pickers
document.querySelectorAll('.color-prop').forEach(e => {
    e.addEventListener('click', (event) => event.stopPropagation());
});

// Function to change text color for the active cell
function textColor(target) {
    if (activeCell) {
        let colorInput = target.value;
        activeSheetObject[activeCell.id].color = colorInput;
        activeCell.style.color = colorInput;
        activeCell.focus();
    }
}

// Function to change background color for the active cell
function backgroundColor(target) {
    if (activeCell) {
        let colorInput = target.value;
        activeSheetObject[activeCell.id].backgroundColor = colorInput;
        activeCell.style.backgroundColor = colorInput;
        activeCell.focus();
    }
}

// Alignment buttons click event to set text alignment
document.querySelectorAll('.alignment').forEach(e => {
    e.addEventListener('click', (event) => {
        event.stopPropagation();
        let align = e.className.split(' ')[0]; // Get alignment class name
        alignment(align);
    });
});

// Function to change text alignment for the active cell
function alignment(align) {
    if (activeCell) {
        activeCell.style.textAlign = align;
        activeSheetObject[activeCell.id].textAlign = align;
        activeCell.focus();
    }
}

// Copy functionality
document.querySelector('.copy').addEventListener('click', (event) => {
    event.stopPropagation();
    if (activeCell) {
        navigator.clipboard.writeText(activeCell.innerText);
        activeCell.focus();
    }
});

// Cut functionality
document.querySelector('.cut').addEventListener('click', (event) => {
    event.stopPropagation();
    if (activeCell) {
        navigator.clipboard.writeText(activeCell.innerText);
        activeCell.innerText = ''; // Clear cell after cutting
        activeCell.focus();
    }
});

// Paste functionality
document.querySelector('.paste').addEventListener('click', (event) => {
    event.stopPropagation();
    if (activeCell) {
        navigator.clipboard.readText().then((text) => {
            formula.value = text;
            activeCell.innerText = text;
        });
        activeCell.focus();
    }
});

// Download functionality - saves sheet data as JSON file
downloadBtn.addEventListener("click", (e) => {
    let jsonData = JSON.stringify(sheetsArray);
    let file = new Blob([jsonData], { type: "application/json" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "SheetData.json";
    a.click();
});

// Open functionality - loads sheet data from a JSON file
openBtn.addEventListener("click", (e) => {
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let fr = new FileReader();
        let files = input.files;
        let fileObj = files[0];

        fr.readAsText(fileObj);
        fr.addEventListener("load", (e) => {
            let readSheetData = JSON.parse(fr.result);
            readSheetData.forEach(e => {
                document.querySelector('.new-sheet').click(); // Create new sheet
                sheetsArray[activeSheetIndex] = e;
                activeSheetObject = e;
                changeSheet();
            });
        });
    });
});

// Formula bar input event - updates cell content dynamically
formula.addEventListener('input', (event) => {
    activeCell.innerText = event.target.value;
    activeSheetObject[activeCell.id].content = event.target.value;
});

// Bug fix: Clicking anywhere outside a cell resets functionality
document.querySelector('body').addEventListener('click', () => {
    resetFunctionality();
});

// Prevent propagation of click events inside the formula bar
formula.addEventListener('click', (event) => event.stopPropagation());

// Prevent propagation for select dropdowns and color inputs
document.querySelectorAll('.select,.color-prop>*').forEach(e => {
    e.addEventListener('click', event => {
        event.stopPropagation();
    });
});