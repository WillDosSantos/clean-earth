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
        <div className="card" key={listing.id}>
          <h2>{listing.address}</h2>
          <img src={listing.photo} alt="feature image"></img>
          <Link to={`/listing/${listing.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default ListingsPage;
