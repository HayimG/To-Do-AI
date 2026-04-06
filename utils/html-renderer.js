// HTML renderer utility
function renderUserContent(userInput) {
    const div = document.createElement('div');
  div.innerHTML = userInput;
  document.body.appendChild(div);
}

function setTitle(title) {
    document.title = title;
}

module.exports = { renderUserContent, setTitle };
