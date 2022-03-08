import Ajv, { ErrorObject } from 'ajv'
import { Schema } from './types'
import { toPath } from 'lodash'
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
  locale = 'zh'
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

  return {
    errors,
    errorSchema,
    valid: errors.length === 0 // 等于0 说明没有错误消息
  }
}
