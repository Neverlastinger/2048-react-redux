/**
 * Enables swipe events for the given element.
 *
 * @param el: DOM element
 * @param callbacks: called when the specific swipe is fired
 * 			- onLeft
 * 			- onRight
 * 			- onUp
 * 			- onDown
 */
const Swipe = (el, { onLeft, onRight, onUp, onDown }) => {

	var xDown = null;
	var yDown = null;

	const handleTouchStart = (evt) => {
		xDown = evt.touches[0].clientX;
		yDown = evt.touches[0].clientY;
	};

	const handleTouchMove = (evt) => {

	    if (!xDown || !yDown) {
	        return;
	    }

	    var xUp = evt.touches[0].clientX;
	    var yUp = evt.touches[0].clientY;

	    var xDiff = xDown - xUp;
	    var yDiff = yDown - yUp;

	    if (Math.abs(xDiff) > Math.abs(yDiff) ) {
			xDiff > 0 ? onLeft() : onRight();
	    } else {
			yDiff > 0 ? onUp() : onDown();
	    }

	    xDown = null;
	    yDown = null;
	};

	el.addEventListener('touchstart', handleTouchStart);
	el.addEventListener('touchmove', handleTouchMove);

};

export default Swipe;
