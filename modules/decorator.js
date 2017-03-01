/**
 * Created by b1ncer on 2017/2/28.
 */
import React, {Component, PropTypes} from 'react'
import {Subscriber} from 'react-broadcast'
import channel from './channel'

const decorator = (Comp, {bindValue = 'value', bindChange = 'onChange', setter = (v => v), getter = (e => e)}) =>
        function DecoratedComponent({_bind, ...rest}) {

            return <Subscriber channel={channel}>
                {
                    ({getValue, change}) => {

                        const settledOnChange = e => {
                            const originalChangeFunc = rest[bindChange]

                            if (typeof originalChangeFunc == 'function') {
                                originalChangeFunc(e)
                            }

                            change(_bind, getter(e))
                        }

                        return <Comp {...{
                            ...rest,
                            [bindValue]: setter(getValue(_bind)),
                            [bindChange]: settledOnChange
                        }} />
                    }
                }
            </Subscriber>
        }

export default decorator
