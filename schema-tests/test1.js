const Ajv = require('ajv')
const addFormats = require("ajv-formats")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

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
      // format: 'test'  // 使用我们自定义的 format test格式
      test: true
      // minLength: 10
    },
    age: {
      type: 'number',
    },
    pets: {
      type: 'array',
      items: [
        {
          type: 'string'
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
  additionalProperties: false
}
// //添加自定义format
// ajv.addFormat('test', (data) => {
//   console.log(data);
//   return data === 'haha'
// })

// //添加自定义的keyword  ---validate方式
// ajv.addKeyword({
//   keyword: "test",
//   validate: (schema, data) =>{
//     // schema: ->test:true   data-> name: 'haha',
//     console.log(schema, data)
//     return true
//   },
//   //错误消息自定义
//   errors: false,
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
    //扩充原来的schema对象，添加到里面 {type: 'string',test: true,minLength: 10}
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
  name: 'haha',
  age: 18,
  pets: ['mimi', 12],
  isworker: true
}

const valid = validate(data)
if (!valid) console.log(validate.errors)
