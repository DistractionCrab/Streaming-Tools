icons = document.getElementsByClassName("icon");

function getImages(list) {
	var newlist = [];
	for (var i = 0; i < list.length; ++i) {
		console.log(list[i].tagName);
		if (list[i].tagName == 'IMG') {
			newlist.push(list[i])
		}
	}
	return newlist;
}

class Icon {
	constructor(icon) {
		var child = icon.childNodes;
		this.cell = icon;
		this.states = getImages(child);
		this.curState = 0;
		this.states.filter(node => node.tagName == 'img');


		this.states.forEach(function(item, index) {
			item.style.display = 'none';
		});
		this.states[0].style.display = 'block';
	}

	do_swap() {
		const current = this.states[this.curState];
		this.curState = (this.curState + 1) % (this.states.length)
		current.style.display = 'none';
		this.states[this.curState].style.display = 'block';
	}
}




for (let item of icons) {
	let icon = new Icon(item);

	item.onclick = function() { 
		icon.do_swap();
	}
}


