const os = require('os');
const fs = require('fs');
const path = require('path');

// getLocalIP.js

const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (let iface in interfaces) {
    for (let alias of interfaces[iface]) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return null;
};

const localIP = getLocalIP();
if (localIP) {
  const rootPath = path.join(__dirname, '../..');
  const envPath = path.join(rootPath, '.env');
  //fs.writeFileSync(envPath, `REACT_APP_LOCAL_IP=${localIP}\n`);
  console.log(`Local IP address saved to ${envPath}`);
} else {
  console.error('Unable to find local IP address.');
}
