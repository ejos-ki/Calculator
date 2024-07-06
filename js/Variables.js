// // Variable Declaration and Initializations
const query = className => document.querySelector(className);
const queryAll = className => document.querySelectorAll(className);

export const calcVar = {
    tutorialTextContainer : query(".tutorialTextContainer"),
    mathBranchSelector    : query(".mathBranchSelector"),
    mathBranchItems       : queryAll('.mathBranchList li'),
    answerAreaInner       : query(".answerAreaInner"),
    mathBranchList        : query(".mathBranchList"),
    deleteHistory         : query(".deleteHistory"),
    inputEQSubmit         : query(".inputEQSubmit"),
    tutorialText          : query(".tutorialText"),
    innerContent          : query(".innerContent"),
    backDropText          : query("backDropText"), 
    buttonArea            : query(".buttonsArea"),
    answerArea            : query(".answerArea"),
    mathBranch            : query(".mathBranch"),
    inputArea             : query(".inputArea"),
    container             : query(".container"),
    backDrop              : query(".backDrop"),
    inputEQ               : query(".inputEQ"),
    header                : query("header"),
    modal                 : query(".modal"),
    form                  : query("form"),
    blur                  : query(".blur")
};