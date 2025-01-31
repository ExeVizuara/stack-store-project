export const calculateInGrams = (quantityInserted: number, productPrice: number) => {
    const quantityInHundredGrams = quantityInserted / 100; // Convertir gramos a unidades de 100 gramos
    const totalPrice = productPrice * quantityInHundredGrams;
    return totalPrice;
}