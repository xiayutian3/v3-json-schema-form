import SelectionWidget from './Selection'
import { CommonWidgetPropsDefine, SelectionWidgetName, CommonWidgetNames, CommonWidgetDefine } from '../types'
import { defineComponent } from 'vue'

// 组件定义
const CommonWidget:CommonWidgetDefine = defineComponent({
  props: CommonWidgetPropsDefine,
  setup () {
    return () => null
  }
}) as CommonWidgetDefine

export default {
  widgets: {
    [SelectionWidgetName.SelectionWidget]: SelectionWidget,
    // 暂时还没有实现 以下
    [CommonWidgetNames.TextWidget]: CommonWidget,
    [CommonWidgetNames.NumberWidget]: CommonWidget

    // SelectionWidget,
    // TextWidget: CommonWidget,
    // NumberWidget: CommonWidget

  }
}
