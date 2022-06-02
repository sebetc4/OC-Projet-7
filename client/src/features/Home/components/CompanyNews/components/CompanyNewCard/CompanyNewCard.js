import React from 'react'
import { CreationDate } from '../../../../../../components'

export default function CompanyNewCard({ companyNew }) {

  return (
    <article >
      <h3 className='company-new-card__title'>
        {companyNew.title}
        </h3>
      <p className='company-new-card__date'>
        <CreationDate
          format={'Le DD MMMM YYYY'}
          date={companyNew.createdAt}
        />
      </p>
      <p className='company-new-card__text'>
        {companyNew.text}
        </p>
    </article>
  )
}
