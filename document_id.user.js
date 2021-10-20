// ==UserScript==
// @name     Simple Scripts: DocumentID Helper
// @version  1
// @description Use the function `docId(tableId, recordId)` to generate a document ID value.
//
// @include  *://*.simpleone.ru/*
// @include  *://localhost:3000/*
// ==/UserScript==

function docId(tableId, recordId) {
    const id2hex = (id) => {
        const dec = id.toString().split('');
        const sum = [];

        while (dec.length) {
            let s = 1 * dec.shift();

            for (let i = 0; s || i < sum.length; i++) {
                s += (sum[i] || 0) * 10;
                sum[i] = s % 16;
                s = (s - sum[i]) / 16;
            }
        }

        const hex = [];
        while (sum.length) {
            hex.push(sum.pop().toString(16));
        }

        return hex.join('').padStart(16, '0');
    }

    return id2hex(tableId) + id2hex(recordId);
}

const scriptElement = document.createElement('script');
const textNode = document.createTextNode(docId);
scriptElement.appendChild(textNode);
(document.body || document.head || document.documentElement).appendChild(scriptElement);
