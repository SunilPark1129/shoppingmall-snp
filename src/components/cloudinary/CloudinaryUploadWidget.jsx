import { createContext, useEffect, useState } from 'react';

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ uwConfig, uploadImage }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById('uw');

      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement('script');
        script.setAttribute('async', '');
        script.setAttribute('id', 'uw');
        script.src = 'https://upload-widget.cloudinary.com/global/all.js';
        script.addEventListener('load', () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
    if (loaded) {
      initializeCloudinaryWidget();
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    var myWidget = window.cloudinary.createUploadWidget(
      uwConfig,
      (error, result) => {
        if (!error && result && result.event === 'success') {
          uploadImage(result.info.secure_url);
        }
      }
    );

    const widget = document.getElementById('upload_widget');
    widget.addEventListener('click', openWidge);

    function openWidge() {
      myWidget.open();
      widget.removeEventListener('click', openWidge);
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button id="upload_widget" onClick={initializeCloudinaryWidget}>
        Upload Image +
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
