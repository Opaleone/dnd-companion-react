const db = require('../config/connection');
const { User, Character } = require('../models');
const userSeeds = require('./userSeeds.json');
const characterSeeds = require('./characterSeeds.json');


db.once('open', async () => {
  try {
    await Character.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);
    await Character.create(characterSeeds);
    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
