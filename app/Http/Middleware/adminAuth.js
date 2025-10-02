function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === "Admin") {
    return next();
  }
  return res.status(403).send("Accès refusé - Administrateur requis");
}

module.exports = { isAdmin };
