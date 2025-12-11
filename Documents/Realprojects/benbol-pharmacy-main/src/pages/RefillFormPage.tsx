import { Pill, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface RefillFormPageProps {
  onNavigate: (page: string) => void;
}

export default function RefillFormPage({ onNavigate }: RefillFormPageProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    prescription_number: '',
    medication_name: '',
    prescribing_doctor: '',
    additional_notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitMessage('');

    try {
      const { error } = await supabase.from('prescription_refills').insert([formData]);

      if (error) throw error;

      setSubmitMessage(
        'Your refill request has been submitted successfully! We will contact you when your prescription is ready for pickup.'
      );
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        prescription_number: '',
        medication_name: '',
        prescribing_doctor: '',
        additional_notes: '',
      });
    } catch (error) {
      setSubmitMessage('Failed to submit refill request. Please try again or call us at 09167858304.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
              <Pill className="w-10 h-10 text-teal-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Prescription Refill Request</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Submit your prescription refill request online and we'll have it ready for pickup
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Before You Submit:</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>Have your prescription number ready (found on your medication bottle)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>Make sure you have refills remaining on your prescription</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>Allow 24-48 hours for processing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  <span>We will contact you when your prescription is ready</span>
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

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Prescription Information</h3>

                  <div className="space-y-6">
                    <div>
                      <label htmlFor="prescription_number" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Prescription Number
                      </label>
                      <input
                        type="text"
                        id="prescription_number"
                        name="prescription_number"
                        value={formData.prescription_number}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="RX123456"
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Found on your prescription bottle label
                      </p>
                    </div>

                    <div>
                      <label htmlFor="medication_name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Medication Name *
                      </label>
                      <input
                        type="text"
                        id="medication_name"
                        name="medication_name"
                        value={formData.medication_name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="e.g., Amoxicillin 500mg"
                      />
                    </div>

                    <div>
                      <label htmlFor="prescribing_doctor" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Prescribing Doctor
                      </label>
                      <input
                        type="text"
                        id="prescribing_doctor"
                        name="prescribing_doctor"
                        value={formData.prescribing_doctor}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Dr. Smith"
                      />
                    </div>

                    <div>
                      <label htmlFor="additional_notes" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        id="additional_notes"
                        name="additional_notes"
                        value={formData.additional_notes}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Any special instructions or questions..."
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Refill Request'}
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
              <p className="text-gray-600 dark:text-gray-300 mb-4">Need help or have questions?</p>
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
