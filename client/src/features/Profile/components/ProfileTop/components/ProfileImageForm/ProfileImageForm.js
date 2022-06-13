import React, { useEffect, useState, forwardRef, useRef } from "react";
import { useDispatch } from "react-redux";

import { Fab, useMediaQuery, Slide, Dialog } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { CropImage } from "../../../../../../components";
import { setError } from "../../../../../../store/actions/errors.actions";
import api from '../../../../../../config/api.config';
import { updateUser } from "../../../../../../store/actions/user.actions";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImageForm({ user, field, ratio, cropShape, showGrid }) {

    // Hooks
    const fullScreen = useMediaQuery('(max-width:768px)');
    const dispatch = useDispatch();
    const inputRef = useRef()

    const [cropImage, setCropImage] = useState(null)
    const [photoURL, setPhotoURL] = useState(null);
    const [openCrop, setOpenCrop] = useState(false);

    const [formIsSubmitting, setFormIsSubmitting] = useState(false)

    // onSubmit
    useEffect(() => {
        const submitNewImage = async () => {
            try {
                setFormIsSubmitting(true)
                const file = new File([cropImage], `${field}-${user.id}.jpeg`);
                const formData = new FormData()
                formData.append(field, file)
                formData.append('directory', field)
                const userData = await api.put(`user`, formData)
                dispatch(updateUser(userData.data))
                setFormIsSubmitting(false)
                setOpenCrop(false)
                setPhotoURL(null)
                setCropImage(null)
            } catch {
                dispatch(setError({
                    title: 'Erreur du serveur',
                    message: 'Echec de la modification de l\'image'
                }))
            }
        }
        if (cropImage) submitNewImage()
    }, [cropImage, field, dispatch, user])

    const handleCancel = () => {
        setOpenCrop(false)
        setPhotoURL(null)
    }

    const handleChange = (e) => {
        const file = e.target.files[0];
        const filetypes = /jpeg|jpg|png|gif|webp/;
        if (filetypes.test(file.type) && file.size <= 4194304) {
            setPhotoURL(URL.createObjectURL(file));
            setOpenCrop(true);
        } else
            dispatch(setError({
                title: 'Erreur de format',
                message: 'Seules les images d’une taille inférieure à 4 Mo et au format JPG, PNG, GIF ou WebP sont autorisées.'
            }))
    }

    return (
        <form className={field === 'avatar' ? 'profile-top-content-avatar__input' : 'profile-top-cover__input'}>
            <label htmlFor={`profile-top-image-form-${field}`}>
                <input
                    accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
                    id={`profile-top-image-form-${field}`}
                    name={field}
                    ref={inputRef}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleChange}
                />
                <Fab
                    color="secondary"
                    size="small"
                    aria-label={`Modifier ${field === 'avatar' ? 'l\'avatar' : 'la photo de couverture'}`}
                    onClick={() => inputRef.current && inputRef.current.click()}
                >
                    <CameraAltIcon />
                </Fab>
            </label>
            <Dialog
                open={openCrop}
                onClose={handleCancel}
                TransitionComponent={Transition}
                fullScreen={fullScreen}
                keepMounted
                maxWidth={'xl'}
                scroll={'body'}

            >
                <CropImage
                    setFormIsSubmitting={setFormIsSubmitting}
                    formIsSubmitting={formIsSubmitting}
                    openCrop={openCrop}
                    photoURL={photoURL}
                    setOpenCrop={setOpenCrop}
                    setPhotoURL={setPhotoURL}
                    setCropImage={setCropImage}
                    handleCancel={handleCancel}
                    ratio={ratio}
                    cropShape={cropShape}
                    showGrid={showGrid}
                />
            </Dialog>
        </form>
    )
};

