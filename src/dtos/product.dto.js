export const productDTO = (productData) => {
    return {
        id: productData._id,
        name: productData.name,
        description: productData.description,
        image: productData.image,
        price: productData.price,
        rate : productData.rate,
        categoryId: productData.categoryId
    }
}