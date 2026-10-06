import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const ResearchScholarInstitutePage = () => {
  const yearsData = [
    {
      year: "2026",
      tables: [
        [
          { sno: 1, mis: "322615002", name: "Aradhana Ramkrishna Pawale", topic: "--", supervisor: "Dr. Priyank Jain, Dr. Sonam Maurya", email: "322615002@phd.iiitp.ac.in", branch: "CSE" },
          { sno: 2, mis: "322615003", name: "Dhiraj Arun Patil", topic: "--", supervisor: "Dr. Habila Basumatary", email: "322615003@phd.iiitp.ac.in", branch: "CSE" },
          { sno: 3, mis: "322615004", name: "Lata Namdevrao jadhav", topic: "--", supervisor: "Dr. Sanjeev Sharma", email: "322615004@phd.iiitp.ac.in", branch: "CSE" },
          { sno: 4, mis: "322615005", name: "Pradip Chandgadkar", topic: "--", supervisor: "Dr. Kaptan Singh", email: "322615005@phd.iiitp.ac.in", branch: "CSE" },
          { sno: 5, mis: "322615006", name: "Pratiksha Saheb", topic: "--", supervisor: "Dr. Sumit Kumar Gupta", email: "322615006@phd.iiitp.ac.in", branch: "CSE" },
          { sno: 6, mis: "322615008", name: "Rajendra Satpute", topic: "--", supervisor: "Dr. Bhupendra Singh", email: "322615008@phd.iiitp.ac.in", branch: "CSE" },
          { sno: 7, mis: "322615009", name: "Varad Arun Potdar", topic: "--", supervisor: "Dr. Shrikant Salve, Dr. Priyank Jain", email: "322615009@phd.iiitp.ac.in", branch: "CSE" },
        ],
        [
          { sno: 1, mis: "322616001", name: "Anchal Khare", topic: "--", supervisor: "Dr. Nagendra Kushwaha", email: "322616001@phd.iiitp.ac.in", branch: "ECE" },
        ],
        [
          { sno: 1, mis: "322617001", name: "Prathmesh Baban Pawar", topic: "--", supervisor: "Dr. Bhupendra Singh, Dr. Jatin Majithia", email: "322617001@phd.iiitp.ac.in", branch: "ASH" },
          { sno: 2, mis: "322617002", name: "Pustode Dnyandev Jeevan", topic: "--", supervisor: "Dr. Anagha Khiste, Dr. Jatin Majithia", email: "322617002@phd.iiitp.ac.in", branch: "ASH" },
        ]
      ]
    },
    {
      year: "2025",
      tables: [
        [
          { sno: 1, mis: "322515001", name: "Aman Anand", topic: "---", supervisor: "Dr. Mahendra Pratap Yadav", email: "322515001@phd.iiitp.ac.in", branch: "CSE" },
          { sno: 2, mis: "322515002", name: "Seema Arya", topic: "---", supervisor: "Dr. Sumit Kumar Gupta, Dr. Kaptan Singh", email: "322515002@phd.iiitp.ac.in", branch: "CSE" },
          { sno: 3, mis: "322515003", name: "Megha Purohit", topic: "---", supervisor: "Dr. Kaptan Singh", email: "322515003@phd.iiitp.ac.in", branch: "CSE" },
          { sno: 4, mis: "322515004", name: "Pradnya Kad Tapkir", topic: "--", supervisor: "Dr. Shivangi Shukla", email: "322515004@phd.iiitp.ac.in", branch: "CSE" },
          { sno: 5, mis: "322515005", name: "Vishal Sathawane", topic: "---", supervisor: "Dr. Habila Basumatary", email: "322515005@phd.iiitp.ac.in", branch: "CSE" },
          { sno: 6, mis: "322515006", name: "Sagar Apune", topic: "---", supervisor: "Dr. Mahesh Joshi", email: "322515006@phd.iiitp.ac.in", branch: "CSE" },
          { sno: 7, mis: "312515001", name: "Shweta Vijayrao Deotare", topic: "---", supervisor: "Dr. Sanga Chaki", email: "312515001@phd.iiitp.ac.in", branch: "CSE" },
          { sno: 8, mis: "312515002", name: "Jyoti Abhijit Manoorkar", topic: "---", supervisor: "Dr. Shivangi Shukla, Dr. Bhupendra Singh", email: "312515002@phd.iiitp.ac.in", branch: "CSE" },
          { sno: 9, mis: "312515004", name: "Samar Kumar Mishra", topic: "---", supervisor: "Dr. Habila Basumatary", email: "312515004@phd.iiitp.ac.in", branch: "CSE" },
          { sno: 10, mis: "312515005", name: "Kusumlata Dubey", topic: "---", supervisor: "Dr. Kaptan Singh", email: "312515005@phd.iiitp.ac.in", branch: "CSE" },
          { sno: 11, mis: "312515006", name: "Batchala Rakesh", topic: "---", supervisor: "Dr. Priyank Jain", email: "312515006@phd.iiitp.ac.in", branch: "CSE" },
          { sno: 12, mis: "312515007", name: "Mahesh Baburao Lonare", topic: "---", supervisor: "Dr. Shrikant Salve, Dr. Mahendra Pratap Yadav", email: "312515007@phd.iiitp.ac.in", branch: "CSE" },
          { sno: 13, mis: "312515008", name: "Sushil Kumar Mishra", topic: "---", supervisor: "Dr. Sumit Kumar Gupta", email: "3125150018@phd.iiitp.ac.in", branch: "CSE" },
          { sno: 14, mis: "312515009", name: "Akshita Gupta", topic: "---", supervisor: "Dr. Sonam Maurya", email: "312515009@phd.iiitp.ac.in", branch: "CSE" },
        ],
        [
          { sno: 1, mis: "322516001", name: "Mohd Arif Shaikh", topic: "--", supervisor: "Dr. Shubham Shukla", email: "322516001@phd.iiitp.ac.in", branch: "ECE" },
          { sno: 2, mis: "322516002", name: "Shubham Mishra", topic: "---", supervisor: "Dr. Dheeraj Dubey", email: "322516002@phd.iiitp.ac.in", branch: "ECE" },
          { sno: 3, mis: "322516003", name: "Abrar Zaheer Mohammed", topic: "--", supervisor: "Dr. Dipen Bepari", email: "322516003@phd.iiitp.ac.in", branch: "ECE" },
          { sno: 4, mis: "312516001", name: "Avinash Kumar Panday", topic: "--", supervisor: "Dr. KM Divya Chaturvedi", email: "312516001@phd.iiitp.ac.in", branch: "ECE" },
        ],
        [
          { sno: 1, mis: "312517001", name: "Harshal Appasaheb Rawade", topic: "--", supervisor: "Dr. Jatin Majithia", email: "312517001@phd.iiitp.ac.in", branch: "AS&H" },
          { sno: 2, mis: "312517002", name: "Mamta Basavraj Chowgule", topic: "---", supervisor: "Dr. Chandrakant Narayan Guled", email: "312517002@phd.iiitp.ac.in", branch: "AS&H" },
          { sno: 3, mis: "312517003", name: "Sabrina Mohammadrehan Kazi", topic: "--", supervisor: "Dr. Chandrakant Narayan Guled, Dr. Anagha Uday Khiste", email: "312517003@phd.iiitp.ac.in", branch: "AS&H" },
          { sno: 4, mis: "312517004", name: "Sneha Dattatray Pekhale", topic: "--", supervisor: "Dr. Jatin Majithia", email: "312517004@phd.iiitp.ac.in", branch: "AS&H" },
        ]
      ]
    },
    {
      year: "2024",
      tables: [
        [
          { sno: 1, mis: "312415001", name: "Juhi Agrawal", topic: "Machine learning", supervisor: "Dr. Sumit Kumar Gupta", email: "Juhi.agrawal24@iiitp.ac.in", branch: "CSE" },
          { sno: 2, mis: "312415002", name: "Kunal Kundu", topic: "Machine Learning", supervisor: "Dr. Sanga Chaki", email: "kunal.kundu24@iiitp.ac.in", branch: "CSE" },
          { sno: 3, mis: "312415003", name: "Jesleena Gonsalves", topic: "Information Security, Cryptography, Artificial Intelligence", supervisor: "Dr. Bhupendra Singh", email: "jesleena.gonsalves24@iiitp.ac.in", branch: "CSE" },
          { sno: 4, mis: "312415004", name: "Swapnil Kisan Shinde", topic: "Machine Learning, System Security", supervisor: "Dr.Shrikant Salve", email: "swapnil.shinde24@iiitp.ac.in", branch: "CSE" },
          { sno: 5, mis: "312415005", name: "Shakila Shaikh", topic: "ML ans DL", supervisor: "Dr. Sanjeev Sharma", email: "shakila.shaikh24@iiitp.ac.in", branch: "CSE" },
          { sno: 6, mis: "312415006", name: "Komal Gaikwad", topic: "IoT with Deep Learning, Deep Learning", supervisor: "Dr. Mahesh Joshi", email: "komal.gaikwad24@iiitp.ac.in", branch: "CSE" },
          { sno: 7, mis: "312405007", name: "Dasharath Satawa Waaghama", topic: "Machine learning and cyber security", supervisor: "Dr. Shivangi Shukla", email: "dasharath.waghamare24@iiitp.ac.in", branch: "CSE" },
          { sno: 8, mis: "312415008", name: "Gajendra Sanjay Vyas", topic: "Deep Learning, Human-Computer Interaction, Wireless Sensor Network, (IoT), and (VANET)", supervisor: "Dr. Sonam Maurya", email: "gajendra.vyas24@iiitp.ac.in", branch: "CSE" },
          { sno: 9, mis: "312415009", name: "Jyoti Jadhav", topic: "Networking, Security, ML", supervisor: "Dr. Kaptan Singh", email: "jyoti.jadhav24@iiitp.ac.in", branch: "CSE" },
        ]
      ]
    },
    {
      year: "2023",
      tables: [
        [
          { sno: 1, mis: "312315001", name: "Atish Rajebhau Katkar", topic: "--", supervisor: "Dr. Sanjeev Sharma", email: "atish.katkar23@iiitp.ac.in", branch: "CSE" },
          { sno: 2, mis: "312315002", name: "Milind Bhanudasrao Gaikwad", topic: "--", supervisor: "Dr. Mahendra P. Yadav", email: "milind.gaikwad23@iiitp.ac.in", branch: "CSE" },
          { sno: 4, mis: "312315004", name: "Pravin Madhukar Dhanrao", topic: "Usable Security", supervisor: "Dr. Shrikant Salve", email: "pravin.dhanrao23@iiitp.ac.in", branch: "CSE" },
          { sno: 5, mis: "312315005", name: "Priya Amarnath Jadhav", topic: "--", supervisor: "Dr. Priyank Jain", email: "priya.jadhav23@iiitp.ac.in", branch: "CSE" },
          { sno: 6, mis: "312315006", name: "Santhosh Nivrutti Shelke", topic: "Crop Disease Prediction using Deep Learning with Augmented Reality in the Indian Agriculture Sector", supervisor: "Dr. Mahendra Pratap Yadav, Dr. Shrikant Salve", email: "santosh.shelke23@iiitp.ac.in", branch: "CSE" },
          { sno: 7, mis: "312315007", name: "Sharayu Vijay Ethape", topic: "--", supervisor: "Dr. Meenakshi Choudhary", email: "sharayu.ethape23@iiitp.ac.in", branch: "CSE" },
          { sno: 8, mis: "312315008", name: "Yashwant Aditya", topic: "Artificial Intelligence with Cyber Security", supervisor: "Dr. Priyank Jain", email: "yashwant.aditya23@iiitp.ac.in", branch: "CSE" },
        ],
        [
          { sno: 1, mis: "312316002", name: "Riya Arun Kanase", topic: "Cyber Physical System in Robotics.", supervisor: "Dr.Sushant Kumar, Dr.Nagendra Kushwaha", email: "riya.kanase23@iiitp.ac.in", branch: "ECE" },
          { sno: 2, mis: "312316003", name: "Shailaja Santhosh Udtewar", topic: "--", supervisor: "Dr. Nagendra Kushwaha, Dr. Sushant Kumar", email: "shailaja.udtewar23@iiitp.ac.in", branch: "ECE" },
        ],
        [
          { sno: 1, mis: "31239001", name: "Priti Shinde", topic: "--", supervisor: "Dr. Chandrakant Naryan Guled", email: "priti.shinde23@iiitp.ac.in", branch: "ASH" },
        ]
      ]
    },
    {
      year: "2022",
      tables: [
        [
          { sno: 1, mis: "31225001", name: "Chingrace Guite", topic: "Deep Learning-based disease analysis in medical imaging system", supervisor: "Dr. Sanjeev Sharma", email: "chingraceguite22@iiitp.ac.in", branch: "CSE" },
          { sno: 2, mis: "31225002", name: "Saloni Jain", topic: "Crypto-Currency Forensics:Wallet Forensic Analysis to Un-cover Crypto Related Crimes", supervisor: "Dr. Bhupendra Singh", email: "salonijain22@iiitp.ac.in", branch: "CSE" },
          { sno: 3, mis: "31225003", name: "Teena Arvind Varma", topic: "--", supervisor: "Dr. Sanjeev Sharma", email: "teenavarma22@iiitp.ac.in", branch: "CSE" },
          { sno: 4, mis: "32215001", name: "Deepa Singh Sisodiya", topic: "An Artificial Neural Networks Based Packet Sniffing for Website Security", supervisor: "Dr. Ritu Tiwari, Dr. Priyank Jain", email: "deepasingh21@iiitp.ac.in", branch: "CSE" },
        ],
        [
          { sno: 1, mis: "31226001", name: "Harish Sharma", topic: "Application of AI in Robotics", supervisor: "Dr. Shubam Shukla, Dr. Sushant Kumar, Dr. Ritu Tiwari", email: "harish@iiitp.ac.in", branch: "ECE" }
        ],
        [
          { sno: 1, mis: "31227001", name: "Sagata Samanta", topic: "Narrative Medicine", supervisor: "Dr. Vagisha Mishra, Dr. Jatin Majithia", email: "sagata.samanta22@iiitp.ac.in", branch: "ASH" }
        ],
        [
          { sno: 1, mis: "31228001", name: "Meenakshi Banga", topic: "Measuring the Impact of Technology Adaptation in the Bottom of the Pyramid on Customers of Retail Banking in India", supervisor: "Dr. Vagisha Mishra", email: "meenakshibanga22@iiitp.ac.in", branch: "Management" },
          { sno: 1, mis: "31008002", name: "Somya Shukla", topic: "--", supervisor: "Dr. Naval Bajpai, Dr. Vagisha Mishra", email: "somyashukla22@iiitp.ac.in", branch: "Management" }
        ],
        [
          { sno: 1, mis: "31009002", name: "Rahul Rajebhau Deshmukh", topic: "--", supervisor: "Dr. Anagha Uday Khiste", email: "deshmukhrr14@gmail.com", branch: "ASH" }
        ]
      ]
    },
    {
      year: "2021",
      tables: [
        [
          { sno: 1, mis: "31215001", name: "Alesh Kumar Sharma", topic: "Digital Image Forgery Detection", supervisor: "Dr. Mahendra P. Yadav, Dr. Ritu Tiwari", email: "aleshsharma@iiitp.ac.in", branch: "CSE" },
          { sno: 2, mis: "31215002", name: "Anupama Arun", topic: "Plant species identification", supervisor: "Dr. Sanjeev Sharma, Dr. Bhupendra Singh", email: "anupama@iiitp.ac.in", branch: "CSE" },
          { sno: 3, mis: "31215003", name: "Padma Poonamchand Nimbhore", topic: "Cotton plant disease detection and recommendation", supervisor: "Dr. Mahendra Yadav, Dr. Ritu Tiwari", email: "padma2021@cse.iiitp.ac.in", branch: "CSE" },
          { sno: 4, mis: "31215004", name: "Smita Baghel", topic: "--", supervisor: "Dr. Anupam Shukla, Dr. Priyank Jain, Dr. Ritu Tiwari", email: "smita@iiitp.ac.in", branch: "CSE" },
          { sno: 5, mis: "31215005", name: "Snigdha Smita Choubey", topic: "Medical image processing using deep learning", supervisor: "Dr. Shubam Shukla, Dr. Meenakshi Choudhary", email: "snigdhasmitac21@cse.iiitp.ac.in", branch: "CSE" },
          { sno: 6, mis: "31215006", name: "Subhash Yadav", topic: "--", supervisor: "Dr. Ritu Tiwari, Dr. Mahendra P. Yadav, Dr. Shubam Shukla", email: "subhash.yadav@gmail.com", branch: "CSE" }
        ],
        [
          { sno: 1, mis: "31216001", name: "Rishu Yadav", topic: "Design of Low- Power ALU using Vedic and reversible techniques.", supervisor: "Dr. Nagendra kushwaha", email: "rishuyadav21@ece.iiitp.ac.in", branch: "ECE" },
          { sno: 2, mis: "31216002", name: "Vaibhav VasudevRao Gijare", topic: "--", supervisor: "Dr. Anagha Uday Khiste, Dr. Sushant Kumar", email: "vaibhavgijare21@ece.iiitp.ac.in", branch: "ECE" },
          { sno: 3, mis: "32216001", name: "Priti Nahar", topic: "Intelligent Surveying of EHV Transmission Line Corridor", supervisor: "Dr. Sushant Kumar, Dr. Anupam Shukla", email: "priti.nahar21@iiitp.ac.in", branch: "ECE" }
        ],
        [
          { sno: 1, mis: "32217001", name: "Hasina Sadaf", topic: "A Freudian Exploration of Virginia Woolf and Anita Desai's Literary Masterpieces", supervisor: "Dr. Vagisha Mishra", email: "hasina.sadaf21@iiitp.ac.in", branch: "ASH" }
        ]
      ]
    },
    {
      year: "2020",
      tables: [
        [
          { sno: 1, mis: "32205001", name: "Aditi Agrawal", topic: "--", supervisor: "Dr. Amruta Vishnu Lipare", email: "aditiagrawal@iiitp.ac.in", branch: "CSE" },
          { sno: 2, mis: "32205003", name: "Rajeshwari Harsh", topic: "Subseasonal Extreme Event Prediction Using Deep Learning", supervisor: "Dr. Shrikant Salve", email: "rajeshwariharsh@iiitp.ac.in", branch: "CSE" },
          { sno: 3, mis: "32205004", name: "Subrit Dikshit", topic: "Artificial Intelligence", supervisor: "Dr. Ritu Tiwari", email: "subritdikshit@iiitp.ac.in", branch: "CSE" }
        ],
        [
          { sno: 1, mis: "32206001", name: "Ayush Tiwari", topic: "--", supervisor: "Dr. Priyank Jain, Dr. Urmila A. Patil", email: "ayushtiwari@iiitp.ac.in", branch: "ECE" }
        ]
      ]
    },
    {
      year: "2019",
      tables: [
        [
          { sno: 1, mis: "31195001", name: "Anu Priya", topic: "Learning Based Path Planning", supervisor: "Dr. Ritu Tiwari, Dr. Pooja Agrawal, Dr. Sushant Kumar", email: "anupriya@iiitp.ac.in", branch: "CSE" }
        ],
        [
          { sno: 1, mis: "31196001", name: "Amit Kumar", topic: "--", supervisor: "Dr. Sushant Kumar, Dr. Chandrakant Narayan Guled", email: "amitkumar@iiitp.ac.in", branch: "ECE" }
        ]
      ]
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Ph.D. Scholars Under Institute Scheme" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="p-6 md:p-8 space-y-12">
            {yearsData.map((yearGroup) => (
              <div key={yearGroup.year} className="space-y-8">
                <h3 className="text-2xl font-bold text-center text-primary dark:text-blue-400">
                  List of Ph.D Students - {yearGroup.year}
                </h3>
                
                <div className="space-y-6">
                  {yearGroup.tables.map((tableData, index) => (
                    <div key={`${yearGroup.year}-${index}`} className="overflow-x-auto">
                      <table className="w-full text-sm text-left border-collapse rounded-lg overflow-hidden shadow-sm">
                        <thead className="bg-[#6b58e6] text-white">
                          <tr>
                            <th className="p-3 font-semibold border-r border-[#8474e9] w-16 text-center">Sr. no.</th>
                            <th className="p-3 font-semibold border-r border-[#8474e9] min-w-[100px]">MIS No.</th>
                            <th className="p-3 font-semibold border-r border-[#8474e9] min-w-[150px]">Name</th>
                            <th className="p-3 font-semibold border-r border-[#8474e9] min-w-[200px]">Research Topic</th>
                            <th className="p-3 font-semibold border-r border-[#8474e9] min-w-[150px]">Supervisor</th>
                            <th className="p-3 font-semibold border-r border-[#8474e9]">Email</th>
                            <th className="p-3 font-semibold text-center w-24">Branch</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-700 dark:text-gray-300">
                          {tableData.map((row) => (
                            <tr key={row.mis} className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                              <td className="p-3 text-center border-r border-gray-200 dark:border-gray-700">{row.sno}.</td>
                              <td className="p-3 font-medium border-r border-gray-200 dark:border-gray-700">{row.mis}</td>
                              <td className="p-3 font-bold border-r border-gray-200 dark:border-gray-700">{row.name}</td>
                              <td className="p-3 border-r border-gray-200 dark:border-gray-700">{row.topic}</td>
                              <td className="p-3 text-[#0056b3] dark:text-blue-400 border-r border-gray-200 dark:border-gray-700 break-words whitespace-pre-wrap">
                                {row.supervisor.split(', ').map((sup, i) => (
                                  <div key={i}>{sup}</div>
                                ))}
                              </td>
                              <td className="p-3 text-[#0056b3] dark:text-blue-400 border-r border-gray-200 dark:border-gray-700">{row.email}</td>
                              <td className="p-3 text-center font-medium">{row.branch}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchScholarInstitutePage;
