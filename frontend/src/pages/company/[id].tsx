import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import CompanyCard from '../../components/companyCard';
import DealCard from '../../components/dealCard';
import axios from 'axios';

const CompanyPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [company, setCompany] = useState({});
  const [deals, setDeals] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (id) {
        axios.get(`http://localhost:20002/companies/${id}`)
            .then((response) => {
                if (response.data.company) {
                setCompany(response.data.company);
                } else {
                setErrorMessage('Company not found');
                }
            })
            .catch((error) => {
                console.error('Error fetching company data:', error);
                setErrorMessage('Error fetching company data');
            });
  
        axios.get(`http://localhost:20002/deals/company/${id}`)
            .then((response) => setDeals(response.data.deals))
            .catch((error) => {
            console.error('Error fetching deals data:', error);
            setErrorMessage('Error fetching deals data');
            });
      }
  }, [id]);

  return (
    <div>
      <div className="navbar">
        <Link className='homeBtn' href={`/`}><h1>Home</h1></Link>
        <Link className='homeBtn' href={`/companies`}><h1>Companies</h1></Link>
        <Link className='homeBtn' href={`/deals`}><h1>Deals</h1></Link>
      </div>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <>
          <h1>Company Details</h1>
          <CompanyCard company={company} />
          <h2>Deals</h2>
          {deals && deals.length > 0 && (
            <>
              {deals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CompanyPage;
