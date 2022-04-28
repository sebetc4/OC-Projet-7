import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/fr'

export default function DateFromNow({ date, withoutAgo }) {

  dayjs.extend(updateLocale)

  dayjs.updateLocale('fr', {
  relativeTime: withoutAgo ? {
    future: "Dans %s",
    past: "%s",
    s: 'Quelques secondes',
    m: "Une minute",
    mm: "%d minutes",
    h: "Une heure",
    hh: "%d heures",
    d: "Un jour",
    dd: "%d jours",
    M: "Un mois",
    MM: "%d mois",
    y: "Un an",
    yy: "%d ans"
  } : {
    future: "Dans %s",
    past: "Il y a %s",
    s: 'quelques secondes',
    m: "une minute",
    mm: "%d minutes",
    h: "une heure",
    hh: "%d heures",
    d: "un jour",
    dd: "%d jours",
    M: "un mois",
    MM: "%d mois",
    y: "un an",
    yy: "%d ans"
  }
  })
  dayjs.locale('fr')
  dayjs.extend(relativeTime)


  return (
    <p>{dayjs(date).fromNow()}</p>
  )
}
