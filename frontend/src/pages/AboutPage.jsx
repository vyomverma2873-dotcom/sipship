import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="bg-primary text-highlight py-10">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Sip & Ship</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Premium beverages delivered to your doorstep with care and convenience.
          </p>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-accent">Our Story</h2>
          <div className="bg-secondary p-8 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <p className="mb-4">
                  Sip & Ship was founded in 2025 by{" "}
                  <span className="text-highlight font-semibold">Vyom Verma</span>, a final-year
                  CSE student at{" "}
                  <span className="text-highlight font-semibold">
                    Ajay Kumar Garg Engineering College
                  </span>, with a simple yet powerful idea: make premium beverages accessible
                  with just a click.
                </p>
                <p className="mb-4">
                  What began as a student project soon transformed into an innovative platform
                  that delivers curated collections of{" "}
                  <span className="text-accent font-semibold">
                    spirits, wines, beers, and non-alcoholic drinks
                  </span>{" "}
                  — anytime, anywhere.
                </p>
                <p>
                  Driven by technology and creativity,{" "}
                  <span className="text-highlight font-semibold">Sip & Ship</span> is more than
                  a service; it’s a <span className="italic">lifestyle</span>.
                </p>
              </div>
              <div className="md:w-1/2 flex items-center justify-center">
                <div className="relative h-64 w-full rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1528823872057-9c018a7a7553?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Sip & Ship Story" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-accent">Our Mission</h2>
          <div className="bg-secondary p-8 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row-reverse gap-8">
              <div className="md:w-1/2">
                <p className="mb-4">
                  At Sip & Ship, our mission is to make premium beverages accessible to everyone while supporting sustainable practices and responsible consumption.
                </p>
                <p className="mb-4">
                  We believe that enjoying quality drinks is one of life's simple pleasures, and we're committed to delivering that experience with convenience and care.
                </p>
                <p>
                  Through our platform, we aim to educate consumers about beverage origins, production methods, and flavor profiles, fostering a deeper appreciation for the craft behind each bottle.
                </p>
              </div>
              <div className="md:w-1/2 flex items-center justify-center">
                <div className="relative h-64 w-full rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Sustainable Packaging" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-accent">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-secondary p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Quality</h3>
              <p>
                We never compromise on quality. Every product in our catalog undergoes rigorous selection and quality control to ensure you receive only the best.
              </p>
            </div>
            <div className="bg-secondary p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Sustainability</h3>
              <p>
                We're committed to reducing our environmental footprint through eco-friendly packaging, carbon-neutral shipping options, and partnerships with sustainable producers.
              </p>
            </div>
            <div className="bg-secondary p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p>
                We support local producers and craft beverage makers, helping to sustain communities and preserve traditional production methods while introducing customers to unique products.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-accent">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Founder: Vyom Verma */}
            <div className="bg-secondary rounded-lg overflow-hidden shadow-md">
              <div className="h-64 relative">
                <img 
                  src="/IMG_2089.jpg" 
                  alt="Founder Vyom Verma" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold">Vyom Verma</h3>
                <p className="text-accent mb-2">Founder</p>
                <p className="text-sm italic">
                  Turning a student idea into a digital revolution.  
                  Blending technology with taste, one sip at a time.
                </p>
              </div>
            </div>

            {/* Co Founder: Nipun Saini */}
            <div className="bg-secondary rounded-lg overflow-hidden shadow-md">
              <div className="h-64 relative">
                <img 
                  src="/IMG_2090.jpg" 
                  alt="Co Founder Nipun Saini" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold">Nipun Saini</h3>
                <p className="text-accent mb-2">Co Founder</p>
                <p className="text-sm italic">
                  Building dreams into reality with vision & persistence.  
                  A partner dedicated to growth and innovation.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-secondary rounded-lg overflow-hidden shadow-md">
              <div className="h-64 relative">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Head of Curation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold">David Rodriguez</h3>
                <p className="text-accent mb-2">Head of Curation</p>
                <p className="text-sm">Certified sommelier and former restaurant beverage director.</p>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="bg-secondary rounded-lg overflow-hidden shadow-md">
              <div className="h-64 relative">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Customer Experience Manager" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold">Emily Patel</h3>
                <p className="text-accent mb-2">Customer Experience Manager</p>
                <p className="text-sm">Dedicated to creating memorable unboxing experiences.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-secondary p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to experience premium beverages delivered to your door?</h2>
          <p className="mb-6 max-w-2xl mx-auto">Join thousands of satisfied customers who trust Sip & Ship for their beverage needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn-primary">
              Shop Now
            </Link>
            <Link to="/contact" className="bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-primary transition-colors px-6 py-2 rounded-md font-medium">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
