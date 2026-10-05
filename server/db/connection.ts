import fs from 'node:fs';
import path from 'node:path';
import initSqlJs, { type Database as SqlJsDatabase } from 'sql.js';
import { config } from '../config/index.ts';

let sqlJsDb: SqlJsDatabase | null = null;
let isInitialized = false;

// Ensure storage directory exists
const dataDir = path.dirname(config.db.sqlitePath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure uploads directory exists
if (!fs.existsSync(config.uploadDir)) {
  fs.mkdirSync(config.uploadDir, { recursive: true });
}

export function saveDatabaseToDisk(): void {
  if (sqlJsDb) {
    const data = sqlJsDb.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(config.db.sqlitePath, buffer);
  }
}

export async function getDatabase(): Promise<SqlJsDatabase> {
  if (sqlJsDb) return sqlJsDb;

  const SQL = await initSqlJs();

  if (fs.existsSync(config.db.sqlitePath)) {
    const filebuffer = fs.readFileSync(config.db.sqlitePath);
    sqlJsDb = new SQL.Database(filebuffer);
  } else {
    sqlJsDb = new SQL.Database();
  }

  return sqlJsDb;
}

/**
 * Execute a query that returns multiple rows
 */
export async function query<T = any>(sqlStr: string, params: any[] = []): Promise<T[]> {
  const db = await getDatabase();
  const stmt = db.prepare(sqlStr);
  try {
    if (params && params.length > 0) {
      stmt.bind(params.map(p => (p === undefined ? null : p)));
    }
    const results: T[] = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject() as unknown as T);
    }
    return results;
  } finally {
    stmt.free();
  }
}

/**
 * Execute a query that returns a single row
 */
