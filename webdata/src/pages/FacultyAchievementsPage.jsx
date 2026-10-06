import React, { useState } from 'react';
import PageHeader from '../components/shared/PageHeader';
import { Search } from 'lucide-react';

const researchProjects = [
  {
    title: "Next Generation Data Carving and Preservation Techniques for Storage Drive Forensics",
    agency: "Ministry of Electronics and Information Technology (MeitY), Govt. of India",
    pi: "Dr. Bhupendra Singh",
    copi: "Dr. Sanjeev Sharma",
    amount: "1.93 Cr",
    duration: "2 Years"
  },
  {
    title: "Power and Space optimization in Internet of Things (IoT) System-on-Chip (SoC)",
    agency: "Ministry of Electronics and Information Technology (MeitY), Govt. of India",
    pi: "Dr. Nagendra Kushwaha",
    copi: "",
    amount: "81.50 Lakh",
    duration: "5 Years"
  },
  {
    title: "Design and Development of Substrate Integrated Waveguide (SIW) based Millimeter Wave Beam-Steerable Antenna Array Systems for 5G Networks",
    agency: "Department of Science and Technology (DST) / Govt. agencies",
    pi: "Dr. KM Divya Chaturvedi",
    copi: "",
    amount: "30 Lakh",
    duration: "3 Years"
  },
  {
    title: "DST-SERB project: Anomaly Detection & Countermeasures in Cyber-Physical System using Advanced Control & Estimation Techniques",
    agency: "DST-SERB, Govt. of India",
    pi: "Dr. Ranjith Ravindranathan Nair",
    copi: "",
    amount: "13.77 Lakh",
    duration: "2 Years"
  },
  {
    title: "Unified Drone Forensics Tool (UDFT) for Fly Path Reconstruction, Resident Files, Events Logs Analysis and Correlation",
    agency: "Govt. Security / Forensic Agencies",
    pi: "Dr. Nitesh K Bharadwaj",
    copi: "Dr. Bhupendra Singh",
    amount: "5.6 Lakh",
    duration: "6 Months"
  },
  {
    title: "High Data Rate Channel Codec Architecture for Free Space Classical RF and Optical Communication",
    agency: "ISRO",
    pi: "Dr. Dheeraj Dubey ",
    amount: "19 Lakh",
    duration: "2 Years"
  }
];

const patents = [
  {
    title: "AN ARTIFICIAL INTELLIGENCE (AI) BASED AUTOMATIC MONITORING SYSTEM AND A METHOD THEREOF",
    status: "Granted",
    date: "27th March 2026",
    appNo: "202341047997",
    inventors: "Dr. Sonam Maurya (Assistant Professor, Dept of CSE, IIIT Pune), Soha Muskan Sayyad, Samah Maaheen Sayyad, Susmitha Amudalapalli, Dr. Sushil Tiwari"
  },
  {
    title: "A BIOSENSOR FOR DETECTION OF DISEASE BIOMARKERS",
    status: "Granted",
    date: "15th July 2025",
    appNo: "202311044904",
    inventors: "Dr. Dheeraj Dubey (Assistant Professor, Dept of ECE, IIIT Pune), Dr. Shivam Singh, Bhargavi Chaudhary, Dr. Akash Srivastava, Dr. Anurag Upadhyay"
  }
];

