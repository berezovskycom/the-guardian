const API_KEY = '00914858-e291-4910-9b4e-47512b633dde';
const requestUrl = `https://content.guardianapis.com/search?
&show-blocks=body&api-key=${API_KEY}&page=1`;

const request = new XMLHttpRequest();
request.open('GET', requestUrl);
request.responseType = 'json';
request.send();

const totalPages = document.querySelector('.total-pages');
const acc = document.querySelectorAll('.accordion');
const panel = document.querySelectorAll('.panel');
const refreshBtn = document.querySelector('.refresh');
const btnPrev = document.querySelector('a.prev');
const btnNext = document.querySelector('a.next');
const pageNum = document.querySelector('.page-num');
const countForm = document.querySelector('.count');
let i;

// error message
const errHandler = () => {
  if (request.statusText === '') {
    document.querySelector('main').style.display = 'none';
    const err = document.createElement('div');
    err.className = 'error';
    err.textContent = 'Sorry, we couldn\'t find the news for you. Please try again later.';
    document.body.appendChild(err);
  }
};

setTimeout(errHandler, 3000);

// short the news
const truncate = function( n, useWordBoundary ) {
  if (this.length <= n) { return this; }
  let subString = this.substr(0, n-1);
  return (useWordBoundary 
       ? subString.substr(0, subString.lastIndexOf(' ')) 
       : subString) + "...";
};

// function to work with pseudo elements
let UID = {
  _current: 0,
  getNew: function(){
    this._current++;
    return this._current;
  }
};

HTMLElement.prototype.pseudoStyle = function(element,prop,value){
  let _this = this;
  let _sheetId = "pseudoStyles";
  let _head = document.head || document.getElementsByTagName('head')[0];
  let _sheet = document.getElementById(_sheetId) || document.createElement('style');
  _sheet.id = _sheetId;
  let className = "pseudoStyle" + UID.getNew();
  
  _this.className +=  " "+className; 
  
  _sheet.innerHTML += " ."+className+":"+element+"{"+prop+":"+value+"}";
  _head.appendChild(_sheet);
  return this;
};

// load the news
const loadNews = () => {
  const spanIcon = '<span class=\'icon\'></span>';
  const { results, pages } = request.response.response;
  const title = results;

  for (i = 0; i < acc.length; i += 1) {
    acc[i].innerHTML = spanIcon + title[i].webTitle;
    panel[i].innerHTML =
      `<p>${truncate.apply(
        title[i].blocks.body[0].bodyTextSummary, [256, true])}
      </p>
      <br>
      <a href="${title[i].webUrl}" class="link">Read full News</a>`;
  }
  totalPages.textContent = pages;

  if (pageNum.value === '1' || pageNum.value === pages.toString()) {
    btnPrev.classList.add('btn-controls--disabled');
  } else {
    btnPrev.classList.remove('btn-controls--disabled');
  }
};

request.onload = loadNews;

// animations

const transformIcon = (position) => {
  for (i = 0; i < acc.length; i += 1) {
    const arrowIcon = document.querySelectorAll('.icon');
    if (position === '+' && acc[i].classList.contains('active')) {
      arrowIcon[i].pseudoStyle('before', 'transform', 'rotateZ(-120deg)');
      arrowIcon[i].pseudoStyle('after', 'transform', 'rotateZ(120deg)');
    } else if (position === '-') {
      arrowIcon[i].pseudoStyle('before', 'transform', 'rotateZ(-60deg)');
      arrowIcon[i].pseudoStyle('after', 'transform', 'rotateZ(60deg)');   
    }
  }
};

for (i = 0; i < acc.length; i += 1) {
  acc[i].addEventListener('click', function() {
    this.classList.toggle('active');

    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      transformIcon('-');
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
      transformIcon('+');
    }
  });
}

// refresh the news
refreshBtn.addEventListener('click', () => {
  request.open('GET', requestUrl);
  request.send();
});

// get new page
const getNewPage = (e) => {
  if (e === 'plus') {
    pageNum.value++;
  } else if (e === 'minus') {
    pageNum.value -= 1;
  } else {
    pageNum.value += parseInt(e, 16);
  }
  let newPage = requestUrl.slice(0, -1);
  newPage += pageNum.value;
  request.open('GET', newPage);
  request.send();
};

btnPrev.onclick = () => {
  if (pageNum.value <= 1) return;
  getNewPage('minus');
};

btnNext.onclick = () => {
  if (pageNum.value > request.response.response.pages) return;
  getNewPage('plus');
};

// count and edit pages
countForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let newPage = requestUrl.slice(0, -1);
  newPage += pageNum.value;
  request.open('GET', newPage);
  request.send();
}, false);
