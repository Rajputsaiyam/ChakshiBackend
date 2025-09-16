const crypto = require('crypto');

/**
 * Hash data with salt
 * @param {string} data 
 * @param {string} salt 
 * @param {string} algorithm 
 * @returns {string}
 */
function hash(data, salt, algorithm = 'sha256') {
  if (!salt) throw new Error("Salt is required for hashing");
  return crypto.createHmac(algorithm, salt).update(data).digest('hex');
}

module.exports = hash;
