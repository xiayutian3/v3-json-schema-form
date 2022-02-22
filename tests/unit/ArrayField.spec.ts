import { mount, shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import JsonSchemaForm, { SelectionWidget, NumberField, StringField, ArrayField } from '../../lib'

// TestComponent 包裹着JsonSchemaForm 真正的入口是 TestComponent
import TestComponent from './utils/TestComponent'

// yarn test:unit -- -t=multi  只执行这个it测试用例， -it 后面会正则匹配名称,前面第一个-- 后面的 -t=multi 在命令运行后，传入test:unit 对应的命令中

// npx jest tests/unit/ObjectFiled.spec.ts  执行某个测试文件

describe('ObjectFiled', () => {
  // 测试 multi 类型
  it('should render multi type', () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: [
            {
              type: 'string'
            },
            {
              type: 'number'
            }
          ]
        },
        value: [],
        onChange: (v: any) => {
          //
        }
      }
    })

    const arr = wrapper.findComponent(ArrayField)
    const str = arr.findComponent(StringField)
    const num = arr.findComponent(NumberField)
    // 断言  StringField  NumberField 是否渲染成功
    expect(str.exists()).toBeTruthy()
    expect(num.exists()).toBeTruthy()
  })

  // 测试 single type 类型
  it('should render single type', () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        value: ['1', '2'],
        onChange: () => {
          //
        }
      }
    })

    const arr = wrapper.findComponent(ArrayField)
    const strs = arr.findAllComponents(StringField)

    // 断言 渲染了两个 StringField 节点
    expect(strs.length).toBe(2)
    // 断言 点一个节点的value是 ‘1’
    expect(strs[0].props('value')).toBe('1')
  })

  // 测试 多选数组 类型
  it('should render muti array type', () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string',
            enum: [
              '1', '2', '3'
            ]
          }
        },
        value: [],
        onChange: () => {
          //
        }
      }
    })

    const arr = wrapper.findComponent(ArrayField)
    const select = arr.findComponent(SelectionWidget)

    // 断言节点是否渲染
    expect(select.exists()).toBeTruthy()
  })
})
