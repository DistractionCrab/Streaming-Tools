const INACTIVE = 'bingo-inactive';
const ACTIVE = 'bingo-active';

class Select {
	constructor(items) {
		this.items = items;
	}

	count() {
		return this.items.length;
	}

	select() {
		var index = Math.random() * this.items.length;
		return this.items[Math.floor(index)];
	}
}

class SelectOne extends Select {
	count() {
		return 1;
	}
}

class SelectN extends Select {
	constructor(n, items) {
		super(items);
		this.n = n;
	}
	count() {
		return this.n;
	}
}

class Range {
	constructor(min, max) {
		this.min = min;
		this.max = max;
	}

	count() {
		return 1;
	}

	select() {
		var value = Math.random();
		value = this.min + value * (this.max - this.min + 1);
		return Math.floor(value);
	}
}

function S(items) { return new Select(items); }
function O(items) { return new SelectOne(items); }
function N(n, items) { return new SelectN(n, items); }
function R(min, max) { return new Range(min, max); }

class Option {
	constructor(desc) {
		this.desc = desc;
		this.options = [...arguments].slice(1);
	}

	count() {
		if (this.options.length > 0) {
			var m = 1;
			for (var k = 0; k < this.options.length; ++k) {
				m *= this.options[k].count();
			}
			return m;
		} else {
			return 1;
		}
	}

	select() {
		if (this.options.length > 0) {
			var str = this.desc;
			for (var i = 0; i < this.options.length; ++i) {
				str = str.replace(`{${i}}`, this.options[i].select());
			}

			return str;
		} else {
			return this.desc;
		}
	}
}

function randInt(i) {
	return Math.floor(Math.random() * i);
}

class CellState {
	constructor() {
		this.state = 0;
		this.max_state = 3;
		this.colors = [
			'black',
			'green',
			'red'
		];
	}

	increment() {
		this.state = (this.state + 1) % this.max_state;
	}

	get_color() {
		return this.colors[this.state];
	}
}

class Bingo {
	constructor(options) {
		this.options = options;
		this.add_listeners();
	}

	generate() {
		var choices = [];
		var counts  = new Array(OPTIONS.length).fill(0);
		const table = document.getElementById('bingo-table');

		for (var i = 0; i < 5; ++i) {
			const row = table.rows[i];
			for (var k = 0; k < 5; ++k) {
				var filled = false;
				const col = row.cells[k];
				while (!filled) {
					const c = randInt(OPTIONS.length);
					if (counts[c] < OPTIONS[c].count()) {
						var opt = OPTIONS[c].select();
						if (!choices.includes(opt)) {
							counts[c] += 1;
							choices.push(opt);
							col.innerHTML = opt;
							filled = true;
						}
					}
				}
			}
		}
	}

	add_listeners() {
		const table = document.getElementById('bingo-table');

		for (var i = 0; i < 5; ++i) {
			const row = table.rows[i];
			for (var k = 0; k < 5; ++k) {
				const col = row.cells[k];
				let state = new CellState();
				col.onclick = function(event) {
					const elem = event.target;
					state.increment();
					elem.style.backgroundColor = state.get_color();
				};
			}
		}	
	}
}

