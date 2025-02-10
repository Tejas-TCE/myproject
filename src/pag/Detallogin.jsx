import { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css"; 
import { Card, Button } from "react-bootstrap";
import { logoutUser } from "../../slicecomponet/Slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FileUploadButton from "../btn/FileUploadButton";
import axios from "axios";



const ProfileCard = () => {
  const [username, setusername] = useState("");
  const [useremail, setuseremail] = useState("");
  const [userid, setuserid] = useState("");
  

  // Image Crop States
  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const cropperRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const localdata = localStorage.getItem("Loginpag");
    if (localdata) {
      const user = JSON.parse(localdata);
    setusername(user.name);
      setuseremail(user.email);
      setuserid(user.id)
    }
    if (cropData) {
      uploadImageToServer();
    }
  }, [cropData]);

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate("/Loginpag");
      });
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCropData = async() => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const cropper = cropperRef.current.cropper;
      const croppedCanvas = cropper.getCroppedCanvas({ width: 200, height: 200 });

      if (croppedCanvas) {
        setCropData(croppedCanvas.toDataURL()); 
        setShowCropper(false);
      }
    }


  }; 
  const uploadImageToServer = async () => {
    try {
      const { data: oldUserData } = await axios.get(`http://localhost:3005/users/${userid}`);
  
      const response = await axios.put(`http://localhost:3005/users/${userid}`, {
        ...oldUserData, // ✅ જૂનુ data રખાશે
        image:cropData, // ✅ Image Set થશે (Null નહીં)
      });
  
      console.log("✅ Image updated successfully:", response);
      alert("🎉 Image Successfully Uploaded!");
    } catch (error) {
      console.error("❌ Error uploading image:", error);
      alert("⚠️ Image Upload Failed!");
    }
  };




  ////////api me img ko aplod////
 
  return (
    <Card className="text-center shadow-lg p-3 mb-5 bg-white rounded d-flex justify-content-center align-items-center vh-100">
      <Card.Body>
        {/* ✅ Profile Image */}
        {cropData ? (
          <img 
            src={cropData} 
            alt="Profile" 
            style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} 
          />
        ) : (
          <div style={{ width: "100px", height: "100px", borderRadius: "50%", backgroundColor: "#ddd" }}></div>
        )}

         {/* ✅ Image Upload Input */}
        
       <FileUploadButton onChange={onChange} />


        {/* ✅ Cropper */}
        {showCropper && image && (
          <>
            <Cropper
              ref={cropperRef}
              src={image}
              style={{ height: 300, width: "100%" }}
              aspectRatio={1} // Keep square ratio for profile picture
              guides={false}
              cropBoxResizable={true}
              viewMode={1}
            />
            <Button onClick={getCropData} className="mt-2">Crop & Save</Button>
          </>
        )}

        {/* ✅ User Details */}
        <Card.Title>{username}</Card.Title>
        <h6>{useremail}</h6>

        {/* ✅ Logout Button */}
        <Button variant="danger" onClick={handleLogout}>Logout</Button>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
