import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IonInput, IonLabel, IonImg } from "@ionic/react";
import { startCampignDataActions } from "../../store/redux/start-campaign-data-slice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function Images() {
  const dispatch = useDispatch();
  const selectedImages = useSelector(
    (state) => state["startCampignData"].selectedImages
  );
  const existingImages = useSelector(
    (state) => state["startCampignData"].existingImages
  );
   //console.log(existingImages);
  const setSelectedImages = (value) =>
    dispatch(
      startCampignDataActions.setData({ field: "selectedImages", data: value })
    );
  const [imagesList, setImagesList] = useState([]);

  function serializeFile(file) {
    return {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
      url: URL.createObjectURL(file),
    };
  }

  async function blobUrlToFile(selectedImg) {
    try {
      // Fetch the Blob data from the Blob URL
      const response = await fetch(selectedImg.url);
      const blobData = await response.blob();

      // Create a new File object
      const file = new File([blobData], selectedImg.name, {
        type: selectedImg.type,
      });

      return file;
    } catch (error) {
      console.error("Error converting Blob URL to File object:", error);
    }
  }
  useEffect(() => {
    async function tt() {
      const promises = selectedImages.map(async (selectedImg) => {
        return await blobUrlToFile(selectedImg);
      });
      const d = await Promise.all(promises);
      setImagesList(d);
    }
    if (selectedImages.length > 0) {
      tt();
    }
  }, [selectedImages]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setSelectedImages([...selectedImages, serializeFile(file)]);
  };
  return (
    <>
      <div className="inputArea" style={{ marginTop: 5 }}>
        <IonLabel>
          Upload images: <span style={{ color: "red" }}>*</span>
        </IonLabel>
        <IonInput type="file" accept="image/*" onInput={handleFileChange} />
      </div>

      {(imagesList.length > 0 || existingImages.length > 0) && (
        <div className="inputArea" style={{ marginTop: 5 }}>
          <IonLabel>Selected Image:</IonLabel>
          <div className="image-container">
            {existingImages &&
              existingImages.map((imageUrl, imageUrlIndex) => {
                return (
                  <LazyLoadImage
                    key={imageUrlIndex}
                    effect="blur"
                    width={100}
                    height={100}
                    src={imageUrl}
                  />
                );
              })}
            {imagesList.map((selectedImage, selectedIndex) => {
              return (
                <LazyLoadImage
                  key={selectedIndex}
                  effect="blur"
                  width={100}
                  height={100}
                  src={URL.createObjectURL(selectedImage)}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
