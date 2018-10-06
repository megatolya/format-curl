function stringify(value) {
    switch (typeof value) {
    case 'boolean':
        return value ? 'true' : 'false';
    case 'number':
        return isFinite(value) ? value : '';
    case 'string':
        return value;
    }
}

export default function encode(query) {
    return Object.keys(query)
        .map(key => {
            const keyString = `${encodeURIComponent(key)}=`;

            if (Array.isArray(query[key])) {
                return query[key].map(value => `${keyString}${encodeURIComponent(stringify(value))}`).join('&');
            }
            return `${keyString}${encodeURIComponent(stringify(query[key]))}`;
        })
        .join('&');
}
