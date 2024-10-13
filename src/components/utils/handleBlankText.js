export function handleBlankText(text) {
    return text !== undefined && text !== null && text.length !== 0 ? text : "N/A";
}
