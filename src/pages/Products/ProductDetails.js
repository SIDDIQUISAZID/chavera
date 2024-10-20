import React from 'react';
import { products } from '../../utils/productdata';
import { useParams, Link, useLocation } from 'react-router-dom';
import Button from '../../components/Button';
// import CustomerReviews from './CustomerReviews';

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const product = products.find(p => p.id === parseInt(id));
  const isActive = (path) => location.pathname === path ? '' : '';

  return (
    <div className="max-w-7xl mx-auto p-6 mb-20 ">
       <nav className="mb-4">
        <Link to="/" className={isActive('/')}>Home</Link> &gt; 
        <Link to="/products/baxter" className={isActive('/products/baxter/details')}>Products</Link> &gt; 
        <span className="font-semibold font-poppins_cf text-theme-dark">{product.name}</span>
      </nav>
      <div className="flex flex-col md:flex-row">
        <img src={'https://images.stockcake.com/public/2/7/8/2786aaa1-66ae-4360-8af3-160232beced6/medical-equipment-stand-stockcake.jpg'} alt={product.name} className="w-full md:w-1/2 h-auto"/>
        <div className="ml-0 md:ml-6">
          <h1 className="text-4xl font-extrabold">{product.name}</h1>
          <h2 className="text-2xl text-gray-600">{product.model}</h2>
          <p className="text-2xl font-semibold mt-2">${product.price}</p>
          <p className="text-lg mt-4">{product.description}</p>
          <ul className="mt-4 space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="text-gray-600 flex items-center">
                <svg /* Add icon here */ className="h-5 w-5 text-green-500 mr-2" />
                {feature}
              </li>
            ))}
          </ul>
          <Button className="mt-4 w-fit rounded border-[1px] px-3 font-medium text-white sm:px-2 h-10 bg-theme-dark">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
