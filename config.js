module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB_URI || 'mongodb://lorena:12345@ds119064.mlab.com:19064/shop',
  SECRET_TOKEN: 'miclavedetokens'
}