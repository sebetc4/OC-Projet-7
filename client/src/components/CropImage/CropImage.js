import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './utils/scripts';
import { StandartModal } from '..';

const CropEasy = ({ photoURL, setOpenCrop, setPhotoURL, setFile }) => {
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
        photoURL,
        croppedAreaPixels,
        rotation
      );
      setPhotoURL(url);
      setFile(file);
      setOpenCrop(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StandartModal>
      <div className='crop-image'>
        <div className='crop-image__cropper-container' >
        <Cropper
          image={photoURL}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
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
          <button onClick={() => setOpenCrop(false)} >
            Annuler
          </button>
          <button onClick={cropImage} >
            Recadrer
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