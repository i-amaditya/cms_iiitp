-- ==============================================================================
-- Indian Institute of Information Technology Pune (IIIT Pune)
-- Seed Data for CMS Initial Setup
-- Compatible with MySQL and PostgreSQL
-- ==============================================================================

-- 1. SEED DEPARTMENTS
INSERT INTO departments (id, name, short_name, slug, description, is_active, display_order)
VALUES 
(1, 'Computer Science & Engineering', 'CSE', 'cse', 'Department of Computer Science and Engineering offers B.Tech, M.Tech, and Ph.D. programs focusing on Artificial Intelligence, Cyber Security, Distributed Systems, and Data Science.', 1, 1),
(2, 'Electronics & Communication Engineering', 'ECE', 'ece', 'Department of Electronics and Communication Engineering specializes in VLSI Design, Embedded Systems, Wireless Communications, and Signal Processing.', 1, 2),
(3, 'Applied Sciences & Humanities', 'ASH', 'ash', 'Department of Applied Sciences and Humanities imparts foundational courses in Mathematics, Physics, Professional Ethics, and Management Sciences.', 1, 3)
ON CONFLICT (id) DO NOTHING;

-- 2. SEED FACULTY
INSERT INTO faculty (
    id, employee_id, title, first_name, middle_name, last_name, full_name,
    designation, department_id, faculty_type, email, alternate_email, phone,
    office_location, office_room, profile_photo, profile_slug, highest_qualification,
    specialization, research_interests, areas_of_expertise, biography,
    academic_experience, industry_experience, research_keywords,
    google_scholar_url, orcid_url, scopus_url, researchgate_url, vidwan_url, linkedin_url,
    display_order, status, is_active
) VALUES 
(
    1, 'IIITP-FAC-001', 'Prof.', 'Suresh', 'Chandra', 'Satapathy', 'Prof. Suresh Chandra Satapathy',
    'Professor & Dean (Academic)', 1, 'Regular', 'suresh.satapathy@iiitp.ac.in', 'scs.iiitp@gmail.com', '+91 20 2699 3001',
    'Academic Block A', 'Room 304', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'prof-suresh-satapathy', 'Ph.D. in Computer Science & Engineering',
    'Machine Learning, Evolutionary Computing, Swarm Intelligence, Medical Imaging',
    'Swarm Intelligence algorithms, Deep Learning models for healthcare diagnosis, Nature-inspired optimization for IoT networks.',
    'Algorithm Design, Neural Networks, Soft Computing, Research Governance',
    'Prof. Suresh Chandra Satapathy is a senior academician and Senior Member of IEEE with over 25 years of teaching and research experience. He has published over 150 research papers in SCI/Scopus indexed journals and authored several benchmark textbooks in computing.',
    '24 Years across National Institutes of Technology and IIITs.',
    '3 Years Consultant for Advanced Scientific Data Analytics.',
    'Machine Learning, Bio-inspired Algorithms, Image Processing, Healthcare AI',
    'https://scholar.google.com/citations?user=sample1', 'https://orcid.org/0000-0002-1234-5678',
    'https://scopus.com/authid/detail.uri?authorId=123456', 'https://researchgate.net/profile/suresh-satapathy',
    'https://vidwan.inflibnet.ac.in/profile/10001', 'https://linkedin.com/in/prof-suresh-satapathy',
    1, 'PUBLISHED', 1
),
(
    2, 'IIITP-FAC-002', 'Dr.', 'Pooja', 'R.', 'Kulkarni', 'Dr. Pooja R. Kulkarni',
    'Associate Professor & HoD ECE', 2, 'Regular', 'pooja.kulkarni@iiitp.ac.in', 'pkulkarni.ece@gmail.com', '+91 20 2699 3012',
    'Advanced Labs Complex', 'Room 112', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    'dr-pooja-kulkarni', 'Ph.D. in VLSI Systems, IIT Bombay',
    'Low-power VLSI, Neuromorphic Architectures, FPGA Acceleration, Embedded AI',
    'Energy-efficient hardware for edge computing, memristor-based crossbars, mixed-signal chip design for sensor interfaces.',
    'VLSI CAD, Verilog/VHDL, System-on-Chip (SoC) Design, Edge AI Hardware',
    'Dr. Pooja Kulkarni earned her doctorate from IIT Bombay and has pioneered high-density hardware accelerators for embedded neural networks. She coordinates the IIIT Pune Microelectronics Lab and serves on several IEEE circuit design technical committees.',
    '12 Years at IIIT Pune and premier technical institutions.',
    '4 Years Senior Silicon Design Engineer at Texas Instruments Bangalore.',
    'VLSI Design, Edge Computing, Neuromorphic Hardware, FPGA',
    'https://scholar.google.com/citations?user=sample2', 'https://orcid.org/0000-0003-9876-5432',
    'https://scopus.com/authid/detail.uri?authorId=654321', 'https://researchgate.net/profile/pooja-kulkarni',
    'https://vidwan.inflibnet.ac.in/profile/10002', 'https://linkedin.com/in/dr-pooja-kulkarni',
    2, 'PUBLISHED', 1
),
(
    3, 'IIITP-FAC-003', 'Dr.', 'Anand', 'Kumar', 'Deshmukh', 'Dr. Anand Kumar Deshmukh',
    'Assistant Professor (Grade I)', 3, 'Regular', 'anand.deshmukh@iiitp.ac.in', 'anand.deshmukh@outlook.com', '+91 20 2699 3025',
    'Science Block B', 'Room 205', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    'dr-anand-deshmukh', 'Ph.D. in Applied Mathematics, IISc Bangalore',
    'Mathematical Modeling, Cryptography, Quantum Information Theory, Graph Theory',
    'Post-quantum lattice cryptography, topological data analysis for complex networks, fluid dynamic simulations.',
    'Discrete Mathematics, Linear Algebra, Number Theory, Quantum Cryptography',
    'Dr. Anand Deshmukh is an applied mathematician focusing on algebraic structures in secure communication systems. He is a recipient of the Ramanujan Fellowship and advises national cybersecurity working groups.',
    '8 Years in University & Institute Teaching.',
    '2 Years Postdoctoral Research Fellow at Max Planck Institute.',
    'Quantum Computing, Cryptography, Graph Analytics, Differential Equations',
    'https://scholar.google.com/citations?user=sample3', 'https://orcid.org/0000-0001-4567-8910',
    'https://scopus.com/authid/detail.uri?authorId=789101', 'https://researchgate.net/profile/anand-deshmukh',
    'https://vidwan.inflibnet.ac.in/profile/10003', 'https://linkedin.com/in/dr-anand-deshmukh',
    3, 'PUBLISHED', 1
)
ON CONFLICT (id) DO NOTHING;

