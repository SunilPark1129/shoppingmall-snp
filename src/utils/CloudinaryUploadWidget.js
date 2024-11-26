import React, { createContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../App.css";
import "../common/style/common.style.css";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ uwConfig, uploadImage }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");

      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }

      // 위 코드가 랜더링이 되었다면 바로 widge에 addEventListener의 open을 설정해주기
      // 이것은 upload image를 클릭할시에 한번 클릭으로 안열리는 문제를 해결한 코드 입니다
    }
    if (loaded) {
      initializeCloudinaryWidget();
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    var myWidget = window.cloudinary.createUploadWidget(
      uwConfig,
      (error, result) => {
        if (!error && result && result.event === "success") {
          uploadImage(result.info.secure_url);
        }
      }
    );

    const widget = document.getElementById("upload_widget");
    widget.addEventListener("click", openWidge);

    function openWidge() {
      myWidget.open();
      // 클릭할때마다 listener 값을 없애주기
      // image upload를 취소하고 다시 widge을 클릭하여 열때마다 중복되는 것을 방지
      widget.removeEventListener("click", openWidge);
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <Button
        id="upload_widget"
        size="sm"
        className="ml-2"
        onClick={initializeCloudinaryWidget}
      >
        Upload Image +
      </Button>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
