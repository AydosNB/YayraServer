export const categoryDTO = (categoryData) => {
    return {
        id: categoryData._id,
        name: categoryData.name,
        description: categoryData.description,
        image: categoryData.image
    }
}