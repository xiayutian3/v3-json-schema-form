import { mount, shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import JsonSchemaForm, { NumberField, StringField } from '../../lib'
import TestComponent from './utils/TestComponent'

describe('ObjectFiled', () => {
  // 提取公共部分
  let schema:any
  beforeEach(() => {
    schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        age: {
          type: 'number'
        }
      }
    }
  })

  // 测试渲染 number string filed
  it('should render properties to correct fields', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: schema,
        value: {},
        onChange: () => {
          //
        }
      }
    })
    const strFiled = wrapper.findComponent(StringField)
    const numFiled = wrapper.findComponent(NumberField)
    // 断言组件是否存在，是否被渲染
    expect(strFiled.exists()).toBeTruthy()
    expect(numFiled.exists()).toBeTruthy()
  })

  // 测试组件的handleObjectFieldChange函数
  it('should change value when sub fields trigger onChange', async () => {
    let value:any = {}
    const wrapper = mount(TestComponent, {
      props: {
        schema: schema,
        value: value,
        onChange: (v:any) => {
          value = v
        }
      }
    })
    const strFiled = wrapper.findComponent(StringField)
    const numFiled = wrapper.findComponent(NumberField)
    // 断言 组件是触发更新函数，name age的值
    await strFiled.props('onChange')('1')
    await numFiled.props('onChange')(2)
    expect(value.name).toEqual('1')
    expect(value.age).toEqual(2)
  })

  // 测试string组件的 分支 undefind情况
  it('should render properties to correct fields', async () => {
    let value:any = {
      name: '123'
    }
    const wrapper = mount(TestComponent, {
      props: {
        schema: schema,
        value: value,
        onChange: (v:any) => {
          value = v
        }
      }
    })
    const strFiled = wrapper.findComponent(StringField)
    // 断言组件  分支 undefind情况 删除key
    await strFiled.props('onChange')(undefined)
    expect(value.name).toBeUndefined()
  })
})
