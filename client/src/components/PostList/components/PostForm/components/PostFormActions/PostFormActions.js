import { useDispatch } from "react-redux";

import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import Divider from '@mui/material/Divider';
import { setError } from '../../../../../../store/actions/errors.actions';

export default function PostFormActions({ image, videoUrl, setFile, handleDeleteImage, toggleShowVideoInput, showVideoInput, handleDeleteVideo, submitting }) {

    // Hooks
    const dispatch = useDispatch();

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        const filetypes = /jpeg|jpg|png|gif|webp/;
        if (filetypes.test(file.type) && file.size <= 4194304) {
            setFile(file)
        } else
            dispatch(setError({
                title: 'Erreur de format',
                message: 'Seules les images d’une taille inférieure à 4 Mo et au format JPG, PNG, GIF ou WebP sont autorisées.'
            }))
    }

    return (
        <div className='post-form-actions' >
            <Divider />
            <div className='post-form-actions__buttons' >
                {!videoUrl &&
                    <>
                        {!showVideoInput &&
                            <label>
                                <input
                                    title="Type search term here"
                                    accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
                                    id='input-post-image'
                                    name='input-post-image'
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleChangeFile}
                                />
                                <Button
                                    variant="text"
                                    color="secondary"
                                    component="span"
                                    startIcon={<PhotoCamera />}
                                    disabled={submitting}
                                >
                                    {`${image ? 'Modifier l\'' : 'Ajouter une '}image`}
                                </Button>
                            </label>
                        }
                        {image && (
                            <Button
                                color="warning"
                                startIcon={<DeleteIcon />}
                                onClick={handleDeleteImage}
                                disabled={submitting}
                            >
                                Supprimer l'image
                            </Button>
                        )}
                    </>
                }
                {!image &&
                    <>
                        {!showVideoInput ?
                            <Button
                                variant="text"
                                color="secondary"
                                component="span"
                                onClick={toggleShowVideoInput}
                                startIcon={<OndemandVideoIcon />}
                                disabled={submitting}
                            >
                                {`${videoUrl ? 'Modifier la ' : 'Ajouter une '}video`}
                            </Button> :
                            <Button
                                variant="text"
                                color='warning'
                                onClick={toggleShowVideoInput}
                                disabled={submitting}
                            >
                                Annuler
                            </Button>
                        }
                        {videoUrl && !showVideoInput &&
                            <Button
                                color="warning"
                                startIcon={<DeleteIcon />}
                                onClick={handleDeleteVideo}
                                disabled={submitting}
                            >
                                Supprimer la video
                            </Button>
                        }
                    </>
                }
            </div>
            <Divider />
        </div>
    )
}
