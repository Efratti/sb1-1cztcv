import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterBar from '../components/FilterBar';
import PropertyList from '../components/PropertyList';

const Home: React.FC = () => {
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000000,
    location: '',
    propertyType: '',
  });
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/properties', { params: filters });
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, [filters]);

  return (
    <>
      <FilterBar filters={filters} setFilters={setFilters} />
      <PropertyList properties={properties} />
    </>
  );
};

export default Home;