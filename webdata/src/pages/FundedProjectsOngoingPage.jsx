import React from 'react';
import PageHeader from '../components/shared/PageHeader';

const FundedProjectsOngoingPage = () => {
  const data = [
    {
      sno: 1,
      faculty: "Dr. Dheeraj Dubey",
      category: "Externally Sponsored",
      agency: "ISRO",
      pi: "Dr. Jahnvi Tiwari",
      title: "High Data Rate Channel Codec Architecture for Free Space Classical RF and Optical Communication",
      startDate: "June-26",
      status: "Ongoing",
      duration: "2 Years",
      completionDate: "June 2028",
      grant: "19"
    },
    {
      sno: 2,
      faculty: "Dr. Dheeraj Dubey",
      category: "Externally Sponsored",
      agency: "ART PARK (IISC) KARNATAKA",
      pi: "Dr. Dheeraj Dubey",
      title: "5G-V2X Enabled Cooperative Blind-Spot Detection System with RIS-Assisted VANETs",
      startDate: "Apr-26",
      status: "Ongoing",
      duration: "1 year",
      completionDate: "April 2026-27",
      grant: "22.3"
    },
    {
      sno: 3,
      faculty: "Divya Chaturvedi",
      category: "Externally Sponsored",
      agency: "CSIR",
      pi: "DR. Shiv Narayan, Principal Scientist, CSIR NAL, Bangalore",
      title: "Design and Development of Substrate Integrated Waveguide (SIW) based Millimeter Wave Beam-Steerable Antenna Array Systems for 5G Networks",
      // startDate: "16.07.2025",
      startDate: "July-25",
      status: "Ongoing",
      duration: "3 years",
      completionDate: "16.07. 2025 - 15.7.2028",
      grant: "30"
    },
    {
      sno: 4,
      faculty: "Dr. Bhupendra Singh",
      category: "Externally Sponsored",
      agency: "MeitY",
      pi: "Dr. Sanjeev Sharma",
      title: "Next Generation Data Carving and Preservation Techniques for Storage Drive Forensics",
      startDate: "Sept-25",
      status: "Ongoing",
      duration: "2 Years",
      completionDate: "From Aug 2025",
      grant: "193"
    },
    {
      sno: 5,
      faculty: "Dr. Habila Basumatary",
      category: "Externally Sponsored",
      agency: "ANRF",
      pi: "Dr. Sanjeev Sharma, Dr. Bhupendra Singh Dr. Sushant Kumar, Dr. Dheeraj Dubey, Dr. Dipen Bepari, Dr. Shivangi Shukla",
      title: "Technologies for implementation of DPDP Rules 2025",
      // startDate: "26.09.25",
      startDate: "Sept-25",
      status: "Ongoing",
      duration: "5 Years",
      completionDate: "From Sept 2025",
      grant: "438"
    },
    {
      sno: 6,
      faculty: "Dr. Nagendra Kushwaha",
      category: "Externally Sponsored",
      agency: "Ministry of Electronics & Information Technology, Govt. of India",
      pi: "Chief Investigator (CI): Dr. Nagendra Kushwaha",
      title: "Power and Space optimization in Internet of Things (IoT) System-on-Chip (SoC)",
      // startDate: "03.08.23",
      startDate: "Aug-23",
      status: "Ongoing",
      duration: "5 Years",
      completionDate: "",
      grant: "81.5"
    },
    

  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Funded Projects (Ongoing)" />
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-surface-dark rounded-xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-primary text-white dark:bg-gray-800">
                <tr>
                  <th className="p-3.5 font-semibold text-center w-16">S.No.</th>
                  <th className="p-3.5 font-semibold min-w-[120px]">Name of the IIIT Pune Faculty / PI</th>
                  <th className="p-3.5 font-semibold min-w-[120px]">Project Category</th>
                  <th className="p-3.5 font-semibold min-w-[100px]">Funding Agency</th>
                  <th className="p-3.5 font-semibold min-w-[180px]">Co-PI</th>
                  <th className="p-3.5 font-semibold min-w-[200px]">Title of the Project</th>
                  <th className="p-3.5 font-semibold text-center whitespace-nowrap">Start Date</th>
                  {/* <th className="p-3.5 font-semibold text-center">Status</th> */}
                  <th className="p-3.5 font-semibold text-center">Duration</th>
                  {/* <th className="p-3.5 font-semibold text-center">Completion Date</th> */}
                  <th className="p-3.5 font-semibold min-w-[80px]">Grant Amount (in Lakhs)</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                {data.map((row) => (
                  <tr key={row.sno} className="border-b border-gray-100 dark:border-gray-800 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors last:border-b-0">
                    <td className="p-3.5 text-center border-r border-gray-100 dark:border-gray-800">{row.sno}</td>
                    <td className="p-3.5 border-r border-gray-100 dark:border-gray-800">{row.faculty}</td>
                    <td className="p-3.5 border-r border-gray-100 dark:border-gray-800">{row.category}</td>
                    <td className="p-3.5 border-r border-gray-100 dark:border-gray-800">{row.agency}</td>
                    <td className="p-3.5 border-r border-gray-100 dark:border-gray-800">{row.pi}</td>
                    <td className="p-3.5 border-r border-gray-100 dark:border-gray-800">{row.title}</td>
                    <td className="p-3.5 border-r border-gray-100 dark:border-gray-800 text-center">{row.startDate}</td>
                    {/* <td className="p-3.5 border-r border-gray-100 dark:border-gray-800 text-center">{row.status}</td> */}
                    <td className="p-3.5 border-r border-gray-100 dark:border-gray-800 text-center">{row.duration}</td>
                    {/* <td className="p-3.5 border-r border-gray-100 dark:border-gray-800 text-center">{row.completionDate}</td> */}
                    <td className="p-3.5 text-center font-semibold text-emerald-600 dark:text-emerald-400">{row.grant}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 text-right text-sm text-gray-500 dark:text-gray-400">
          Last Updated: 30-04-2026
        </div>
      </div>
    </div>
  );
};

export default FundedProjectsOngoingPage;
