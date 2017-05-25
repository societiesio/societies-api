process.env.NODE_ENV = 'test'

require('dotenv').config({ silent: true })
global.expect = require('chai').expect
