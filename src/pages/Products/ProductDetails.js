import React from 'react';
import { products } from '../../utils/productdata';
import { useParams, Link, useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import { IC_WELCOME_BG } from '../../assets/images';
// import CustomerReviews from './CustomerReviews';

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const product = products.find(p => p.id === parseInt(id));
  const isActive = (path) => location.pathname === path ? '' : '';

  return (
    <div className="mb-20 p-8 ">
      {/* <div
        className="flex h-64 w-full items-center justify-center text-center text-white mb-10"
        style={{
          backgroundImage: `url(${IC_WELCOME_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="rounded-md">
          <h1 className="text-4xl font-bold">OverView</h1>
          <p className="mt-4 text-lg font-medium">
            We are looking for dedicated, enthusiastic, and motivated personnel
            interested in working in the Healthcare sector.
          </p>
        </div>
      </div> */}
       {/* <nav className="mb-4">
        <Link to="/" className={isActive('/')}>Home</Link> &gt; 
        <Link to="/products/baxter" className={isActive('/products/baxter/details')}>Products</Link> &gt; 
        <span className="font-semibold font-poppins_cf text-theme-dark">{product.name}</span>
      </nav> */}
      <div className="flex flex-col md:flex-row">
        <img src={'https://images.stockcake.com/public/2/7/8/2786aaa1-66ae-4360-8af3-160232beced6/medical-equipment-stand-stockcake.jpg'} alt={product.name} className=" w-96 object-contain"/>
        <div className="ml-0 md:ml-6">
          <h1 className="text-xl font-semibold text-theme-black font-poppins_w">{product.name}</h1>
          <h2 className="text-base text-theme-grey font-poppins_cf">{product.model}</h2>
          {/* <p className="text-2xl font-semibold mt-2">${product.price}</p> */}
          <p className="text-base text-theme-grey mt-4 font-poppins_cf font-normal">{product.description}</p>
          <ul className="mt-2 space-y-1">
            {product.features.map((feature, index) => (
              
              <div key={index} className="text-theme-grey flex text-sm">
              
    
                {feature}
              </div>
            ))}
          </ul>
          {/* <Button className="mt-4 w-fit rounded border-[1px] px-3 font-medium text-white sm:px-2 h-10 bg-theme-dark">
            Buy Now
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
