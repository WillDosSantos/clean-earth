import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; 

const ListingsPage = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const listingsCollection = collection(db, 'listings');
      const listingSnapshot = await getDocs(listingsCollection);
      const listingList = listingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setListings(listingList);
    };

    fetchListings();
  }, []);

  return (
    <div>
      {listings.map(listing => (
        <div key={listing.id}>
          <h2>{listing.address}</h2>
          <Link to={`/listing/${listing.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default ListingsPage;
