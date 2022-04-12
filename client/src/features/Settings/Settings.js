import React from 'react'
import { useSelector } from 'react-redux'
import { firstNameLastNameValidation, emailValidation, bioValidation } from './components/SettingForm/validationSchemas'


import { SettingItem, SettingForm, ImageForm } from './components'




export default function Settings() {

  const user = useSelector((state) => state.user.data)

  return (
    <div className='settings'>

      <section className='settings-section'>
        <h2 className='settings-section__title'>Paramètres du compte</h2>
        <SettingItem title={'Modification du nom et prénom'} >
          <SettingForm
            userId={user.id}
            inputs={[{
              name: 'firstName',
              type: 'text',
              placeholder: 'Prénom'
            }, {
              name: 'lastName',
              type: 'text',
              placeholder: 'Nom'
            }]}
            initialValues={
              {
                firstName: user.firstName,
                lastName: user.lastName
              }
            }
            validationSchemas={firstNameLastNameValidation}
          />
        </SettingItem>
        <hr />
        <SettingItem title={'Modification de l\'adresse email'} >
          <SettingForm
            userId={user.id}
            inputs={[{
              name: 'email',
              type: 'email',
              placeholder: 'Email'
            }]}
            initialValues={
              {
                email: user.email,
              }
            }
            validationSchemas={emailValidation}
          />
        </SettingItem>
        <hr />
        <SettingItem title={'Modification du mot de passe'} >
        </SettingItem>
        <hr />
        <SettingItem title={'Supression du compte'} >
        </SettingItem>
      </section>
      <section className='settings-section'>
        <h2 className='settings-section__title'>Paramètres du profil</h2>
        <SettingItem title={'Modification des images'} >
          <ImageForm user={user} />
        </SettingItem>
        <hr />
        <SettingItem title={'Modification de la biographie'} >
          <SettingForm
            userId={user.id}
            inputs={[{
              name: 'bio',
              type: 'text',
              placeholder: 'Bio'
            }]}
            initialValues={
              {
                bio: user.bio,
              }
            }
            validationSchemas={bioValidation}
          />
        </SettingItem>
        <hr />
      </section>
    </div>
  )
}
