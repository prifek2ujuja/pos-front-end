import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { useState } from 'react'
import toast from 'react-hot-toast'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import useDeleteProductImage from '../mutations/useDeleteProductImage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCAzYsmkfZ6EhER_vM0zLlq25G4efbbYFw',
  authDomain: 'prife-k2u-juja.firebaseapp.com',
  projectId: 'prife-k2u-juja',
  storageBucket: 'prife-k2u-juja.appspot.com',
  messagingSenderId: '464332111907',
  appId: '1:464332111907:web:94d27f6d288a3213057196',
  measurementId: 'G-95TZX8SXR5',
}

// Initialize Firebase
initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

const useUploadImage = () => {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [downloadURL, setDownloadUrl] = useState<string>()
  const [imagePath, setImagePath] = useState<string>()

  const { mutate: deleteProductImage, isLoading: deleteFileIsLoading } = useDeleteProductImage()
  const storage = getStorage()

  const uploadFile = (file: Blob) => {
    const path = `products/${crypto.randomUUID()}`
    setImagePath(path)
    const storageRef = ref(storage, path)

    // 'file' comes from the Blob or File API
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setUploadProgress(prog)
      },
      (error) => {
        console.log('error', error)
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            toast.error('Storage access denied', { icon: '🔒' })
            break
          case 'storage/canceled':
            // User canceled the upload
            toast.error('Upload cancelled', { icon: '🚫' })
            break

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            toast.error('Unknown error occurred', { icon: '❌' })
            break
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log('download url', url)
          setDownloadUrl(url)
        })
        toast.success('Image uploaded successfully')
      },
    )
  }

  const deleteFile = (imagePath: string, productImageId: string) => {
    console.log('delete file called')
    // Create a reference to the file to delete
    const fileRef = ref(storage, imagePath)

    // Delete the file
    deleteObject(fileRef)
      .then(() => {
        // File deleted successfully
        deleteProductImage({ productImageId })
      })
      .catch((error) => {
        console.log('error', error)
        // Uh-oh, an error occurred!
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            toast.error('Storage access denied', { icon: '🔒' })
            break
          case 'storage/canceled':
            // User canceled the upload
            toast.error('Upload cancelled', { icon: '🚫' })
            break

          case 'storage/object-not-found':
            // User canceled the upload
            toast.error('File not found', { icon: '❌' })
            deleteProductImage({ productImageId })
            break

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            toast.error('Unknown error occurred', { icon: '❌' })
            break
        }
      })
  }
  return { uploadFile, uploadProgress, downloadURL, imagePath, deleteFile, deleteFileIsLoading }
}

export default useUploadImage
