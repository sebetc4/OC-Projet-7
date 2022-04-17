import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CropImage } from '../../../../components';
import { updateUser } from '../../../../store/actions/user.actions';

export default function ImageForm(props) {

    const dispatch = useDispatch();

    const [cropImage, setCropImage] = useState(null)
    const [photoURL, setPhotoURL] = useState(props.picture);
    const [openCrop, setOpenCrop] = useState(false);

    useEffect(() => {
        if (cropImage) {
            const file = new File([cropImage], `${props.field}-${props.user.id}.jpeg`);
            const formData = new FormData()
            formData.append(props.field, file)
            formData.append('origin', props.field)
            console.log(photoURL)
            dispatch(updateUser(props.user.id, formData))
        }
    }, [cropImage])

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoURL(URL.createObjectURL(file));
            setOpenCrop(true);
        }
    };

    const handleCancel = () => {
        setOpenCrop(false)
        props.picture ? setPhotoURL(props.picture) : setPhotoURL(null)
    }

    const handleDelete = () => {
    }

    return (
        <>
            <form action='' >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label>
                        <input
                            accept="image/*"
                            id={props.field}
                            name={props.field}
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleChange}
                        />
                        <img
                            src={photoURL ? photoURL : props.noPicture}
                            style={{ width: 150, height: 150, cursor: 'pointer' }}
                            alt={props.field}
                        />
                    </label>
                </div>
                <button >Supprimer</button>
            </form>
            {openCrop && <CropImage
                photoURL={photoURL}
                setOpenCrop={setOpenCrop}
                setPhotoURL={setPhotoURL}
                setCropImage={setCropImage}
                handleCancel={handleCancel}
                ratio={props.ratio}
                cropShape={props.cropShape}
                showGrid={props.showGrid}
            />}
        </>

    )
};

