import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const DirectorPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Director" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
              <div className="w-48 h-48 shrink-0 bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-md">
                <img src="/director.jpeg" alt="Director Prof. Vineet Kansal" className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left pt-2">
                <h2 className="text-2xl font-bold font-serif text-[#164e63] dark:text-blue-400 mb-2 border-b-2 border-brand-red pb-2 inline-block">Prof. Vineet Kansal</h2>
                <h3 className="text-lg text-brand-red font-bold mt-1">Director</h3>
                <p className="text-base text-gray-700 dark:text-gray-300 font-semibold mt-1">Indian Institute of Information Technology (IIIT) Pune</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-bold mt-1">Email: <a href="mailto:director@iiitp.ac.in" className="text-[#164e63] dark:text-blue-400 hover:underline">director@iiitp.ac.in</a></p>
              </div>
            </div>
          
            <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed text-base text-justify">
              <p>
                Welcome to the Indian Institute of Information Technology Pune (IIIT Pune), an Institute of National Importance. As a part of the prestigious IIIT ecosystem established by the Government of India, IIITs have played a significant role in developing highly skilled professionals, researchers, and innovators in Information Technology. Building on this legacy, IIIT Pune is committed to excellence in education, research, innovation, and entrepreneurship while fostering a culture of academic rigor, creativity, and lifelong learning. 
              </p>
              <p>
                We live in an era where technology is transforming every aspect of human life. The opportunities and challenges of this rapidly evolving world demand professionals who possess not only technical expertise but also the ability to think critically, innovate responsibly, and contribute meaningfully to society. To prepare students for these opportunities and challenges, our academic philosophy is centred on focusing on fundamentals and value-based learning. We believe that true learning extends beyond the classroom. Through experiential learning, project-based learning, hands-on laboratory work, and interdisciplinary engagement, we empower students to apply their knowledge to real-world challenges. Alongside technical competence, we place equal emphasis on ethics, creativity, teamwork, communication, and leadership, ensuring the holistic development of every student.
              </p>
              <p>
                As a young and dynamic institution, we place research, innovation, and knowledge creation at the core of our vision. Through collaborative research initiatives and partnerships with leading national and international academic institutions, and industry leaders, we seek to advance knowledge and develop impactful solutions to contemporary challenges. Our industry-academia collaborations enable practitioners and domain experts to work closely with faculty through teaching, mentoring, workshops, and joint projects, enriching both learning and research. These engagements provide students and faculties with valuable exposure to emerging technologies and real-world problem-solving, helping them bridge the gap between theory and practice. 
              </p>
              <p>
                The institute is also committed to contributing to national priorities and developmental goals. We seek to support initiatives such as the IndiaAI Mission, the National Semiconductor Mission, and the vision of Viksit Bharat 2047. We believe that technology should serve as a force for inclusive growth, sustainable development, and societal well-being, and we encourage our students to develop solutions that create positive impact at local, national, and global levels.
              </p>
              <p>
                As we move forward, our aspiration is to build IIIT Pune into a globally recognized centre of excellence in Information Technology, Computer Science, Artificial Intelligence, Semiconductors, Electronics, and emerging digital technologies. Together, with the collective efforts of our students, faculty, staff, alumni, industry partners, and society, we will continue to create knowledge, nurture talent, and contribute to a technology-driven and sustainable future.
              </p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                I invite aspiring minds to join us in this journey of learning, discovery, innovation, and service to society. 
              </p>
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800/50">
                <p className="font-bold text-gray-900 dark:text-white">Prof. Vineet Kansal</p>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Director, IIIT Pune</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectorPage;
