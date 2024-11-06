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
    const re = /\(\s*([0-9]+)\s*\/\s*([0-9]+)\s*\)\s*\:/g;
    let theirs = 0;

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

    const lines = commentElement.innerHTML.split(/\r?\n|\r|\n/g);
    lines.forEach((e) => {
        const t = re.exec(e);
        if (t == null)
            return;
        theirs += Number(t[2])
    })

    const percentage = Number(noteContent) / theirs;
    console.log(Number(noteContent) / theirs, theirs);

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
