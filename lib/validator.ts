import Ajv, { ErrorObject } from 'ajv'
import { Schema } from './types'
import { toPath } from 'lodash'
import { isObject } from './utils'
const i18n = require('ajv-i18n')

interface TransformErrorsObject{
  name: string;
  property: string;
  message: string | undefined;
  params: Record<string, any>;
  schemaPath: string;
}

interface ErrorSchemaObject {
  [level: string]: ErrorSchema
}

export type ErrorSchema = ErrorSchemaObject & {
  __errors?: string[]
}

// 转换成errorschema的形式
/**
 *
 *   {
       obj: {
         a: {}
       }
     }     //路径    /obj/a
 *
 */
function toErrorSchema (errors:TransformErrorsObject[]) {
  if (errors.length < 1) return {}
  // console.log('errors: ', errors)
  return errors.reduce((errorSchema, error) => {
    // console.log('error: ', error)
    const { property, message } = error
    // lodash的toPath方法
    const path = toPath(property?.replace(/\//g, '.')) // /obj/a -> [obj, a])
    // console.log('path', path)
    let parent = errorSchema

    // If the property is at the root (.level1) then toPath creates
    // an empty array element at the first index. Remove it.

    if (path.length > 0 && path[0] === '') {
      path.splice(0, 1)
    }

    // {
    //   obj: {
    //     a: {}
    //   }
    // } // /obj/a
    // 用于查找对象里面是否存在属性，如果没有就加上，然后里面层层叠加
    for (const segment of path.slice(0)) {
      // console.log('segment: ', segment)
      if (!(segment in parent)) {
        (parent as any)[segment] = {}
      }
      parent = parent[segment]
    }

    if (Array.isArray(parent.__errors)) {
      // We store the list of errors for this node in a property named __errors
      // to avoid name collision with a possible sub schema field named
      // "errors" (see `validate.createErrorHandler`).
      parent.__errors = parent.__errors.concat(message || '')
    } else {
      if (message) {
        parent.__errors = [message]
      }
    }
    return errorSchema
  }, {} as ErrorSchema)
}

// 转化ajv错误消息成 数组对象形式
function transformErrors (errors:ErrorObject[] | null | undefined):TransformErrorsObject[] {
  if (errors === null || errors === undefined) return []
  return errors.map(({ message, instancePath, keyword, params, schemaPath }) => {
    return {
      name: keyword,
      property: `${instancePath}`,
      message,
      params,
      schemaPath
    }
  })
}

// ajv校验
export function validateFormData (
  validator:Ajv,
  formData:any,
  schema:Schema,
  locale = 'zh',
  // 自定义错误类型
  customValidate?:(data:any, errors:any)=>void
) {
  let validationError:any
  try {
    validator.validate(schema, formData)
  } catch (error) {
    validationError = error
  }

  // 转化错误信息成中文
  i18n[locale](validator.errors)
  let errors = transformErrors(validator.errors)

  if (validationError) {
    errors = [
      ...errors,
      {
        message: validationError.message
      }
    ] as TransformErrorsObject[]
  }

  // 转换过后的error消息
  const errorSchema = toErrorSchema(errors)

  if (!customValidate) {
    return {
      errors,
      errorSchema,
      valid: errors.length === 0 // 等于0 说明没有错误消息
    }
  }

  /**
   * {
   *  obj:{
   *    a:{b:str},
   *    __errors:[]
   *  }
   * }
   *
   * raw.obj.a 会生成一个 结构一样的对象
   *
   */
  // 自定义错误消息机制
  const proxy = createErrorProxy()
  customValidate(formData, proxy)
  const newErrorSchema = mergeObjects(errorSchema, proxy, true)
  return {
    errors,
    errorSchema: newErrorSchema,
    valid: errors.length === 0 // 等于0 说明没有错误消息
  }
}

// 代理函数 会生成一个 结构一样的对象
function createErrorProxy () {
  const raw = {}
  return new Proxy(raw, {
    get (target, key, reciver) {
      if (key === 'addError') {
        // 返回一个函数。添加错误信息
        return (msg:string) => {
          // 添加errors
          const __errors = Reflect.get(target, '__errors', reciver)
          if (__errors && Array.isArray(__errors)) {
            __errors.push(msg)
          } else {
            (target as any).__errors = [msg]
          }
        }
      }
      // 说明 属性已经代理过
      const res = Reflect.get(target, key, reciver)
      // 或者 属性没有 代理过
      if (res === undefined) {
        const p:any = createErrorProxy()
        ;(target as any)[key] = p
        return p
      }
      return res
    }
  })
}

// 合并对象，并且通过 concatArrays 来判断是否需要合并数组
export function mergeObjects (obj1: any, obj2: any, concatArrays = false) {
  // Recursively merge deeply nested objects.
  const acc = Object.assign({}, obj1) // Prevent mutation of source object.
  return Object.keys(obj2).reduce((acc, key) => {
    const left = obj1 ? obj1[key] : {}
    const right = obj2[key]
    // eslint-disable-next-line no-prototype-builtins
    if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
      acc[key] = mergeObjects(left, right, concatArrays)
    } else if (concatArrays && Array.isArray(left) && Array.isArray(right)) {
      acc[key] = left.concat(right)
    } else {
      acc[key] = right
    }
    return acc
  }, acc)
}
