const API_KEY = 'a1c8a868-7843-408a-be09-d22963a6ffc9'
const requestUrl = 'https://content.guardianapis.com/search?&show-blocks=body&api-key=' + API_KEY;
const accWrapper = document.querySelector('.accordion-wrapper');
const refreshBtn = document.querySelector('.refresh');

const request = new XMLHttpRequest();
request.open("GET", requestUrl);
request.responseType = 'json';
request.send();

const refresh = function() {
	const title = request.response.response['results'];
	title.forEach( (n) => {
		display(n['webTitle'], n.blocks.body[0].bodyTextSummary, n.webUrl);
	});
};

request.onload = refresh;

refreshBtn.addEventListener('click', request);

const display = function(news, desc, url) {
	let obj = {};
	obj.title = document.createElement('button');
	obj.title.className = 'accordion';
	obj.title.textContent = news;

	const acc = document.querySelectorAll('.accordion');
	let i;
	console.log(acc.length);
	for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener('click', function() {
			this.classList.toggle('active');
			let panel = this.nextElementSibling;
			if (panel.style.maxHeight) {
				panel.style.maxHeight = null;
			} else {
				panel.style.maxHeight = panel.scrollHeight + 'px';
			}
		})
	}

	accWrapper.appendChild(obj.title);


	descWrapper = document.createElement('div');
	descWrapper.className = 'panel';

	obj.desc = document.createElement('p');

	obj.truncate = function( n, useWordBoundary ) {
    if (this.length <= n) { return this; }
    var subString = this.substr(0, n-1);
    return (useWordBoundary 
       ? subString.substr(0, subString.lastIndexOf(' ')) 
       : subString) + "...";
	};

	obj.desc.textContent = obj.truncate.apply(desc, [256, true]);


	obj.link = document.createElement('a');
	obj.link.textContent = 'Read full news';
	obj.link.setAttribute('href', url);
	obj.link.className = 'link';

	descWrapper.appendChild(obj.desc);
	descWrapper.appendChild(obj.link);
	accWrapper.appendChild(descWrapper);

	return obj;
}
