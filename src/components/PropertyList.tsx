import React from 'react';
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

interface PropertyListProps {
  filters: {
    minPrice: number;
    maxPrice: number;
    location: string;
    propertyType: string;
  };
}

const PropertyList: React.FC<PropertyListProps> = ({ filters }) => {
  // This is mock data. In a real application, you would fetch this from an API
  const properties: Property[] = [
    {
      id: 1,
      title: "Modern Apartment in City Center",
      price: 250000,
      location: "New York",
      type: "apartment",
      bedrooms: 2,
      bathrooms: 1,
      area: 800,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      title: "Spacious Family Home with Garden",
      price: 450000,
      location: "Los Angeles",
      type: "house",
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 3,
      title: "Luxury Condo with Ocean View",
      price: 750000,
      location: "Miami",
      type: "condo",
      bedrooms: 3,
      bathrooms: 2,
      area: 1500,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
  ];

  const filteredProperties = properties.filter(property => 
    property.price >= filters.minPrice &&
    property.price <= filters.maxPrice &&
    (filters.location === '' || property.location.toLowerCase().includes(filters.location.toLowerCase())) &&
    (filters.propertyType === '' || property.type === filters.propertyType)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProperties.map(property => (
        <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
            <p className="text-gray-600 mb-2">{property.location}</p>
            <p className="text-blue-600 font-bold text-lg mb-2">${property.price.toLocaleString()}</p>
            <div className="flex justify-between text-gray-600">
              <span className="flex items-center"><Bed size={16} className="mr-1" /> {property.bedrooms}</span>
              <span className="flex items-center"><Bath size={16} className="mr-1" /> {property.bathrooms}</span>
              <span className="flex items-center"><Square size={16} className="mr-1" /> {property.area} sqft</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;