import React from 'react'
import dayjs from 'dayjs'

export default function DateCreated(props) {
  return (
    dayjs(props.date).format('DD/MM/YYYY')
  )
}
