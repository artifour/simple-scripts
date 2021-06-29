// ==UserScript==
// @name     Simple Scripts: JSON Extended
// @version  1
// @description Extends JSON fields on forms.
//
// @include  *://*.simpleone.ru/*
// @include  *://localhost:3000/*
//
// @require  https://raw.githubusercontent.com/jackmoore/autosize/master/dist/autosize.min.js
// ==/UserScript==

function prettifyJSON(value) {
  	const safeValue = value.replace(/([:,[][\s\t]*)(\d{16,})/gm, '$1"__int8__$2"');
  	const prettyJSON = JSON.stringify(JSON.parse(safeValue), null, 2);

  	return prettyJSON.replace(/"__int8__(\d{16,})"/gm, '$1');
}

function createExtendedStyles() {
    const styles = document.createElement('style');
    styles.appendChild(document.createTextNode(
'.json-extended{overflow-y:hidden;width:100%;padding:5px 8px 7px;line-height:20px;resize:none;font-size:14px;color:#2E3238;border:1px solid #D5D8DD;border-radius:4px;min-height:50px}' + 
'.json-extended:hover{background-color:#F0F2F4}.json-extended:focus{background-color:#FFFFFF;border-color:#83B5FC;box-shadow:inset 0 0 1px 1px #83B5FC}'
    ));
    document.getElementsByTagName('head')[0].appendChild(styles);
}

function fireInputEvent(element) {
		const inputEvent = document.createEvent('Event');
    inputEvent.initEvent('input', true, true);
    element.dispatchEvent(inputEvent);
}

function extendJSONFields(form) {
    const jsonFields = form.querySelectorAll('[data-test-field-type*=json]');

    if (!jsonFields.length) {
        return;
    }

		createExtendedStyles();

    jsonFields.forEach((jsonField) => {
        const jsonContainer = document.createElement('div');
        const jsonTextarea = document.createElement('textarea');

        jsonTextarea.classList.add('json-extended');
        jsonTextarea.value = prettifyJSON(jsonField.value);
        jsonTextarea.addEventListener('input', (event) => {
            jsonField.value = event.target.value;
            fireInputEvent(jsonField);
        });

        jsonContainer.appendChild(jsonTextarea);
        jsonField.parentElement.parentElement.appendChild(jsonContainer);

        const jsonFieldInputObserver = new MutationObserver((mutations) => {
            for(const mutation of mutations) {
                jsonTextarea.value = prettifyJSON(mutation.target.value);
            }
        });
        jsonFieldInputObserver.observe(jsonField, { attributeFilter: ['value'] });

        jsonField.style.display = 'none';

        autosize(jsonTextarea);
    });
}

const documentObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        for (const element of mutation.addedNodes) {
            extendJSONFields(element);
        }
    }
});
documentObserver.observe(document.body, { childList: true, subtree: true });
