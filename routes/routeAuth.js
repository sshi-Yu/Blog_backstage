/* route auth */
const router = require('express').Router()
const {
    updateRoutes
} = require('../controller/routeCtrl')

router.post('/updateRoutes',async (req, res, next) => {
    const updateRes = await updateRoutes(req.body)
    res.json(updateRes)
})

module.exports = router