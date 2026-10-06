import React, { useEffect, useState } from "react";
import PageHeader from "../components/shared/PageHeader";
import PatentStats from "../components/patents/PatentStats";
import PatentFilters from "../components/patents/PatentFilters";
import PatentCard from "../components/patents/PatentCard";

const PatentsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    
    
  //Patent Data
  const patents = [
      //{year 2026}

    {
      id: 1,
      title: "Wearable Device for Environmental Sensing-Based Detection of Airborne Infection Risk",
      patentNumber: "202621034175",
      inventors: ["Dr. Kaptan Singh", "Dr. Sumit Kumar Gupta"],
      department: "Computer Science & Engineering",
      status: "Published",
      country: "India",
      publishedDate: "15 May 2026",
      grantDate: "-",
      year: "2026",
    },
    {
      id: 2,
      title: "IoT-Based Automated Student Attendance System Using BLE Beacons and Facial Recognition",
      patentNumber: "202521132064",
      inventors: ["Dr. Sumit Kumar Gupta", "Dr. Kaptan Singh"],
      department: "Computer Science & Engineering",
      status: "Published",
      country: "India",
      publishedDate: "06 February 2026",
      grantDate: "-",
      year: "2026",
    },
    {
      id: 3,
      title: "Computing Device for Android Security Threat Detection",
      patentNumber: "488573-001",
      inventors: ["Dr. Sumit Kumar Gupta"],
      department: "Computer Science & Engineering",
      status: "Published",
      country: "India",
      publishedDate: "27 January 2026",
      grantDate: "-",
      year: "2026",
    },
    {
      id: 4,
      title: "Edge-Assisted UWB Railway Hazard Detection and Response System",
      patentNumber: "---",
      inventors: ["Dr. Dheeraj Dubey"],
      department: "Electronics & Communication Engineering",
      status: "Published",
      country: "India",
      publishedDate: "April 2026",
      grantDate: "-",
      year: "2026",
    },
    {
      id: 5,
      title: "IoT-Based Automated Student Attendance System Using BLE Beacons and Facial Recognition",
      patentNumber: "---",
      inventors: ["Dr. Dheeraj Dubey"],
      department: "Electronics & Communication Engineering",
      status: "Published",
      country: "India",
      publishedDate: "February 2026",
      grantDate: "-",
      year: "2026",
    },
    {
      id: 28,
      title: "Board Game",
      patentNumber: "449313-001",
      inventors: [
        "Dr. Sonam Maurya",
        "Pallavi Sri Tempalli",
        "Keerthi Tanvita Jayana",
        "Nainil Nandu",
        "Rohit Kumar Thangi"
      ],
      department: "Computer Science & Engineering",
      status: "Granted",
      country: "India",
      publishedDate: "25-Feb-2025",
      grantDate: "21-Jan-2026",
      year: "2026",
      certificate: "/assets/patents_certificates/449313-001.pdf",
    },
    {
      id: 29,
      title: "An Artificial Intelligence (AI) Based Automatic Monitoring System and a Method Thereof",
      patentNumber: "202341047997",
      inventors: [
        "Soha Muskaan Sayyad",
        "Samah Maaheen Sayyad",
        "Susmitha Amudalapalli",
        "Dr. Sonam Maurya",
        "Dr. Sushil Tiwari"
      ],
      department: "Computer Science & Engineering",
      status: "Granted",
      country: "India",
      publishedDate: "01-Sep-2023",
      grantDate: "27-Mar-2026",
      year: "2026",
      certificate: "/assets/patents_certificates/202341047997.pdf",
    },
      //{year 2025}
      {
        id: 30,
        title: "Board Game",
        patentNumber: "449312-001",
        inventors: [
          "Dr. Sonam Maurya",
          "Pallavi Sri Tempalli",
          "Keerthi Tanvita Jayana",
          "Nainil Nandu",
          "Rohit Kumar Thangi"
        ],
        department: "Computer Science & Engineering",
        status: "Granted",
        country: "India",
        publishedDate: "25-Feb-2025",
        grantDate: "16-Jul-2025",
        year: "2025",
        certificate: "/assets/patents_certificates/449312-001.pdf",
      },
      {
        id: 31,
        title: "Board Game",
        patentNumber: "449314-001",
        inventors: [
          "Dr. Sonam Maurya",
          "Pallavi Sri Tempalli",
          "Keerthi Tanvita Jayana",
          "Nainil Nandu",
          "Rohit Kumar Thangi"
        ],
        department: "Computer Science & Engineering",
        status: "Granted",
        country: "India",
        publishedDate: "25-Feb-2025",
        grantDate: "26-May-2025",
        year: "2025",
        certificate: "/assets/patents_certificates/449314-001.pdf",
      },
      {
        id: 32,
        title: "A System and Method for Assisting a Blind and Visually Impaired Person",
        patentNumber: "202521038581",
        inventors: [
          "Dr. Priyank Jain",
          "Dr. Sonam Maurya",
          "Mr. Yashwant Aditya",
          "Dr. Sushil Tiwari",
          "Dr. Meenakshi"
        ],
        department: "Computer Science & Engineering",
        status: "Published",
        country: "India",
        publishedDate: "09-May-2025",
        grantDate: "-",
        year: "2025",
      },
      {
        id: 33,
        title: "System and Method for Multimodal Prediction of Autism Spectrum Disorder Using Vision Transformers",
        patentNumber: "202541044737",
        inventors: [
          "P. Bhagya Lakshmi",
          "V. Dinesh Reddy",
          "M. Mahesh Kumar",
          "Kshira Sagar Sahoo",
          "Dr. Sonam Maurya"
        ],
        department: "Computer Science & Engineering",
        status: "Published",
        country: "India",
        publishedDate: "30-May-2025",
        grantDate: "-",
        year: "2025",
      },
      {
        id: 34,
        title: "Board Game",
        patentNumber: "449315-001",
        inventors: [
          "Dr. Sonam Maurya",
          "Pallavi Sri Tempalli",
          "Keerthi Tanvita Jayana",
          "Nainil Nandu",
          "Rohit Kumar Thangi"
        ],
        department: "Computer Science & Engineering",
        status: "Under Examination",
        country: "India",
        publishedDate: "25-Feb-2025",
        grantDate: "-",
        year: "2025",
      },
      {
        id: 35,
        title: "Eco Friendly Dice (Toy)",
        patentNumber: "449316-001",
        inventors: [
          "Dr. Sonam Maurya",
          "Pallavi Sri Tempalli",
          "Keerthi Tanvita Jayana",
          "Nainil Nandu",
          "Rohit Kumar Thangi"
        ],
        department: "Computer Science & Engineering",
        status: "Under Examination",
        country: "India",
        publishedDate: "25-Feb-2025",
        grantDate: "-",
        year: "2025",
      },
      {
        id: 36,
        title: "Eco Friendly Cone (Toy)",
        patentNumber: "449317-001",
        inventors: [
          "Dr. Sonam Maurya",
          "Pallavi Sri Tempalli",
          "Keerthi Tanvita Jayana",
          "Nainil Nandu",
          "Rohit Kumar Thangi"
        ],
        department: "Computer Science & Engineering",
        status: "Under Examination",
        country: "India",
        publishedDate: "25-Feb-2025",
        grantDate: "-",
        year: "2025",
      },
    {
      id: 6,
      title: "System and Method for Assisting Blind and Visually Impaired Person",
      patentNumber: "---",
      inventors: ["Dr. Priyank Jain"],
      department: "Computer Science & Engineering",
      status: "Published",
      country: "India",
      publishedDate: "2025",
      grantDate: "-",
      year: "2025",
    },
    {
      id: 7,
      title: "System and Method of Detecting and Regulating Parameters in a Greenhouse Environment",
      patentNumber: "202021048735",
      inventors: ["Dr. Priyank Jain"],
      department: "Computer Science & Engineering",
      status: "Granted",
      country: "India",
      publishedDate: "-",
      grantDate: "2025",
      year: "2025",
    },
    {
      id: 8,
      title: "Novel Photonic Crystal Fiber Biosensor with Integrated Surface Plasmon Resonance for Ultrasensitive Detection of Disease Biomarkers",
      patentNumber: "---",
      inventors: ["Dr. Dheeraj Dubey"],
      department: "Electronics & Communication Engineering",
      status: "Granted",
      country: "India",
      publishedDate: "-",
      grantDate: "July 2025",
      year: "2025",
    },
    {
      id: 9,
      title: "AI-Based Energy Consumption Monitoring Device",
      patentNumber: "----",
      inventors: ["Dr. Mahendra Pratap Yadav"],
      department: "Computer Science & Engineering",
      status: "Granted",
      country: "India",
      publishedDate: "---",
      grantDate: "---",
      year: "2025",
    },
    {
      id: 10,
      title: "Blockchain-Based Medical Data Storage Cloud Device",
      patentNumber: "---",
      inventors: ["Dr. Mahendra Pratap Yadav"],
      department: "Computer Science & Engineering",
      status: "Granted",
      country: "India",
      publishedDate: "---",
      grantDate: "-",
      year: "2025",
    },

      //{year 2024}
    {
      id: 11,
      title: "IoT-Based Face Recognition Attendance System",
      patentNumber: "---",
      inventors: ["Dr. Priyank Jain"],
      department: "Computer Science & Engineering",
      status: "Published",
      country: "India",
      publishedDate: "2024",
      grantDate: "-",
      year: "2024",
    },
    {
      id: 12,
      title: "Emerging Computational Intelligence Approaches Using EEG Signal Analysis",
      patentNumber: "2023/06945",
      inventors: ["Dr. Priyank Jain"],
      department: "Computer Science & Engineering",
      status: "Granted",
      country: "South Africa",
      publishedDate: "-",
      grantDate: "2024",
      year: "2024",
    },
    {
        id: 13,
        title: "An Octa-Band Self-Multiplexing Antenna (SMA) for Sub 6 GHz Applications",
        patentNumber: "202441039762",
        inventors: [
          "Dr. KM Divya Chaturvedi",
          "Dr. Arvind Kumar",
          "Dr. Ashish Chandelkar"
        ],
        department: "Electronics & Communication Engineering",
        status: "Published",
        country: "India",
        publishedDate: "2024",
        grantDate: "-",
        year: "2024",
      },
      {
        id: 14,
        title: "Design and Analysis of Miniaturized Patch Antenna-Array for Ground Penetrating Radar Application",
        patentNumber: "202441007753",
        inventors: [
          "Dr. KM Divya Chaturvedi",
          "Dr. Tiruganesh"
        ],
        department: "Electronics & Communication Engineering",
        status: "Published",
        country: "India",
        publishedDate: "2024",
        grantDate: "-",
        year: "2024",
      },
      //{year 2023}
      

    {
      id: 15,
      title: "Bio Reactor System for Wastewater Treatment",
      patentNumber: "386595-001",
      inventors: ["Dr. Priyank Jain"],
      department: "Computer Science & Engineering",
      status: "Granted",
      country: "India",
      publishedDate: "-",
      grantDate: "2023",
      year: "2023",
    },
    {
      id: 16,
      title: "Portable Crop Disease Detection Device",
      patentNumber: "2022/03710",
      inventors: ["Dr. Priyank Jain"],
      department: "Computer Science & Engineering",
      status: "Granted",
      country: "South Africa",
      publishedDate: "-",
      grantDate: "2023",
      year: "2023",
    },
        //{year 2022}
    {
      id: 17,
      title: "Portable Face Recognition cum Attendance Recording Device",
      patentNumber: "364331-001",
      inventors: ["Dr. Priyank Jain"],
      department: "Computer Science & Engineering",
      status: "Granted",
      country: "India",
      publishedDate: "-",
      grantDate: "2022",
      year: "2022",
    },
    {
      id: 18,
      title: "Automatic Crop Disease Detection System",
      patentNumber: "2022/00717",
      inventors: ["Dr. Priyank Jain"],
      department: "Computer Science & Engineering",
      status: "Granted",
      country: "South Africa",
      publishedDate: "-",
      grantDate: "2022",
      year: "2022",
    },
    {
      id: 19,
      title: "IoT-Based System and Method for Monitoring Traffic and Controlling Traffic Signals Using Machine Learning",
      patentNumber: "2021104850",
      inventors: ["Dr. Sumit Kumar Gupta"],
      department: "Computer Science & Engineering",
      status: "Granted",
      country: "Australia",
      publishedDate: "-",
      grantDate: "02 June 2022",
      year: "2022",
    },
    {
      id: 20,
      title: "Mirror List Query Architecture of Multi Architecture Cloud Platform Mirror Warehouse",
      patentNumber: "---",
      inventors: ["Dr. Mahendra Pratap Yadav"],
      department: "Computer Science & Engineering",
      status: "Published",
      country: "India",
      publishedDate: "-",
      grantDate: "-",
      year: "2022",
    },
        //{year 2021}
    {
      id: 23,
      title: "Sensor Placement Optimization Toolkit (SPOT)",
      patentNumber: "L-99726/2021",
      inventors: ["Dr. Priyank Jain"],
      department: "Computer Science & Engineering",
      status: "Granted",
      country: "India",
      publishedDate: "-",
      grantDate: "2021",
      year: "2021",
    },
    {
      id: 24,
      title: "Method for Enhanced Encryption in Hadoop Distributed Cluster",
      patentNumber: "2021106216",
      inventors: ["Dr. Priyank Jain"],
      department: "Computer Science & Engineering",
      status: "Granted",
      country: "Australia",
      publishedDate: "-",
      grantDate: "2021",
      year: "2021",
    },  
  ];

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Filter Logic
  const filteredPatents = patents.filter((patent) => {
  const search = searchTerm.trim().toLowerCase();

  const matchesSearch =
    search === "" ||
    patent.title.toLowerCase().includes(search) ||
    patent.patentNumber?.toLowerCase().includes(search) ||
    patent.department?.toLowerCase().includes(search) ||
    patent.country?.toLowerCase().includes(search) ||
    patent.status?.toLowerCase().includes(search) ||
    patent.year?.toLowerCase().includes(search) ||
    patent.inventors.join(" ").toLowerCase().includes(search);

  const matchesYear =
    selectedYear === "" || patent.year === selectedYear;

  const matchesDepartment =
    selectedDepartment === "" ||
    patent.department === selectedDepartment;

  const matchesStatus =
    selectedStatus === "" ||
    patent.status === selectedStatus;

  return (
    matchesSearch &&
    matchesYear &&
    matchesDepartment &&
    matchesStatus
  );
});

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Patents" />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <section>
            <PatentStats patents={patents} />
          </section>

          <section>
            <PatentFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
          </section>

          <section>
            <div className="mb-6 flex flex-col gap-3 border-b border-gray-200 pb-3 dark:border-gray-800 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-bold font-serif text-primary dark:text-white">
                  Patents Portfolio
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Discover innovative technologies developed by IIIT Pune.
                </p>
              </div>

              <div className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                {filteredPatents.length} {filteredPatents.length === 1 ? "Patent" : "Patents"}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredPatents.length > 0 ? (
                filteredPatents.map((patent) => (
                  <PatentCard key={patent.id} patent={patent} />
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600 dark:border-gray-700 dark:bg-surface-dark dark:text-gray-300 md:col-span-2 xl:col-span-3">
                  No patents found for the selected filters.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PatentsPage;