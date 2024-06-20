const router = require("express").Router();

router.get("*", (req, res) => {
  res.json({
    message: "Route does not exist",
  });
});

router.post("*", (req, res) => {
  res.json({
    message: "Route does not exist",
  });
});

router.put("*", (req, res) => {
  res.json({
    message: "Route does not exist",
  });
});

router.delete("*", (req, res) => {
  res.json({
    message: "Route does not exist",
  });
});

module.exports = router;
