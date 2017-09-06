var KEYS = ['c', 'd', 'e', 'f'];
//var start_key = ['s'];
//var simon_game_h = false

var NOTE_DURATION = 300;
var DELAY = 2500;
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

		//push things to an array
		//if(!simon_game_h){
			queue.push(key);
			console.log(queue);

			// https://stackoverflow.com/questions/1472705/resetting-a-settimeout
			clearTimeout(timeout_ref)
			console.log(timeout_ref)
			timeout_ref = setTimeout(function () {
				queue.forEach(function(key, i) {
					setTimeout(notes[key].play.bind(null, key), i * DELAY);
				});
				
				//destroy array
				queue.length = 0;
				console.log("delete")
			}, 2500);
		//}
	}.bind(this)

	boxEl.addEventListener('mousedown', this.clickHandler);
}

// Example usage of NoteBox.
//
// This will create a map from key strings (i.e. 'c') to NoteBox objects so that
// clicking the corresponding boxes on the page will play the NoteBox's audio.
// It will also demonstrate programmatically playing notes by calling play directly.
var notes = {};
//array keeps track of keys
var queue = [];
var timeout_ref;

KEYS.forEach(function (key) {
	notes[key] = new NoteBox(key);
});

KEYS.concat(KEYS.slice().reverse()).forEach(function(key, i) {
	setTimeout(notes[key].play.bind(null, key), i * NOTE_DURATION/4);
});

//var queue_simon = [];

