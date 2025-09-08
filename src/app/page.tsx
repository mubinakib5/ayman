import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 px-4">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
            Ayman Siddique
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Discover a world of creativity through inspiring books and captivating paintings. 
            Explore stories that touch the soul and art that speaks to the heart.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/books">
              <Button size="lg" className="w-full sm:w-auto">
                Explore Books
              </Button>
            </Link>
            <Link href="/paintings">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black">
                View Paintings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Featured Works
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Books Section */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="relative h-64 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-black">
                      <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-2xl font-bold">Books</h3>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Literary Journey</h3>
                <p className="text-gray-600 mb-6">
                  Dive into thought-provoking narratives and inspiring stories that challenge perspectives 
                  and ignite imagination. Each book is crafted with passion and purpose.
                </p>
                <Link href="/books">
                  <Button className="w-full group-hover:bg-yellow-600">
                    Browse Books
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Paintings Section */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="relative h-64 bg-gradient-to-br from-gray-800 to-black rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      <h3 className="text-2xl font-bold">Paintings</h3>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Visual Expression</h3>
                <p className="text-gray-600 mb-6">
                  Experience emotions through colors and brushstrokes. Each painting tells a unique story 
                  and captures moments of beauty, reflection, and inspiration.
                </p>
                <Link href="/paintings">
                  <Button variant="outline" className="w-full group-hover:border-black group-hover:bg-black group-hover:text-white">
                    View Gallery
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">
            About the Artist
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Ayman Siddique is a passionate creator who believes in the power of storytelling through both 
            written word and visual art. With a unique perspective on life and creativity, each work 
            reflects a deep commitment to authenticity and emotional connection.
          </p>
          <Link href="/about">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Start Your Journey
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Whether you&apos;re seeking inspiration through literature or visual art, 
            there&apos;s something here for every creative soul.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/books">
              <Button size="lg" className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700">
                Shop Books
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
