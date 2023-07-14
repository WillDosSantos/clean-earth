import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase'; // import the exports from the previous file
import { doc, getDoc } from 'firebase/firestore';

const ListingDetails = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchListing();
  }, [id]);

  return (
    <div>
      {listing ? (
        <>
          <h1>{listing.address}</h1>
          <img src={listing.photo} alt={listing.address} />
          <p>{listing.details}</p>
          {/* Add more fields as necessary */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ListingDetails;
