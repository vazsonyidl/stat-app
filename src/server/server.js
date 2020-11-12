const bent = require('bent');
const getJSON = bent('string');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

console.time('start');
let dom = '';
(async () => {
  try {
    dom = await getJSON('http://www.ksh.hu/docs/hun/xstadat/xstadat_eves/i_wnt001a.html');
    const parsed = new JSDOM(dom);
    parsed.window.document.querySelectorAll('td').forEach(cell => {
      const value = cell.innerHTML.trim();
      const updated = value.replace(/<(span|sup)(.)*>(.)*(.)*<\/(span|sup)>/gm, '');
      console.log(updated.match(/^[-]?([0-9]*[ |,]?)*$/gm), updated);
    });
  } catch (e) {
    console.log(e);
  }
})();


console.timeEnd('start');
