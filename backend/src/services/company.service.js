const router = require('express').Router();

router.get("/", async (req, res) => {
  res.send("<h1>Junda</h1>");
});

module.exports = router;
