export const CAShortner = (address, startLength = 6, endLength = 4) => {
    if (!address) return '';

    const start = address.substring(0, startLength);
    const end = address.substring(address.length - endLength);

    return `${start}...${end}`;
};