'use client'

import { useState } from 'react'

const BaseCheckbox: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { disabled, checked, ...newProps } = props

    const [isChecked, setIsChecked] = useState(checked ? true : false)

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setIsChecked((previous) => {
            return !previous
        })
    }

    return (<input onChange={changeHandler} defaultChecked={isChecked} {...newProps} value="test" />)

}

export default BaseCheckbox