export async function queryOne<T = any>(sqlStr: string, params: any[] = []): Promise<T | null> {
  const rows = await query<T>(sqlStr, params);
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Execute an INSERT, UPDATE, or DELETE statement
 */
export async function execute(sqlStr: string, params: any[] = []): Promise<{ lastInsertId: number; changes: number }> {
  const db = await getDatabase();
  const stmt = db.prepare(sqlStr);
  try {
    if (params && params.length > 0) {
      stmt.bind(params.map(p => (p === undefined ? null : p)));
    }
    stmt.step();
  } finally {
    stmt.free();
  }

  // Retrieve last insert rowid and modified rows
  const idRes = db.exec("SELECT last_insert_rowid() AS id;");
  const lastInsertId = (idRes[0]?.values[0]?.[0] as number) || 0;

  const changesRes = db.exec("SELECT changes() AS ch;");
  const changes = (changesRes[0]?.values[0]?.[0] as number) || 0;

  // Persist to disk on write
  saveDatabaseToDisk();

  return { lastInsertId, changes };
}

/**
 * Initialize database schema and seed data if fresh
 */
export async function initDatabase(): Promise<void> {
  if (isInitialized) return;

  const db = await getDatabase();

  // Create core schema if tables don't exist
  db.run(`
    CREATE TABLE IF NOT EXISTS departments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      short_name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      is_active INTEGER NOT NULL DEFAULT 1,
      display_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS faculty (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      employee_id TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL DEFAULT 'Dr.',
      first_name TEXT NOT NULL,
      middle_name TEXT,
      last_name TEXT NOT NULL,
      full_name TEXT NOT NULL,
      designation TEXT NOT NULL,
      department_id INTEGER NOT NULL REFERENCES departments(id),
      faculty_type TEXT NOT NULL DEFAULT 'Regular',
      email TEXT NOT NULL UNIQUE,
      alternate_email TEXT,
      phone TEXT,
      office_location TEXT,
      office_room TEXT,
      profile_photo TEXT,
      profile_slug TEXT NOT NULL UNIQUE,
      highest_qualification TEXT,
      specialization TEXT,
      research_interests TEXT,
      areas_of_expertise TEXT,
      biography TEXT,
      academic_experience TEXT,
      industry_experience TEXT,
      research_keywords TEXT,
      google_scholar_url TEXT,
      orcid_url TEXT,
      scopus_url TEXT,
      researchgate_url TEXT,
      vidwan_url TEXT,
      linkedin_url TEXT,
      display_order INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'DRAFT',
      rejection_reason TEXT,
      rejected_by INTEGER,
      rejected_at TEXT,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'FACULTY',
      faculty_id INTEGER REFERENCES faculty(id),
      is_active INTEGER NOT NULL DEFAULT 1,
      last_login TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS faculty_education (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      faculty_id INTEGER NOT NULL REFERENCES faculty(id) ON DELETE CASCADE,
      degree TEXT NOT NULL,
      specialization TEXT,
      institution TEXT NOT NULL,
      year TEXT,
      description TEXT,
      display_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS faculty_experience (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      faculty_id INTEGER NOT NULL REFERENCES faculty(id) ON DELETE CASCADE,
      organization TEXT NOT NULL,
      designation TEXT NOT NULL,
      start_date TEXT,
      end_date TEXT,
      description TEXT,
      display_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS faculty_publications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      faculty_id INTEGER NOT NULL REFERENCES faculty(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      authors TEXT NOT NULL,
      journal_or_conference TEXT NOT NULL,
      publication_year INTEGER,
      doi TEXT,
      url TEXT,
      publication_type TEXT NOT NULL DEFAULT 'Journal',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS faculty_patents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      faculty_id INTEGER NOT NULL REFERENCES faculty(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      patent_number TEXT,
      status TEXT NOT NULL DEFAULT 'Published',
      filing_date TEXT,
      publication_date TEXT,
      inventors TEXT,
      url TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS faculty_profile_versions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      faculty_id INTEGER NOT NULL REFERENCES faculty(id) ON DELETE CASCADE,
      changed_by INTEGER REFERENCES users(id),
      change_type TEXT NOT NULL,
      old_data TEXT,
      new_data TEXT,
      status TEXT NOT NULL,
      submitted_at TEXT DEFAULT (datetime('now')),
      approved_at TEXT,
      approved_by INTEGER REFERENCES users(id),
      rejection_reason TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER REFERENCES users(id),
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT,
      old_value TEXT,
      new_value TEXT,
      ip_address TEXT,
      user_agent TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Check if we need to seed
  const countRes = db.exec("SELECT COUNT(*) AS count FROM users;");
  const userCount = (countRes[0]?.values[0]?.[0] as number) || 0;

  if (userCount === 0) {
    console.log('[CMS Database] Seeding initial data for IIIT Pune Faculty Module...');
    await seedInitialData(db);
  } else {
    // Ensure core seed faculty profiles are healthy, active, and published
    db.run(`
      UPDATE faculty 
      SET first_name = 'Suresh', full_name = 'Prof. Suresh Chandra Satapathy', status = 'PUBLISHED', is_active = 1
      WHERE profile_slug = 'prof-suresh-satapathy' AND (status != 'PUBLISHED' OR first_name != 'Suresh');
    `);
  }

  saveDatabaseToDisk();
  isInitialized = true;
}

async function seedInitialData(db: SqlJsDatabase) {
  // 1. Departments
  db.run(`
    INSERT INTO departments (id, name, short_name, slug, description, is_active, display_order)
    VALUES 
    (1, 'Computer Science & Engineering', 'CSE', 'cse', 'Department of Computer Science and Engineering specializes in AI, ML, Cyber Security, Cloud & Distributed Systems.', 1, 1),
    (2, 'Electronics & Communication Engineering', 'ECE', 'ece', 'Department of Electronics and Communication Engineering specializes in VLSI, Embedded Systems, Signal Processing, and IoT.', 1, 2),
    (3, 'Applied Sciences & Humanities', 'ASH', 'ash', 'Department of Applied Sciences and Humanities imparts foundational courses in Mathematics, Physics, and Professional Humanities.', 1, 3);
  `);

  // 2. Faculty
  db.run(`
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
    );
  `);

  // 3. Users (Bcrypt hashes: Admin@IIITP2026, Faculty@IIITP2026)
  db.run(`
    INSERT INTO users (id, username, email, password_hash, role, faculty_id, is_active)
    VALUES
    (1, 'admin', 'admin@iiitp.ac.in', '$2b$10$SPgd17j8hHp2SWjJwmI4LeSBjXBf3RSr894o0esbHexwqWrQKd5RW', 'SUPER_ADMIN', NULL, 1),
    (2, 'faculty_cse', 'faculty.cse@iiitp.ac.in', '$2b$10$iQs1oFD826QdGcUzQy8bSe.Dnhxn.rTixc0iGXaFegVQlsIIolaRG', 'FACULTY', 1, 1),
    (3, 'faculty_ece', 'faculty.ece@iiitp.ac.in', '$2b$10$iQs1oFD826QdGcUzQy8bSe.Dnhxn.rTixc0iGXaFegVQlsIIolaRG', 'FACULTY', 2, 1);
  `);

  // 4. Education
  db.run(`
    INSERT INTO faculty_education (id, faculty_id, degree, specialization, institution, year, description, display_order)
    VALUES
    (1, 1, 'Ph.D.', 'Computer Science & Engineering', 'Indian Institute of Technology Kharagpur', '2005', 'Doctoral thesis on Swarm Intelligence Approaches to Multi-Objective Medical Optimization.', 1),
    (2, 1, 'M.Tech.', 'Computer Science', 'National Institute of Technology Rourkela', '1999', 'First Class with Distinction; thesis on Evolutionary Clustering Algorithms.', 2),
    (3, 1, 'B.Tech.', 'Computer Engineering', 'Utkal University', '1996', 'Gold Medalist for highest academic standing across engineering faculty.', 3),
    (4, 2, 'Ph.D.', 'Microelectronics & VLSI', 'Indian Institute of Technology Bombay', '2014', 'Thesis: Ultra-Low-Power Subthreshold Standard Cell Library Design for Biomedical Implants.', 1),
    (5, 2, 'M.Tech.', 'VLSI & Embedded Systems', 'College of Engineering Pune (COEP)', '2009', 'Rank 1 in ECE Department.', 2),
    (6, 3, 'Ph.D.', 'Applied Mathematics', 'Indian Institute of Science (IISc) Bangalore', '2018', 'Thesis on Lattice-based Cryptographic Primitives in Post-Quantum Security.', 1);
  `);

  // 5. Experience
  db.run(`
    INSERT INTO faculty_experience (id, faculty_id, organization, designation, start_date, end_date, description, display_order)
    VALUES
    (1, 1, 'IIIT Pune', 'Professor & Dean (Academic)', '2019-07-01', 'Present', 'Heading academic planning, curriculum modernization, and doctoral research programs.', 1),
    (2, 1, 'KIIT Deemed University', 'Professor & HoD CSE', '2008-01-01', '2019-06-30', 'Oversaw NBA and ABET accreditations and departmental research output.', 2),
    (3, 2, 'IIIT Pune', 'Associate Professor', '2020-08-01', 'Present', 'Managing ECE Department labs, PG curricula, and sponsored semiconductor projects.', 1),
    (4, 2, 'Texas Instruments, Bangalore', 'Senior Silicon Design Engineer', '2014-06-01', '2018-05-30', 'Designed low-power DSP core power-gating blocks for commercial microcontrollers.', 2),
    (5, 3, 'IIIT Pune', 'Assistant Professor', '2021-01-15', 'Present', 'Teaching Advanced Cryptography, Discrete Structures, and Linear Algebra for Computing.', 1);
  `);

  // 6. Publications
  db.run(`
    INSERT INTO faculty_publications (id, faculty_id, title, authors, journal_or_conference, publication_year, doi, url, publication_type)
    VALUES
    (1, 1, 'A Comprehensive Survey of Swarm Intelligence Algorithms for Real-Time Edge Image Processing', 'Suresh Chandra Satapathy, A. S. Mohapatra', 'IEEE Transactions on Emerging Topics in Computational Intelligence', 2024, '10.1109/TETCI.2024.331201', 'https://ieeexplore.ieee.org/document/998231', 'Journal'),
    (2, 1, 'Deep Firefly Optimization for Automated Detection of Diabetic Retinopathy from Fundus Images', 'Suresh Chandra Satapathy, M. Kumar, R. Sharma', 'Nature Scientific Reports', 2023, '10.1038/s41598-023-42110-z', 'https://nature.com/articles/s41598-023-42110-z', 'Journal'),
    (3, 1, 'Multi-Swarm Collaborative Routing in Heterogeneous Aerial Sensor Networks', 'Suresh Chandra Satapathy, P. Deshpande', 'ACM International Conference on Information Technology (ICIT 2024)', 2024, '10.1145/361234.361298', 'https://dl.acm.org/doi/10.1145/361234.361298', 'Conference'),
    (4, 2, '0.4V Subthreshold 32-bit RISC-V Microcontroller Core Fabricated in 28nm FD-SOI CMOS', 'Pooja R. Kulkarni, V. Rao, H. M. Joshi', 'IEEE Journal of Solid-State Circuits (JSSC)', 2023, '10.1109/JSSC.2023.3289012', 'https://ieeexplore.ieee.org/document/8912345', 'Journal'),
    (5, 2, 'Memristive Crossbar Acceleration of Convolutional Layers for Autonomous Micro-Robotics', 'Pooja R. Kulkarni, S. Verma', 'IEEE International Symposium on Circuits and Systems (ISCAS 2024)', 2024, '10.1109/ISCAS45823.2024', 'https://ieeexplore.ieee.org/document/984321', 'Conference'),
    (6, 3, 'Polynomial Ring Factorization in High-Dimensional Module-LWE for Post-Quantum Encryption', 'Anand Kumar Deshmukh, K. Iyer', 'Journal of Cryptology', 2024, '10.1007/s00145-024-09412-1', 'https://link.springer.com/article/10.1007/s00145-024-09412-1', 'Journal');
  `);

  // 7. Patents
  db.run(`
    INSERT INTO faculty_patents (id, faculty_id, title, patent_number, status, filing_date, publication_date, inventors, url)
    VALUES
    (1, 1, 'Intelligent Autonomous Swarm Device for Real-Time Thermal Imaging in Medical Triaging', 'IN-PAT-202341058912', 'Granted', '2022-04-12', '2023-10-18', 'Suresh Chandra Satapathy, M. Kumar', 'https://ipindiaservices.gov.in/patentsearch/202341058912'),
    (2, 2, 'Energy-Harvesting Hybrid Memristive Logic Circuit for Deep Space Implants', 'IN-PAT-202441001234', 'Published', '2023-01-20', '2024-02-15', 'Pooja R. Kulkarni', 'https://ipindiaservices.gov.in/patentsearch/202441001234');
  `);

  // 8. Audit Log
  db.run(`
    INSERT INTO audit_logs (id, user_id, action, entity_type, entity_id, old_value, new_value, ip_address, user_agent)
    VALUES
    (1, 1, 'SYSTEM_INIT', 'system', 'root', NULL, '{"event":"Initial seed data installed successfully"}', '127.0.0.1', 'IIIT-Pune-CMS-Migrator/1.0');
  `);
}
