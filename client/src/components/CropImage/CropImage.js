import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './utils/scripts';
import { StandartModal } from '..';

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
      const { file, url } = await getCroppedImg(
        props.photoURL,
        croppedAreaPixels,
        rotation
      );
      props.setPhotoURL(url);
      props.setCropImage(file);
      props.setOpenCrop(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StandartModal
      closeClickOut={true}
      closeModal={props.handleCancel}
    >
      <div className='crop-image'>
        <div className='crop-image__cropper-container' >
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
        <div className='crop-image__actions'>
          <div className='crop-image-action__zoom'>
            <p>Zoom: {zoomPercent(zoom)}</p>
            <input
              type="range"
              aria-labelledby="Zoom"
              min="1"
              max="3"
              value={zoom}
              className="slider-zoom"
              step={0.1}
              onChange={(e) => setZoom(e.target.value)} />
          </div>
          <div className='crop-image-action__rotation'>
            <p>Rotation: {rotation + '°'}</p>
            <input
              type="range"
              min="0"
              max="360"
              value={rotation}
              className="slider-rotation"
              onChange={(e) => setRotation(e.target.value)} />
          </div>
          <div className='crop-image-action__buttons'>
            <button onClick={props.handleCancel} >
              Annuler
            </button>
            <button onClick={cropImage} >
              Valider
            </button>
          </div>
        </div>

      </div>
    </StandartModal>
  );
};

export default CropEasy;

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};