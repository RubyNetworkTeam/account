module.exports = (req, res, next) => {
    res.setHeader("Content-Type", "text/xml")
    next()
}