import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CompanyCard from '../components/companyCard';

const Companies = () => {
  const [companies, setCompanies] = useState([]);

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

  return (
    <div>
      <h1>Companies</h1>
      {companies.map((company) => (
        <CompanyCard key={company.company_id} company={company} />
      ))}
    </div>
  );
};

export default Companies;
