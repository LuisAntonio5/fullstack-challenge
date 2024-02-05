import React from 'react';

const DealCard = ({ deal }) => {
  return (
    <div className="deal-card">
      <h2>Funding Round: {deal.funding_round}</h2>
      <p>Date: {new Date(deal.date).toLocaleDateString()}</p>
      <p>Funding Amount: ${deal.funding_amount}</p>
      <p>Company ID: {deal.company_id}</p>
    </div>
  );
};

export default DealCard;
