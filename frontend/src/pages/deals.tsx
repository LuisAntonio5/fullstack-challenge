import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import DealCard from '../components/DealCard';

const Deals = () => {
  const [deals, setDeals] = useState([]);

  const fetchDeals = async () => {
    try {
      const response = await axios.get('http://localhost:20002/deals');
      setDeals(response.data.deals);
    } catch (error) {
      console.error('Error fetching deals:', error);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  return (
    <div>
      <div className="navbar">
        <Link className='homeBtn' href={`/`}><h1>Home</h1></Link>
        <Link className='homeBtn' href={`/companies`}><h1>Companies</h1></Link>
      </div>
      <h1 className='text-center'>Deals</h1>
      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
};

export default Deals;
