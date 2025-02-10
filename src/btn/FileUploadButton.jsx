import { useRef } from "react";
import { Button } from "react-bootstrap";

const FileUploadButton = ({ onChange }) => {
  const fileInputRef = useRef(null);

  // બટન ક્લિક થાય ત્યારે ફાઈલ અપલોડ ડાયલોગ ઓપન થશે
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      {/* 👉 હિડન file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onChange}
        accept="image/*"
        style={{ display: "none" }} // ફાઈલ ઈનપુટ છુપાવ્યું
      />

      {/* 👉 Custom બટન */}
      <Button variant="primary" className="h-2" onClick={handleButtonClick}>
        +
      </Button>
    </div>
  );
};

export default FileUploadButton;