const publications = [
  {
    authors: "Jain, Saloni, Bhupendra Singh, and Nitesh K. Bharadwaj",
    title: "Cryptocurrency forensics: Forensic analysis of the Electrum wallet to uncover artifacts",
    journal: "Journal of Forensic Sciences",
    year: "2026",
    doi: "10.1111/1556-4029.70357"
  },
  {
    authors: "Tiruganesh Lanka, Divya Chaturvedi, Maddirala Vijaya Lakshmi Bhavani, Arvind Kumar; Sreenivasulu Tupakula",
    title: "Integration of a Slotted Monopole Antenna with a Partially Reflective Surface for Enhanced Breast Tumor Detection",
    journal: "IEEE Access Journal, vol. 14, pp. 22503 - 22513",
    year: "2026",
    doi: "10.1109/ACCESS.2026.3662507"
  },
  {
    authors: "Divya Chaturvedi, VL Bhavani Maddirala, Arvind Kumar",
    title: "Design of Rectangular Slotted-Patch Antenna Array-Sensor for Breast-Tumor Detection",
    journal: "IEEE Latin America Transactions, vol. 23, no.11, 23, pp. 1143-1149",
    year: "2025",
    doi: "10.1109/TLA.2025.11194761"
  },
  {
    authors: "A. Kumar, D. Chaturvedi, F. Sarrazin",
    title: "Characterization and Modeling of Self-Diplexing MIMO Antenna for Endoscopy Capsule Applications",
    journal: "International Journal of Communication Systems",
    year: "2025",
    doi: "10.1002/dac.70179"
  },
  {
    authors: "MVL Bhavani,D.Chaturvedi, et. al",
    title: "A Non-Invasive Microwave Imaging System for Breast Tumor Detection Using a High Gain Vivaldi Antenna Array Sensor",
    journal: "IEEE Sensor Journal",
    year: "2025",
    doi: "10.1109/JSEN.2025.3588605"
  },
  {
    authors: "T. Lanka, D. Chaturvedi, MVL Bhavani, Arvind Kumar",
    title: "Design of PRS Enabled Monopole Slotted Antenna Sensor for Breast Tumor Detection",
    journal: "Scientific report Journal, April",
    year: "2025",
    doi: "10.1038/s41598-025-99102-9"
  },
  {
    authors: "D.Chaturvedi, T. Lanka, A.Kumar",
    title: "Compact 4-Port MIMO Antenna-Diplexer Utilizing Slotted HMSIW Technology",
    journal: "IEEE Latin America Transaction, vol. 23, no. 7, pp. 628-635",
    year: "2025",
    doi: ""
  },
  {
    authors: "D. Chaturvedi, B. Pramodini, T. Lanka",
    title: "Compact MIMO Antenna with Extended Bandwidth Enabled by Parasitic Patch Structure",
    journal: "Journal of Electromagnetic wave and propogation, April",
    year: "2025",
    doi: "10.1080/09205071.2025.2505051"
  },
  {
    authors: "B. Pramodini, D. Chaturvedi,L. Darasi, G. Rana and A. Kumar",
    title: "Optimized Compact MIMO Antenna Design: HMSIW-Based and Cavity-Backed for Enhanced Bandwidth,",
    journal: "IEEE Access, vol. 12, pp. 189820-189828 .https://ieeexplore.ieee.org/abstract/document/10792883",
    year: "2024",
    doi: ""
  },
  {
    authors: "S. Singh, Sushant Kumar, S. Majhi, U. Satija and C. Yuen",
    title: "Blind Carrier Frequency Offset Estimation Techniques for Next-Generation Multicarrier Communication Systems: Challenges, Comparative Analysis, and Future Prospects",
    journal: "IEEE Communications Surveys & Tutorials (Impact Factor: 34.4)",
    year: "2024",
    doi: "10.1109/COMST.2024.3472109"
  },
  {
    authors: "S. Singh, Sushant Kumar, S. Majhi and U. Satija",
    title: "Blind CFOs Estimation by Capon Method for Multi-User MIMO-OFDMA Uplink System,",
    journal: "in IEEE Signal Processing Letters, vol. 31, pp. 2545-2549, Sept",
    year: "2024",
    doi: "10.1109/LSP.2024.3458793."
  },
  {
    authors: "MVL Bhavani, Divya Chaturvedi, Tiruganesh Lanka, Arvind Kumar:",
    title: "Development of a QMSIW Antenna Sensor for Tumor Detection Utilizing a Hemispherical Multi-layered Dielectric Breast-Shaped Phantom",
    journal: "IEEE Sensor Journal",
    year: "2024",
    doi: "10.1109/JSEN.2024.3450990"
  },
  {
    authors: "Divya Chaturvedi, Prakash Jadhav, Ayman A. Althuwayb:",
    title: "A Compact 2-Port QMSIW Cavity-Backed MIMO Antenna with Varied Frequencies using CSRR-Slot Angles for WBAN Application",
    journal: "IEEE Access",
    year: "2024",
    doi: "10.1109/ACCESS.2024.3425520"
  },
  {
    authors: "Sonam Maurya, Nainil Nandu, Tanay Patel, V. Dinesh Reddy, Sushil Tiwari and Mahesh Kumar Morampudi",
    title: "A Discrete Cosine Transform based Intelligent Image Steganography Scheme using Quantum Substitution Box",
    journal: "Journal of Quantum Information Processing",
    year: "2023",
    doi: ""
  },
  {
    authors: "Sushant Kumar and S. Majhi",
    title: "Design and Testbed Implementation of Multiuser CFOs Estimation for MIMO SC-FDMA System,",
    journal: "in IEEE Transactions on Signal Processing, vol. 70, pp. 1880-1889",
    year: "2022",
    doi: "https"
  },
  {
    authors: "Anuja Dixit, and Rahul Dixit",
    title: "Forgery detection in medical images with distinguished recognition of original and tampered regions using density-based clustering technique",
    journal: "Applied Soft Computing 130: 109652",
    year: "2022",
    doi: ""
  },
  {
    authors: "Tanmoy Hazra, Kushal Anjaria",
    title: "Applications of game theory in deep learning: a Survey",
    journal: "Multimed Tools Appl 81, 8963-8994",
    year: "2022",
    doi: ""
  },
  {
    authors: "Mahesh S. Chaudhari, Sushant Kumar, Rahul Gupta, Manish Kumar, Sudhan Majhi",
    title: "Implementation and measurement of blind receiver for OFDM systems",
    journal: "IEEE Transactions on Instrumentation and Measurements, vol. 71, pp. 1-11",
    year: "2022",
    doi: ""
  },
  {
    authors: "Shubhra Jain, K. K. Pattanaik, Rahul Kumar Verma, Anupam Shukla",
    title: "EDVWDD: Event Driven Virtual Wheel-based Dat Dissemination for Mobile Sink-Enabled Wireless Sensor Networks",
    journal: "Journal of Supercomputing, Vol.77 (10), pp.11432-11457",
    year: "2021",
    doi: ""
  },
  {
    authors: "Tanmoy Hazra, Kushal Anjaria",
    title: "Analysis and applications of a Bridge Game",
    journal: "Journal of Ambient Intelligence an Humanized Computing, pg 1-13",
    year: "2021",
    doi: ""
  },
  {
    authors: "Rahul Dixit, Amita Nandal, Arvind Dhaka, Yohan V. Kuriakose, and Vardan Agarwal",
    title: "A DCT Fractional Bit Replacement Based Dual Watermarking Algorithm for Image Authentication",
    journal: "Recent Advances in Computer Science and Communications (Formerly: Recent Patents on Computer Science) 14, no. 9: 2899-2919",
    year: "2021",
    doi: ""
  },
  {
    authors: "Rahul Dixit, Amita Nandal, Arvind Dhaka, Vardan Agarwal, and Yohan V. Kuriakose",
    title: "LWT-DCT based Image Watermarking Scheme using Normalized SVD",
    journal: "Recent Advances in Computer Science and Communications (Formerly: Recent Patents on Computer Science) 14, no. 9: 2976-2991",
    year: "2021",
    doi: ""
  },
  {
    authors: "Sheikh Wasmir Hussain, Telajala Venkata Mahendra, Sandeep Mishra, Anup Dandapat ",
    title: "Match‐line control unit for power and delay reduction in hybrid CAM,",
    journal: "IET Circuits, Devices &amp; Systems, vol. 15, no. 3, pp. 272-283, Feb",
    year: "2021",
    doi: ""
  },
  {
    authors: "Farhana Begum, Sandeep Mishra, Anup Dandapat",
    title: "Low power 10-bit flash ADC with divide and collate subrangin conversion scheme,",
    journal: "Scientia Iranica, Transactions D: Computer Science &amp; Engineering and Electrical Engineering, vol. 28, no. 6, pp. 3464-3479, Dec",
    year: "2021",
    doi: ""
  },
  {
    authors: "Sharma, Arpit Kumar, Amita Nandal, Arvind Dhaka, and Rahul Dixit",
    title: "Medical image classification techniques and analysis using deep learning networks: a review",
    journal: "Health informatics: a computational perspective in healthcare: 233-258",
    year: "2021",
    doi: ""
  },
  {
    authors: "Rahul Dixit, Dev Sourav Panda, Shradha Suman Panda",
    title: "An Advanced Susceptible-Exposed-Infectious-Recovered model for quantitative analysis of COVID-19",
    journal: "Springer, Vol.46, Pages1-10",
    year: "2021",
    doi: ""
  },
  {
    authors: "Chandrakant Guled",
    title: "The MHD flow of liquid film in the presence of dissipation and thermal radiation through an unsteady stretching sheet by HAM",
    journal: "Turkish Journal of Computer and Mathematics Education (TURCOMAT) 12 (13), 949-959",
    year: "2021",
    doi: ""
  },
  {
    authors: "Vagisha Mishra",
    title: "Barrenness between Mr. and Mrs. Ramsay: Fillmore’s frame Study of Virginia Woolf’s to the Lighthouse",
    journal: "International Journal of English Literature and Social Sciences 6 (04), 73-75",
    year: "2021",
    doi: ""
  },
  {
    authors: "Vagisha Mishra",
    title: "The Patriarch vis-a-vis Matriarch: Fillmore's Frame Semantic Study of Virginia Woolf's Between the Acts",
    journal: "International Journal of Advanced Research 9 (02), 307-309",
    year: "2021",
    doi: ""
  },
  {
    authors: "Amruta Lipare, Damodar Reddy Edla, and Ramesh Dharavath",
    title: "Fuzzy Rule Generation using Modified PSO for Clustering in Wireless Sensor Networks",
    journal: "IEEE Transactions on Green Communications and Networking. Vol. 5, No. 2 pages846 -857",
    year: "2021",
    doi: ""
  },
  {
    authors: "Amruta Lipare, Damodar Reddy Edla, and Ramesh Dharavath",
    title: "Energy Efficient Fuzzy clustering and routing using BAT algorithm",
    journal: "Wireless Networks, Vol. 27, No. 4, pages: 2813-2828, Springer",
    year: "2021",
    doi: ""
  },
  {
    authors: "Amruta Lipare, Damodar Reddy Edla, and Saidi Reddy Parne",
    title: "Fuzzy Rule-based System for Energy Efficiency in Wireless Sensor Networks",
    journal: "Journal of Supercomputing, pages: 1-24, Springer",
    year: "2021",
    doi: ""
  },
  {
    authors: "Madhu, Santanoo, Ravi Kumar Prasad, Prashant Ramotra, Damodar Reddy Edla, and Amruta Lipare",
    title: "A Location-less Energy Efficient Algorithm for Load Balanced Clustering in Wireless Sensor Networks",
    journal: "Wireless Personal Communications, pages: 1-19",
    year: "2021",
    doi: ""
  },
  {
    authors: "Rakshit Mittal, A. Amalin Prince, Saif Nalband, Femi Robert, and Jac Fredo",
    title: "Modified-MaMeMi filter bank for efficient extraction of brainwaves from electroencephalograms",
    journal: "Biomedical Signal Processing and Control, Vol. 69, pages: 102927",
    year: "2021",
    doi: ""
  },
  {
    authors: "Parikshit Saikia and Sushanta Karmakar",
    title: "Improved distributed approximation for Steiner tree in the CONGEST model",
    journal: "Journal of Parallel and Distributed Computing (JPDC), Vol. 158, Iss. December, pages: 196–212",
    year: "2021",
    doi: ""
  },
  {
    authors: "Parikshit Saikia, Sushanta Karmakar, and Aris Pagourtzis",
    title: "Primal-Dual based distributed approximation algorithm for prize-collecting Steiner tree",
    journal: "Discrete Mathematics, Algorithms and Applications (DMAA), pages: 2150008(1–48), Vol. 13, No. 2",
    year: "2021",
    doi: ""
  },
  {
    authors: "Kaushlendra Sharma and Rajesh Doriya",
    title: "Coordination of multi-robot path planning for warehouse application using smart approach for identifying destinations",
    journal: "Intell. Serv. Robotics, Vol. 14, No 2, pages: 313-325",
    year: "2021",
    doi: ""
  },
  {
    authors: "Amit Kumar Pathy, Anand Kumar, Rahul Gupta, Sushant Kumar, Sudhan Majhi",
    title: "Design and implementation of blind modulation classification for asynchronous MIMO-OFDM system",
    journal: "IEEE Transactions on Instrumentation and Measurement, vol. 70, pp. 1-11",
    year: "2021",
    doi: ""
  },
  {
    authors: "Sharma, A. K., Nandal, A., Dhaka, A., & Rahul Dixit",
    title: "A survey on machine learning based brain retrieval algorithms in medical image analysis",
    journal: "Health and Technology, 10, pp. 1359-1373",
    year: "2020",
    doi: ""
  }
];

