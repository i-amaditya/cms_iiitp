import React from 'react';
import PageHeader from '../components/shared/PageHeader';
import CommitteeTable from '../components/shared/CommitteeTable';

const SenatePage = () => {
  const data = [
    { srNo: 1, name: "Prof. Vineet Kansal", affiliation: "Director, IIIT Pune", designation: "Chairperson" },
    { srNo: 2, name: "Prof. Somanath Tripathy", affiliation: "Professor, IIT Patna", designation: "Member" },
    { srNo: 3, name: "Prof. Umesh Ghanekar", affiliation: "Professor, NIT Kurukshetra", designation: "Member" },
    { srNo: 4, name: "Prof. Pushpa Trivedi", affiliation: "Ex-Professor, IIT Mumbai", designation: "Member" },
    { srNo: 5, name: "Prof. Ravi Prakash Tewari", affiliation: "Professor, MNNIT Allahabad", designation: "Member" },
    { srNo: 6, name: "Prof. Avinash G. Keskar", affiliation: "Professor, VNIT Nagpur", designation: "Member" },
    { srNo: 7, name: "Prof. Aparajita Ojha", affiliation: "Professor, PDPM-IIITDM Jabalpur", designation: "Member" },
    { srNo: 8, name: "Dr. Sanjeev Sharma", affiliation: "Associate Dean, IIIT Pune", designation: "Member" },
    { srNo: 9, name: "Dr. Bhupendra Singh", affiliation: "HoD (CSE), IIIT Pune", designation: "Member" },
    { srNo: 10, name: "Dr. Nagendra Kushwaha", affiliation: "HoD (ECE), IIIT Pune", designation: "Member" },
    { srNo: 11, name: "Dr. Jatin Majithia", affiliation: "HoD (AS&H), IIIT Pune", designation: "Member" },
    { srNo: 12, name: "Dr. Nagendra Kushwaha", affiliation: "Registrar(I/C), IIIT Pune", designation: "Secretary" },
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Senate" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CommitteeTable data={data} />
      </div>
    </div>
  );
};

export default SenatePage;
