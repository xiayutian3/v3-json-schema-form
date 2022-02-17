import { shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
// import HelloWorld from '@/components/HelloWorld.vue'

// const HelloWorld = defineComponent({
//   name: 'HelloWorld',
//   props: {
//     msg: String
//   },
//   setup: (props) => {
//     return () => {
//       return h('div', props.msg)
//     }
//   }
// })

// // 生命周期钩子(每一个测试用例都会执行)
// beforeEach(() => {
//   console.log('beforeEach: ', beforeEach)
// })
// afterEach(() => {
//   console.log('afterEach: ', afterEach)
// })

// // 全局生命周期钩子（只会全局执行一次，开始的时候，和结束的时候）
// beforeAll(() => {
//   console.log('beforeAll: ', beforeAll)
// })
// afterAll(() => {
//   console.log('afterAll: ', afterAll)
// })

// // 测试套件
// // describe有作用域，如果把beforeEach afterEach beforeAll afterAll 放在里面，只会在里面执行一次，只属于这个作用域里面的
// describe('HelloWorld.vue', () => {
//   // 生命周期钩子，局部作用域
//   // 生命周期钩子(每一个测试用例都会执行)
//   beforeEach(() => {
//     console.log('beforeEach: ', beforeEach)
//   })
//   afterEach(() => {
//     console.log('afterEach: ', afterEach)
//   })

//   // 全局生命周期钩子（只会全局执行一次，开始的时候，和结束的时候）
//   beforeAll(() => {
//     console.log('beforeAll: ', beforeAll)
//   })
//   afterAll(() => {
//     console.log('afterAll: ', afterAll)
//   })

//   // 测试用例
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       props: { msg }
//     })
//     // 断言
//     expect(wrapper.text()).toMatch(msg)
//     // // 断言    不符合的情况
//     // expect(wrapper.text()).not.toMatch(msg)
//   })

//   // 第二个测试用例
//   it('should work', () => {
//     expect(1 + 1).toBe(2)
//   })
// })

// // 测试用例（这种情况用的不是很多）
// test('renders props.msg when passed', () => {
//   const msg = 'new message'
//   const wrapper = shallowMount(HelloWorld, {
//     props: { msg }
//   })
//   expect(wrapper.text()).toMatch(msg)
// })

// // 假设第二个测试套件 (测试生命周期钩子在describe作用域问题)
// describe('Hello', () => {
//   // 生命周期钩子

//   // 生命周期钩子(每一个测试用例都会执行)
//   beforeEach(() => {
//     console.log('beforeEach: 123')
//   })
//   afterEach(() => {
//     console.log('afterEach:123 ')
//   })

//   // 全局生命周期钩子（只会全局执行一次，开始的时候，和结束的时候）
//   beforeAll(() => {
//     console.log('beforeAll:123 ')
//   })
//   afterAll(() => {
//     console.log('afterAll:123 ')
//   })

//   it('should work', () => {
//     expect(1 + 1).toBe(2)
//   })
// })

// // 异步测试 参数 done
// describe('HelloWorld.vue', () => {
//   // 测试用例
//   it('renders props.msg when passed', async () => { // done
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       props: { msg }
//     })
//     // // 断言-异步测试 方法一 done()
//     // setTimeout(() => {
//     //   expect(wrapper.text()).toMatch(msg)
//     //   // 异步测试结束
//     //   done()
//     // })

//     // // // 异步测试 方法二 使用promise
//     // return new Promise<void>((resolve) => {
//     //   // expect(wrapper.text()).toMatch(msg)
//     //   expect(wrapper.text()).toMatch('1245')
//     //   resolve()
//     // })

//     // // 异步方法三 async await
//     // await wrapper.setProps({
//     //   msg: '123'
//     // })
//     // // 其实props的更新是异步的，需要用this.nextTick来处理
//     // expect(wrapper.text()).toMatch('123')
//   })
// })
