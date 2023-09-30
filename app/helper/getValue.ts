export function extractNumber(tableText: string) {
    const match = tableText.match(/\d+/);
    
    if (match) {
        return match[0];
    } else {
        return null;
    }
}