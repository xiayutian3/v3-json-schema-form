import { defineComponent, PropType } from 'vue'
import JsonSchemeForm, { Schema, ThemeProvider } from '../../../lib'
import defaultTheme from '../../../lib/theme-default'

// 如果项目是分两个 core themeDefault
// vjsf-theme-default       // import { ThemeProvider} from 'vue3-jsonscheme-form'
// vue3-jsonscheme-form

// 在vjsf-theme-default 里export ThemeDefaultProvider
// export const ThemeDefaultProvider = defineComponent({
//   setup (props, { slots }) {
//     return (
//       <ThemeProvider theme={defaultTheme}>
//         {/* vue3中slots.default是函数，必须调用 */}
//         {slots.default && slots.default()}
//       </ThemeProvider>
//     )
//   }
// })
// 外部使用的时候 直接使用 ThemeDefaultProvider
/* <ThemeDefaultProvider>
      <JsonSchemeForm {...props}/>
    </ThemeDefaultProvider> */

export default defineComponent({
  name: 'TestComponent',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    value: {
      required: true
    },
    onChange: {
      type: Function as PropType<(val: any)=> void>,
      required: true
    }
  },
  setup (props) {
    return () =>
      <ThemeProvider theme={defaultTheme}>
        <JsonSchemeForm {...props}/>
      </ThemeProvider>
  }
})
