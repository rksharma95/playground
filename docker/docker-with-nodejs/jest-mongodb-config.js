module.exports = {
    mongodbMemoryServerOptions: {
      instance: {
        dbName: 'jest'
      },
      binary: {
        version: '5.0.6', // Version of MongoDB
        skipMD5: true
      },
      autoStart: false
    }
  };