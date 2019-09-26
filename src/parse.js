export function parse(string) {
    return string
        .replace(new RegExp('\\[', 'g'), '[,')
        .replace(new RegExp('\\]', 'g'), ',]')
        .split(',')
        .filter((symbol) => symbol.trim())
        .map((symbol) => {
            const trimmedSymbol = symbol.trim();

            if (trimmedSymbol === '[' || trimmedSymbol === ']') {
                return trimmedSymbol;
            }

            if (
                trimmedSymbol.length
                && trimmedSymbol[0] === '"'
                && trimmedSymbol[trimmedSymbol.length-1] === '"'
            ) {
                return trimmedSymbol.slice(1, trimmedSymbol.length-1);
            }
        });
}
