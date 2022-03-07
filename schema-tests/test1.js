const Ajv = require('ajv')
const addFormats = require("ajv-formats")
const localize = require("ajv-i18n")

const ajv = new Ajv({ allErrors: true }) // options can be passed, e.g. {allErrors: true}
//用户定义错误消息
require("ajv-errors")(ajv /*, {singleError: true} */)
//添加format功能
addFormats(ajv)




// const schema = {
//   type: 'object',
//   properties: {
//     foo: { type: 'integer' },
//     bar: { type: 'string' }
//   },
//   required: ['foo'],
//   additionalProperties: false
// }

// const schema = {
//   type: 'string',
//   minLength: 10
// }

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      // format: 'email' //格式  ，字符串 email格式 ,之前提供的email格式
      // format: 'test',  // 使用我们自定义的 format test格式
      test: true, //自定义关键字
      
      // errorMessage:{   //自定义错误消息
      //   type:'必须是字符串',
      //   minLength:'长度必须大于10'
      // },
      // minLength: 10,
    },
    age: {
      type: 'number',
    },
    pets: {
      type: 'array',
      items: [
        {
          type: 'string',
          maxLength:2
        },
        {
          type: 'number',
        }
      ],
      minItems: 2,
      additionalItems: false
    },
    isworker: {
      type: 'boolean'
    }
  },
  required: ['name', 'age'],
  additionalProperties: false,
  errorMessage: {  //自定义错误消息
    properties: {
      name: '字符串且长度大于10'
    }
  },
}


// //添加自定义format
// ajv.addFormat('test', (data) => {
//   console.log(data);
//   return data === 'haha'
// })

// //添加自定义的keyword  ---validate方式(自定义错误消息)
// ajv.addKeyword({
//   keyword: "test",
//   validate: function fun(schema, data){
//     // schema: ->test:true   data-> name: 'haha',
//     // console.log(schema, data)

//     //自定义错误消息
//     fun.errors = [
//       {
//         instancePath: '/name',
//         schemaPath: '#/properties/name/test',
//         keyword: 'test',
//         params: {keyword:'test'},
//         message: '应当通过校验"',
//         KeywordErrorDefinition:'sdfsdfsdf',
//       }
//     ]
//     return false
//   },
//   //错误消息自定义(是否在错误消息里添加字段)
//   errors: true,

// })

// //添加自定义的keyword  ---compile方式，，在编译的时候执行
// ajv.addKeyword({
//   keyword: "test",
//   // type: "string",
//   // schema->  test: true     parentSchema->{ type: 'string', test: true }
//   compile(schema, parentSchema) {
//     console.log('schema, parentSchema: ', schema, parentSchema);
//     return () => true;
//   },
//   errors: false,
//   //定义的是test对应的值的定义
//   metaSchema: {
//     // schema to validate keyword value
//     type: "boolean",
//   },
// })

//添加自定义的keyword  ---macro方式
ajv.addKeyword({
  keyword: "test",
  macro: (schema, parentSchema) => {
    //扩充原来的schema对象，添加到里面name  {type: 'string',test: true,minLength: 10}
    return {
      minLength: 10
    }
  }, // 
})


const validate = ajv.compile(schema)

// const data = {
//   foo: 1,
//   bar: 'abc'
// }
// const data = 'heelo'
const data = {
  // name: 'heelso@aaa.com',
  //验证自定义的format
  // name: 'hahajsjsjsjksks',
  name: 'hi',
  age: 18,
  pets: ['mimi', 12],
  isworker: true
}

const valid = validate(data)
console.log('valid: ', valid);
if (!valid) {
  //将错误信息错误转化为中文（ 使用 这个   localize.zh(validate.errors)   自定义消息就不能显示）
  // localize.zh(validate.errors)
  console.log(validate.errors)
} 


// const schema = {
//   type: "object",
//   required: ["foo"],
//   properties: {
//     foo: {type: "integer"},
//   },
//   additionalProperties: false,
//   errorMessage: "你好世界",
// }

// const validate = ajv.compile(schema)
// console.log(validate({foo: "a", bar: 2})) // false
// console.log(validate.errors) // processed errors
