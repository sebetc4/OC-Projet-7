import React from 'react'
import { useSelector } from 'react-redux'
import { firstNameLastNameValidation, emailValidation, bioValidation, passwordValidation, deleteAccountValidation } from './components/forms/utils/validationSchemas'
import { SettingItem, SettingForm, ImageForm } from './components'




export default function Settingss() {

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
            action='updateUser'
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
            action='updateUser'
          />
        </SettingItem>
        <hr />
        <SettingItem title={'Modification du mot de passe'} >
          <SettingForm
            userId={user.id}
            inputs={[{
              name: 'password',
              type: 'password',
              placeholder: 'Ancien mot de passe'
            }, {
              name: 'newPassword',
              type: 'password',
              placeholder: 'Nouveau mot de passe'
            }, {
              name: 'confirmNewPassword',
              type: 'password',
              placeholder: 'Confirmation du nouveau mot de passe'
            }]}
            initialValues={
              {
                password: '',
                newPassword: '',
                confirmNewPassword: ''
              }
            }
            validationSchemas={passwordValidation}
            action='updatePassword'
          />
        </SettingItem>
        <hr />
        <SettingItem title={'Suppression du compte'} >
          <SettingForm
            userId={user.id}
            inputs={[{
              name: 'password',
              type: 'password',
              placeholder: 'Mot de passe'
            }, {
              name: 'confirmPassword',
              type: 'password',
              placeholder: 'Confirmation du mot de passe'
            }]}
            initialValues={
              {
                password: '',
                confirmPassword: ''
              }
            }
            validationSchemas={deleteAccountValidation}
            action='deleteAccount'
          />
        </SettingItem>
      </section>
      <section className='settings-section'>
        <h2 className='settings-section__title'>Paramètres du profil</h2>
        <SettingItem title={'Modification des images'} >
          <div className='settings-section-pictures' >
            <ImageForm
              user={user}
              field={'avatar'}
              ratio={1}
              cropShape={'round'}
              showGrid={false}
              picture={user.avatarUrl}
            />
            <ImageForm
              user={user}
              field={'cover'}
              ratio={2.375}
              cropShape={'rect'}
              showGrid={true}
              picture={user.coverUrl}
            />
          </div>
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
                bio: `${user.bio ? user.bio : ''}`,
              }
            }
            validationSchemas={bioValidation}
            action='updateUser'
          />
        </SettingItem>
        <hr />
      </section>
    </div>
  )
}
