const RWORDS = /[^\s]+/g;
// - https://developer.chrome.com/docs/extensions/mv3/getstarted/tut-reading-time/




// Get reading times for a given text in minutes.
function readingTimeMessage(wc) {
  var easy   = Math.round(wc / 100);
  var normal = Math.round(wc / 150);
  var hard   = Math.round(wc / 200);
  var expert = Math.round(wc / 250);
  return `⏱️ ${wc} words (Easy ${easy} min; Normal ${normal} min; Hard ${hard} min; Expert ${expert} min)`;
}
// - https://developer.chrome.com/docs/extensions/mv3/getstarted/tut-reading-time/


// Check if page background is dark in color.
function isDarkBackground() {
  var bg = getComputedStyle(document.body).backgroundColor;
  if (!bg) return false;
  var rgb = bg.match(/\d+/g);
  if (!rgb) return false;
  var [r, g, b] = rgb.map(x => parseInt(x));
  return 0.2126*r + 0.7152*g + 0.0722*b < 128;
}


// Show reading times on webpage.
function showBottomRight(msg) {
  var isDark = isDarkBackground();
  var div    = document.createElement('div');
  var text   = document.createTextNode(msg);
  // Hide on click.
  Object.assign(div.style, {
    position: 'fixed',
    right:    '0',
    bottom:   '0',
    padding:  '0.5em',
    color:      isDark? 'white' : 'black',
    background: isDark? 'black' : 'white',
    zIndex:   '9999',
  });
  div.onclick = () => div.remove();
  div.appendChild(text);
  document.body.appendChild(div);
}


// Main function.
function main() {
  var article = document.querySelector(
    '.mw-body, .max-w-ycdc-page, '+
    '#readme, #article, #article-content, .article, .article-wrapper, article, ' +
    '#content-inner, #mainContent, #bodyContent, #content, .content, .content-body, .container, ' +
    '#root, #main, .main, main'
  );
  if (!article) return;
  var words   = [...article.textContent.match(RWORDS)];
  var message = readingTimeMessage(words.length);
  showBottomRight(message);
}
// - https://developer.chrome.com/docs/extensions/mv3/getstarted/tut-reading-time/
main();
