import { Pill, Stethoscope, Heart, Users, Accessibility, Sparkles, ArrowRight, Phone, Clock, Shield, Syringe, TestTube, Activity, Thermometer, Baby, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    {
      url: 'https://images.pexels.com/photos/7659564/pexels-photo-7659564.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Professional pharmacist consulting with customer'
    },
    {
      url: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Modern pharmacy interior with organized shelves'
    },
    {
      url: 'https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Pharmacist preparing prescription medication'
    },
    {
      url: 'https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Healthcare professional providing patient care'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  const services = [
    {
      icon: Pill,
      title: 'Prescription Medications',
      description: 'Fast and accurate prescription filling with expert consultation.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Heart,
      title: 'OTC Products',
      description: 'Wide range of over-the-counter medications and health products.',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: Sparkles,
      title: 'Vitamins & Supplements',
      description: 'Quality vitamins and nutritional supplements for your wellness.',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Accessibility,
      title: 'Walking Aids',
      description: 'Mobility equipment and walking aids for enhanced independence.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Stethoscope,
      title: 'Pharmaceutical Counselling',
      description: 'Professional guidance on medication usage and health concerns.',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      icon: Sparkles,
      title: 'Skin Care',
      description: 'Premium skincare products and expert advice for healthy skin.',
      color: 'from-pink-500 to-rose-600'
    },
    {
      icon: Syringe,
      title: 'Immunization Services',
      description: 'Flu shots, travel vaccines, and routine immunizations.',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: TestTube,
      title: 'Health Screenings',
      description: 'Blood pressure, glucose monitoring, and cholesterol testing.',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      icon: Activity,
      title: 'Chronic Disease Management',
      description: 'Support for diabetes, hypertension, and other chronic conditions.',
      color: 'from-red-500 to-orange-600'
    },
    {
      icon: Thermometer,
      title: 'Medical Equipment',
      description: 'Blood pressure monitors, thermometers, and diagnostic tools.',
      color: 'from-cyan-500 to-teal-600'
    },
    {
      icon: Baby,
      title: 'Mother & Baby Care',
      description: 'Prenatal vitamins, baby products, and maternal health support.',
      color: 'from-pink-400 to-pink-600'
    },
    {
      icon: Briefcase,
      title: 'Corporate Wellness',
      description: 'Health programs and pharmaceutical services for businesses.',
      color: 'from-gray-600 to-gray-700'
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'Benbol Pharmacy has been my go-to pharmacy for years. The staff is knowledgeable, friendly, and always willing to answer my questions.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      text: 'The pharmaceutical counselling service is exceptional. They take time to explain everything clearly and ensure I understand my medications.',
      rating: 5,
    },
    {
      name: 'Grace Okonkwo',
      text: 'Professional service and great selection of products. I especially appreciate their walking aids section for my elderly mother.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Dynamic Images */}
      <section className="relative bg-gradient-to-br from-teal-600 via-blue-700 to-indigo-800 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container mx-auto px-4 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Content */}
            <div className="max-w-2xl text-white">
              <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                ✨ Your Health, Our Priority
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
                Excellence in
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-white">
                  Pharmaceutical Care
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed text-teal-50">
                Trusted by thousands for quality medications, expert consultation, and compassionate care since 2008.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => onNavigate('appointment')}
                  className="group bg-white text-teal-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all hover:scale-105 shadow-2xl flex items-center justify-center space-x-2"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate('refill')}
                  className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-teal-700 transition-all hover:scale-105 shadow-2xl"
                >
                  Refill Prescription
                </button>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/20">
                <div>
                  <div className="text-3xl font-bold text-yellow-300">15+</div>
                  <div className="text-sm text-teal-100">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-300">5000+</div>
                  <div className="text-sm text-teal-100">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-300">24/7</div>
                  <div className="text-sm text-teal-100">Support Available</div>
                </div>
              </div>
            </div>

            {/* Dynamic Image Carousel */}
            <div className="relative hidden lg:block">
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                {heroImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      index === currentImageIndex
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-110'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  </div>
                ))}
                
                {/* Image Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'w-8 bg-white'
                          : 'w-2 bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 animate-float">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Licensed & Certified</div>
                    <div className="text-sm text-gray-600">100% Authentic Products</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" className="dark:fill-gray-900"/>
          </svg>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4 p-6 rounded-xl bg-teal-50 dark:bg-gray-800 hover:shadow-md transition-shadow">
              <div className="bg-teal-600 p-3 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Licensed & Certified</h3>
                <p className="text-gray-600 dark:text-gray-300">Fully licensed pharmacy with certified pharmacists</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 rounded-xl bg-blue-50 dark:bg-gray-800 hover:shadow-md transition-shadow">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Extended Hours</h3>
                <p className="text-gray-600 dark:text-gray-300">Open 7 days a week for your convenience</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 rounded-xl bg-green-50 dark:bg-gray-800 hover:shadow-md transition-shadow">
              <div className="bg-green-600 p-3 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Expert Care</h3>
                <p className="text-gray-600 dark:text-gray-300">Experienced pharmacists dedicated to your health</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive pharmaceutical services tailored to meet your health needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer border border-gray-100 dark:border-gray-700 overflow-hidden relative"
                onClick={() => onNavigate('services')}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}></div>
                <div className={`bg-gradient-to-br ${service.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{service.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{service.description}</p>
                <div className="mt-4 flex items-center text-teal-600 dark:text-teal-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center space-x-2 text-teal-600 font-semibold text-lg hover:text-teal-700"
            >
              <span>View All Services</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Pharmacy interior with shelves"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Professional Care You Can Trust</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Our experienced team of licensed pharmacists is dedicated to providing you with expert advice,
                personalized service, and comprehensive pharmaceutical care. We take the time to understand your
                unique health needs and ensure you receive the best possible care.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Licensed Professionals</h3>
                    <p className="text-gray-600 dark:text-gray-300">All our pharmacists are fully licensed and certified</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Heart className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Patient-Centered Approach</h3>
                    <p className="text-gray-600 dark:text-gray-300">Your health and wellbeing are our top priorities</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Community Focused</h3>
                    <p className="text-gray-600 dark:text-gray-300">Proud to serve our local community with dedication</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Trusted by the community we serve</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic leading-relaxed">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-teal-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Need Help or Have Questions?</h2>
          <p className="text-xl mb-8 text-teal-50">Our team is here to assist you with all your pharmaceutical needs</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:09167858304"
              className="bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all inline-flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Call Us: 09167858304</span>
            </a>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-teal-600 transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
