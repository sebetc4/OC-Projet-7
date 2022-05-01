import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import Divider from '@mui/material/Divider';

export default function PostFormActions({ image, setFile, handleDeleteImage, toggleDisplayVideoInput }) {
    return (
        <div className='post-form-actions' >
            <Divider />
            <div className='post-form-actions__buttons' >
                <label>
                    <input
                        title="Type search term here"
                        accept="image/*"
                        id='input-post-image'
                        name='input-post-image'
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <Button
                        variant="text"
                        color="primary"
                        component="span"
                        startIcon={<PhotoCamera />}
                    >
                        {`${image ? 'Modifier l\'' : 'Ajouter une '}image`}
                    </Button>
                </label>
                <Button
                    variant="text"
                    color="primary"
                    component="span"
                    onClick={toggleDisplayVideoInput}
                    startIcon={<OndemandVideoIcon />}
                >
                    Ajouter une vidéo
                </Button>
                {image && (
                    <Button
                        color="warning"
                        startIcon={<DeleteIcon />}
                        onClick={handleDeleteImage}
                    >
                        Supprimer l'image
                    </Button>
                )}
            </div>
            <Divider />
        </div>
    )
}
