import PasswordWidget from '@/components/PasswordWiget'

// export default {
//   name: 'Demo',
//   schema: {
//     // type: 'string',
//     // minLength: 10,
//     // title: 'demo'
//     type: 'object',
//     properties: {
//       pass1: {
//         type: 'string',
//         minLength: 10,
//         // test: true,
//         title: 'password'
//       },
//       pass2: {
//         type: 'string',
//         minLength: 10,
//         title: 're try password'
//       }
//     //   // color: {
//     //   //   type: 'string',
//     //   //   format: 'color',
//     //   //   title: 'Input Color'
//     //   // }
//     }
//   },
//   async customValidate (data: any, errors: any) {
//     return new Promise((resolve: any) => {
//       setTimeout(() => {
//         if (data.pass1 !== data.pass2) {
//           errors.pass2.addError('密码必须相同')
//         }
//         resolve()
//       }, 0)
//     })
//   },
//   uiSchema: {
//     // properties: {
//     //   pass1: {
//     //     // widget: PasswordWidget
//     //   },
//     //   pass2: {
//     //     color: 'red'
//     //   }
//     // }
//   },
//   default: 1
// }

// 另一种情况
export default {
  name: 'Demo',
  schema: {
    // type: 'string',
    // minLength: 10,
    // title: 'demo'
    type: 'object',
    properties: {
      pass1: {
        type: 'string',
        minLength: 10,
        // test: true,
        title: 'password'
      },
      pass2: {
        type: 'string',
        minLength: 10,
        title: 're try password'
      }
    //   // color: {
    //   //   type: 'string',
    //   //   format: 'color',
    //   //   title: 'Input Color'
    //   // }
    }
  },

  // 同步情况
  // customValidate (data: any, errors: any) {
  //   if (data.pass1 !== data.pass2) {
  //     errors.pass2.addError('密码必须相同')
  //   }
  // },

  // 异步情况(返回一个promise)
  async customValidate (data: any, errors: any) {
    // if (data.pass1 !== data.pass2) {
    //   errors.pass2.addError('密码必须相同')
    // }
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.pass1 !== data.pass2) {
          errors.pass2.addError('密码必须相同')
        }
        resolve(true)
      }, 3000)
    })
  },
  uiSchema: {
    properties: {
      pass1: {
        widget: PasswordWidget
      }
      // pass2: {
      //   color: 'red'
      // }
    }
  },
  default: 1
}
