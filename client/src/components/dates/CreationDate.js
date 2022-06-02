import dayjs from 'dayjs'

export default function DateCreated({format, date}) {

  dayjs.locale('fr')

  return (
    dayjs(date).format(format)
  )
}
