import { mount, shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import JsonSchemaForm, { NumberField } from '../../lib'

describe('JsonSchemaForm', () => {
  it('should render correct number field', async () => {
    let value = ''
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: {
          type: 'number'
        },
        value: value,
        onChange: (v:any) => { value = v }
      }
    })

    const numberFiled = wrapper.findComponent(NumberField)
    // 断言 NumberField 确定会被渲染
    expect(numberFiled.exists()).toBeTruthy()
    // // 调用onChange 传‘123’，（假设是第三方写的组件，我们不关心它的实现，只需要验证它的方法对不对）
    // await numberFiled.props('onChange')('123')
    // expect(value).toBe('123')
    // 如果是我们自己写的组件，我们要考虑它的一个实现过程，怎么触发，value变化
    const input = numberFiled.find('input')
    input.element.value = '123' // 这种方式修改值  因为类型是数字，所以值是数字
    // 手动触发input事件
    input.trigger('input')
    expect(value).toBe(123)
  })
})
