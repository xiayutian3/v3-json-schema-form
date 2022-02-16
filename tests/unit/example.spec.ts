import { shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
// import HelloWorld from '@/components/HelloWorld.vue'
const HelloWorld = defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup: (props) => {
    return () => {
      return h('div', props.msg)
    }
  }
})

// 测试套件
describe('HelloWorld.vue', () => {
  // 测试用例
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg }
    })
    // 断言
    expect(wrapper.text()).toMatch(msg)
    // // 断言    不符合的情况
    // expect(wrapper.text()).not.toMatch(msg)
  })
})
// 测试用例（这种情况用的不是很多）
test('renders props.msg when passed', () => {
  const msg = 'new message'
  const wrapper = shallowMount(HelloWorld, {
    props: { msg }
  })
  expect(wrapper.text()).toMatch(msg)
})
