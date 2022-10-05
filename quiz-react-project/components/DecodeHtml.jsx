import React from "react"

export default function decodeHtml(html) {     // this function turns html unicode into readable text (opentdb api sends data with html unicode)
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.textContent;
}