-- 3. SEED USERS (Passwords hashed with bcrypt - salt factor 10)
-- Development credentials:
-- Admin: admin@iiitp.ac.in / Admin@IIITP2026
-- Faculty CSE: faculty.cse@iiitp.ac.in / Faculty@IIITP2026
-- Faculty ECE: faculty.ece@iiitp.ac.in / Faculty@IIITP2026
INSERT INTO users (id, username, email, password_hash, role, faculty_id, is_active)
VALUES
(1, 'admin', 'admin@iiitp.ac.in', '$2b$10$SPgd17j8hHp2SWjJwmI4LeSBjXBf3RSr894o0esbHexwqWrQKd5RW', 'SUPER_ADMIN', NULL, 1),
(2, 'faculty_cse', 'faculty.cse@iiitp.ac.in', '$2b$10$iQs1oFD826QdGcUzQy8bSe.Dnhxn.rTixc0iGXaFegVQlsIIolaRG', 'FACULTY', 1, 1),
(3, 'faculty_ece', 'faculty.ece@iiitp.ac.in', '$2b$10$iQs1oFD826QdGcUzQy8bSe.Dnhxn.rTixc0iGXaFegVQlsIIolaRG', 'FACULTY', 2, 1)
ON CONFLICT (id) DO NOTHING;

-- 4. SEED EDUCATION
INSERT INTO faculty_education (id, faculty_id, degree, specialization, institution, year, description, display_order)
VALUES
(1, 1, 'Ph.D.', 'Computer Science & Engineering', 'Indian Institute of Technology Kharagpur', '2005', 'Doctoral thesis on Swarm Intelligence Approaches to Multi-Objective Medical Optimization.', 1),
(2, 1, 'M.Tech.', 'Computer Science', 'National Institute of Technology Rourkela', '1999', 'First Class with Distinction; thesis on Evolutionary Clustering Algorithms.', 2),
(3, 1, 'B.Tech.', 'Computer Engineering', 'Utkal University', '1996', 'Gold Medalist for highest academic standing across engineering faculty.', 3),
(4, 2, 'Ph.D.', 'Microelectronics & VLSI', 'Indian Institute of Technology Bombay', '2014', 'Thesis: Ultra-Low-Power Subthreshold Standard Cell Library Design for Biomedical Implants.', 1),
(5, 2, 'M.Tech.', 'VLSI & Embedded Systems', 'College of Engineering Pune (COEP)', '2009', 'Rank 1 in ECE Department.', 2),
(6, 3, 'Ph.D.', 'Applied Mathematics', 'Indian Institute of Science (IISc) Bangalore', '2018', 'Thesis on Lattice-based Cryptographic Primitives in Post-Quantum Security.', 1)
ON CONFLICT (id) DO NOTHING;

