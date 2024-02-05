import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import CompanyCard from '../components/companyCard';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [searchQueryName, setSearchQueryName] = useState('');
  const [searchQueryCountry, setSearchQueryCountry] = useState('');

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:20002/companies');
      setCompanies(response.data.companies);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };
  
  useEffect(() => {
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((company) => {
    const companyName = company.name ? company.name.toLowerCase() : "";
    const companyCountry = company.country ? company.country.toLowerCase() : "";

    return (
      companyName.includes(searchQueryName.toLowerCase()) &&
      companyCountry.includes(searchQueryCountry.toLowerCase())
    );
  });

  return (
    <div>
      <div className="navbar">
        <Link className='homeBtn' href={`/`}><h1>Home</h1></Link>
        <Link className='homeBtn' href={`/deals`}><h1>Deals</h1></Link>
      </div>
      <h1 className='text-center'>Companies</h1>
      <p className='text-center'>try clicking a company card!</p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQueryName}
            onChange={(e) => setSearchQueryName(e.target.value)}
          />
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by country"
            value={searchQueryCountry}
            onChange={(e) => setSearchQueryCountry(e.target.value)}
          />
        </div>
        {filteredCompanies.map((company) => (
          <CompanyCard key={company.company_id} company={company} />
        ))}
    </div>
  );
};

export default Companies;
