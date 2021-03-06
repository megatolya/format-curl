export function isObject(v) {
    return typeof v === 'object' && v !== null;
}

export function isString(v) {
    return typeof v === 'string';
}

export function isUndefined(v) {
    return v === undefined;
}
