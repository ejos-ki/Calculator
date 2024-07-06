/*
                  File Type :    Vanilla JavaScript (JS)
                  Used in   :    Calculator.html
                  Code by   :    Jeo D. Latorre

    FUNCTIONS
        F1. buttonAreaHide()
                Description :   Function to hide 'buttonArea' and adjust 'container' layout in Calculator.html
                Return Type :   None
                Called by   :   1. Element in Calculator.HTML with class name "answerArea"
                                2. Triggered in jsCalc.js by window resizing Event listener
                Parameter   :   None
                Event       :   1. click
                                2. resize
        
        F2. buttonAreaShow()
                Description :   Function to shows 'buttonArea' and adjust 'container' layout in Calculator.html
                Return Type :   None
                Called by   :   1. Triggered in jsCalc.js by window resizing Event listener
                                2. Element in Calculator.HTML with class name "inputArea"
                Parameter   :   None
                Event       :   1. resize
                                2. click
                
        
        F3. format(passFormat)
                Description :   Formats the display properties of 'buttonArea' and 'container' based on passed parameters.
                Return Type :   None
                Called by   :   Used internally by 'buttonAreaHide' and 'buttonAreaShow' functions.
                Parameter   :   passFormat: An array containing values to set visibility, position, and grid templates.
                Event       :   None

        F4. tutorial()
                Description :   Performs the tutorial feature 
                Return Type :   None
                Called by   :   div element with class ".backDrop"
                Parameter   :   None
                Event       :   Click      
                
        F5. tutorialEnd()
                Description :   Ends the tutorial feature 
                Return Type :   None
                Called by   :   tutorial() after execution of tutorials
                Parameter   :   None
                Event       :   Click 
        
        F6. handleResize()
                Description :   Listener to close end tutorial feature and math branch list at certain instance of height and width
                Return Type :   None
                Called by   :   tutorial() each time it is executed
                Parameter   :   None
                Event       :   resize
*/

import { calcVar } from './Variables.js';

let onClickCount = 0;
let storedUserEQ = JSON.parse(localStorage.getItem("storedUserEQ")) || { equations: [] };
let property = storedUserEQ.equations;

alert("The project is still in progress, and the calculator functionality has not been implemented yet.");
alert("Inspired by Mathway Calculator")

formatCall (window, 'resize', () => { buttonAreaShow(), buttonAreaHide() })    

formatCall(window, 'click', event => { 
    const isClicked = event.target.tagName === 'svg'; 

    if (!isClicked)  
        hideMathBranchList();
});

document.addEventListener('DOMContentLoaded', () => {
    formatCall(calcVar.backDrop,        'click', () => { buttonAreaHide(), tutorial() });
    formatCall(calcVar.deleteHistory,   'click', () => deleteHistoryData());
    formatCall(calcVar.inputEQ,         'click', () => showInputEQSubmit());
    formatCall(calcVar.answerArea,      'click', () => buttonAreaHide());
    formatCall(calcVar.modal,           'click', () => showMathBranchList());
    formatCall(calcVar.inputArea,       'click', () => buttonAreaShow());
    formatCall(calcVar.tutorialText,    'click', () => tutorial());
    formatCall(calcVar.form,            'click', () => buttonAreaShow());
    

    formatCall(calcVar.form,      'submit', () => questionToAnswerArea());
    formatCall(calcVar.inputArea, 'submit', () => storeShowEQ());

    formatCall(calcVar.inputEQ, 'blur', () => hideInputEQSubmit());

    formatCall(calcVar.inputEQ, 'input', () => showInputEQSubmit());

    

    calcVar.mathBranchItems.forEach(item => {
        formatCall(item, 'click', () => mathBranchSelected(item.textContent.trim()));
    });        
});

function formatCall(element, action, handler) {
    element.addEventListener(action, handler);
}

// Function to hide 'buttonArea' and adjust 'container' layout
function buttonAreaHide() { 
    format(["hidden", "absolute", "1fr", "1fr"]);                                                    // ["visibility", "position", "grid-template", "grid-template", "grid-template"] 
};

// Function to shows 'buttonArea' and adjust 'container' layout
function buttonAreaShow() {
    format(["visible", "relative", "2fr 1fr", "1fr"]);                                              // ["visibility", "position", "grid-template", "grid-template", "grid-template"] 
}

