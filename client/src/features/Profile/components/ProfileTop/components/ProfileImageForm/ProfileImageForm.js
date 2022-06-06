import React, { useEffect, useState, forwardRef, useRef } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { updateUser } from "../../../../../../store/actions/user.actions";

import { Fab, useMediaQuery, Slide, Dialog } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { CropImage } from "../../../../../../components";

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
            setFormIsSubmitting(true)
            const file = new File([cropImage], `${field}-${user.id}.jpeg`);
            const formData = new FormData()
            formData.append(field, file)
            formData.append('directory', field)
            const userData = await axios.put(`/api/user`, formData)
            dispatch(updateUser(userData.data))
            setFormIsSubmitting(false)
            setOpenCrop(false)
            setPhotoURL(null)
            setCropImage(null)
        }
        if (cropImage) submitNewImage()
    }, [cropImage, field, dispatch, user])

    const handleCancel = () => {
        setOpenCrop(false)
        setPhotoURL(null)
    }

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoURL(URL.createObjectURL(file));
            setOpenCrop(true);
        }
    };

    return (
        <form className={field === 'avatar' ? 'profile-top-content-avatar__input' : 'profile-top-cover__input'}>
            <label htmlFor={`profile-top-image-form-${field}`}>
                <input
                    accept="image/*"
                    id={`profile-top-image-form-${field}`}
                    name={field}
                    ref={inputRef}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleChange}
                />
                <Fab
                    color="primary"
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

