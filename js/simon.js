var KEYS = ['c', 'd', 'e', 'f'];
var NOTE_DURATION = 1000;

// NoteBox
//
// Acts as an interface to the coloured note boxes on the page, exposing methods
// for playing audio, handling clicks,and enabling/disabling the note box.
function NoteBox(key, onClick) {
	// Create references to box element and audio element.
	var boxEl = document.getElementById(key);
	var audioEl = document.getElementById(key + '-audio');
	if (!boxEl) throw new Error('No NoteBox element with id' + key);
	if (!audioEl) throw new Error('No audio element with id' + key + '-audio');

	// When enabled, will call this.play() and this.onClick() when clicked.
	// Otherwise, clicking has no effect.
	var enabled = true;
	// Counter of how many play calls have been made without completing.
	// Ensures that consequent plays won't prematurely remove the active class.
	var playing = 0;

	this.key = key;
	this.onClick = onClick || function () {};

	// Plays the audio associated with this NoteBox
	this.play = function () {
		playing++;
		// Always play from the beginning of the file.
		audioEl.currentTime = 0;
		audioEl.play();

		// Set active class for NOTE_DURATION time
		boxEl.classList.add('active');
		setTimeout(function () {
			playing--
			if (!playing) {
				boxEl.classList.remove('active');
			}
		}, NOTE_DURATION)
	}

	// Enable this NoteBox
	this.enable = function () {
		enabled = true;
	}

	// Disable this NoteBox
	this.disable = function () {
		enabled = false;
	}

	// Call this NoteBox's clickHandler and play the note.
	this.clickHandler = function () {
		if (!enabled) return;
		
		this.onClick(this.key)
		this.play()

		if( this.key == queue[0] ) {
			queue_remove();
			//console.log(queue.length)
			if(queue.length == 0){
				setTimeout(level_add,2000);
				console.log("next level!")
			}
		}
		else{
			//lose
			array.length = 0;
			console.log("game over")
			setTimeout(level_add,3000);
		}
			

	}.bind(this)

	boxEl.addEventListener('mousedown', this.clickHandler);
}

// Example usage of NoteBox.
//
// This will create a map from key strings (i.e. 'c') to NoteBox objects so that
// clicking the corresponding boxes on the page will play the NoteBox's audio.
// It will also demonstrate programmatically playing notes by calling play directly.
var notes = {};

KEYS.forEach(function (key) {
	notes[key] = new NoteBox(key);
});


// KEYS.concat(KEYS.slice().reverse()).forEach(function(key, i) {
// 	setTimeout(notes[key].play.bind(null, key), i * NOTE_DURATION);
// });


var array = [];//used to track level
var queue = [];//track clicks
var reset = false;

//push a random key to the array
function array_push() {
	var random = KEYS[Math.floor(Math.random() * KEYS.length)];
	array.push(random);
	console.log("random key:", array[0])
	//console.log(array[0])
}

//remove stuff from array
function queue_remove() {
	console.log("array:", array)
	console.log("queue:", queue)
	queue.shift();
	console.log("array:", array)
	console.log("queue:", queue)
}

//add to array and then reset queue
function level_add()	{
	//console.log("add a key")
	//do {
		array_push();
		queue = array.slice();
		console.log(queue)

		queue.forEach(function(key,i) {
			setTimeout(notes[key].play.bind(null, key), i * NOTE_DURATION);
		});
	//}while(reset);
}

level_add();
