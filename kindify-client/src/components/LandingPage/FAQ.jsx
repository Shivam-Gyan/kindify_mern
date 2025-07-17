import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I know the NGOs on Kindify are legitimate?',
      answer: 'All NGOs on our platform undergo a rigorous verification process. We verify their legal registration, financial statements, impact reports, and conduct background checks. Only organizations that meet our strict criteria are approved to receive donations.'
    },
    {
      question: 'Is my donation secure and protected?',
      answer: 'Yes, absolutely. We use bank-grade encryption and secure payment gateways to protect your financial information. All transactions are processed through PCI DSS compliant payment processors, ensuring the highest level of security for your donations.'
    },
    {
      question: 'Can I track how my donation is being used?',
      answer: 'Yes! We provide real-time tracking and detailed impact reports for every donation. You\'ll receive regular updates on how your money is being used, including photos, videos, and progress reports from the NGOs you support.'
    },
    {
      question: 'Are donations tax-deductible?',
      answer: 'Yes, all donations made through Kindify are eligible for tax deductions under Section 80G of the Income Tax Act. You\'ll receive a tax receipt immediately after your donation, which you can use for tax filing purposes.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major payment methods including credit cards, debit cards, UPI, net banking, and digital wallets like Paytm, Google Pay, and PhonePe. You can also set up recurring monthly donations.'
    },
    {
      question: 'Can I cancel or modify my recurring donation?',
      answer: 'Yes, you have complete control over your recurring donations. You can modify the amount, change the frequency, or cancel at any time through your donor dashboard. Changes take effect from the next billing cycle.'
    },
    {
      question: 'How much of my donation goes to the actual cause?',
      answer: 'We maintain complete transparency about our fee structure. 95% of your donation goes directly to the NGO, while 5% covers our platform costs including payment processing, verification, and impact tracking services.'
    },
    {
      question: 'What if I have a complaint about an NGO?',
      answer: 'We take all complaints seriously. If you have concerns about an NGO or their use of funds, please contact our support team immediately. We investigate all complaints and take appropriate action, including suspending NGOs if necessary.'
    },
    {
      question: 'Can I donate anonymously?',
      answer: 'Yes, you can choose to donate anonymously. While NGOs will know they received a donation, your personal information will not be shared with them unless you specifically opt to share it.'
    },
    {
      question: 'How do I get started with donating?',
      answer: 'Getting started is easy! Simply browse our verified NGOs, choose a cause that resonates with you, select your donation amount, and complete the secure payment process. You can start with as little as ₹100 and make a real difference.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 bg-gray-50" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about donating through Kindify? We've got you covered with answers 
            to the most common questions from our donor community.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <button
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors rounded-2xl"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                <svg
                  className={`w-6 h-6 text-gray-500 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-blue-600 text-white p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-blue-100 mb-6">
              Our support team is here to help you with any questions or concerns.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center bg-white text-blue-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors"
            >
              Contact Support
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 