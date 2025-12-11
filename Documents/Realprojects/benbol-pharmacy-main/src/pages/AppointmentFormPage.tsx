import { Calendar, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface AppointmentFormPageProps {
  onNavigate: (page: string) => void;
}

export default function AppointmentFormPage({ onNavigate }: AppointmentFormPageProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    service_type: '',
    preferred_date: '',
    preferred_time: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitMessage('');

    try {
      const { error } = await supabase.from('appointments').insert([formData]);

      if (error) throw error;

      setSubmitMessage(
        'Your appointment request has been submitted successfully! We will contact you shortly to confirm your appointment.'
      );
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        service_type: '',
        preferred_date: '',
        preferred_time: '',
        message: '',
      });
    } catch (error) {
      setSubmitMessage('Failed to submit appointment request. Please try again or call us at 09167858304.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const timeSlots = [
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
  ];

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="bg-gradient-to-br from-teal-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 mb-6 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-teal-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Book a Consultation</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Schedule a consultation with our experienced pharmacists
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What to Expect:</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>One-on-one consultation with a licensed pharmacist</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>Professional guidance on medications and health concerns</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>Comprehensive medication review if needed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>Personalized recommendations and care plan</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="full_name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="09167858304"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="service_type" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Type of Service *
                  </label>
                  <select
                    id="service_type"
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select a service</option>
                    <option value="Pharmaceutical Counselling">Pharmaceutical Counselling</option>
                    <option value="Medication Review">Medication Review</option>
                    <option value="Prescription Consultation">Prescription Consultation</option>
                    <option value="Skincare Consultation">Skincare Consultation</option>
                    <option value="Vitamin & Supplement Guidance">Vitamin & Supplement Guidance</option>
                    <option value="Walking Aids Fitting">Walking Aids Fitting</option>
                    <option value="General Health Consultation">General Health Consultation</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="preferred_date" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="preferred_date"
                      name="preferred_date"
                      value={formData.preferred_date}
                      onChange={handleChange}
                      min={getMinDate()}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="preferred_time" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Preferred Time *
                    </label>
                    <select
                      id="preferred_time"
                      name="preferred_time"
                      value={formData.preferred_time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Please share any specific concerns or questions you'd like to discuss..."
                  />
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Note:</strong> This is a request for an appointment. Our team will contact you within 24
                    hours to confirm your appointment time and answer any questions.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Appointment Request'}
                </button>

                {submitMessage && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitMessage.includes('success')
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">Prefer to call? We're happy to help!</p>
              <a
                href="tel:09167858304"
                className="text-teal-600 hover:text-teal-700 font-semibold text-lg"
              >
                Call us at 09167858304
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
