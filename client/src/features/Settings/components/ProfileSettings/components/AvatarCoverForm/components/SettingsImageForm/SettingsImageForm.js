import React, { useEffect, useState, forwardRef } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { CropImage } from "../../../../../../../../components";
import { updateUser } from "../../../../../../../../store/actions/user.actions";
import { Dialog } from '@mui/material';

import { Fab, Tooltip, Zoom, useMediaQuery, Slide } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SettingsImageForm({ picture, user, field, ratio, cropShape, showGrid }) {

    // Hooks
    const fullScreen = useMediaQuery('(max-width:768px)');
    const dispatch = useDispatch();

    const [cropImage, setCropImage] = useState(null)
    const [photoURL, setPhotoURL] = useState(picture);
    const [originalImage, setOriginalImage] = useState(false)
    const [openCrop, setOpenCrop] = useState(false);

    const [formIsSubmitting, setFormIsSubmitting] = useState(false)

    // onSubmit
    useEffect(() => {
        const submitNewImage = async () => {
            setFormIsSubmitting(true)
            const file = new File([cropImage], `${field}-${user.id}.jpeg`);
            const formData = new FormData()
            formData.append(field, file)
            formData.append('directory', field)
            const userData = await axios.put(`/api/user`, formData)
            dispatch(updateUser(userData.data))
            setFormIsSubmitting(false)
            setOpenCrop(false)
        }
        if (cropImage) submitNewImage()
    }, [cropImage, field, dispatch, user])

    // Check if avatar and cover are original images
    useEffect(() => {
        if (photoURL.includes('avatar/avatar-profile.webp') || photoURL.includes('cover/cover-profile.webp'))
            setOriginalImage(true)
        else
            setOriginalImage(false)
    }, [photoURL])

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoURL(URL.createObjectURL(file));
            setOpenCrop(true);
        }
    };

    const handleCancel = () => {
        setOpenCrop(false)
        setPhotoURL(picture)
    }

    const handleDelete = async () => {
        const directory = field === 'cover' ? 'cover' : 'avatar'
        const userData = await axios.put(`/api/user/reset-image`, { directory })
        dispatch(updateUser(userData.data))
        setPhotoURL(Object.values(userData.data)[0])
    }

    return (
        <form
            className="settings-profile-images-form"
        >
            <h3 className="settings-profile-images-form__title">{`${field === 'cover' ? 'Couverture' : 'Avatar'}`}</h3>

            <label htmlFor={`settings-profile-images-form-${field}`} className="settings-profile-images-form__label">
                <input
                    accept="image/*"
                    id={`settings-profile-images-form-${field}`}
                    name={field}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleChange}
                />
                <Tooltip
                    TransitionComponent={Zoom}
                    title="Modifier"
                >
                    <img
                        className={`settings-profile-images-form__${field === 'cover' ? 'cover' : 'avatar'}`}
                        src={photoURL}
                        alt={field}
                    />
                </Tooltip>
                {!originalImage &&
                    <Fab
                        size="small"
                        aria-label="supprimer"
                        onClick={handleDelete}
                    >
                        <DeleteIcon />
                    </Fab>
                }
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

