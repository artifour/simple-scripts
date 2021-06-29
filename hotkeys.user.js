// ==UserScript==
// @name     Simple Scripts: Form Save HotKey
// @version  1
// @description Press ALT + SHIFT + S to save a form.
//
// @include *://*.simpleone.ru/record/*
// @include *://localhost:3000/record/*
// ==/UserScript==

window.addEventListener('keyup', (e) => {
    if (e.altKey && e.shiftKey && (e.keyCode == 83)) {
        const saveButton = document.querySelector('[data-test="form_button__save-ui-button"]');
        if (saveButton) {
            saveButton.click();
        }
    }
}, false);
