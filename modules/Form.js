/**
 * Created by b1ncer on 2017/2/28.
 */
import React from 'react'
import {Broadcast} from 'react-broadcast'
import channel from './channel'

const Form = ({formMap, onChange, children}) => {

    const change = (name, value) => onChange(name, value, formMap)

    const getValue = name => formMap[name]

    return <Broadcast channel={channel} value={{getValue, change}}>
        {children}
    </Broadcast>
}

export default Form
