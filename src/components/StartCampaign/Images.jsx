import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    IonInput,
    IonLabel,
    IonImg
  } from "@ionic/react";
  import { startCampignDataActions } from "../../store/redux/start-campaign-data-slice";

export default function Images() {
  const dispatch = useDispatch();
  const selectedImages = useSelector(state=>state['startCampignData'].selectedImages);
  const setSelectedImages = (value) => dispatch(startCampignDataActions.setData({field:'selectedImages',data:value}))
  const [imagesList,setImagesList] = useState([]);


  function serializeFile(file) {
    return {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
      url : URL.createObjectURL(file)
    };
  }

  async function blobUrlToFile(selectedImg) {
    try {
      // Fetch the Blob data from the Blob URL
      const response = await fetch(selectedImg.url);
      const blobData = await response.blob();
  
      // Create a new File object
      const file = new File([blobData], selectedImg.name, { type: selectedImg.type });
  
      return file;
    } catch (error) {
      console.error("Error converting Blob URL to File object:", error);
    }
  }
  useEffect(()=>{
   async function tt(){
        const promises =  selectedImages.map(async(selectedImg)=>{
        return await blobUrlToFile(selectedImg);
    })
    const d = await Promise.all(promises);
    setImagesList(d);

   } 
   if(selectedImages.length > 0){
      tt();
   }
  },[selectedImages])

  
    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        setSelectedImages([...selectedImages,serializeFile(file)]);
      };
  return (
    <>
      <div className="inputArea" style={{ marginTop: 5 }}>
        <IonLabel>
          Upload images: <span style={{ color: "red" }}>*</span>
        </IonLabel>
        <IonInput type="file" accept="image/*" onInput={handleFileChange} />
      </div>

      {imagesList.length > 0 && (
        <div className="inputArea" style={{ marginTop: 5 }}>
          <IonLabel>Selected Image:</IonLabel>
          <div className="image-container">
            {imagesList.map((selectedImage, selectedIndex) => {
              return (
                <IonImg
                  style={{ width: "100px", height: "100px" }}
                  key={selectedIndex}
                  src={URL.createObjectURL((selectedImage))}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
