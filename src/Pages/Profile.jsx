import React, { useContext, useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth'; 
import { AuthContext } from '../components/AuthProvider';

function Profile() {
  const [name, setName] = useState("Ruldolf");
  const [age, setAge] = useState(27);
  const [height, setHeight] = useState(1.76); // height in meters
  const [weight, setWeight] = useState(71); // weight in kg
  const [file, setFile] = useState(null); // Profile image to upload
  const [profileImageUrl, setProfileImageUrl] = useState(null); // To store uploaded image URL
  const [bmi, setBmi] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser?.uid;

  const storage = getStorage();
  const db = getFirestore();
  const auth = getAuth();

  // Calculate BMI whenever weight or height changes
  useEffect(() => {
    if (weight <= 0) {
      alert("Please key in your weight (kg)");
      return;
    }
  
    if (height > 0) {
      const bmiValue = (weight / (height * height)).toFixed(2);
      setBmi(bmiValue);
    }
  }, [weight, height]);
  

  // Handle profile image upload
  const handleFileUpload = async () => {
    if (file) {
      const user = auth.currentUser;
      if (!user) {
        alert("User not logged in!");
        return;
      }

      const storageRef = ref(storage, `profileImages/${user.uid}/${file.name}`);
      
      try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        setProfileImageUrl(downloadURL);

        await setDoc(doc(db, "users", user.uid), {
          name,
          age,
          height,
          weight,
          profileImageUrl: downloadURL,
        });

        alert('Profile image uploaded and user profile updated successfully!');
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload file.');
      }
    } else {
      alert('Please select a profile image to upload.');
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    handleFileUpload();
  };

  return (
    <div>
        {profileImageUrl && (
        <div>
          <img src={profileImageUrl} alt="Profile" style={{ width: "100px", height: "100px" }} />
        </div>
      )}
      <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            disabled
          />
        </div>
        <div>
          <label>Age:</label>
          <input 
            type="number" 
            value={age} 
            onChange={(e) => setAge(e.target.value)} 
            disabled
          />
        </div>
        <div>
          <label>Height (m):</label>
          <input 
            type="number" 
            step="0.01" 
            value={height} 
            onChange={(e) => setHeight(e.target.value)} 
          />
        </div>
        <div>
          <label>Weight (kg):</label>
          <input 
            type="number" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)} 
          />
        </div>
        <div>
          <label>Upload Profile Image:</label>
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])} 
          />
        </div>
        <button type="submit">Upload Profile Image</button>
      </form>
      
      {bmi && (
        <div>
          <h3>Hi {name}, your BMI is {bmi}</h3>
        </div>
      )}
        </div>
    </div>
  );
}

export default Profile;
