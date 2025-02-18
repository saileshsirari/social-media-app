const router = require("express").Router()

router.get("/api/user/data", (req, res) => {
  res.send(`this is /api/user/data`)
})

router.get("/api/data", (req, res) => {
  res.send(`this is /api/data`)
})

router.get("/api/api", (req, res) => {
  res.send(`here is /api/api`)
})

router.get("/api", (req, res) => {
  res.send(`here is /api`)
})

router.get("/data", (req, res) => {
  res.send(`here is /data`)
})

router.get("/", (req, res) => {
  res.send(`here is /`)
})

module.exports = router