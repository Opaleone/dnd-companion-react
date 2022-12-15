const mongoose = require('mongoose');

const { Schema } = mongoose;

const characterSchema = new Schema({
  playerName: {
    type: String,
    required: true,
    trim: true
  },
  characterName: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  class: {
    type: String,
    required: true,
  },
  race: {
    type: String,
    required: true,
  },
  background: {
    type: String,
  },
  alignment: {
    type: String,
    required: true
  },
  exp: {
    type: Number,
    required: true
  },
  strength: {
    type: Number,
    required: true
  },
  dexterity: {
    type: Number,
    required: true
  },
  constitution: {
    type: Number,
    required: true
  },
  wisdom: {
    type: Number,
    required: true
  },
  intelligence: {
    type: Number,
    required: true
  },
  charisma: {
    type: Number,
    required: true,
  },
  inspiration: {
    type: Boolean,
    required: true
  },
  proficencyBonus: {
    type: Number,
  },
  savingThrows: {
    strength: {
      type: Boolean,
      required: true
    },
    dexterity: {
      type: Boolean,
      required: true
    },
    constitution: {
      type: Boolean,
      required: true
    },
    wisdom: {
      type: Boolean,
      required: true
    },
    intelligence: {
      type: Boolean,
      required: true
    },
    charisma: {
      type: Boolean,
      required: true
    }
  },
  skills: {
    acrobatics: {
      type: Boolean,
      required: true
    },
    animalHandling: {
      type: Boolean,
      required: true
    },
    arcana: {
      type: Boolean,
      required: true
    },
    athletics: {
      type: Boolean,
      required: true
    },
    deception: {
      type: Boolean,
      required: true
    },
    history: {
      type: Boolean,
      required: true
    },
    insight: {
      type: Boolean,
      required: true
    },
    intimidation: {
      type: Boolean,
      required: true
    },
    investigation: {
      type: Boolean,
      required: true
    },
    medicine: {
      type: Boolean,
      required: true
    },
    nature: {
      type: Boolean,
      required: true
    },
    perception: {
      type: Boolean,
      required: true
    },
    performance: {
      type: Boolean,
      required: true
    },
    persuasion: {
      type: Boolean,
      required: true
    },
    religion: {
      type: Boolean,
      required: true
    },
    slightOfHand: {
      type: Boolean,
      required: true
    },
    stealth: {
      type: Boolean,
      required: true
    },
    survival: {
      type: Boolean,
      required: true
    }
  },
  passivePerception: {
    type: Number,
    required: true
  },
  armorClass: {
    type: Number,
    required: true
  },
  initiative: {
    type: Number,
    required: true
  },
  speed: {
    type: Number,
    required: true
  },
  hitPoints: {
    max: {
      type: Number,
    },
    current: {
      type: Number,
    },
    temp: {
      type: Number,
    }
  },
  deathSaves: {
    successes: {
      type: Number,
      required: true
    },
    failures: {
      type: Number,
      required: true
    }
  },
  attacksAndSpells: { // we may have to change this
    name: {
      type: String,
    },
    attackBonus: {
      type: Number,
    },
    damage: {
      type: Number,
    },
    damangeType: {
      type: String,
    },
    range: {
      type: Number,
    },
    description: {
      type: String,
    }
  },
  equipment: { // how should we implement this?
    type: String,
  },
  personality: {
    type: String,
  },
  ideals: {
    type: String,
  },
  bonds: {
    type: String,
  },
  flaws: {
    type: String,
  },
  featuresAndTraits: {
    type: String,
  },
  proficienciesAndLanguages: {
    type: String,
  }
});

const Character = mongoose.model('character', characterSchema);

module.exports = Character;
