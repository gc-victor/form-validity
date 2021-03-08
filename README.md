# Form validity

It is a tiny wrapper over the native validation to create your validation libraries.

## Installation

You can use npm or yarn to install it.

```console
npm install git+https://github.com/gc-victor/form-validity.git#master
```

Import it in your application.

```js
import { fieldValidation, formValidation } from 'form-validity';
```

Or import it in a `<script>` as a module.

```html
<script type="module">
    import { fieldValidation, formValidation } from 'https://cdn.jsdelivr.net/gh/gc-victor/form-validity/form-validity.js';
</script>
```

## API

It has a simple API, only two methods:

- **fieldValidation**: It validates a form field element
- **formValidation**: It validates each field from a form element

## Error state

It returns a native validity state object

```javascript
{
    "valueMissing": false,
    "typeMismatch": false,
    "patternMismatch": false,
    "tooLong": false,
    "tooShort": false,
    "rangeUnderflow": false,
    "rangeOverflow": false,
    "stepMismatch": false,
    "badInput": false,
    "customError": false,
    "valid": true
}
```

https://developer.mozilla.org/en-US/docs/Web/API/ValidityState

## Example

```javascript
import { fieldValidation, formValidation } from './form-validity.js';

const form = document.getElementById('form');

/** On Submit */
form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    log({
        name: ev.target.name,
        event: ev.type,
        errors: formValidation(ev.target),
        message: ev.target.validationMessage,
    });
}, true);

/** On Input */
form.addEventListener('input', (ev) => {
    const target = ev.target;

    target.dataset.validation && log({
        name: target.name,
        event: ev.type,
        errors: fieldValidation(target, true),
        message: target.validationMessage
    });
}, true);

/** On Blur */
['customError', 'rangeUnderflow', 'rangeOverflow'].map(name => {
    const el = document.getElementsByName(name)[0];

    el.addEventListener('blur', (ev) => {
        const target = ev.target;

        target.name === 'customError' && target.setCustomValidity('Custom validation :)');

        log({
            name: target.name,
            event: ev.type,
            errors: fieldValidation(target, true),
            message: target.validationMessage
        });
    }, true);
});

function log(body) {
    const logs = document.getElementById('logs');
    const str = JSON.stringify(body, null, '   ');

    logs.textContent = str;

    console.log(str);
}
```