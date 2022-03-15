import { CustomKeyword } from '../../lib/types'

// 自定义keyword 扩展ajv keyword 功能

const keyword:CustomKeyword = {
  name: 'test',
  deinition: { // 类型定义
    macro: () => {
      return {
        minLength: 10
      }
    }
  },
  transformSchema (shema) { // 转化成真正要渲染的shema
    return {
      ...shema,
      minLength: 10
    }
  }
}

export default keyword