const conferences = [
  {
    details: "D. Chaturvedi, VL Bhavani Maddirala \"A 5.8-GHz Slotted Microstrip Antenna Array for Breast Tumor Detection\" Wireless, Antenna &amp; Microwave Symposium, WAMS 2026, June 10-13, 2026, Hyderabad."
  },
  {
    details: "A. Kumar, D. Chaturvedi \u201cDual Sequentially Rotated Feed CP Antenna Array\u201d Wireless, Antenna &amp; Microwave Symposium, WAMS 2026, June 10-13, 2026, Hyderabad."
  },
  {
    details: "Arvind Kumar, Pooja Sharma, Divya Chaturvedi, Hung Tran Huy, Ramesh Kumar Sonkar,\u201dSIW Inspired Single Slot Leaky-Wave Antenna\u201d IEEE International Symposium on Antennas &amp; Propagation and USNC-URSI Radio Science Meeting on 12 - 17 July 2026 in Detroit, Michigan, USA"
  },
  {
    details: "D. Chaturvedi, T Ganesh, A. Kumar \"Compact Design of a 4-Port MIMO Antenna-Diplexer Leveraging HMSIW Cavities\" IEEE, European Conference on Antenna and Propagation (EuCAP), Stockholm, Sweden, 30 March - 4 April 2025."
  },
  {
    details: "A. Kumar, D. Chaturvedi, et al. \"QMSIW Based Self-Diplexing MIMO Antenna \" 2025, IEEE, European Conference on Antenna and Propagation (EuCAP), Stockholm, Sweden, 30 March - 4 April 2025."
  },
  {
    details: "T. Ganesh, A. Kumar, M. Bhavani, D. Chaturvedi Design of Meta Surface Based Monopole Antenna Sensor for Breast Cancer Detection\", IEEE Microwaves, Antennas, and Propagation Conference (MAPCON), Hyderabad, Dec 9-13, 2024."
  }
];

