import * as Yup from "yup";
export const firstNameLastNameValidation = {
    firstName: Yup.string().min(2, "Trop court! veuillez utiliser au moins 2 caractères").max(20, "Trop long! veuillez utiliser moins de 20 caractères").required("Champ requis"),
    lastName: Yup.string().min(2, "Trop court! veuillez utiliser au moins 2 caractères").max(20, "Trop long! veuillez utiliser moins de 20 caractères").required("Champ requis"),
}

export const emailValidation = {
    email: Yup.string().email("Mail non valide").required("Champ requis"),
}

export const bioValidation = {
    bio: Yup.string().max(500, "Trop long! veuillez utiliser moins de 500 caractères"),
}

export const passwordValidation = {
password: Yup.string().min(6, "Veuillez entrer votre mot de passe").required("Champ requis"),
newPassword: Yup.string().min(6, "Trop court! veuillez utiliser au moins 6 caractères").required("Champ requis"),
confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Les mots de passe ne sont pas identiques')
}

export const deleteAccountValidation = {
    password: Yup.string().min(6, "Veuillez entrer votre mot de passe").required("Champ requis"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Les mots de passe ne sont pas identiques')
}