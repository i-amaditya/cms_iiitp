import PageHeader from '../components/shared/PageHeader';
import CommitteeTable from '../components/shared/CommitteeTable';

const BoardOfGovernorsPage = () => {

  const data = [
    { srNo: 1, name: "Shri Vishad Mafatlal", affiliation: "Padmanabh Mafatlal Group, Mumbai", designation: "Chairperson" },
    { srNo: 2, name: "Mrs. Saumya Gupta", affiliation: "Joint Secretary (Technical Education), Ministry of Education, Government of India, New Delhi", designation: "Member" },
    { srNo: 3, name: "Dr. Vinod Mohitkar", affiliation: "Director (Technical Education), Directorate of Technical Education, Maharashtra", designation: "Member" },
    { srNo: 4, name: "Shri. Anuj Mohan Sherry", affiliation: "Head – Mobile Financial Services (MFS) Professional Services, Ericsson India Pvt. Ltd.", designation: "Member" },
    { srNo: 5, name: "Er. (Mrs.) B. Padma S. Rao", affiliation: "Chief Scientist and Chair EIAARA division, CSIR NEERI, Nagpur", designation: "Member" },
    { srNo: 6, name: "Prof. Madhu Vij", affiliation: "Former Professor, Faculty of Management, University of Delhi", designation: "Member" },
    { srNo: 7, name: "Prof. R. K. Sharma", affiliation: "Retired Professor (HAG) & Former Head, Deptt. of Mathematics, IIT Delhi", designation: "Member" },
    { srNo: 8, name: "Prof. U. C. Gupta", affiliation: "Retired Professor (HAG) and Former Head, Deptt. of Mathematics, IIT Kharagpur", designation: "Member" },
    { srNo: 9, name: "Shri Bhagwan Patil", affiliation: "Chief Operating Officer, MahalT, Mumbai", designation: "Member" },
    { srNo: 10, name: "Prof. Prem Lal Patel", affiliation: "Director, VNIT, Nagpur", designation: "Member" },
    { srNo: 11, name: "Dr. Nagendra Kushwaha", affiliation: "Assistant Professor, IIIT Pune", designation: "Member" },
    { srNo: 12, name: "Dr. Sanjeev Sharma", affiliation: "Assistant Professor, IIIT Pune", designation: "Member" },
    { srNo: 13, name: "Prof. Kishor Kumar", affiliation: "Principal, Mihir Bhoj PG College, Uttar Pradesh", designation: "Member" },
    { srNo: 14, name: "Prof. Vineet Kansal", affiliation: "Director, IIIT Pune", designation: "Member" },
    { srNo: 15, name: "Dr. Nagendra Kushwaha", affiliation: "Registrar(I/C), IIIT Pune", designation: "Secretary" },
  ];

  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Board of Governors" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CommitteeTable data={data} />
      </div>
    </div>
  );
};

export default BoardOfGovernorsPage;