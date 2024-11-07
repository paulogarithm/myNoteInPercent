const RED = { r: 255, g: 0, b: 0 };
const LIMEGREEN = { r: 50, g: 205, b: 50 };

const interpolColor = (value) => {
    value = Math.min(Math.max(value, 0), 1);

    const r = Math.round(RED.r + (LIMEGREEN.r - RED.r) * value);
    const g = Math.round(RED.g + (LIMEGREEN.g - RED.g) * value);
    const b = Math.round(RED.b + (LIMEGREEN.b - RED.b) * value);

    return `rgb(${r}, ${g}, ${b})`;
}

window.addEventListener("click", () => {
    const commentElement = document.querySelector('div.comment');
    const re = /\:\s*(\-?[0-9])+\s*\/\s*([0-9]+)|\(\s*(\-?[0-9])+\s*\/\s*([0-9]+)\s*\)\s*\:/g
    let theirs = 0;
    let ours = 0;

    const myDiv = document.querySelector('aside.zizi-bar')
    if (myDiv)
        return;

    const mainDiv = document.querySelector('div.note');
    if (!mainDiv)
        return;

    let noteDiv = mainDiv.querySelector('div');
    if (!noteDiv || !noteDiv.textContent.startsWith('Note : '))
        return;

    const noteContent = noteDiv.textContent.replace('Note : ', '').trim();
    noteDiv.textContent = "";

    while ((t = re.exec(commentElement.textContent)) !== null) {
        if (t[1] && t[2]) {
            ours += Number(t[1])
            theirs += Number(t[2])
        } else if (t[3] && t[4]) {
            ours += Number(t[3])
            theirs += Number(t[4])
        }
    }

    const realNote = Math.max(ours, Number(noteContent));
    const percentage = realNote / theirs;
    console.log(percentage, ours + " vs " + noteContent + " = " + realNote, theirs);

    noteDiv.style.display = "flex";
    // noteDiv.style.justifyContent = "space-between";
    noteDiv.style.justifyContent = "left";
    noteDiv.style.alignItems = "center";
    noteDiv.style.gap = "1vw";
    // noteDiv.style.border = "1px solid #ddd";
    // noteDiv.style.padding = "10px";

    let noteText = document.createElement("p");
    noteText.textContent = "Note : " + noteContent;
    
    let ziziDiv = document.createElement("aside");
    ziziDiv.className = "zizi-bar";

    let percentText = document.createElement("p");
    percentText.className = "text-progress-bar";
    percentText.textContent = String(Math.round(percentage * 100)) + "%";

    let background = document.createElement("div");
    background.className = "background-progress-bar";

    let progress = document.createElement("div");
    progress.className = "filled-progress-bar";
    progress.style.width = String(percentage * 100) + "%";
    progress.style.backgroundColor = interpolColor(percentage);

    ziziDiv.appendChild(progress);
    ziziDiv.appendChild(background);
    ziziDiv.appendChild(percentText);
    noteDiv.appendChild(noteText);
    noteDiv.appendChild(ziziDiv);
})
