export const searchName = (products, search) => {
    try {
        console.log(products);
        if (!Array.isArray(products)) {
            console.error('products no es un arreglo válido.');
            return [];
        }

        if (!search) return []; // Si no hay término de búsqueda, retorna vacío
        const results = products.filter((product) => product.dataValues.name.toLowerCase().includes(search.toLowerCase()));
        console.log();
        return results;
    } catch (error) {
        console.error('Error en searchName:', error);
        return [];
    }
}