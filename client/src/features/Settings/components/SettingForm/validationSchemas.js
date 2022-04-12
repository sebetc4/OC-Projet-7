import * as Yup from "yup";
export const firstNameLastNameValidation = {
    firstName: Yup.string().min(2, "Trop court! veuillez utiliser au moins 2 caractères").max(20, "Trop long! veuillez utiliser moins de 20 caractères").required("Champ requis"),
    lastName: Yup.string().min(2, "Trop court! veuillez utiliser au moins 2 caractères").max(20, "Trop long! veuillez utiliser moins de 20 caractères").required("Champ requis"),
}

export const emailValidation = {
    email: Yup.string().email("Mail non valide").required("Champ requis"),
}

export const bioValidation = {
    email: Yup.string().max(500, "Trop long! veuillez utiliser moins de 500 caractères"),
}