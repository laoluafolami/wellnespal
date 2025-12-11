import { Pill, Heart, Sparkles, Accessibility, Stethoscope, Droplet, CheckCircle, Syringe, TestTube, Activity, Thermometer, Baby, Briefcase } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const services = [
    {
      icon: Pill,
      title: 'Prescription Medications',
      description: 'Expert prescription filling and medication management services.',
      features: [
        'Fast and accurate prescription processing',
        'Medication therapy management',
        'Drug interaction screening',
        'Generic medication alternatives',
        'Automatic refill reminders',
        'Insurance claims processing',
      ],
    },
    {
      icon: Heart,
      title: 'Over-the-Counter (OTC) Products',
      description: 'Comprehensive selection of OTC medications and health products.',
      features: [
        'Pain relief medications',
        'Cold and flu remedies',
        'Digestive health products',
        'Allergy medications',
        'First aid supplies',
        'Personal care items',
      ],
    },
    {
      icon: Sparkles,
      title: 'Vitamins & Supplements',
      description: 'Quality vitamins and nutritional supplements for optimal health.',
      features: [
        'Multivitamins for all ages',
        'Specialty supplements',
        'Herbal remedies',
        'Sports nutrition',
        'Prenatal vitamins',
        'Expert guidance on supplement use',
      ],
    },
    {
      icon: Accessibility,
      title: 'Walking Aids & Mobility Equipment',
      description: 'Comprehensive range of mobility solutions for enhanced independence.',
      features: [
        'Walking canes and crutches',
        'Walkers and rollators',
        'Wheelchairs',
        'Mobility scooters',
        'Bath safety equipment',
        'Professional fitting and consultation',
      ],
    },
    {
      icon: Stethoscope,
      title: 'Pharmaceutical Counselling',
      description: 'Professional consultation services for all your medication needs.',
      features: [
        'One-on-one medication consultations',
        'Medication review services',
        'Disease management guidance',
        'Side effect management',
        'Drug interaction counseling',
        'Adherence support and education',
      ],
    },
    {
      icon: Droplet,
      title: 'Skin Care Products',
      description: 'Premium skincare solutions for all skin types and concerns.',
      features: [
        'Medical-grade skincare',
        'Anti-aging products',
        'Acne treatment solutions',
        'Moisturizers and cleansers',
        'Sun protection products',
        'Personalized skincare recommendations',
      ],
    },
    {
      icon: Syringe,
      title: 'Immunization Services',
      description: 'Comprehensive vaccination services for all ages.',
      features: [
        'Flu shots and seasonal vaccines',
        'Travel vaccinations',
        'Childhood immunizations',
        'Adult vaccines (Shingles, Pneumonia)',
        'COVID-19 vaccinations',
        'Vaccine records and documentation',
      ],
    },
    {
      icon: TestTube,
      title: 'Health Screenings',
      description: 'Professional health monitoring and diagnostic services.',
      features: [
        'Blood pressure monitoring',
        'Blood glucose testing',
        'Cholesterol screening',
        'BMI and weight management',
        'Health risk assessments',
        'Regular health check-ups',
      ],
    },
    {
      icon: Activity,
      title: 'Chronic Disease Management',
      description: 'Specialized support for managing chronic health conditions.',
      features: [
        'Diabetes management programs',
        'Hypertension monitoring',
        'Asthma and COPD support',
        'Heart disease management',
        'Medication adherence programs',
        'Lifestyle counseling',
      ],
    },
    {
      icon: Thermometer,
      title: 'Medical Equipment & Supplies',
      description: 'Quality medical devices and home healthcare equipment.',
      features: [
        'Blood pressure monitors',
        'Glucose meters and test strips',
        'Thermometers and pulse oximeters',
        'Nebulizers and inhalers',
        'Compression stockings',
        'Wound care supplies',
      ],
    },
    {
      icon: Baby,
      title: 'Mother & Baby Care',
      description: 'Complete care solutions for mothers and infants.',
      features: [
        'Prenatal vitamins and supplements',
        'Baby formula and feeding supplies',
        'Diapers and baby care products',
        'Breastfeeding support products',
        'Postpartum care items',
        'Pediatric medications',
      ],
    },
    {
      icon: Briefcase,
      title: 'Corporate Wellness Programs',
      description: 'Customized health solutions for businesses and organizations.',
      features: [
        'On-site health screenings',
        'Employee wellness programs',
        'Bulk medication management',
        'Health education seminars',
        'Occupational health services',
        'Corporate health packages',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="bg-gradient-to-br from-teal-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Comprehensive pharmaceutical services and quality health products tailored to meet your needs
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {services.map((service, index) => {
              const serviceImages = [
                'https://images.pexels.com/photos/3683041/pexels-photo-3683041.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/3762882/pexels-photo-3762882.jpeg?auto=compress&cs=tinysrgb&w=800'
              ];
              return (
                <div
                  key={index}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="bg-gradient-to-br from-teal-100 to-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
                      <service.icon className="w-10 h-10 text-teal-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                    <div className="mb-6">
                      <img
                        src={serviceImages[index]}
                        alt={service.title}
                        className="rounded-xl shadow-md"
                      />
                    </div>
                    <button
                      onClick={() => onNavigate('appointment')}
                      className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                    >
                      Book Consultation
                    </button>
                  </div>
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What We Offer:</h3>
                      <ul className="space-y-3">
                        {service.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start space-x-3">
                            <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Additional Services & Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Insurance Assistance</h4>
                    <p className="text-gray-600 dark:text-gray-300">Help with insurance claims and coverage questions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Home Delivery</h4>
                    <p className="text-gray-600 dark:text-gray-300">Convenient medication delivery to your doorstep</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Medication Synchronization</h4>
                    <p className="text-gray-600 dark:text-gray-300">Align all your refills to one convenient date</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Medication Reviews</h4>
                    <p className="text-gray-600 dark:text-gray-300">Comprehensive review of all your medications</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Health Screenings</h4>
                    <p className="text-gray-600 dark:text-gray-300">Blood pressure and blood glucose monitoring</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Health Education</h4>
                    <p className="text-gray-600 dark:text-gray-300">Resources and guidance for better health</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-teal-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-teal-50 max-w-2xl mx-auto">
            Contact us today to learn more about our services or schedule a consultation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('appointment')}
              className="bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Book Consultation
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-teal-600 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