// Formats the display properties of 'buttonArea' and 'container'
function format(passFormat) {
    let windowHeight = window.innerHeight;                                                          // IDENTIFY the height(in pixels) of the viewport of HTML windows and STORES in the variable 'windowHeight'

    Object.assign(calcVar.buttonArea.style, {
        visibility: passFormat[0],
        position: passFormat[1]
    });

    // if the value inside windowHeight is 200px or below
    if (windowHeight <= 200) {
        Object.assign(calcVar.innerContent.style, {
            gridTemplateColumns : passFormat[2],
            gridTemplateRows    : passFormat[3],
            gridTemplateAreas   : `"area1 button"
                                   "area2 button"`
        });

        calcVar.buttonArea.style.gridArea   = "button";
        calcVar.answerArea.style.gridArea   = "area1";
        calcVar.inputArea.style.gridArea    = "area2";


        if(windowHeight > 151)
            calcVar.buttonArea.style.marginTop = "50px";
        else 
            calcVar.buttonArea.style.marginTop = "0px"
    }
    // if the value inside windowHeight is above 200px 
    else {  
        calcVar.buttonArea.style.marginTop = "0px"

        if(passFormat[0] === "visible")
            Object.assign(calcVar.innerContent.style, {
                gridTemplateRows    : "2fr 60px 1fr",
                gridTemplateAreas   :  `"area1"
                                        "area2"
                                        "button"`
            });
        else {  
            Object.assign(calcVar.innerContent.style, {
                gridTemplateColumns : "1fr",
                gridTemplateRows    : "1fr 60px",
                gridTemplateAreas   :  `"area1"
                                        "area2"`
            });
        }
    }                                        
}

function tutorial() {
    onClickCount++;

    let windowHeight = window.innerHeight;    
    let windowWidth  = window.innerWidth;   

    window.addEventListener('resize', handleResize);

    Object.assign(calcVar.blur.style, {
        visibility  : "hidden",
        position    : "absolute"
    });

    switch(onClickCount) {
        case 1: if(windowHeight > 150 && windowWidth > 100) {    
                    Object.assign(calcVar.backDrop.style, {
                        visibility: "visible",
                        position  : "fixed"
                    });

                    Object.assign(calcVar.modal.style, {
                        pointerEvents: "none",
                        userSelect   : "none",
                        zIndex       : "3"
                    });
                    
                    calcVar.mathBranchSelector.style.zIndex = "3";
                    calcVar.mathBranch.style.zIndex         = "3";
                    calcVar.blur.style.visibility           = "visible";
                    calcVar.backDrop.textContent            = "To begin specify the branch of Mathematics you will ask";
                    calcVar.mathBranch.onclick              = tutorial;
                    
                } else 
                    tutorialEnd();
                break;

        case 2: if(windowHeight > 150 && windowWidth > 100) {   
                    buttonAreaShow(); 
                    calcVar.inputEQ.setAttribute("unselectable", "on");

                    calcVar.mathBranchSelector.style.zIndex = "1";
                    calcVar.inputEQSubmit.style.zIndex      = "2";
                    calcVar.mathBranch.style.zIndex         = "1";
                    calcVar.backDrop.textContent            = "After You can enter the Math Equation or Expression to solve or simplify";
                    calcVar.modal.style.zIndex              = "1";

                    Object.assign(calcVar.inputEQ.style, {
                        zIndex: "2",
                        cursor: "pointer"
                    });

                    Object.assign(calcVar.inputEQ, {
                        readOnly : true,
                        onclick  : tutorial,
                        onblur   : null
                    });

                    calcVar.inputEQSubmit.onclick = function(event) {
                        event.preventDefault(); 
                        tutorial(); 
                    };
                } else 
                    tutorialEnd();

                break;
        case 3:  if(windowHeight > 150 && windowWidth > 100) {   
                    buttonAreaShow();

                    calcVar.mathBranchSelector.style.zIndex = "1";
                    calcVar.inputEQSubmit.textContent       = "Submit";
                    calcVar.mathBranch.style.zIndex         = "1";
                    calcVar.backDrop.textContent            = "Lastly, Press the submit button to generate answer";
                    calcVar.inputEQ.style.zIndex            = "1";
                    calcVar.modal.style.zIndex              = "1";
                    calcVar.inputEQ.readOnly                = true;

                    Object.assign(calcVar.inputEQSubmit.style, {
                        zIndex: "2",
                        cursor: "pointer"
                    });
                } else 
                    tutorialEnd();
                break;
       default: tutorialEnd();
                onClickCount = 0;
    }
}

