export const userDTO = (userData) => {
    return {
        id: userData._id,
        userName: userData.userName,
        email: userData.email
    }
}