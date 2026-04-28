import React, { useRef } from 'react'

const WallpaperPicker = ({ storageKey, onChange }) => {
  const inputRef = useRef(null)

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = () => {
      const imageUrl = reader.result
      localStorage.setItem(storageKey, imageUrl)
      onChange(imageUrl)
    }
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  return (
    <div className="absolute bottom-4 group right-4 z-[9999]">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {/* <h1 className='hidden group-hover:flex absolute text-white/70 block right-13 top-1 text-xs'>Change wallpaper</h1> */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex  cursor-pointer h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white shadow-xl backdrop-blur-xl transition hover:scale-115 hover:bg-white/15"
        aria-label="Change wallpaper"
        title="Change wallpaper"
      >
        <i className="ri-pencil-line text-lg" />
      </button>
    </div>
  )
}

export default WallpaperPicker