const bookChapters = [
  {
    details: "S. P. Jakhar, A. Nandal, R. Dixit, “Classification and Measuring Accuracy of Lenses Using Inception Model V3 In: Innovations in Computational Intelligence and Computer Vision. Advances in Intelligent Systems and Computing, vol 1189 (2021). Springer, Singapore. Published on January 2021."
  },
  {
    details: "A. K. Sharma, A. Nandal, A. Dhaka, and R. Dixit, “Medical Image Classification Techniques and Analysis Using Deep Learning Networks: A Review. In: Health Informatics: A Computational Perspective in Healthcare. Studies in Computational Intelligence, vol 932 (2021). Springer, Singapore. Published on September 2021."
  }
];

const recognitions = [
  {
    text: "Dr. Divya Chaturvedi has been recognized among the Top 2% Scientists worldwide in the annual list published by Stanford University for three consecutive years (2023, 2024, and 2025). This prestigious recognition is based on the global impact of a researcher's scientific publications and citation metrics. Dr. Chaturvedi has authored more than 38 journal articles in IEEE and SCI-indexed journals, along with 25 papers presented at reputed international and Indian flagship conferences. Her research contributions have received over 1,320 citations, with a h-index of 22 and an i10-index of 32, reflecting the significant impact and quality of her scholarly work."
  }
];

