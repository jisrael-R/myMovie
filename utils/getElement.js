function get(el) {
    const element = document.querySelector(el);
    if (element) {
        return element;
    }
    throw new Error(`Sorry, ${el} does not exist`);
}

export default get;
