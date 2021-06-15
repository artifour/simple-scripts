window.addEventListener('keyup', (e) => {
	if (e.altKey && e.shiftKey && (e.keyCode == 83)){
		const saveButton = document.querySelector('[data-test="form_button__save-ui-button"]');
		if (saveButton) {
			saveButton.click();
		}
	}
}, false);
