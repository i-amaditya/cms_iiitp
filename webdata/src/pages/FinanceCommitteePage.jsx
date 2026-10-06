import React from 'react';
import PageHeader from '../components/shared/PageHeader';
import CommitteeTable from '../components/shared/CommitteeTable';

const FinanceCommitteePage = () => {
  const data = [
    { srNo: 1, name: "Shri Vishad Mafatlal", affiliation: "Padmanabh Mafatlal Group, Mumbai", designation: "Chairperson" },
    { srNo: 2, name: "Shri. Mukesh Kumar", affiliation: "Integrated Finance Division (IFD) at the Department of Higher Education, Ministry of Education, Government of India", designation: "Member" },
    { srNo: 3, name: "Dr. Dattatray V. Jadhav", affiliation: "Joint Director, Technical Education, Regional Office Pune", designation: "Member" },
    { srNo: 4, name: "Shri. Vikas Kumbhar", affiliation: "Chief Finance Officer, MahalT, Mumbai", designation: "Member" },
    { srNo: 5, name: "Prof. Vineet Kansal", affiliation: "Director, IIIT Pune", designation: "Member" },
    { srNo: 6, name: "Dr. Nagendra Kushwaha", affiliation: "Registrar(I/C), IIIT Pune", designation: "Secretary" },
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Finance Committee" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CommitteeTable data={data} />
      </div>
    </div>
  );
};

export default FinanceCommitteePage;
