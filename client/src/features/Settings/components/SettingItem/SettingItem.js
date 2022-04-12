import React, { useState } from 'react'
import { ArrowButton } from '../../../../components'

export default function SettingItem(props) {

    const [viewForm, setViewForm] = useState(false)
    const toggleViewForm = () => setViewForm(!viewForm)

    return (
        <div className='settings-item'>
            <div onClick={toggleViewForm} className='settings-item__title-arrow-button-container'>
                <h3 className='settings-item__title'>{props.title}</h3>
                <ArrowButton modalState={viewForm} childrenClassName={'settings-item__arrow-button'} />
            </div>
            <div className={`settings-item__form-container ${viewForm ? 'active' : '' }`}>
                {props.children}
            </div>
        </div>
    )
}
