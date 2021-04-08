const inquirer = require('inquirer')
const LV = require('./lv.json')
const regionService = require('../services/region.service')
const partyService = require('../services/party.service')
const voteService = require('../services/vote.service')
const pageService = require('../services/page.service')
const userService = require('../services/user.service')

// const genders = ['male', 'female', 'other']
// const birthYears = [1931, 1942, 1953, 1964, 1975, 1986, 1997, 2001, 2010]

const reset = async () => {
  try {
    await voteService.deleteMany()
    await regionService.deleteMany()
    await partyService.deleteMany()
    await pageService.deleteMany()
    // await userService.deleteMany()
    console.log('Reset successful')
  } catch (error) {
    throw error
  }
}

const importDummyParties = async () => {
  const parties = [
    'Attīstībai/Par!',
    'Jaunā konservatīvā partija',
    'Jaunā Vienotība',
    'KPV LV',
    'Nacionālā apvienība "Visu Latvijai!"—"Tēvzemei un Brīvībai/LNNK"',
    'Saskaņa',
    'Zaļo un Zemnieku savienība',
  ]

  try {
    await partyService.createMany(parties.map((party) => ({ name: party })))
    console.log('Import successful: Parties')
  } catch (error) {
    throw error
  }
}

const importDummyRegions = async () => {
  const regions = []
  for (let key in LV.novadi) regions.push({ name: LV.novadi[key].novads })

  try {
    await regionService.createMany(regions)
    console.log('Import successful: Regions')
  } catch (error) {
    throw error
  }
}

const importData = async () => {
  try {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'import',
        message: 'What do you want to import?',
        choices: ['Regions', 'Parties', 'All'],
      },
    ])

    if (answer.import === 'Regions') await importDummyRegions()
    else if (answer.import === 'Parties') await importDummyParties()
    else if (answer.import === 'All') {
      await importDummyRegions()
      await importDummyParties()
    }
  } catch (error) {
    throw error
  }
}

const randomlyAssignParties = async () => {
  try {
    console.log('randomlyAssignParties')
  } catch (error) {
    throw error
  }
}

module.exports = async () => {
  try {
    const choices = ['Import', 'Randomly assign parties to regions', 'Reset']

    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices,
      },
    ])

    if (answer.action === choices[0]) await importData()
    if (answer.action === choices[1]) await randomlyAssignParties()
    if (answer.action === choices[2]) await reset()

    process.exit(1)
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
}
