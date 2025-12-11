import { Target, Heart, Award, Users } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'We prioritize your health and wellbeing above all else, providing personalized attention to each customer.',
    },
    {
      icon: Award,
      title: 'Professional Excellence',
      description: 'Our team of licensed pharmacists maintains the highest standards of pharmaceutical care and expertise.',
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'We are deeply committed to serving our community and building lasting relationships with our customers.',
    },
    {
      icon: Target,
      title: 'Quality Assurance',
      description: 'We source only the highest quality products and ensure strict adherence to safety standards.',
    },
  ];

  const team = [
    {
      name: 'Dr. Emmanuel Benbol',
      role: 'Chief Pharmacist',
      credentials: 'PharmD, RPh',
      description: 'Over 15 years of experience in community pharmacy and pharmaceutical care.',
    },
    {
      name: 'Pharm. Joy Adebayo',
      role: 'Senior Pharmacist',
      credentials: 'B.Pharm, RPh',
      description: 'Specializes in medication therapy management and patient counseling.',
    },
    {
      name: 'Pharm. David Okafor',
      role: 'Clinical Pharmacist',
      credentials: 'PharmD, RPh',
      description: 'Expert in chronic disease management and pharmaceutical consultation.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="bg-gradient-to-br from-teal-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">About Benbol Pharmacy</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Your trusted healthcare partner, committed to delivering exceptional pharmaceutical services
              and quality products to our community.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  Founded with a vision to provide accessible, professional pharmaceutical care to our community,
                  Benbol Pharmacy has grown to become a trusted name in healthcare services.
                </p>
                <p>
                  Our journey began with a simple mission: to ensure that every person who walks through our doors
                  receives not just medications, but comprehensive care, expert guidance, and genuine compassion.
                </p>
                <p>
                  Today, we continue to uphold these values while expanding our services to meet the evolving
                  healthcare needs of our community. From prescription medications to wellness products, mobility
                  aids to skincare solutions, we are here to support your health journey every step of the way.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/356054/pexels-photo-356054.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern pharmacy storefront"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Mission & Vision</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <div className="bg-teal-100 dark:bg-teal-900 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To provide exceptional pharmaceutical care and quality health products while building lasting
                relationships with our customers through personalized service, professional expertise, and
                unwavering commitment to their wellbeing.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To be the most trusted and preferred community pharmacy, recognized for our excellence in
                pharmaceutical care, innovation in health services, and positive impact on the health and
                wellness of the communities we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-teal-100 dark:bg-teal-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-10 h-10 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Experienced pharmacists dedicated to your health</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => {
              const teamImages = [
                'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
                'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400',
                'https://images.pexels.com/photos/5327653/pexels-photo-5327653.jpeg?auto=compress&cs=tinysrgb&w=400'
              ];
              return (
                <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm text-center">
                  <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden">
                    <img
                      src={teamImages[index]}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-teal-600 font-semibold mb-1">{member.role}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{member.credentials}</p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{member.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-teal-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Why Choose Benbol Pharmacy?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
            <div>
              <div className="text-5xl font-bold mb-2">15+</div>
              <p className="text-teal-100 text-lg">Years of Experience</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">5000+</div>
              <p className="text-teal-100 text-lg">Satisfied Customers</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <p className="text-teal-100 text-lg">Licensed & Certified</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
