import { gql } from 'apollo-boost'

export const PROJECTS = gql`
  query projects {
    projects {
      id
      title
      rulebook
    }
  }
`

export const EVENTS = gql`
  query events($projectID: ID, $projectTitle: String) {
    events(projectID: $projectID, projectTitle: $projectTitle) {
      id
      title
      eventRole
      index
    }
  }
`

export const CREATURES = gql`
  query creatures(
    $projectID: ID
    $projectTitle: String
    $eventID: ID
    $eventTitle: String
    $fromRulebook: Rulebook
  ) {
    creatures(
      projectID: $projectID
      projectTitle: $projectTitle
      eventID: $eventID
      eventTitle: $eventTitle
      fromRulebook: $fromRulebook
    ) {
      id
      name
      race
      shadow
      Conditions {
        physical {
          fitness {
            toughness
            painThreshold
          }
        }
        spiritual {
          corruption {
            current
            threshold
            permanent
          }
        }
      }
      attributes {
        accurate
        cunning
        discreet
        persuasive
        quick
        resolute
        strong
        vigilant
        defense
      }
      abilities {
        id
        currentRank
        title
        description {
          type
          rank
          description
        }
      }
    }
  }
`

export const PCREATURES = gql`
  query pcreatures($rulebook: Rulebook!) {
    pcreatures(rulebook: $rulebook) {
      name
      race
      shadow
      Conditions {
        physical {
          fitness {
            toughness
            painThreshold
          }
        }
        spiritual {
          corruption {
            current
            threshold
            permanent
          }
        }
      }
      attributes {
        accurate
        cunning
        discreet
        persuasive
        quick
        resolute
        strong
        vigilant
        defense
      }
      abilities {
        rank
        preset {
          title
          description {
            type
            rank
            description
          }
        }
      }
    }
  }
`
