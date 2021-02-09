const FADE_IN_TIME = 1000;
const HANG_TIME = 5000;
const FADE_OUT_TIME = 2000;
const INTERVAL_TIME = 60000;



class Social {
	constructor() {
		this.tabs = document.getElementsByClassName('tabcontent');
		this.index = 0;

		var s1 = `.fade-in { 
			animation: fadeIn ease ${FADE_IN_TIME/1000}s;
			-webkit-animation: fadeIn ease ${FADE_IN_TIME/1000}s;
		}`;

		var s2 = `.fade-out { 
			animation: fadeOut ease ${(FADE_OUT_TIME/1000).toFixed(0)}s;
			-webkit-animation: fadeOut ease ${(FADE_OUT_TIME/1000).toFixed(0)}s;
		}`;

		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = s1 + "\n" + s2;
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	increment() {
		this.index = (this.index + 1) % this.tabs.length;
	}

	fadeIn() {
		var social = this.tabs[this.index];

		for (var i = 0; i < this.tabs.length; i++) {
			this.tabs[i].style.display = "none";

		}

		social.style.display = "block";
		social.className += " fade-in";
		console.log(social.className);
	}

	hide() {
		this.current().style.display = "none";
		this.current().className = "tabcontent"
	}

	fadeOut() {
		var social = this.tabs[this.index];
		social.className = social.className.replace(" fade-in", "");
		social.className += " fade-out";
		console.log(social.className);
	}

	current() {
		return this.tabs[this.index];
	}

	start() {
		var thisobj = this;
		var f = function() {
			thisobj.fadeIn();
		};
		var g = function() {
			thisobj.fadeOut();
		};

		var h = function() {
			thisobj.hide();
			thisobj.increment();
		};

		var restart = function() {
			thisobj.start();
		}

		setTimeout(f, 0);
		setTimeout(g, FADE_IN_TIME + HANG_TIME);
		// - 100 ms to avoid that pop into view the fade-out does.
		setTimeout(h, FADE_OUT_TIME + FADE_IN_TIME + HANG_TIME - 100);
		setTimeout(
			restart,
			FADE_OUT_TIME + FADE_IN_TIME + HANG_TIME + INTERVAL_TIME)
	}
}

function main() {
	(new Social()).start();
}

document.addEventListener('DOMContentLoaded', main, false);