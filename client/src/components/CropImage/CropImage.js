import React, { useState } from 'react';
import Cropper from 'react-easy-crop';

import CloseIcon from '@mui/icons-material/Close';
import { Button, CircularProgress, Slider,IconButton } from '@mui/material';

import getCroppedImg from './utils/scripts';

const CropEasy = (props) => {

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const cropImage = async () => {
        try {
            props.setFormIsSubmitting(true)
            const { file, url } = await getCroppedImg(
                props.photoURL,
                croppedAreaPixels,
                rotation
            );
            props.setPhotoURL(url);
            props.setCropImage(file);
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <div className='crop-image'>
            <div className='crop-image-top'>
                <h2>Recadrer l'image</h2>
                <div className='post-form-top__button-container'>
                    <IconButton
                        color="error"
                        aria-label="Annuler"
                        onClick={props.handleCancel}
                        disabled={props.formIsSubmitting}
                    >
                        <CloseIcon color='error' fontSize='medium' />
                    </IconButton>
                </div>
            </div>
            <div className='crop-image-cropper-container'>
                <Cropper
                    image={props.photoURL}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={props.ratio}
                    cropShape={props.cropShape}
                    showGrid={props.showGrid}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropChange={setCrop}
                    onCropComplete={cropComplete}
                />
            </div>
            <div className='crop-image-action'>
                <div className='crop-image-action__zoom'>
                    <p>Zoom: {zoomPercent(zoom)}</p>
                    <Slider
                        aria-labelledby="Zoom"
                        min={1}
                        max={3}
                        value={zoom}
                        step={0.1}
                        onChange={(e) => setZoom(e.target.value)}
                    />
                </div>
                <div className='crop-image-action__rotation'>
                    <p>Rotation: {rotation + '°'}</p>
                    <Slider
                        aria-labelledby="Rotation"
                        min={0}
                        max={360}
                        value={rotation}
                        onChange={(e) => setRotation(e.target.value)}
                    />
                </div>
            </div>
            <div className='crop-image-bottom'>
                {!props.formIsSubmitting ?
                    <Button
                        variant='outlined'
                        onClick={cropImage}
                    >
                        Valider
                    </Button> :
                    <CircularProgress color='primary'/>
                }
            </div>
        </div>
    );
};

export default CropEasy;

const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`;
};