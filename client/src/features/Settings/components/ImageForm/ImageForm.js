import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCropSimple } from "@fortawesome/free-solid-svg-icons";
import { CropImage } from '../../../../components';
import { updateUser } from '../../../../store/actions/user.actions';

export default function ImageForm(props) {

    const dispatch = useDispatch();

    const [file, setFile] = useState(null);
    const [photoURL, setPhotoURL] = useState(props.picture);
    const [openCrop, setOpenCrop] = useState(false);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setPhotoURL(URL.createObjectURL(file));
            setOpenCrop(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            const fileConverted = new File([file], `${props.field}-${props.user.firstName}-${props.user.lastName}.jpeg`);
            const formData = new FormData()
            formData.append(props.field, fileConverted)
            dispatch(updateUser(props.user.id, formData))
        }
    };

    const handleDelete = async() => {
        
    } 

    return !openCrop ? (
        <form action='' onSubmit={handleSubmit} >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <label htmlFor={props.field}>
                    <input
                        accept="image/*"
                        id={props.field}
                        name={props.field}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleChange}
                    />
                    <img src={photoURL ? photoURL : props.noPicture} style={{ width: 150, height: 150, cursor: 'pointer' }} alt={props.field} />
                </label>
                {file && (
                    <button onClick={() => setOpenCrop(true)} >
                        <FontAwesomeIcon icon={faCropSimple} />
                    </button>
                )}
            </div>
            <button >Supprimer</button>
            <button type='submit' >Modifier</button>
        </form>
    ) : (<CropImage {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />)
};

