export const productDTO = (productData) => {
    return {
        id: productData._id,
        name: productData.name,
        description: productData.description,
        image: productData.image,
        price: productData.price,
        countIn : productData.countIn,
        categoryId: productData.categoryId
    }
}