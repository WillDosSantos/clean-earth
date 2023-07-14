import React, { useState, useEffect } from 'react';
import { db, storage, firebase, auth } from '../firebase'; // import the exports from the previous file
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'; // new imports
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Link } from 'react-router-dom';

const AddListing = () => {
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState(null);
  const [tags, setTags] = useState('');
  const [details, setDetails] = useState('');
  const [contribution, setContribution] = useState('');
  const [newListingId, setNewListingId] = useState(null);
  const [user, setUser] = useState(null);
  const onFileChange = e => {
    setPhoto(e.target.files[0]);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    return () => unsubscribe();
}, []);


  const onSubmit = async e => {
    e.preventDefault();
  
    if (!user) {
      alert("You must be logged in to add a listing.");
      return;
    }

    // Upload the photo to Firebase Storage and get the download URL
    let storageRef = ref(storage, `images/${photo.name}`);
    let uploadTask = uploadBytesResumable(storageRef, photo);
    
  
    uploadTask.on(
      "state_changed",
      snapshot => {
        // Handle the progress of the upload task
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      error => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          // Once the photo is uploaded, create the new listing in Firestore
          addDoc(collection(db, 'listings'), {
            address,
            photo: downloadURL,
            tags,
            details,
            contribution,
            createdAt: serverTimestamp(),
            userUID: user.uid,
            userEmail: user.email,
            timestamp: serverTimestamp(),
          }).then((docRef) => {
            console.log("Document successfully written!");
            console.log("New listing ID: ", docRef.id);  // Log the ID of the new listing
            setNewListingId(docRef.id);  // Save the ID in the state
          }).catch((error) => {
            console.error("Error writing document: ", error);
          });
        }).catch((error) => {
          console.error("Error getting downloadURL: ", error);
        });
      }
    );
  };

  

  return (
    <div>
    <form onSubmit={onSubmit}>
      <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" required />
      <input type="file" onChange={onFileChange} required />
      <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags" required />
      <textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="Details" required />
      <input type="number" value={contribution} onChange={e => setContribution(e.target.value)} placeholder="Contribution" required />
      <button type="submit">Add Listing</button>
    </form>
    {newListingId ? <Link to={`/listing/${newListingId}`}>View Details</Link> : null}
    </div>
  );
};

export default AddListing;
