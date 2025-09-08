import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Books - Ayman Siddique',
  description: 'Explore inspiring books by Ayman Siddique. Discover stories that challenge perspectives and ignite imagination.',
};

// Mock data - in a real app, this would come from your database
const books = [
  {
    id: '1',
    title: 'The Journey Within',
    description: 'A profound exploration of self-discovery and personal growth through life\'s challenges.',
    price: 25.99,
    originalPrice: 29.99,
    image: '/placeholder-book-1.jpg',
    category: 'Self-Help',
    isNew: true,
    inStock: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: '2',
    title: 'Colors of Tomorrow',
    description: 'A collection of short stories that paint vivid pictures of hope and resilience.',
    price: 22.99,
    image: '/placeholder-book-2.jpg',
    category: 'Fiction',
    isNew: false,
    inStock: true,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: '3',
    title: 'Whispers of Wisdom',
    description: 'Timeless insights and reflections on life, love, and the pursuit of meaning.',
    price: 19.99,
    image: '/placeholder-book-3.jpg',
    category: 'Philosophy',
    isNew: false,
    inStock: false,
    rating: 4.9,
    reviews: 156,
  },
  {
    id: '4',
    title: 'The Creative Mind',
    description: 'Unlock your creative potential with practical exercises and inspiring stories.',
    price: 27.99,
    image: '/placeholder-book-4.jpg',
    category: 'Creativity',
    isNew: true,
    inStock: true,
    rating: 4.7,
    reviews: 203,
  },
];

export default function BooksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            Books
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover a collection of inspiring books that challenge perspectives, 
            ignite imagination, and offer profound insights into the human experience.
          </p>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book) => (
              <Card key={book.id} className="group hover:shadow-xl transition-all duration-300 bg-white">
                <CardHeader className="p-0">
                  <div className="relative">
                    {/* Placeholder for book cover */}
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-lg flex items-center justify-center">
                      <div className="text-center text-gray-600">
                        <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm font-medium">{book.title}</p>
                      </div>
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {book.isNew && (
                        <Badge variant="success" size="sm">
                          New
                        </Badge>
                      )}
                      {!book.inStock && (
                        <Badge variant="error" size="sm">
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" size="sm">
                        {book.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-yellow-600 transition-colors">
                    {book.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {book.description}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(book.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {book.rating} ({book.reviews} reviews)
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ${book.price}
                    </span>
                    {book.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${book.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Link href={`/books/${book.id}`}>
                      <Button className="w-full" disabled={!book.inStock}>
                        {book.inStock ? 'View Details' : 'Out of Stock'}
                      </Button>
                    </Link>
                    {book.inStock && (
                      <Button variant="outline" className="w-full">
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Be the first to know about new book releases and exclusive content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-black"
            />
            <Button className="bg-yellow-600 hover:bg-yellow-700">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}