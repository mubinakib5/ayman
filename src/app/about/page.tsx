import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'About - Ayman Siddique',
  description: 'Learn about Ayman Siddique, a passionate creator who believes in the power of storytelling through both written word and visual art.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-20 px-4">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                About Ayman
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                A passionate creator who believes in the power of storytelling through both 
                written word and visual art. Each work reflects a deep commitment to authenticity 
                and emotional connection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
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
            <div className="relative">
              {/* Placeholder for profile image */}
              <div className="aspect-square bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <div className="text-center text-black">
                  <svg className="w-32 h-32 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <p className="text-2xl font-bold">Ayman Siddique</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-gray-900 text-center">
            My Journey
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl leading-relaxed mb-6">
              Art has always been my language of choice when words fall short. From an early age, 
              I found myself drawn to both the written word and the visual canvas, discovering that 
              each medium offers unique ways to explore the human experience.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              My journey as a creator began with a simple belief: that stories have the power to 
              transform lives. Whether through the pages of a book or the strokes of a brush, 
              I strive to create works that resonate with the soul and inspire meaningful reflection.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Each book I write and every painting I create is born from a place of authenticity. 
              I believe that true art emerges when we dare to be vulnerable, when we share our 
              deepest truths and invite others to find pieces of themselves within our work.
            </p>
            <p className="text-lg leading-relaxed">
              Today, I continue to explore the intersection of literature and visual art, 
              always seeking new ways to connect with readers and viewers on a profound level. 
              My hope is that through my work, others might find inspiration, comfort, and 
              the courage to pursue their own creative journeys.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-gray-900 text-center">
            Creative Philosophy
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Authenticity</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Every piece I create comes from a place of genuine emotion and experience. 
                  I believe that authenticity is the foundation of meaningful art.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Connection</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Art should bridge the gap between souls. I strive to create works that 
                  foster deep emotional connections and shared understanding.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Growth</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  I believe in the transformative power of art. Each work is an opportunity 
                  for both creator and audience to grow and evolve.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-gray-900 text-center">
            Milestones & Recognition
          </h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-4 h-4 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Published Author</h3>
                <p className="text-gray-600">
                  Multiple published works exploring themes of personal growth, creativity, and human connection.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-4 h-4 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Gallery Exhibitions</h3>
                <p className="text-gray-600">
                  Featured in various local and regional art exhibitions, showcasing original paintings and mixed media works.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-4 h-4 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Community Impact</h3>
                <p className="text-gray-600">
                  Actively involved in promoting arts education and supporting emerging artists in the community.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-4 h-4 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Cross-Media Innovation</h3>
                <p className="text-gray-600">
                  Pioneer in combining literary and visual arts, creating unique multimedia experiences for audiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Let&apos;s Connect
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            I&apos;d love to hear from you. Whether you&apos;re interested in my work, 
            have questions, or simply want to share your own creative journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700">
                Get in Touch
              </Button>
            </Link>
            <Link href="/books">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black">
                Explore My Work
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}