const FacultyAchievementsPage = () => {
  const [pubQuery, setPubQuery] = useState('');

  const filteredPublications = publications.filter(pub => 
    pub.title.toLowerCase().includes(pubQuery.toLowerCase()) ||
    pub.authors.toLowerCase().includes(pubQuery.toLowerCase()) ||
    pub.journal.toLowerCase().includes(pubQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Faculty Achievements" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Awards & Recognitions */}
        <section id="recognitions" className="scroll-mt-24">
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-150 dark:border-gray-800 p-6 md:p-10 space-y-6">
            <h2 className="text-3xl font-bold font-serif text-primary dark:text-white leading-tight">
              Awards & Recognitions
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {recognitions.map((rec, index) => (
                <div key={index} className="p-6 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-150 dark:border-gray-800 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed flex items-start shadow-sm">
                  <p className="text-justify">{rec.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 1: Research Projects & Grants */}
        <section id="grants" className="scroll-mt-24">
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-150 dark:border-gray-800 overflow-hidden mb-12">
            <div className="p-6 md:p-10 max-w-3xl">
              <h2 className="text-3xl font-bold font-serif text-primary dark:text-white leading-tight mb-4">
                Sponsored Research Projects
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Faculty members at IIIT Pune are actively engaged in state-of-the-art research sponsored by major government ministries (like MeitY and DST-SERB). These projects push the boundaries of digital forensics, IoT hardware security, and advanced antenna beamforming.
              </p>
              
              <div className="grid grid-cols-2 gap-4 max-w-md">
                <div className="p-4 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-150 dark:border-gray-800">
                  <span className="text-2xl font-bold text-primary dark:text-accent-dark">₹3.2+ Cr</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total Active Funding</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-150 dark:border-gray-800">
                  <span className="text-2xl font-bold text-primary dark:text-accent-dark">5+ Projects</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">National Research Schemes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Project List Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchProjects.map((project, index) => (
              <div key={index} className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-md border border-gray-150 dark:border-gray-800 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="bg-green-500/10 text-green-600 dark:text-green-400 font-bold px-3 py-1 rounded-full text-xs">
                      ₹{project.amount}
                    </span>
                  </div>
                  
                  <h4 className="font-bold text-sm text-gray-800 dark:text-gray-100 line-clamp-3">
                    {project.title}
                  </h4>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    <strong>Agency:</strong> {project.agency}
                  </p>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 mt-6 pt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div>
                    <strong>PI:</strong> {project.pi}
                    {project.copi && ` & ${project.copi}`}
                  </div>
                  {project.duration && !project.duration.toLowerCase().includes('month') && (
                    <div className="flex items-center text-accent dark:text-accent-dark font-medium">
                      {project.duration}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Patents */}
        <section id="patents" className="scroll-mt-24">
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-150 dark:border-gray-800 p-6 md:p-10 space-y-6">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold font-serif text-primary dark:text-white leading-tight">
                Patents & Inventions
              </h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our faculty members are actively patenting technologies ranging from advanced AI automatic monitoring grids to novel disease biosensors, fostering a rich atmosphere of tech transfer and IP protection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {patents.map((pat, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-gray-800/30 p-5 rounded-xl border border-gray-150 dark:border-gray-800 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-xs uppercase tracking-wider text-accent dark:text-accent-dark">
                        Application: No. {pat.appNo}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        pat.status === 'Granted' 
                          ? 'bg-green-500/10 text-green-600 dark:text-green-400' 
                          : 'bg-blue-500/10 text-accent dark:text-accent-dark'
                      }`}>
                        {pat.status}
                      </span>
                    </div>
                    
                    <h4 className="font-bold text-sm text-gray-800 dark:text-gray-100 leading-snug">
                      "{pat.title}"
                    </h4>
                  </div>

                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-4 pt-2 border-t border-gray-100 dark:border-gray-800/50">
                    <strong>Date:</strong> {pat.date} | <strong>Inventors:</strong> {pat.inventors}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Publications */}
        <section id="publications" className="scroll-mt-24">
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-md border border-gray-150 dark:border-gray-800 p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold font-serif text-primary dark:text-white">
                  Peer-Reviewed Journal Publications
                </h3>
              </div>

              {/* Search filter */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Filter papers..." 
                  value={pubQuery}
                  onChange={(e) => setPubQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 text-xs rounded-lg border border-gray-155 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40 text-gray-700 dark:text-gray-300 w-full md:w-60 focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
              {filteredPublications.map((pub, idx) => (
                <div key={idx} className="p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/20 border-l-4 border-accent dark:border-accent-dark transition-colors space-y-1 text-xs">
                  <p className="font-bold text-gray-800 dark:text-gray-100 leading-snug">
                    "{pub.title}"
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 font-semibold">
                    {pub.authors}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    <em>{pub.journal}</em> {pub.vol && `(${pub.vol})`}, {pub.year}
                  </p>
                  {pub.doi && (
                    <p className="text-[10px] text-accent dark:text-accent-dark font-medium">
                      DOI: {pub.doi}
                    </p>
                  )}
                </div>
              ))}
              {filteredPublications.length === 0 && (
                <p className="text-center text-xs text-gray-500 dark:text-gray-400 py-6">No publications matched your search.</p>
              )}
            </div>
          </div>
        </section>

        {/* Section 4: Conference Contributions */}
        <section id="conferences" className="scroll-mt-24">
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-md border border-gray-150 dark:border-gray-800 p-6 md:p-8 space-y-6">
            <h3 className="text-2xl font-bold font-serif text-primary dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
              Key Conference Contributions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {conferences.map((conf, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-150 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300 leading-relaxed flex items-start space-x-3">
                  <span className="text-accent mt-0.5">•</span>
                  <span>{conf.details}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Book Chapters */}
        <section id="book-chapters" className="scroll-mt-24">
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-md border border-gray-150 dark:border-gray-800 p-6 md:p-8 space-y-6">
            <h3 className="text-2xl font-bold font-serif text-primary dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
              Book Chapters
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookChapters.map((book, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-gray-150 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300 leading-relaxed flex items-start space-x-3">
                  <span className="text-accent mt-0.5">•</span>
                  <span>{book.details}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default FacultyAchievementsPage;
