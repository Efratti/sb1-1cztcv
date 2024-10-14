import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Bed, Bath, Square } from 'lucide-react';

interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
}

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };
    fetchProperty();
  }, [id]);

  if (!property) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={property.image} alt={property.title} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h2 className="text-3xl font-semibold mb-4">{property.title}</h2>
        <p className="text-gray-600 mb-4">{property.location}</p>
        <p className="text-blue-600 font-bold text-2xl mb-4">${property.price.toLocaleString()}</p>
        <div className="flex justify-between text-gray-600 mb-6">
          <span className="flex items-center"><Bed size={20} className="mr-2" /> {property.bedrooms} Bedrooms</span>
          <span className="flex items-center"><Bath size={20} className="mr-2" /> {property.bathrooms} Bathrooms</span>
          <span className="flex items-center"><Square size={20} className="mr-2" /> {property.area} sqft</span>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          Contact Agent
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;