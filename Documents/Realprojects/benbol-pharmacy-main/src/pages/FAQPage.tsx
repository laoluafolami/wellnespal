import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'Prescriptions & Refills',
      questions: [
        {
          question: 'How do I refill my prescription?',
          answer:
            'You can refill your prescription by visiting our pharmacy in person, calling us at 09167858304, or using our online prescription refill form. Please have your prescription number ready when requesting a refill.',
        },
        {
          question: 'How long does it take to fill a prescription?',
          answer:
            'Most prescriptions are filled within 15-30 minutes. For new prescriptions or those requiring special preparation, it may take up to an hour. We will notify you when your prescription is ready for pickup.',
        },
        {
          question: 'Can I transfer my prescriptions from another pharmacy?',
          answer:
            'Yes, we can easily transfer your prescriptions from another pharmacy. Simply provide us with your current pharmacy information and prescription details, and we will handle the transfer process for you.',
        },
        {
          question: 'Do you offer automatic refill reminders?',
          answer:
            'Yes, we offer automatic refill reminder services. We can contact you via phone, text, or email when your prescription is due for a refill, helping you stay on track with your medications.',
        },
      ],
    },
    {
      category: 'Insurance & Payment',
      questions: [
        {
          question: 'Do you accept insurance?',
          answer:
            'Yes, we accept most major insurance plans. Please bring your insurance card with you, and we will verify your coverage and process your claims. Contact us to confirm if we accept your specific insurance provider.',
        },
        {
          question: 'What if my insurance does not cover my medication?',
          answer:
            'If your insurance does not cover a medication, we can help you explore alternative options, such as generic equivalents or manufacturer discount programs. Our pharmacists can also contact your doctor to discuss therapeutic alternatives.',
        },
        {
          question: 'What payment methods do you accept?',
          answer:
            'We accept cash, credit cards, debit cards, and mobile payment options. We also work with various insurance providers and can assist with insurance claims processing.',
        },
      ],
    },
    {
      category: 'Services & Products',
      questions: [
        {
          question: 'Do you offer medication counseling?',
          answer:
            'Yes, our licensed pharmacists provide comprehensive medication counseling services. We can explain how to take your medications, potential side effects, drug interactions, and answer any questions you may have.',
        },
        {
          question: 'Can I get over-the-counter medication recommendations?',
          answer:
            'Absolutely! Our pharmacists are available to recommend appropriate over-the-counter medications for common ailments and can help you choose the right product for your needs.',
        },
        {
          question: 'Do you provide home delivery services?',
          answer:
            'Yes, we offer home delivery services for medications and health products within our service area. Contact us to learn more about delivery options, fees, and scheduling.',
        },
        {
          question: 'Do you carry medical equipment and mobility aids?',
          answer:
            'Yes, we stock a variety of medical equipment including walking aids, canes, crutches, walkers, and other mobility devices. Our staff can help you select the right equipment and provide proper fitting.',
        },
      ],
    },
    {
      category: 'General Questions',
      questions: [
        {
          question: 'What are your hours of operation?',
          answer:
            'We are open Monday through Saturday from 8:00 AM to 8:00 PM, and Sundays from 9:00 AM to 5:00 PM. Please note that hours may vary on holidays.',
        },
        {
          question: 'Do I need an appointment for pharmaceutical counseling?',
          answer:
            'While walk-ins are welcome, we recommend scheduling an appointment for pharmaceutical counseling to ensure you receive dedicated one-on-one time with our pharmacist.',
        },
        {
          question: 'Can I speak to a pharmacist over the phone?',
          answer:
            'Yes, our pharmacists are available to answer questions over the phone during business hours. Call us at 09167858304 and ask to speak with a pharmacist.',
        },
        {
          question: 'How should I store my medications?',
          answer:
            'Most medications should be stored at room temperature in a cool, dry place away from direct sunlight. Avoid storing medications in bathrooms or kitchens where heat and moisture can affect them. Always check the label for specific storage instructions.',
        },
      ],
    },
    {
      category: 'Safety & Privacy',
      questions: [
        {
          question: 'How do you protect my privacy?',
          answer:
            'We are committed to protecting your privacy and comply with all HIPAA regulations. Your personal health information is kept confidential and secure. We never share your information without your explicit consent, except as required by law.',
        },
        {
          question: 'What should I do if I miss a dose of my medication?',
          answer:
            'If you miss a dose, do not double up on your next dose unless instructed by your doctor. Contact our pharmacist for guidance on what to do if you miss a dose of your specific medication.',
        },
        {
          question: 'What should I do with expired or unused medications?',
          answer:
            'Do not flush medications down the toilet or throw them in the trash. Bring your expired or unused medications to our pharmacy for safe disposal through our medication take-back program.',
        },
      ],
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let questionIndex = 0;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="bg-gradient-to-br from-teal-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Find answers to common questions about our services, prescriptions, and pharmacy policies
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {faqs.map((category, catIndex) => (
              <div key={catIndex} className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((faq) => {
                    const currentIndex = questionIndex++;
                    return (
                      <div
                        key={currentIndex}
                        className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:border-teal-300 dark:hover:border-teal-500 transition-colors"
                      >
                        <button
                          onClick={() => toggleFAQ(currentIndex)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left"
                        >
                          <span className="text-lg font-semibold text-gray-900 dark:text-white pr-8">{faq.question}</span>
                          <div className="flex-shrink-0">
                            {openIndex === currentIndex ? (
                              <Minus className="w-6 h-6 text-teal-600" />
                            ) : (
                              <Plus className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                            )}
                          </div>
                        </button>
                        {openIndex === currentIndex && (
                          <div className="px-6 pb-5 text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
              Our team is here to help. Contact us and we'll be happy to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:09167858304"
                className="bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-teal-700 transition-colors"
              >
                Call Us: 09167858304
              </a>
              <button className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Send a Message
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
