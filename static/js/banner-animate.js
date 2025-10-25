
// Simple typewriter animation for the homepage banner
// Requires: #banner-animated-text span#typewriter

document.addEventListener('DOMContentLoaded', function() {
	var el = document.getElementById('typewriter');
	if (!el) return;
	var text = el.getAttribute('data-text');
	var i = 0;
	function type() {
		if (i <= text.length) {
			el.textContent = text.substring(0, i);
			i++;
			setTimeout(type, 60);
		}
	}
	type();
});
