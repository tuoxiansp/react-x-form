/**
 * Created by b1ncer on 2017/3/1.
 */
import React, {Component, PropTypes} from 'react'
import {Subscriber} from 'react-broadcast'
import channel from './channel'

const Get = ({_select, children}) => <Subscriber channel={channel}>
    {
        ({getValue}) => children(..._select.map(getValue))
    }
</Subscriber>

export default Get
