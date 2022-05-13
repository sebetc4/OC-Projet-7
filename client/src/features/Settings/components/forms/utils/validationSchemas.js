import * as Yup from "yup";

export const bioValidation = {
    bio: Yup.string().max(500, "Trop long! veuillez utiliser moins de 500 caractères"),
}

export const deleteAccountValidation = {
    password: Yup.string().min(6, "Veuillez entrer votre mot de passe").required("Champ requis"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Les mots de passe ne sont pas identiques')
}