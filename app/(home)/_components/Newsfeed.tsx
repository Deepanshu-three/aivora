import React from 'react';

const posts = [
  '/posts/post1.jpg',
  '/posts/post2.jpg',
  '/posts/post3.jpg',
  '/posts/post4.jpg',
];

const Newsfeed = () => {
  return (
    <section className="text-center my-10 px-4 max-w-7xl mx-auto">
      <span className="text-gray-500 font-semibold uppercase tracking-wide">
        NEWSFEED
      </span>

      <h1 className="text-5xl sm:text-6xl font-medium my-4 text-gray-900">
        Instagram
      </h1>

      <p className="text-lg sm:text-2xl max-w-xl mx-auto mb-4 text-gray-700">
        Follow us on social media for more discounts & promotions
      </p>

      <span className="text-2xl font-bold text-blue-600 mb-8 block">@aviore_official</span>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {posts.map((src, idx) => (
          <div key={idx} className="relative w-full aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl cursor-pointer transition-shadow">
            <img
              src={src}
              alt={`Instagram post ${idx + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Newsfeed;
