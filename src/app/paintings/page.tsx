import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Paintings - Ayman Siddique',
  description: 'Explore beautiful paintings by Ayman Siddique. Experience emotions through colors and brushstrokes.',
};

// Mock data - in a real app, this would come from your database
const paintings = [
  {
    id: '1',
    title: 'Sunset Dreams',
    description: 'A vibrant portrayal of hope and tranquility as day transitions to night.',
    price: 450.00,
    originalPrice: 500.00,
    image: '/placeholder-painting-1.jpg',
    category: 'Landscape',
    medium: 'Oil on Canvas',
    dimensions: '24" x 36"',
    isNew: true,
    inStock: true,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Urban Reflections',
    description: 'The bustling energy of city life captured in bold strokes and dynamic colors.',
    price: 380.00,
    image: '/placeholder-painting-2.jpg',
    category: 'Abstract',
    medium: 'Acrylic on Canvas',
    dimensions: '20" x 30"',
    isNew: false,
    inStock: true,
    isFeatured: false,
  },
  {
    id: '3',
    title: 'Whispers of Nature',
    description: 'A delicate exploration of natural beauty and the harmony found in simplicity.',
    price: 320.00,
    image: '/placeholder-painting-3.jpg',
    category: 'Nature',
    medium: 'Watercolor',
    dimensions: '16" x 24"',
    isNew: false,
    inStock: false,
    isFeatured: true,
  },
  {
    id: '4',
    title: 'Emotional Depths',
    description: 'An introspective piece that delves into the complexity of human emotions.',
    price: 520.00,
    image: '/placeholder-painting-4.jpg',
    category: 'Portrait',
    medium: 'Oil on Canvas',
    dimensions: '30" x 40"',
    isNew: true,
    inStock: true,
    isFeatured: false,
  },
  {
    id: '5',
    title: 'Golden Hour',
    description: 'Capturing the magical moment when light transforms the ordinary into extraordinary.',
    price: 410.00,
    image: '/placeholder-painting-5.jpg',
    category: 'Landscape',
    medium: 'Oil on Canvas',
    dimensions: '28" x 32"',
    isNew: false,
    inStock: true,
    isFeatured: true,
  },
  {
    id: '6',
    title: 'Midnight Thoughts',
    description: 'A contemplative piece exploring the quiet moments of introspection.',
    price: 350.00,
    image: '/placeholder-painting-6.jpg',
    category: 'Abstract',
    medium: 'Mixed Media',
    dimensions: '22" x 28"',
    isNew: false,
    inStock: true,
    isFeatured: false,
  },
];

const categories = ['All', 'Landscape', 'Abstract', 'Nature', 'Portrait'];

export default function PaintingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            Paintings
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience emotions through colors and brushstrokes. Each painting tells a unique story 
            and captures moments of beauty, reflection, and inspiration.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === 'All' ? 'primary' : 'outline'}
                size="sm"
                className="transition-all duration-200"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Paintings */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
            Featured Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paintings.filter(p => p.isFeatured).map((painting) => (
              <Card key={painting.id} className="group hover:shadow-2xl transition-all duration-300 bg-white overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative">
                    {/* Placeholder for painting image */}
                    <div className="aspect-[4/3] bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 flex items-center justify-center">
                      <div className="text-center text-gray-700">
                        <svg className="w-20 h-20 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm font-medium">{painting.title}</p>
                      </div>
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {painting.isNew && (
                        <Badge variant="success" size="sm">
                          New
                        </Badge>
                      )}
                      {!painting.inStock && (
                        <Badge variant="error" size="sm">
                          Sold
                        </Badge>
                      )}
                      <Badge variant="warning" size="sm">
                        Featured
                      </Badge>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" size="sm">
                        {painting.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-yellow-600 transition-colors">
                    {painting.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3">
                    {painting.description}
                  </p>
                  
                  {/* Details */}
                  <div className="space-y-1 mb-4 text-sm text-gray-500">
                    <p><span className="font-medium">Medium:</span> {painting.medium}</p>
                    <p><span className="font-medium">Size:</span> {painting.dimensions}</p>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ${painting.price.toFixed(2)}
                    </span>
                    {painting.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${painting.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Link href={`/paintings/${painting.id}`}>
                      <Button className="w-full" disabled={!painting.inStock}>
                        {painting.inStock ? 'View Details' : 'Sold Out'}
                      </Button>
                    </Link>
                    {painting.inStock && (
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

      {/* All Paintings Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
            All Paintings
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paintings.map((painting) => (
              <Card key={painting.id} className="group hover:shadow-xl transition-all duration-300 bg-white">
                <CardHeader className="p-0">
                  <div className="relative">
                    {/* Placeholder for painting image */}
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-center text-gray-600">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xs font-medium">{painting.title}</p>
                      </div>
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {painting.isNew && (
                        <Badge variant="success" size="sm">
                          New
                        </Badge>
                      )}
                      {!painting.inStock && (
                        <Badge variant="error" size="sm">
                          Sold
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-1 text-gray-900 group-hover:text-yellow-600 transition-colors">
                    {painting.title}
                  </h3>
                  
                  <p className="text-xs text-gray-500 mb-2">
                    {painting.medium} • {painting.dimensions}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      ${painting.price.toFixed(2)}
                    </span>
                    <Badge variant="secondary" size="sm">
                      {painting.category}
                    </Badge>
                  </div>
                  
                  <Link href={`/paintings/${painting.id}`} className="block mt-3">
                    <Button size="sm" className="w-full" disabled={!painting.inStock}>
                      {painting.inStock ? 'View' : 'Sold'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Commission Section */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Commission a Custom Painting
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Have a vision for a unique piece? Let&apos;s bring your ideas to life through custom artwork 
            tailored specifically for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700">
                Request Commission
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black">
              View Process
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}