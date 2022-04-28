import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from '../../../../store/actions/user.actions';
import { CropImage } from '../../../../components';


export default function ImageForm({ picture, user, field, ratio, cropShape, showGrid }) {

    const dispatch = useDispatch();

    const [cropImage, setCropImage] = useState(null)
    const [photoURL, setPhotoURL] = useState(picture);
    const [openCrop, setOpenCrop] = useState(false);

    useEffect(() => {
        if (cropImage) {
            const file = new File([cropImage], `${field}-${user.id}.jpeg`);
            const formData = new FormData()
            formData.append(field, file)
            formData.append('directory', field)
            dispatch(updateUser(formData))
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
        setPhotoURL(picture)
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
                            id={field}
                            name={field}
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleChange}
                        />
                        <img
                            src={photoURL}
                            style={{ width: 150, height: 150, cursor: 'pointer' }}
                            alt={field}
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
                ratio={ratio}
                cropShape={cropShape}
                showGrid={showGrid}
            />}
        </>

    )
};

