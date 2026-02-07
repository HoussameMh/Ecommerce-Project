const { UnauthorizedError } = require('../errors');

const authorizePermissions = (req, res, next) => {
  if (!req.user.isAdmin) {
    throw new UnauthorizedError(`Not authorized to access this route because you are not an Admin `);
  }
  next();
};

module.exports = { authorizePermissions };