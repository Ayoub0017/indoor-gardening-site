import Hero from '@/components/Hero';
import BlogCard from '@/components/BlogCard';
import { getBlogPosts } from '@/lib/contentful';
import Link from 'next/link';
import { Leaf, Droplets, Sun, Heart } from 'lucide-react';

export default async function Home() {
  const posts = await getBlogPosts(3);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Why Indoor Gardening?</h2>
            <p className="text-lg text-gray-600">
              Discover the benefits of bringing nature indoors. It's more than just decoration; it's a lifestyle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Leaf,
                title: "Air Purification", 
                desc: "Plants naturally filter toxins from the air, creating a healthier living environment." 
              },
              { 
                icon: Droplets, 
                title: "Humidifying", 
                desc: "Release moisture back into the air, helping to combat dry indoor atmosphere." 
              },
              { 
                icon: Sun, 
                title: "Mood Boosting", 
                desc: "Studies show that being around plants reduces stress and improves mental well-being." 
              },
              { 
                icon: Heart, 
                title: "Living Decor", 
                desc: "Add life, color, and texture to your interior design with ever-changing living art." 
              },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 hover:bg-green-50/50 transition-colors">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-6">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Latest from the Blog</h2>
              <p className="text-gray-600">Expert tips and guides for your indoor garden.</p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-2 text-primary font-medium hover:text-green-700 transition-colors">
              View all posts <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div key={post.sys.id} className="h-full">
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          ) : (
             <div className="text-center py-12">
                <p className="text-gray-500">No posts found. Add some content in Contentful to get started.</p>
             </div>
          )}
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/blog" className="text-primary font-medium hover:text-green-700 transition-colors">
              View all posts &rarr;
            </Link>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section Placeholder - We can implement component later or stick static here */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
         <div className="absolute inset-0 bg-black/10" />
         <div className="container relative mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Growing Community</h2>
            <p className="text-green-50 text-lg mb-8">
              Get weekly plant care tips, inspiration, and exclusive offers delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-5 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-8 py-3 bg-white text-primary font-bold rounded-full hover:bg-green-50 transition-colors shadow-lg">
                Subscribe
              </button>
            </form>
         </div>
      </section>
    </div>
  );
}
