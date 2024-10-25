import React, { useContext, useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth'; 
import { AuthContext } from '../components/AuthProvider';

function Profile() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(null); 
  const [height, setHeight] = useState(null); 
  const [weight, setWeight] = useState(null); 
  const [file, setFile] = useState(null); 
  const [profileImageUrl, setProfileImageUrl] = useState(null); 
  const [bmi, setBmi] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const uid = currentUser?.uid;

  const storage = getStorage();
  const db = getFirestore();
  const auth = getAuth();

  // Load existing profile data from Firestore when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      if (uid) {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || "");
          setAge(data.age || null);
          setHeight(data.height || null);
          setWeight(data.weight || null);
          setProfileImageUrl(data.profileImageUrl || null);
        } else {
          console.log("No such document!");
        }
      }
    };
    fetchProfileData();
  }, [uid]);

  // Calculate BMI
  useEffect(() => {
    if (weight > 0 && height > 0) {
      const bmiValue = (weight / (height * height)).toFixed(2);
      setBmi(bmiValue);
    } else {
      setBmi(null);
    }
  }, [weight, height]);

  // Update Firestore with profile data
  const updateProfileData = async () => {
    if (uid) {
      try {
        await setDoc(doc(db, "users", uid), {
          name,
          age,
          height,
          weight,
          profileImageUrl,
        }, { merge: true });
      } catch (error) {
        console.error("Error updating profile data:", error);
      }
    }
  };

  // Call updateProfileData on input change
  useEffect(() => {
    updateProfileData();
  }, [name, age, height, weight, profileImageUrl]);

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

        // Update Firestore with the new image URL
        await updateProfileData();
        
        alert('Profile image uploaded and user profile updated successfully!');
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload file.');
      }
    } else {
      alert('Please select a profile image to upload.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFileUpload();
  };

  return (
    <div className="container mt-4">
      {profileImageUrl && (
        <div className="mb-3">
          <img src={profileImageUrl} alt="Profile" className="img-thumbnail" style={{ width: "100px", height: "100px" }} />
        </div>
      )}
      <form onSubmit={handleSubmit} className="form-group">
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age:</label>
          <input 
            type="number" 
            value={age || ''} 
            onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : null)} 
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Height (m):</label>
          <input 
            type="number" 
            step="0.01" 
            value={height || ''} 
            onChange={(e) => setHeight(e.target.value ? parseFloat(e.target.value) : null)} 
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Weight (kg):</label>
          <input 
            type="number" 
            value={weight || ''} 
            onChange={(e) => setWeight(e.target.value ? parseFloat(e.target.value) : null)} 
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Profile Image:</label>
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])} 
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
      
      {bmi && (
        <div className="mt-3">
          <h3>Hi {name}, your BMI is {bmi}</h3>
        </div>
      )}
    </div>
  );
}

export default Profile;