function tutorialEnd() {
    buttonAreaHide();

    calcVar.inputEQSubmit.style.zIndex  = "1";
    calcVar.modal.style.pointerEvents   = "auto";
    calcVar.inputEQSubmit.textContent   = " ";
    calcVar.inputEQSubmit.onclick       = null;
    calcVar.mathBranch.onclick          = null;

    Object.assign(calcVar.backDrop.style, {
        position: "absolute",
        visibility: "hidden"
    });

    Object.assign(calcVar.blur.style, {
        position: "absolute",
        visibility: "hidden"
    });
    
    Object.assign(calcVar.inputEQ.style, {
        zIndex: "1",
        cursor: "auto"
    });

    Object.assign(calcVar.inputEQ, {
        readOnly : false,
        onclick  : showInputEQSubmit,
        onblur   : hideInputEQSubmit
    });
}

function handleResize() {
    let windowHeight = window.innerHeight;
    let windowWidth  = window.innerWidth;

    if (windowHeight <= 150 || windowWidth <= 100) {
        onClickCount = 0;
        tutorialEnd(); 
    }

    if (calcVar.mathBranchList.style.visibility === "visible" && (windowHeight <= 151 || windowWidth <= 100)) 
        calcVar.mathBranchList.style.visibility = "hidden";
}

function showInputEQSubmit() {
    calcVar.inputEQSubmit.textContent = "Submit";
    calcVar.inputEQSubmit.style.cursor ="pointer";
}

function hideInputEQSubmit() {
    calcVar.inputEQSubmit.style.cursor = "text";
    calcVar.inputEQSubmit.textContent  = " ";
}

function mathBranchSelected(selectedBranchName) {
    calcVar.mathBranchList.style.visibility = "hidden";
    calcVar.mathBranchSelector.textContent  = selectedBranchName;
}

function showMathBranchList() {
    window.addEventListener('resize', handleResize);

    let mathBranchListVisible = calcVar.mathBranchList.style.visibility

    if(mathBranchListVisible === "hidden"){
        calcVar.mathBranchList.style.visibility = "visible";
        calcVar.mathBranchList.style.zIndex = "3";
    } else 
    calcVar.mathBranchList.style.visibility = "hidden";
}

function hideMathBranchList() {
    calcVar.mathBranchList.style.visibility = "hidden";
}

function storeShowEQ() {
    const userEQ = document.getElementById("userEQ").value;

    property.push(userEQ);
    localStorage.setItem("storedUserEQ", JSON.stringify(storedUserEQ));
}

function deleteHistoryData() {
    if (confirm("Your history in Math will be deleted, Continue?")) {
        localStorage.removeItem("storedUserEQ");
        location.reload(); 
    }
}

if (property.length != 0) {
    calcVar.deleteHistory.style.visibility = "visible";

    Object.assign(calcVar.tutorialTextContainer.style, {
        visibility  : "hidden",
        position    : "absolute"
    });

    property.forEach((equation, key) => {
        let sentence = `<strong> Equation ${key + 1}: </strong> ${equation} <br>`;

        let divUserEquation = 
        `<div class="userQuestion">
            <button>
                ${sentence}
                <span class="triangleUser"></span>
            </button>
            <div class="userIcon">
                <img class="userIconImg" src="images/user.jpg" alt="">
            </div>
         </div> 

         <div class="answerTextContainer">
            <button style="font-style: normal;" class="answerText">
                This is answer for Equation ${key + 1} hehe!
                <div class="showAnswer">
                    Tap to view Steps!
                </div>
                <span class="triangle"></span>
            </button>
            <div class="logoIcon">
                <img class="logoIconImg" src="images/logoDark.png" alt="">
            </div>
        </div>`;

        calcVar.answerAreaInner.insertAdjacentHTML("beforeend", divUserEquation);
    });

    scrollToBottom(calcVar.answerAreaInner);
} else {
    calcVar.deleteHistory.style.visibility = "hidden";
    calcVar.answerAreaInner.style.justifyContent = "end";
}


function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
}