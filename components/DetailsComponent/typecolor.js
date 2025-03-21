export const TypeColor = (typeInput = []) => {
    const colorCodes = {
        normal: "#DDCBD0",
        fighting: "#FCC1B0",
        flying: "#B2D2E8",
        poison: "#CFB7ED",
        ground: "#F4D1A6",
        rock: "#C5AEA8",
        bug: "#C1E0C8",
        ghost: "#D7C2D7",
        steel: "#C2D4CE",
        fire: "#EDC2C4",
        water: "#CBD5ED",
        grass: "#C0D4C8",
        electric: "#E2E2A0",
        psychic: "#DDC0CF",
        ice: "#C7D7DF",
        dragon: "#CADCDF",
        dark: "#C6C5E3",
        fairy: "#E4C0CF",
        unknown: "#C0DFDD",
        shadow: "#CACACA",
    };
    if (Array.isArray(typeInput)) {
        let colorArray = typeInput?.map((types) => colorCodes[types]);
        return colorArray.join(",");
    } else {
        return colorCodes[typeInput];
    }
};