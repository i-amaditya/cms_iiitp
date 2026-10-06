import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const InternationalContactPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader 
        title="Contact the Office" 
        subtitle="Connect with our International Relations advisors for exchange program admissions, partnerships, transcript verifications, and travel support inquiries."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden p-8 md:p-12 international-relations-page">
          
          <div className="contact-container">
            
            {/* Left: Contact Details Box */}
            <section className="contact-details-box">
              <h2 className="section-headline" style={{ marginBottom: '15px' }}>Advisory &amp; Contacts</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                Reach out to the International Relations Office directly via email or visit our administrative chambers at the permanent campus.
              </p>
              
              <ul className="contact-info-list">
                
                <li className="contact-info-item">
                  <div className="contact-item-icon">✉️</div>
                  <div className="contact-item-text">
                    <h4>Email Address</h4>
                    <p><a href="mailto:ir@iiitp.ac.in">ir@iiitp.ac.in</a></p>
                  </div>
                </li>

                <li className="contact-info-item">
                  <div className="contact-item-icon">📞</div>
                  <div className="contact-item-text">
                    <h4>International Relations Head</h4>
                    <p><strong>Dr. Jatin Majithia</strong><br />
                    Phone: <a href="tel:+919766884311">+91 97668 84311</a></p>
                  </div>
                </li>

                <li className="contact-info-item">
                  <div className="contact-item-icon">📍</div>
                  <div className="contact-item-text">
                    <h4>Office Location</h4>
                    <p>International Relations Office, IIIT Pune Campus<br />
                    {/* Gat No - 5 &amp; 6, Vill - Nanoli-Tarf Chakan,<br />
                    PO - Talegaon, Tah, Dist, Maval, */}
                    Talegaon, Pune, Maharashtra 410507</p>
                  </div>
                </li>

                <li className="contact-info-item">
                  <div className="contact-item-icon">🕐</div>
                  <div className="contact-item-text">
                    <h4>Office Operating Hours</h4>
                    <p>Monday – Friday: 9:30 AM – 5:30 PM<br />
                    Saturday and Sunday: Closed</p>
                  </div>
                </li>

              </ul>
            </section>

            {/* Right: Map Frame */}
            <section className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.2!2d73.69753!3d18.76389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b900c4fea8a7%3A0x6c6c6c6c6c6c6c6c!2sIIIT%20Pune%20Permanent%20Campus%2C%20Nanoli!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="IIIT Pune Permanent Campus — Talegaon, Maval"
              ></iframe>
            </section>

          </div>

        </div>
      </div>
    </div>
  );
};

export default InternationalContactPage;
