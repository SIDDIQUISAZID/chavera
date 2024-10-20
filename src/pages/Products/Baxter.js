import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { products } from '../../utils/productdata';
import Button from '../../components/Button';

const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path) => 
    location.pathname === path ? 'font-bold text-red-500' : 'text-gray-700';

  const handleViewDetails = (id) => {
    navigate(`/products/baxter/details/${id}`);
  };

  return (
    <div className="p-6">
      <nav className="mb-4">
        <Link to="/" className={isActive('/')}>Home</Link> &gt; 
        <Link to="/products/baxter" className={isActive('/products/baxter')}>Products</Link>
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 shadow-md bg-white flex flex-col">
            <img 
              src={'https://images.stockcake.com/public/2/7/8/2786aaa1-66ae-4360-8af3-160232beced6/medical-equipment-stand-stockcake.jpg'} 
              alt={product.name} 
              className="w-full h-48 object-cover" 
            />
            <div className="flex-grow">
              <h2 className="text-lg font-medium mt-4">{product.name}</h2>
              <p className="text-gray-500">{product.model}</p>
            </div>
            <Button
              onClick={() => handleViewDetails(product.id)} 
              className="mt-4 w-fit rounded border-[1px] px-3 font-medium text-white sm:px-2 h-10 bg-theme-dark"
            >
              View Product
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
