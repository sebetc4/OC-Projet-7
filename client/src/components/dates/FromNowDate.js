import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/fr'

export default function DateFromNow(props) {
    dayjs.locale('fr')
    dayjs.extend(relativeTime)
  return (
    dayjs(props.date).fromNow()
  )
}
