import React from 'react';
import Link from 'next/link';

const CompanyCard = ({ company }) => {
  return (
    <Link href={`/company/${company.company_id}`}>
        <div className="company-card">
          <h2>{company.name}</h2>
          <p>Country: {company.country}</p>
          <p>Founding Date: {company.founding_date}</p>
          <p>Description: {company.description}</p>
        </div>
    </Link>
  );
};

export default CompanyCard;
