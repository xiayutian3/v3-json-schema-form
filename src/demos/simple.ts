export default {
  name: 'Simple',
  schema: {
    description: 'A simple form example.',
    type: 'object',
    required: ['firstName', 'lastName'],
    properties: {
      firstName: {
        type: 'string',
        default: 'Chuck'
      },
      lastName: {
        type: 'string'
      },
      telephone: {
        type: 'string',
        minLength: 10
      },
      staticArray: {
        // title: 'staticArray',
        type: 'array',
        items: [
          {
            // title: 'staticArray1',
            type: 'string'
          },
          {
            // title: 'staticArray2',
            type: 'number'
          }
        ]
      },
      singleTypeArray: {
        // title: 'singleTypeArray',
        type: 'array',
        items: {
          type: 'string'
        }
      }

    }
  },
  uiSchema: {
    title: 'A registration form',
    properties: {
      firstName: {
        title: 'First name'
      },
      lastName: {
        title: 'Last name'
      },
      telephone: {
        title: 'Telephone'
      }
    }
  },
  default: {
    firstName: 'Chuck',
    lastName: 'Norris',
    age: 75,
    bio: 'Roundhouse kicking asses since 1940',
    password: 'noneed',
    singleTypeArray: ['jokcy']
  }
}
