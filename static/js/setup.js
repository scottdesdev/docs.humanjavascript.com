// grab all our h* tags
var hTags = document.querySelector('main').querySelectorAll('h2, h3');

var nav = document.querySelector('nav');
var levels = [];

Array.prototype.forEach.call(hTags, function (h) {
  var a = document.createElement('a');
  var index = Number(h.tagName.charAt(1)) - 1;
  var label = h.textContent.replace(/<[^>]*>/g, '').replace(/\([^\)]*\)/g, '').trim();

  levels[index] = slugger(h.dataset.nav || label);
  levels = levels.slice(0, index + 1);

  h.id = levels.join('-');
  a.href = '#' + h.id;
  h.onclick = function () {
    location.hash = this.id;
    return false;
  };
  a.innerHTML = (h.dataset && h.dataset.nav || label).toLowerCase();
  a.classList.add(h.tagName.toLowerCase());
  nav.appendChild(a);
});

// grab all our nav a tags
var aTags = document.querySelector('nav').querySelectorAll('a');

var slider = document.getElementById('slider');

function markActive(selected) {
  var id = selected && selected.id;
  var found;
  if (id) {
    window.selected = selected;
    Array.prototype.forEach.call(aTags, function (a) {
      if (a.hash.slice(1) === id) {
        found = a;
        a.classList.add('active');
        slider.style.top = a.offsetTop + 'px';
      } else {
        a.classList.remove('active');
      }
    });
  }
}

function selectCurrent() {
  var found;
  var i = 0;
  var l = hTags.length;
  var scroll = document.body.scrollTop || window.scrollY;
  if (scroll < hTags[0].offsetTop) {
    found = hTags[0];
  } else {
    for (; i < l; i++) {
      if (hTags[i].offsetTop > scroll) {
        found = hTags[i - 1];
        break;
      }
    }
  }
  markActive(found);
  setTimeout(selectCurrent, 500);
}

selectCurrent();


// init code highlighting
Array.prototype.forEach.call(document.querySelectorAll('pre'), function (pre) {
  var codeEl = pre.firstChild;
  codeEl.innerHTML = hljs.highlightAuto(codeEl.innerText, ['javascript']).value;
});
