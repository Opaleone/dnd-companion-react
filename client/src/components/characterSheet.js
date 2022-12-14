export const CharacterSheet = () => {

  // const { response } = require("express")

const raceSelector = document.querySelector('#race-selector')
const formSubmit = document.querySelector('#submit-input')

const saveChar = document.querySelector('#save-input')

const apiUrl = 'https://www.dnd5eapi.co/api/'

async function updateCharacterSheet(event) {
  event.preventDefault()

  let raceName = document.querySelector('#race').value
  let className = document.querySelector('#class').value

  let raceData = await getRace(raceName)
  let classData = await getClass(className)

  console.log(raceData)
  console.log(classData)

  displayCharacterInfo(raceData, classData)
  // storeCharacter()
}

// API data retrieval

// async function storeCharacter() {
//   let newCharacter = await fetch('/api/characters')
  
// }

async function getRace(val) {
  let raceData = await fetch(apiUrl + `races/${val}`)
  const response = await raceData.json()

  return response
}

async function getClass(val) {
  let classData = await fetch(apiUrl + `classes/${val}`)
  const response = await classData.json()

  return response
}

// Gathers all infor and displays to page

function displayCharacterInfo(raceData, classData) {
  let statModArr = document.querySelectorAll('.statmod')
  let speedNum = document.querySelector("input[name='speed']");
  let hitDie = document.querySelector("input[name='remaininghd']")
  let hitPoints = document.querySelector("input[name='currenthp']")
  let initiative = document.querySelector("input[name='initiative']")
  let armorEl = document.querySelector("input[name='ac']")

  let defaultArmor = 10

  generateStats()

  generateExtras(raceData, classData)

  checkboxes(classData)

  speedNum.value = raceData.speed
  hitDie.value = classData.hit_die
  hitPoints.value = parseInt(statModArr[2].value) + parseInt(classData.hit_die)
  initiative.value = statModArr[1].value
  armorEl.value = defaultArmor + parseInt(statModArr[1].value)
}

// Functions to generate specific things on page

function generateStats() {
  let statArr = document.querySelectorAll('.stat')
  let statModArr = document.querySelectorAll('.statmod')
  let skillArr = document.querySelectorAll('.skill-num')
  let savingThrowsArr = document.querySelectorAll('.saving-throws')

  let basicStats = [15, 14, 13, 12, 10, 8]

  for (let i = 0; i < statArr.length; i++) {
    let randomNum = Math.floor(Math.random() * basicStats.length)

    statArr[i].value = basicStats[randomNum];

    switch (basicStats[randomNum]) {
      case 7:
      case 8:
        statModArr[i].value = "-1"
        savingThrowsArr[i].value = "-1"
        break;
      case 12:
      case 13:
        statModArr[i].value = "+1"
        savingThrowsArr[i].value = "+1"
        break;
      case 14:
      case 15:
        statModArr[i].value = "+2"
        savingThrowsArr[i].value = "+2"
        break;
      case 16:
      case 17:
        statModArr[i].value = "+3"
        savingThrowsArr[i].value = "+3"
        break;
      case 18:
      case 19:
        statModArr[i].value = "+4"
        savingThrowsArr[i].value = "+4"
        break;
      case 20:
        statModArr[i].value = "+5"
        savingThrowsArr[i].value = "+5"
        break;
      default:
        statModArr[i].value = 0
        break;
    }

    basicStats.splice(randomNum, 1)
  }

  for (let i = 0; i < skillArr.length; i++) {
    skillArr[i].value = modifierGenerate()
  }
}

function generateExtras(raceData, classData) {
  let profsArea = document.querySelector("textarea[name='otherprofs']")
  let traitsArea = document.querySelector("textarea[name='features']")

  let profsListStr = ``;
  let traitsListStr = ``;

  classData.proficiencies.splice(classData.proficiencies.length - 2, 2);

  for (let i = 0; i < classData.proficiencies.length; i++) {
    profsListStr += `${classData.proficiencies[i].name}\r\n`
  }

  for (let i = 0; i < raceData.traits.length; i++) {
    traitsListStr += `${raceData.traits[i].name}\r\n`
  }

  profsArea.value = profsListStr
  traitsArea.value = traitsListStr
}

function checkboxes(classData) {
  let strengthCheck = document.querySelector("input[name='Strength-save-prof']")
  let dexCheck = document.querySelector("input[name='Strength-save-prof']")
  let conCheck = document.querySelector("input[name='Constitution-save-prof']")
  let wisCheck = document.querySelector("input[name='Wisdom-save-prof']")
  let intelCheck = document.querySelector("input[name='Intelligence-save-prof']")
  let chaCheck = document.querySelector("input[name='Charisma-save-prof']")

  strengthCheck.checked = false
  dexCheck.checked = false
  conCheck.checked = false
  wisCheck.checked = false
  intelCheck.checked = false
  chaCheck.checked = false

  for (let i = 0; i < classData.saving_throws.length; i++) {
    if (classData.saving_throws[i].name === 'STR') {
      strengthCheck.checked = true
    } else if (classData.saving_throws[i].name === 'DEX') {
      dexCheck.checked = true
    } else if (classData.saving_throws[i].name === 'CON') {
      conCheck.checked = true
    } else if (classData.saving_throws[i].name === 'WIS') {
      wisCheck.checked = true
    } else if (classData.saving_throws[i].name === 'INT') {
      intelCheck.checked = true
    } else if (classData.saving_throws[i].name === 'CHA') {
      chaCheck.checked = true
    } else {
      return
    }
  }
}

// Function for DB storage

function saveCurrentCharacter() {
  
}



// helper function

function modifierGenerate() {
  let randomNum = Math.floor(Math.random() * 5)
  randomNum *=  Math.round(Math.random()) ? 1 : -1;

  return randomNum
}

const saveCharacterHandler = async (event) => {
  event.preventDefault();

  const name1 = document.querySelector("input[name='charname']").value.trim();
  // const race1 = document.querySelector("select[id='race']").value;
  const alignment1 = document.querySelector("select[name='alignment']").value;
  // const str = document.querySelector("input[name='Strengthscore']").value
  // const dex = document.querySelector("input[name='Dexterityscore']").value
  // const con = document.querySelector("input[name='Constitutionscore']").value
  // const wis = document.querySelector("input[name='Wisdomscore']").value
  // const int = document.querySelector("input[name='Intelligencescore']").value
  // const cha = document.querySelector("input[name='Charismascore']").value


  console.log(name1);
  console.log(alignment1);
  
  if (name1 && alignment1) {
    const response = await fetch('/api/characters', {
      method: 'POST',
      body: JSON.stringify({ name:name1, alignment:alignment1}),
      headers: { 'Content-Type': 'application/json' },
    });
  
    

    if (response.ok) {
      console.log(response);
    } else {
      alert('Failed to sign up.');
      console.log(response);
    }
}}




// Listeners

formSubmit.addEventListener('click', updateCharacterSheet)
saveChar.addEventListener('click', saveCharacterHandler)
  return (
    <div>
      {/* <div class= 'col text-center'>
      <button type="button" class="btn btn-primary mt-3 btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" >
        How it works
      </button>
      </div>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Creating a Character</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              To create a character, there are only but a few things you must do:<br></br>
              <br></br>
              1. Name your character<br></br>
              2. Select your race and class from dropdown menus.<br></br>
              3. Surrender your Name<br></br>
              4. Click Generate New Character at the bottom of the page.<br></br>
              <br></br>
              If you wish to save your character:<br></br>
              <br></br>
              1. Complete the steps above<br></br>
              2. Click Save button next to the Generate New Character<br></br>
              <br></br>
              Then, begin your campaign with your newly created character!
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div> */}


      <form class="charsheet">
        <header>
          <section class="charname">
            <label for="charname">Character Name</label><input name="charname" placeholder="Thoradin Fireforge" />
          </section>
          <section class="misc">
            <ul>
              <li>
                <label for="classlevel">Class & Level</label>
                <select id="class" name="classlevel" placeholder="Paladin 2">
                  <option value="null">Select One</option>
                  <option value="barbarian">Barbarian</option>
                  <option value="bard">Bard</option>
                  <option value="cleric">Cleric</option>
                  <option value="druid">Druid</option>
                  <option value="fighter">Fighter</option>
                  <option value="monk">Monk</option>
                  <option value="paladin">Paladin</option>
                  <option value="ranger">Ranger</option>
                  <option value="rogue">Rogue</option>
                  <option value="sorcerer">Sorcerer</option>
                  <option value="warlock">Warlock</option>
                  <option value="wizard">Wizard</option>
                </select>
              </li>
              <li>
                <label for="background">Background</label>
                <select>
                  <option>Acolyte</option>
                  <option>Charlatan</option>
                  <option>Criminal</option>
                  <option>Entertainer</option>
                  <option>Folk Hero</option>
                  <option>Guild Artisan</option>
                  <option>Hermit</option>
                  <option>Noble</option>
                  <option>Outlander</option>
                  <option>Sage</option>
                  <option>Sailor</option>
                  <option>Soldier</option>
                  <option>Urchin</option>
                </select>
              </li>
              <li>
                <label for="playername">Player Name</label><input name="playername" placeholder="Player McPlayerface"></input>
              </li>
              <li>
                <label for="race">Race</label>
                <select id="race" name="race" placeholder="Half-elf">
                  <option>Select One</option>
                  <option value="dragonborn">Dragonborn</option>
                  <option value="dwarf">Dwarf</option>
                  <option value="elf">Elf</option>
                  <option value="gnome">Gnome</option>
                  <option value="half-elf">Half-Elf</option>
                  <option value="half-orc">Half-Orc</option>
                  <option value="halfling">Halfling</option>
                  <option value="human">Human</option>
                  <option value="tiefling">Tiefling</option>
                </select>
              </li>
              <li>
                <label for="alignment">Alignment</label>
                <select name="alignment">
                  <option>Lawful Good</option>
                  <option>Neutral Good</option>
                  <option>Chaotic Good</option>
                  <option>Lawful Neutral</option>
                  <option>True Neutral</option>
                  <option>Chaotic Neutral</option>
                  <option>Lawful Evil</option>
                  <option>Neutral Evil</option>
                  <option>Chaotic Evil</option>
                </select>
              </li>
              <li>
                <label for="experiencepoints">Experience Points</label><input name="experiencepoints" placeholder="3240" />
              </li>
            </ul>
          </section>
        </header>
        <main>
          <section>
            <section class="attributes">
              <div class="scores">
                <ul>
                  <li>
                    <div class="score">
                      <label for="Strengthscore">Strength</label><input name="Strengthscore" placeholder="10" value="0" class="stat"/>
                    </div>
                    <div class="modifier">
                      <input name="Strengthmod" placeholder="+0" class="statmod"/>
                    </div>
                  </li>
                  <li>
                    <div class="score">
                      <label for="Dexterityscore">Dexterity</label><input name="Dexterityscore" placeholder="10" value="0" class="stat"/>
                    </div>
                    <div class="modifier">
                      <input name="Dexteritymod" placeholder="+0" class="statmod"/>
                    </div>
                  </li>
                  <li>
                    <div class="score">
                      <label for="Constitutionscore">Constitution</label><input name="Constitutionscore" placeholder="10" value="0" class="stat"/>
                    </div>
                    <div class="modifier">
                      <input name="Constitutionmod" placeholder="+0" class="statmod"/>
                    </div>
                  </li>
                  <li>
                    <div class="score">
                      <label for="Wisdomscore">Wisdom</label><input name="Wisdomscore" placeholder="10" value="0" class="stat"/>
                    </div>
                    <div class="modifier">
                      <input name="Wisdommod" placeholder="+0" class='statmod'/>
                    </div>
                  </li>
                  <li>
                    <div class="score">
                      <label for="Intelligencescore">Intelligence</label><input name="Intelligencescore" placeholder="10" value="0" class="stat"/>
                    </div>
                    <div class="modifier">
                      <input name="Intelligencemod" placeholder="+0" class="statmod"/>
                    </div>
                  </li>
                  <li>
                    <div class="score">
                      <label for="Charismascore">Charisma</label><input name="Charismascore" placeholder="10" value="0" class="stat"/>
                    </div>
                    <div class="modifier">
                      <input name="Charismamod" placeholder="+0" class="statmod"/>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="attr-applications">
                <div class="inspiration box">
                  <div class="label-container">
                    <label for="inspiration">Inspiration</label>
                  </div>
                  <input name="inspiration" type="checkbox" />
                </div>
                <div class="proficiencybonus box">
                  <div class="label-container">
                    <label for="proficiencybonus">Proficiency Bonus</label>
                  </div>
                  <input name="proficiencybonus" value="+2"/>
                </div>
                <div class="saves list-section box">
                  <ul>
                    <li>
                      <label for="Strength-save">Strength</label><input class="saving-throws" name="Strength-save" placeholder="+0" value="0" type="text" /><input name="Strength-save-prof" type="checkbox" />
                    </li>
                    <li>
                      <label for="Dexterity-save">Dexterity</label><input class="saving-throws" name="Dexterity-save" placeholder="+0" value="0" type="text" /><input name="Strength-save-prof" type="checkbox" />
                    </li>
                    <li>
                      <label for="Constitution-save">Constitution</label><input class="saving-throws" name="Constitution-save" placeholder="+0" value="0" type="text" /><input name="Constitution-save-prof" type="checkbox" />
                    </li>
                    <li>
                      <label for="Wisdom-save">Wisdom</label><input class="saving-throws" name="Wisdom-save" placeholder="+0" value="0" type="text" /><input name="Wisdom-save-prof" type="checkbox" />
                    </li>
                    <li>
                      <label for="Intelligence-save">Intelligence</label><input class="saving-throws" name="Intelligence-save" placeholder="+0" value="0" type="text" /><input name="Intelligence-save-prof" type="checkbox" />
                    </li>
                    <li>
                      <label for="Charisma-save">Charisma</label><input class="saving-throws" name="Charisma-save" placeholder="+0" value="0" type="text" /><input name="Charisma-save-prof" type="checkbox" />
                    </li>
                  </ul>
                  <div class="label">
                    Saving Throws
                  </div>
                </div>
                <div id='skills-list' class="skills list-section box">
                  <ul>
                    <li>
                      <label for="Acrobatics">Acrobatics <span class="skill">(Dex)</span></label><input class='skill-num' name="Acrobatics" placeholder="+0" value="0" type="text" /><input name="Acrobatics-prof" type="checkbox" />
                    </li>
                    <li>
                      <label for="Animal Handling">Animal Handling <span class="skill">(Wis)</span></label><input class='skill-num' name="Animal Handling" placeholder="+0" value="0" type="text" /><input name="Animal Handling-prof" type="checkbox" />
                    </li>
                    <li>
                      <label for="Arcana">Arcana <span class="skill">(Int)</span></label><input class='skill-num' name="Arcana" placeholder="+0" value="0" type="text" /><input name="Arcana-prof" type="checkbox" />
                    </li>
                    <li>
                      <label for="Athletics">Athletics <span class="skill">(Str)</span></label><input class='skill-num' name="Athletics" placeholder="+0" value="0" type="text" /><input name="Athletics-prof" type="checkbox" />
                    </li>
                    <li>
                      <label for="Deception">Deception <span class="skill">(Cha)</span></label><input class='skill-num' name="Deception" placeholder="+0" value="0" type="text" /><input name="Deception-prof" type="checkbox" />
                    </li>
                    <li>
                      <label for="History">History <span class="skill">(Int)</span></label><input class='skill-num' name="History" placeholder="+0" value="0" type="text" /><input name="History-prof" type="checkbox" />
                    </li>
                    <li>
                      <label for="Insight">Insight <span class="skill">(Wis)</span></label><input class='skill-num' name="Insight" placeholder="+0" value="0" type="text" /><input name="Insight-prof" type="checkbox" />
                    </li>
                    <li>
                      <label for="Intimidation">Intimidation <span class="skill">(Cha)</span></label><input class='skill-num' name="Intimidation" placeholder="+0" value="0" type="text" /><input name="Intimidation-prof" type="checkbox" />
                    </li>
                    <li>
                      <label for="Investigation">Investigation <span class="skill">(Int)</span></label><input class='skill-num' name="Investigation" placeholder="+0" value="0" type="text" /><input name="Investigation-prof" type="checkbox" />
                    </li>
                    <li>
                      <label for="Medicine">Medicine <span class="skill">(Wis)</span></label><input class='skill-num' name="Medicine" placeholder="+0" value="0" type="text" /><input name="Medicine-prof" type="checkbox" />
                    </li>
                    <li>
                      <label for="Nature">Nature <span class="skill">(Int)</span></label><input class='skill-num' name="Nature" placeholder="+0" value="0" type="text" /><input name="Nature-prof" type="checkbox" />
                    </li>
                    <li>
                      <label for="Perception">Perception <span class="skill">(Wis)</span></label><input class='skill-num' name="Perception" placeholder="+0" value="0" type="text" /><input name="Perception-prof" type="checkbox" />
                    </li>
                    <li>
                      <label for="Performance">Performance <span class="skill">(Cha)</span></label><input class='skill-num' name="Performance" placeholder="+0" value="0" type="text" /><input name="Performance-prof" type="checkbox" />
                    </li>
                    <li>
                      <label for="Persuasion">Persuasion <span class="skill">(Cha)</span></label><input class='skill-num' name="Persuasion" placeholder="+0" value="0" type="text" /><input name="Persuasion-prof" type="checkbox" />
                    </li>
                    <li>
                      <label for="Religion">Religion <span class="skill">(Int)</span></label><input class='skill-num' name="Religion" placeholder="+0" value="0" type="text" /><input name="Religion-prof" type="checkbox" />
                    </li>
                    <li>
                      <label for="Sleight of Hand">Sleight of Hand <span class="skill">(Dex)</span></label><input class='skill-num' name="Sleight of Hand" placeholder="+0" value="0" type="text" /><input name="Sleight of Hand-prof" type="checkbox" />
                    </li>
                    <li>
                      <label for="Stealth">Stealth <span class="skill">(Dex)</span></label><input class='skill-num' name="Stealth" placeholder="+0" value="0" type="text" /><input name="Stealth-prof" type="checkbox" />
                    </li>
                    <li>
                      <label for="Survival">Survival <span class="skill">(Wis)</span></label><input class='skill-num' name="Survival" placeholder="+0" value="0" type="text" /><input name="Survival-prof" type="checkbox" />
                    </li>
                  </ul>
                  <div class="label">
                    Skills
                  </div>
                </div>
              </div>
            </section>
            <div class="passive-perception box">
              <div class="label-container">
                <label for="passiveperception">Passive Wisdom (Perception)</label>
              </div>
              <input name="passiveperception" placeholder="10" />
            </div>
            <div class="otherprofs box textblock">
              <label for="otherprofs">Other Proficiencies and Languages</label>
              <textarea name="otherprofs">
                
              </textarea>
            </div>
          </section>
          <section>
            <section class="combat">
              <div class="armorclass">
                <div>
                  <label for="ac">Armor Class</label><input name="ac" placeholder="10" value="0" type="text" />
                </div>
              </div>
              <div class="initiative">
                <div>
                  <label for="initiative">Initiative</label><input name="initiative" placeholder="+0" value="0" type="text" />
                </div>
              </div>
              <div class="speed">
                <div>
                  <label for="speed">Speed</label><input name="speed" placeholder="30" value="0" type="text" />
                </div>
              </div>
              <div class="hp">
                <div class="regular">
                  <div class="max">
                    <label for="maxhp">Hit Point Maximum</label>
                  </div>
                  <div class="current">
                    <label for="currenthp">Current Hit Points</label><input name="currenthp" value="0" type="text" />
                  </div>
                </div>
                <div class="temporary">
                  <label for="temphp">Temporary Hit Points</label><input name="temphp" value="0" type="text" />
                </div>
              </div>
              <div class="hitdice">
                <div>
                  <div class="total">
                    <label onclick="totalhd_clicked()" for="totalhd">Total</label>
                  </div>
                  <div class="remaining">
                    <label for="remaininghd">Hit Dice</label><input name="remaininghd" value="0" type="text" />
                  </div>
                </div>
              </div>
              <div class="deathsaves">
                <div>
                  <div class="label">
                    <label>Death Saves</label>
                  </div>
                  <div class="marks">
                    <div class="deathsuccesses">
                      <label>Successes</label>
                      <div class="bubbles">
                        <input name="deathsuccess1" type="checkbox" />
                        <input name="deathsuccess2" type="checkbox" />
                        <input name="deathsuccess3" type="checkbox" />
                      </div>
                    </div>
                    <div class="deathfails">
                      <label>Failures</label>
                      <div class="bubbles">
                        <input name="deathfail1" type="checkbox" />
                        <input name="deathfail2" type="checkbox" />
                        <input name="deathfail3" type="checkbox" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="attacksandspellcasting">
              <div>
                <label>Attacks & Spellcasting</label>
                <table>
                  <thead>
                    <tr>
                      <th>
                        Name
                      </th>
                      <th>
                        Atk Bonus
                      </th>
                      <th>
                        Damage/Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input name="atkname1" type="text" />
                      </td>
                      <td>
                        <input name="atkbonus1" type="text" />
                      </td>
                      <td>
                        <input name="atkdamage1" type="text" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input name="atkname2" type="text" />
                      </td>
                      <td>
                        <input name="atkbonus2" type="text" />
                      </td>
                      <td>
                        <input name="atkdamage2" type="text" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input name="atkname3" type="text" />
                      </td>
                      <td>
                        <input name="atkbonus3" type="text" />
                      </td>
                      <td>
                        <input name="atkdamage3" type="text" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <textarea></textarea>
              </div>
            </section>
            <section class="equipment">
              <div>
                <label>Equipment</label>
                <div class="money">
                  <ul>
                    <li>
                      <label for="cp">cp</label><input name="cp" />
                    </li>
                    <li>
                      <label for="sp">sp</label><input name="sp" />
                    </li>
                    <li>
                      <label for="ep">ep</label><input name="ep" />
                    </li>
                    <li>
                      <label for="gp">gp</label><input name="gp" />
                    </li>
                    <li>
                      <label for="pp">pp</label><input name="pp" />
                    </li>
                  </ul>
                </div>
                <textarea placeholder="Equipment list here"></textarea>
              </div>
            </section>
          </section>
          <section>
            <section class="flavor">
              <div class="personality">
                <label for="personality">Personality</label><textarea name="personality" placeholder="Create Your Own"></textarea>
              </div>
              <div class="ideals">
                <label for="ideals">Ideals</label><textarea name="ideals" placeholder="Create Your Own"></textarea>
              </div>
              <div class="bonds">
                <label for="bonds">Bonds</label><textarea name="bonds" placeholder="Create Your Own"></textarea>
              </div>
              <div class="flaws">
                <label for="flaws">Flaws</label><textarea name="flaws" placeholder="Create Your Own"></textarea>
              </div>
            </section>
            <section class="features">
              <div>
                <label for="features">Features & Traits</label><textarea name="features"></textarea>
              </div>
            </section>
          </section>
        </main>
        <section id="form-btns">
          <input id="submit-input" type="submit" value='Generate New Character'/>
          <input id="save-input" type="submit" value='Save'/>
        </section>
      </form>

      <footer class="py-5 bg-black">
        <div class="container px-5"><p class="m-0 text-center text-white small">Copyright &copy; The Gang</p></div>
      </footer>
    </div>
  )
}