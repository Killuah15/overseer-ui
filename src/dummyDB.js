const uuidv4 = require('uuid/v4')

const users = [
  {
    id: uuidv4(),
    username: 'Robibobi',
    email: 'robibobi.burger@bacon.wurst',
    projects: [
      {
        id: uuidv4(),
        title: 'Project 1',
        description: 'Project number one duh',
        events: [
          {
            author: {
              username: 'Robibobi',
              email: 'robibobi.burger@bacon.wurst'
            },
            title: 'Event 1',
            description: null,
            eventRole: 'COMBAT',
            project: {
              title: 'Project 1',
              description: 'Project number one duh'
            },
            creatures: [
              {
                id: uuidv4(),
                author: {
                  username: 'Robibobi',
                  email: 'robibobi.burger@bacon.wurst'
                },
                event: {
                  title: 'Event 1'
                },
                name: 'Hugo',
                race: 'Troll',
                shadow: null,
                Conditions: {
                  id: uuidv4(),
                  creature: {
                    name: 'Hugo'
                  },
                  toughness: 32,
                  painThreshold: 13,
                  corruption: 11,
                  corruptionThreshold: 2,
                  corruptionPermanent: 12
                },
                attributes: {
                  id: uuidv4(),
                  creature: {
                    name: 'Hugo'
                  },
                  accurate: 22,
                  cunning: 1,
                  discreet: 2,
                  persuasive: 3,
                  quick: 4,
                  resolute: 5,
                  strong: 6,
                  vigilant: 7,
                  defense: 8
                }
              }
            ]
          }
        ],
        author: {
          username: 'Robibobi',
          email: 'robibobi.burger@bacon.wurst'
        }
      },
      {
        id: uuidv4(),
        title: 'Project 2',
        description: 'Project number one duh',
        events: [
          {
            author: {
              username: 'Robibobi',
              email: 'robibobi.burger@bacon.wurst'
            },
            title: 'Event of the cutting edge',
            description: 'Some Description',
            eventRole: 'GENERIC',
            project: {
              title: 'Project 2',
              description: 'Project number two duh'
            },
            creatures: [
              {
                id: uuidv4(),
                author: {
                  username: 'Robibobi',
                  email: 'robibobi.burger@bacon.wurst'
                },
                event: {
                  title: 'Event of the cutting edge'
                },
                name: 'Mogli0',
                race: 'Human',
                shadow: null,
                Conditions: {
                  id: uuidv4(),
                  creature: {
                    name: 'Mogli0'
                  },
                  toughness: 321,
                  painThreshold: 145,
                  corruption: 1,
                  corruptionThreshold: 5,
                  corruptionPermanent: 3
                },
                attributes: {
                  id: uuidv4(),
                  creature: {
                    name: 'Mogli0'
                  },
                  accurate: 6,
                  cunning: 2,
                  discreet: 3,
                  persuasive: 1,
                  quick: 4,
                  resolute: 6,
                  strong: 1,
                  vigilant: 2,
                  defense: 3
                }
              },
              {
                id: uuidv4(),
                author: {
                  username: 'Robibobi',
                  email: 'robibobi.burger@bacon.wurst'
                },
                event: {
                  title: 'Event of the cutting edge'
                },
                name: 'Mogli1',
                race: 'Human',
                shadow: null,
                Conditions: {
                  id: uuidv4(),
                  creature: {
                    name: 'Mogli1'
                  },
                  toughness: 321,
                  painThreshold: 145,
                  corruption: 1,
                  corruptionThreshold: 5,
                  corruptionPermanent: 3
                },
                attributes: {
                  id: uuidv4(),
                  creature: {
                    name: 'Mogli1'
                  },
                  accurate: 6,
                  cunning: 2,
                  discreet: 3,
                  persuasive: 1,
                  quick: 4,
                  resolute: 6,
                  strong: 1,
                  vigilant: 2,
                  defense: 3
                }
              },
              {
                id: uuidv4(),
                author: {
                  username: 'Robibobi',
                  email: 'robibobi.burger@bacon.wurst'
                },
                event: {
                  title: 'Event of the cutting edge'
                },
                name: 'Mogli2',
                race: 'Human',
                shadow: null,
                Conditions: {
                  id: uuidv4(),
                  creature: {
                    name: 'Mogli2'
                  },
                  toughness: 321,
                  painThreshold: 145,
                  corruption: 1,
                  corruptionThreshold: 5,
                  corruptionPermanent: 3
                },
                attributes: {
                  id: uuidv4(),
                  creature: {
                    name: 'Mogli2'
                  },
                  accurate: 6,
                  cunning: 2,
                  discreet: 3,
                  persuasive: 1,
                  quick: 4,
                  resolute: 6,
                  strong: 1,
                  vigilant: 2,
                  defense: 3
                }
              }
            ]
          },
          {
            author: {
              username: 'Robibobi',
              email: 'robibobi.burger@bacon.wurst'
            },
            title: 'Event of the cutting edge',
            description: 'Some Description',
            eventRole: 'GENERIC',
            project: {
              title: 'Project 2',
              description: 'Project number two duh'
            },
            creatures: [
              {
                id: uuidv4(),
                author: {
                  username: 'Robibobi',
                  email: 'robibobi.burger@bacon.wurst'
                },
                event: {
                  title: 'Event of the cutting edge'
                },
                name: 'Düri0',
                race: 'Human',
                shadow: null,
                Conditions: {
                  id: uuidv4(),
                  creature: {
                    name: 'Düri0'
                  },
                  toughness: 321,
                  painThreshold: 145,
                  corruption: 1,
                  corruptionThreshold: 5,
                  corruptionPermanent: 3
                },
                attributes: {
                  id: uuidv4(),
                  creature: {
                    name: 'Düri0'
                  },
                  accurate: 6,
                  cunning: 2,
                  discreet: 3,
                  persuasive: 1,
                  quick: 4,
                  resolute: 6,
                  strong: 1,
                  vigilant: 2,
                  defense: 3
                }
              },
              {
                id: uuidv4(),
                author: {
                  username: 'Robibobi',
                  email: 'robibobi.burger@bacon.wurst'
                },
                event: {
                  title: 'Event of the cutting edge'
                },
                name: 'Mogli1',
                race: 'Human',
                shadow: null,
                Conditions: {
                  id: uuidv4(),
                  creature: {
                    name: 'Düri1'
                  },
                  toughness: 321,
                  painThreshold: 145,
                  corruption: 1,
                  corruptionThreshold: 5,
                  corruptionPermanent: 3
                },
                attributes: {
                  id: uuidv4(),
                  creature: {
                    name: 'Düri1'
                  },
                  accurate: 6,
                  cunning: 2,
                  discreet: 3,
                  persuasive: 1,
                  quick: 4,
                  resolute: 6,
                  strong: 1,
                  vigilant: 2,
                  defense: 3
                }
              },
              {
                id: uuidv4(),
                author: {
                  username: 'Robibobi',
                  email: 'robibobi.burger@bacon.wurst'
                },
                event: {
                  title: 'Event of the cutting edge'
                },
                name: 'Düri2',
                race: 'Human',
                shadow: null,
                Conditions: {
                  id: uuidv4(),
                  creature: {
                    name: 'Düri2'
                  },
                  toughness: 321,
                  painThreshold: 145,
                  corruption: 1,
                  corruptionThreshold: 5,
                  corruptionPermanent: 3
                },
                attributes: {
                  id: uuidv4(),
                  creature: {
                    name: 'Düri2'
                  },
                  accurate: 6,
                  cunning: 2,
                  discreet: 3,
                  persuasive: 1,
                  quick: 4,
                  resolute: 6,
                  strong: 1,
                  vigilant: 2,
                  defense: 3
                }
              }
            ]
          }
        ],
        author: {
          username: 'Robibobi',
          email: 'robibobi.burger@bacon.wurst'
        }
      }
    ]
  }
]

export default users