-- 5. SEED EXPERIENCE
INSERT INTO faculty_experience (id, faculty_id, organization, designation, start_date, end_date, description, display_order)
VALUES
(1, 1, 'IIIT Pune', 'Professor & Dean (Academic)', '2019-07-01', 'Present', 'Heading academic planning, curriculum modernization, and doctoral research programs.', 1),
(2, 1, 'KIIT Deemed University', 'Professor & HoD CSE', '2008-01-01', '2019-06-30', 'Oversaw NBA and ABET accreditations and departmental research output.', 2),
(3, 2, 'IIIT Pune', 'Associate Professor', '2020-08-01', 'Present', 'Managing ECE Department labs, PG curricula, and sponsored semiconductor projects.', 1),
(4, 2, 'Texas Instruments, Bangalore', 'Senior Silicon Design Engineer', '2014-06-01', '2018-05-30', 'Designed low-power DSP core power-gating blocks for commercial microcontrollers.', 2),
(5, 3, 'IIIT Pune', 'Assistant Professor', '2021-01-15', 'Present', 'Teaching Advanced Cryptography, Discrete Structures, and Linear Algebra for Computing.', 1)
ON CONFLICT (id) DO NOTHING;

-- 6. SEED PUBLICATIONS
INSERT INTO faculty_publications (id, faculty_id, title, authors, journal_or_conference, publication_year, doi, url, publication_type)
VALUES
(1, 1, 'A Comprehensive Survey of Swarm Intelligence Algorithms for Real-Time Edge Image Processing', 'Suresh Chandra Satapathy, A. S. Mohapatra', 'IEEE Transactions on Emerging Topics in Computational Intelligence', 2024, '10.1109/TETCI.2024.331201', 'https://ieeexplore.ieee.org/document/998231', 'Journal'),
(2, 1, 'Deep Firefly Optimization for Automated Detection of Diabetic Retinopathy from Fundus Images', 'Suresh Chandra Satapathy, M. Kumar, R. Sharma', 'Nature Scientific Reports', 2023, '10.1038/s41598-023-42110-z', 'https://nature.com/articles/s41598-023-42110-z', 'Journal'),
(3, 1, 'Multi-Swarm Collaborative Routing in Heterogeneous Aerial Sensor Networks', 'Suresh Chandra Satapathy, P. Deshpande', 'ACM International Conference on Information Technology (ICIT 2024)', 2024, '10.1145/361234.361298', 'https://dl.acm.org/doi/10.1145/361234.361298', 'Conference'),
(4, 2, '0.4V Subthreshold 32-bit RISC-V Microcontroller Core Fabricated in 28nm FD-SOI CMOS', 'Pooja R. Kulkarni, V. Rao, H. M. Joshi', 'IEEE Journal of Solid-State Circuits (JSSC)', 2023, '10.1109/JSSC.2023.3289012', 'https://ieeexplore.ieee.org/document/8912345', 'Journal'),
(5, 2, 'Memristive Crossbar Acceleration of Convolutional Layers for Autonomous Micro-Robotics', 'Pooja R. Kulkarni, S. Verma', 'IEEE International Symposium on Circuits and Systems (ISCAS 2024)', 2024, '10.1109/ISCAS45823.2024', 'https://ieeexplore.ieee.org/document/984321', 'Conference'),
(6, 3, 'Polynomial Ring Factorization in High-Dimensional Module-LWE for Post-Quantum Encryption', 'Anand Kumar Deshmukh, K. Iyer', 'Journal of Cryptology', 2024, '10.1007/s00145-024-09412-1', 'https://link.springer.com/article/10.1007/s00145-024-09412-1', 'Journal')
ON CONFLICT (id) DO NOTHING;

-- 7. SEED PATENTS
INSERT INTO faculty_patents (id, faculty_id, title, patent_number, status, filing_date, publication_date, inventors, url)
VALUES
(1, 1, 'Intelligent Autonomous Swarm Device for Real-Time Thermal Imaging in Medical Triaging', 'IN-PAT-202341058912', 'Granted', '2022-04-12', '2023-10-18', 'Suresh Chandra Satapathy, M. Kumar', 'https://ipindiaservices.gov.in/patentsearch/202341058912'),
(2, 2, 'Energy-Harvesting Hybrid Memristive Logic Circuit for Deep Space Implants', 'IN-PAT-202441001234', 'Published', '2023-01-20', '2024-02-15', 'Pooja R. Kulkarni', 'https://ipindiaservices.gov.in/patentsearch/202441001234')
ON CONFLICT (id) DO NOTHING;

-- 8. SEED AUDIT LOG
INSERT INTO audit_logs (id, user_id, action, entity_type, entity_id, old_value, new_value, ip_address, user_agent)
VALUES
(1, 1, 'SYSTEM_INIT', 'system', 'root', NULL, '{"event":"Initial seed data installed successfully"}', '127.0.0.1', 'IIIT-Pune-CMS-Migrator/1.0')
ON CONFLICT (id) DO NOTHING;
