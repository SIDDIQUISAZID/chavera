import React from 'react';

const reviews = [
  {
    id: 1,
    name: 'John Doe',
    rating: 5,
    comment: 'Excellent product! Highly recommend for anyone in need of reliable medical devices.',
  },
//   {
//     id: 2,
//     name: 'Jane Smith',
//     rating: 4,
//     comment: 'Very good quality, but the delivery was a bit slow.',
//   },
//   {
//     id: 3,
//     name: 'Emily Johnson',
//     rating: 5,
//     comment: 'Fantastic experience! The device works perfectly.',
//   },
];

const RatingStars = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15.27L16.18 20l-1.64-7.03L20 8.24l-7.19-.61L10 2 7.19 7.63 0 8.24l5.46 4.73L3.82 20z" />
        </svg>
      ))}
    </div>
  );
};

const CustomerReviews = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold">Customer Reviews</h3>
      <div className="mt-4 space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="p-4 border rounded shadow-md bg-white">
            <h4 className="font-semibold">{review.name}</h4>
            <RatingStars rating={review.rating} />
            <p className="text-gray-600 mt-1">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
