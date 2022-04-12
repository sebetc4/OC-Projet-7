import React, { useState } from "react";
import { Formik } from 'formik'
import Resizer from "react-image-file-resizer";

export default function ImageForm(user) {


  const [image, setImage] = useState

  const submit = (values, actions) => {
    console.log('Recherche')
  }

  const fileChangedHandler = (event) => {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }

    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log(uri);
            setImage(uri);
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className=''>
      <img src={image} alt="" />
      <Formik onSubmit={submit} initialValues={{ userPicture: '' }}>
        {({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
          <form className='search-bar' onSubmit={handleSubmit} onChange={fileChangedHandler}>
            <input
              name='userPicture'
              type={'file'}
              className='search-bar__input'
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <button className='search-bar__button' type='submit' disabled={isSubmitting}>
              Modifier
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
