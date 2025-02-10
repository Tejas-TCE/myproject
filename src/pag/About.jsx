import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const About = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const maxWords = 50; // Set  word limit


     /////condition of  png &jpeg///////
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => file.type === "image/jpeg" || file.type === "image/png");

    if (validFiles.length + images.length > 5) {
      setError("You can only upload a maximum of 5 images.");
      return;
    }

    const imageUrls = validFiles.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...imageUrls]);
    setError("");
  };

  const handleDescriptionChange = (value) => {
    const text = value.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tags
    const wordCount = text.trim().split(/\s+/).length;
    
    
    if (wordCount <= maxWords) {
      setDescription(value);
      console.log(value);
    } else {
      setError(`Description cannot exceed ${maxWords} words.`);
    }
  };




  const handleSubmit = (e) => {
    e.preventDefault();

    if (images.length === 0) {
      setError("Please upload at least one image before submitting.");
      return;
    }

    if (!description) {
      setError("Please enter a description before submitting.");
      return;
    }

    setError("");
    setLoading(true);

    // Simulate an API call
    setTimeout(() => {
      const newSubmission = { images, description };
      setSubmissions(prevSubmissions => [...prevSubmissions, newSubmission]);
      setImages([]);
      setDescription("");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md max-w-md mx-auto w-50">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl text-center font-semibold mb-4">Upload Images (JPEG/PNG Only, Max 5)</h2>

        <input
          type="file"
          accept="image/jpeg, image/png"
          multiple
          onChange={handleImageChange}
          className="mb-2"
        />

        {images.length > 0 && (
          <div className="mb-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Uploaded ${index + 1}`}
                style={{ width: "200px", height: "150px" }}
                className="img-fluid mb-2"
              />
            ))}
          </div>
        )}

        <ReactQuill theme="snow" value={description} onChange={handleDescriptionChange} />

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {submissions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Submissions</h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Images</th>
                <th className="py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2">
                    {submission.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Submission ${index + 1} - Image ${idx + 1}`}
                        style={{ width: "50px", height: "50px" }}
                        className="inline-block mr-2"
                      />
                    ))}
                  </td>
                  <td className="py-2">{submission.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default About;
