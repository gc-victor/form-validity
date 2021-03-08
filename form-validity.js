/**
 * @see: https://developer.mozilla.org/es/docs/Web/API/Constraint_validation
 * @see: https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
 * @see: https://quirksmode.org/dom/forms/index.html
 */
export function fieldValidation(element) {
    return validityState(element.validity);
}

export function formValidation(form) {
    const elements = form.elements;
    const errors = {};

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const name = element.name;

        errors[name] = validityState(element.validity);
    }

    return errors;
}

function validityState(validity) {
    const state = {};

    for (let key in validity) {
        state[key] = validity[key];
    }

    return state;
}
