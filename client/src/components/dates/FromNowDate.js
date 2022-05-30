import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/fr'

const dateWithoutAgo = {
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
}

const dateWithAgo = {
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

const updateWithAgo = {
    future: "Dans %s",
    past: "Modifié il y a %s",
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

export default function DateFromNow({ date, update, withoutUpdate, withoutAgo }) {

    const dateDisplayed = (!withoutAgo && date !== update && !withoutUpdate) ? update : date

    dayjs.extend(updateLocale)

    if (withoutAgo) {
        dayjs.updateLocale('fr', { relativeTime: dateWithoutAgo })
    }
    else if (!withoutUpdate && date !== update)
        dayjs.updateLocale('fr', { relativeTime: updateWithAgo })
    else
        dayjs.updateLocale('fr', { relativeTime: dateWithAgo })

    dayjs.locale('fr')
    dayjs.extend(relativeTime)


    return (
        <p>{dayjs(dateDisplayed).fromNow()}</p>
    )
}
