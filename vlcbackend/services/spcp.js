const fs = require('fs')
const SPCPAuthClient = require('@opengovsg/spcp-auth-client')

const client = new SPCPAuthClient({
  partnerEntityId: '12345678A',
  idpLoginURL: 'http://localhost:5156/singpass/logininitial',
  idpEndpoint: 'http://localhost:5156/singpass/soap',
  esrvcID: 'MYESERVICEID',
  appCert: fs.readFileSync('./certs/server.crt'),
  appKey: fs.readFileSync('./certs/key.pem'),
  spcpCert: fs.readFileSync('./certs/spcp.crt'),
  extract: SPCPAuthClient.extract.SINGPASS,
})

module.exports = client;