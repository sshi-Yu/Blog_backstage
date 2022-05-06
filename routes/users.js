var express = require('express');
var router = express.Router();
const {
  user_login,
  user_refresh,
  get_userInfo
} = require('../controller/usersCtrl')

/* user login */
router.post('/login', async (req, res, next) => {
  const {
    userAccount,
    userPassword
  } = req.body
  const loginRes = await user_login(userAccount, userPassword)
  res.json(loginRes)
});

/* user refresh */
router.post('/refresh', async (req, res, next) => {
  res.json(await user_refresh(req))
})

/* get userInfo  */
router.get('/writerInfo', async (req, res) => {
  res.json(await get_userInfo(req.query))
})

module.exports = router;