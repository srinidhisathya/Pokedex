export const getPokemonId = (id) => {
    return id < 10 ? `00${id}` : id < 100 ? `0${id}` : `${id}`;
};

export const Scroll = (property) => {
    document.body.style.overflow = property;
};
