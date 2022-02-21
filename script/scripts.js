'use strict';

// Currently shown hotspot.
let idxHotspot = -1;
// let idxVideo = 0;

// Set up our hotspots.
let arrHotspots = [
	{ "startTime": 1, "endTime": 5, "top": 100, "left": 700, "text": "Asia" },
	{ "startTime": 6, "endTime": 8, "top": 200, "left": 800, "text": "HOME" },
	{ "startTime": 9, "endTime": 11, "top": 300, "left": 900, "text": "Africa" },
	{ "startTime": 15, "endTime": 17, "top": 100, "left": 600, "text": "North America" },
	{ "startTime": 18, "endTime": 23, "top": 100, "left": 550, "text": "Pacific" },
	{ "startTime": 25, "endTime": 29, "top": 450, "left": 600, "text": "NEXT ->" }
];

function init() {

	let video = $('#sampleVideo')[0];
	let $hotspot = $('#hotspot');
	let $caption = $('#caption');
	let vidHeight = 0;
	let vidWidth = 0;

	// Add the mouse events for the hotspot
	$hotspot.bind('mouseover', function (event) {
		video.pause();
	});

	$hotspot.bind('mouseout', function () {
		video.play();
	});

	// $hotspot.bind()
	$hotspot.bind('click', function () {
		// idxVideo = 1 - idxVideo;
		// $('#sampleVideo')[idxVideo].load();
		$('#sampleVideo').attr("src", "./video/revolving_mars.mp4");
	});

	// Determine when to show a hotspot.
	video.addEventListener('timeupdate', function () {

		if ($('#sampleVideo').attr("src") == "./video/revolving_mars.mp4") {
			$hotspot.hide();
			$caption.hide();
			return;
		}

		// Grab the current video pointer time mark.
		let vidCurrentTime = video.currentTime;

		// Set flag if we need to show a new hotspot.
		let idxNewHotspot = -1;

		// Find if need to show a hostpot. Assumes only one hotspot at a time.
		for (let i = 0; i < arrHotspots.length; i++) {
			if (vidCurrentTime >= arrHotspots[i].startTime && vidCurrentTime < arrHotspots[i].endTime) {
				idxNewHotspot = i;
			}
		}

		// Set up hotspot or remove a currently displayed one.
		if (idxNewHotspot > -1) {
			if (idxNewHotspot != idxHotspot) {
				console.log(vidHeight, vidWidth)
				// Position and size hotspot.
				$hotspot.css({
					left: arrHotspots[idxNewHotspot].left + 'px',
					top: arrHotspots[idxNewHotspot].top + 'px'
				}).show();

				// Position and size Caption.
				$caption.html(arrHotspots[idxNewHotspot].text);
				$caption.css({
					left: (arrHotspots[idxNewHotspot].left + 20) + "px",
					top: (arrHotspots[idxNewHotspot].top - 75) + "px"
				}).show();

				// Set the current hotspot shown.
				idxHotspot = idxNewHotspot;
			}
		} else {
			// Hide the current hotspot
			$hotspot.hide();
			$caption.hide();
		}
	}, false);
}