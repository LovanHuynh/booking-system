import jwt from 'jsonwebtoken'

const authAdmin = (req, res, next) => {
    try {
        const { atoken } = req.headers;
        if (!atoken) {
            res.json({
                success: false,
                message: "Not auth Login again"
            })
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SERECT)
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            res.json({
                success: false,
                message: "Not auth Login again"
            })
        }
        next()
    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error
        })
    }
}
export default authAdmin