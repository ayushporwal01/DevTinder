const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAuthorizedAdmin = token === "xyz";

  if (!isAuthorizedAdmin) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "xyz";
  const isAuthorizedAdmin = token === "xyz";

  if (!isAuthorizedAdmin) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
