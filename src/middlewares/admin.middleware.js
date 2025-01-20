export const adminMiddleware = (req, res, next) => {
    try {
        if(req.role === "admin") {
            next()
        }else {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }
    } catch(error) {
        return res.status(500).json({ message: error });
    }
}