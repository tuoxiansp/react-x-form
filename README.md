# x-form
Form 框架

## 安装
`npm install --save react-x-form`

## 使用
```
import {XForm, XGet, decorator} from 'react-x-form'

//使用装饰器装饰 input 组件，使其可以自动与祖先组件中第一个 XForm 绑定
//你可以在你的项目中把表单组件统一使用 decorator 装饰一遍，处处可用
const XInput = decorator('input', {getter: e => e.target.value})

class SimpleForm extends React.Component {
	
	state = {
		form: {}
	}

	onChange(name, value, formMap) {
		this.setState({
			form: {
				...formMap,
				[name]: value
			}
		})
	}

	render() {
		return (
			<XForm formMap={this.state.form} onChange={this.onChange.bind(this)}>
				<form>
					<XInput _bind="username" />
					<XInput _bind="password" type="password" />
				</form>
			</XForm>
		)
	}
}

```

## 示例程序
- [jsfiddle](https://jsfiddle.net/b1ncer/9mu1xLs8/)

## API

### `<XForm formMap onChange>`

`<XForm formMap={{input: 111}} onChange={(name, value, formMap) => {}}></XForm>`  
  
XForm 内部的 'X' 组件无论多深都可以与 XForm 的 formMap 绑定，并且所有变化都会反映在 onChange 方法上  
  
### `<XGet _select={[keys]}>`
  
```
<XGet _select={['keyA', 'keyB']}>
{
	(valueA, valueB) => {
		return <div>anything use valueA and valueB</div>
	}
}
</XGet>
```
  
XGet 标签可以通过 key 获取 formMap 的键值，适用于表单的错误处理等场景。  
  
### `decorator(any_component, options)`
  
将任意组件转换成可与 XForm 绑定的 'X' 组件，你需要做的是让 decorator 知道一组 'value' & 'onChange' 属性的键叫什么。如 input 组件的 value 属性和 onChange 属性。  
  
又比如我有一个 <Check> 组件，给组件赋值的属性叫 'checked'，监听变化的属性叫 'onCheck'，这时候我只需要这么写  
  
`const XCheck = decorator(Check, {bindValue: 'checked', bindChange: 'onCheck'})`  
  
就得到了对应的 'X' 组件 -- <XCheck>  
  
XCheck 依然可以接受 Check 的所有其他属性并且表现和原来一模一样，只是多了一个 ‘_bind’ 属性，用来告诉父级 XForm 想要和 formMap 的哪个键绑定。  
  
### THANKS
  
Power by awesome [react-broadcast](https://github.com/ReactTraining/react-broadcast)