const auth = (req, res, next) => {
    const {user} = req.session

    if(!user){
        return res.status(401).send({status:"fail"})
    }

    req.user = user
    next()
}

module.exports = auth