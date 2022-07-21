const jsonwebtoken = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const privateKey = fs.readFileSync(path.join(__dirname + '/private.key'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname + '/public.key'), 'utf8');

// NOTE: Get JWT Token NEW
const getToken = (cookie) => {
  let cookieArray = cookie.split(';');
  let match = cookieArray.find((str) => /token=/.test(str));
  let replace = match.replace(/\s/g, '');
  let token = replace.substring(6, `${match.length}`);
  return token;
};

module.exports = {
  sign: (payload, expiration) => {
    return jsonwebtoken.sign({ data: payload, exp: Math.floor(Date.now() / 1000) + 60 * expiration }, privateKey, { algorithm: 'RS256' });
  },
  verify: async (req, res, next) => {
    // NOTE: Token
    const token = getToken(req.headers.cookie);
    if (!token) return res.json({ error: '403', auth: false, message: 'No token provided.' });
    // jwt verify 
    jsonwebtoken.verify(token, publicKey, { algorithms: ['RS256'] }, function (err, decoded) {
      if (err) {
        if (err.name == 'TokenExpiredError') {
          return res.json({ error: '401', auth: false, message: 'Token expired.' });
        } else {
          return res.json({ error: '500', auth: false, message: err });
        }
      }
      // NOTE: if everything good, save to request for use in other routes
      req.auth = decoded.data.auth,
      req.id = decoded.data.id;
      req.level = decoded.data.level;
      // req.username = decoded.data.username;
      // req.name = decoded.data.name;
     
      next();
    });
  },
  verifyResetPassword: async (req, res, next) => {
    // token
    const token = req.params.token;
    if (!token) return res.json({ error: '403',  message: 'No token provided.' });
    // jwt verify 
    jsonwebtoken.verify(token, publicKey, { algorithms: ['RS256'] }, function (err, decoded) {
      if (err) {
        if (err.name == 'TokenExpiredError') {
          return res.json({ error: '401', message: 'ลิ้งก์หมดอายุหรือไม่สามารถใช้งานได้' });
        } else {
          return res.json({ error: '500', message: 'ลิ้งก์หมดอายุหรือไม่สามารถใช้งานได้' });
        }
      }
      // NOTE: if everything good, save to request for use in other routes
      req.action = decoded.data.action;
      req.id = decoded.data.id;
      req.type = decoded.data.type;
      next();
    });
  },
};
