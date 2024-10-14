import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = 'your_secret_key'; // In a real app, use an environment variable

// Mock user data (replace with a database in a real app)
const users = [];

// Mock property data (replace with a database in a real app)
const properties = [
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

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/api/properties', (req, res) => {
  const { minPrice, maxPrice, location, propertyType } = req.query;
  let filteredProperties = properties;

  if (minPrice) filteredProperties = filteredProperties.filter(p => p.price >= Number(minPrice));
  if (maxPrice) filteredProperties = filteredProperties.filter(p => p.price <= Number(maxPrice));
  if (location) filteredProperties = filteredProperties.filter(p => p.location.toLowerCase().includes(location.toLowerCase()));
  if (propertyType) filteredProperties = filteredProperties.filter(p => p.type === propertyType);

  res.json(filteredProperties);
});

app.get('/api/properties/:id', (req, res) => {
  const property = properties.find(p => p.id === Number(req.params.id));
  if (property) {
    res.json(property);
  } else {
    res.status(404).json({ message: 'Property not found' });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));