import { useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'

const ImageCropper = ({ src, handleCrop }: { src: string, handleCrop: (croppedArea: Area, croppedAreaPixels: Area, zoom: number) => any }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log('handleImageCropCalled')
    handleCrop(croppedArea, croppedAreaPixels, zoom);
  }

  return (
    <div className='relative w-full aspect-square max-h-[80vh] mx-auto'>
      <Cropper
          image={src}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropShape='rect'
          objectFit='cover'
        />
    </div>
    
  )
}

export default ImageCropper;