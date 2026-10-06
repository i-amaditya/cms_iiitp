import React from 'react';
import PageHeader from '../components/shared/PageHeader';
import { 
  Award, 
  Zap,
  Calendar,
  MapPin,
  Users
} from 'lucide-react';

// Images
import studentSportsImg from '../assets/student_sports.jpg';
import sihWinner2024Img from '../assets/sih_winner_2024.jpg';
import sihWinner2023Img from '../assets/sih_winner_2023.jpg';
import adaLovelaceImg from '../assets/ada_lovelace.jpg';

const StudentAchievementsPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-200">
      <PageHeader title="Students' Achievements" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Section 1: Sports Meet */}
        <section id="sports" className="scroll-mt-24">
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg border border-gray-150 dark:border-gray-800 overflow-hidden">
            <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              
              <div className="space-y-6">
                <h2 className="text-3xl font-bold font-serif text-primary dark:text-white leading-tight">
                  7th Inter-IIIT Sports Meet 2025
                </h2>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center"><MapPin size={16} className="mr-1.5" /> IIITM Gwalior</span>
                  <span className="flex items-center"><Calendar size={16} className="mr-1.5" /> March 20-23, 2025</span>
                  <span className="flex items-center"><Users size={16} className="mr-1.5" /> 93-Member Contingent</span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  IIIT Pune achieved a historic **7th place overall** at the 7th Inter-IIIT Sports Meet, securing a record-breaking haul of **11 medals** (5 Gold, 3 Silver, and 3 Bronze). Our students showcased intense dedication, sportsmanship, and dominance across multiple tracks.
                </p>

                {/* Medals Tally Grid */}
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-xl text-center border border-yellow-100 dark:border-yellow-900/30">
                    <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">5</span>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">Gold 🏅</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl text-center border border-gray-150 dark:border-gray-800">
                    <span className="text-2xl font-bold text-gray-500 dark:text-gray-400">3</span>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">Silver 🥈</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-xl text-center border border-orange-100 dark:border-orange-900/30">
                    <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">3</span>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">Bronze 🥉</p>
                  </div>
                </div>

                {/* Winners Lists */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-sm text-gray-700 dark:text-gray-200">Highlight Performances:</h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-2">🥇</span>
                      <span><strong>Parth Shukla</strong> – Dual Gold medalist in Shot Put & Javelin Throw.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-2">🥇</span>
                      <span><strong>Atharv Patil</strong> – Gold (50m Aquatics) and Silver (50m Aquatics).</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-500 mr-2">🥇</span>
                      <span><strong>Men's Tug-of-War & Khush Meena</strong> – Gold in Tug-of-War & Weightlifting respectively.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 mr-2">🥈</span>
                      <span><strong>Men's Football & Rayhan</strong> – 2nd Place in football; Rayhan secured Silver in 800m Race.</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/10 dark:bg-blue-600/5 rounded-2xl filter blur-xl transform translate-x-3 translate-y-3 pointer-events-none"></div>
                <img 
                  src={studentSportsImg} 
                  alt="Student Sports Success" 
                  className="relative z-10 w-full rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 object-cover aspect-[4/3]"
                />
              </div>

            </div>
          </div>
        </section>

        {/* Section 2: Hackathons */}
        <section id="hackathons" className="scroll-mt-24 space-y-8">
          <h2 className="text-3xl font-bold font-serif text-primary dark:text-white leading-tight">
            National Hackathons & Victories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Citi Ada Lovelace Hackathon 2024 */}
            <div className="flex flex-col h-full bg-white dark:bg-surface-dark rounded-2xl shadow-md border border-gray-150 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all duration-300">
              <img 
                src={adaLovelaceImg} 
                alt="Citi Ada Lovelace Hackathon Winners" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-yellow-600 dark:text-yellow-400 mb-2">
                  <Award size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">First Runner-Up Team</span>
                </div>
                <h3 className="text-xl font-bold font-serif text-primary dark:text-white mb-2">
                  Citi Ada Lovelace Hackathon 2024
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed mb-4">
                  Team <strong>CodeCoffee</strong> from IIIT Pune competed against 500+ teams and 1500+ talented participants across India to secure the prestigious <strong>First Runner-Up</strong> position. The team demonstrated exceptional problem-solving and software engineering capabilities by developing a scalable, high-performance fintech solution under intense time pressure.
                </p>
                <div className="mt-auto pt-4">
                  <div className="space-y-2 text-xs bg-gray-50 dark:bg-gray-800/30 p-3 rounded border border-gray-100 dark:border-gray-800">
                    <p><strong>Team:</strong> Aadish Shelke, Bhagyashri Meena, Shreerang Mungikar, Lalithya K. Koneti</p>
                    <p className="text-accent dark:text-accent-dark"><strong>Mentor:</strong> Dr. Priyank Jain</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart India Hackathon 2024 (Team SHARPS) */}
            <div className="flex flex-col h-full bg-white dark:bg-surface-dark rounded-2xl shadow-md border border-gray-150 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all duration-300">
              <img 
                src={sihWinner2024Img} 
                alt="Team SHARPS SIH 2024 Winner" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-yellow-600 dark:text-yellow-400 mb-2">
                  <Award size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">SIH 2024 Winner Team</span>
                </div>
                <h3 className="text-xl font-bold font-serif text-primary dark:text-white mb-2">
                  Smart India Hackathon 2024 (Team SHARPS)
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed mb-4">
                  Delighted to recognize team <strong>SHARPS</strong> from IIIT Pune, who completed as finalists and winner team in the prestigious Smart India Hackathon 2024. The team showed outstanding problem-solving skills and unwavering dedication to addressing real-world challenges through collaborative engineering.
                </p>
                <div className="mt-auto pt-4">
                  <div className="space-y-2 text-xs bg-gray-50 dark:bg-gray-800/30 p-3 rounded border border-gray-100 dark:border-gray-800">
                    <p><strong>Team:</strong> Priyansh, Anuja Deepak Kamble, Harsh, Saikrishna Seshendra Lingam, Rohan Kumar, Santu Dhali</p>
                    <p className="text-accent dark:text-accent-dark"><strong>Student Mentor:</strong> Ashutosh Jha (guided team to compete at the highest level)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart India Hackathon 2023 (Team BugBusters) */}
            <div className="flex flex-col h-full bg-white dark:bg-surface-dark rounded-2xl shadow-md border border-gray-150 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all duration-300">
              <img 
                src={sihWinner2023Img} 
                alt="Team BugBusters SIH 2023 Grand Finale" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-yellow-600 dark:text-yellow-400 mb-2">
                  <Award size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">SIH 2023 Winner Team</span>
                </div>
                <h3 className="text-xl font-bold font-serif text-primary dark:text-white mb-2">
                  Smart India Hackathon 2023 (Team BugBusters)
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed mb-4">
                  Elated winners at the Smart India Hackathon 2023 Software Edition Grand Finale at Manipal University Jaipur. The team developed <strong>BookLens</strong>, a groundbreaking application resolving core document indexing and book analysis.
                </p>
                <div className="mt-auto pt-4">
                  <div className="space-y-2 text-xs bg-gray-50 dark:bg-gray-800/30 p-3 rounded border border-gray-100 dark:border-gray-800">
                    <p><strong>Team:</strong> Jay Dhoot, Pranav More, Naishyal Patel, Faiz Sayyed, Moin Bhokare, Janhavi Singh</p>
                    <p className="text-accent dark:text-accent-dark"><strong>Faculty Mentor:</strong> Dr. Priyank Jain</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Toycathon & SIH 2019 */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-md border border-gray-150 dark:border-gray-800 p-6 md:p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div>
                <h4 className="font-bold text-lg text-primary dark:text-white font-serif mb-2">Toycathon 2021 Winners</h4>
                <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed mb-4">
                  A team from IIIT Pune named <strong>MMH</strong> won the Grand Finale at Toycathon 2021, organized by the Ministry of Education's Innovation Cell (MIC), Government of India.
                </p>
              </div>
              <div className="text-xs text-gray-500 bg-gray-50 dark:bg-gray-800/30 p-3 rounded border border-gray-100 dark:border-gray-800">
                <strong>Team MMH:</strong> Tanmay Modi, Piyush Gupta, Sarthak Gupta, Janardhan Edara.
              </div>
            </div>

            <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-md border border-gray-150 dark:border-gray-800 p-6 md:p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div>
                <h4 className="font-bold text-lg text-primary dark:text-white font-serif mb-2">SIH 2019 Grand Finale Winners</h4>
                <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed mb-4">
                  Team <strong>“Calm Down It’s Just Genjutsu”</strong> secured 1st place in the Software Edition at NIT Warangal, earning a prize of <strong>₹1 Lakh</strong>.
                </p>
              </div>
              <div className="text-xs text-gray-500 bg-gray-50 dark:bg-gray-800/30 p-3 rounded border border-gray-100 dark:border-gray-800">
                <strong>Team:</strong> Disha Dudhal, Devasish Mahato, Yogesh Karan, Shivam Dev Singh, Aravind Unnikrishnan, Dhanashree Regavade.
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Coding Spotlights */}
        <section id="coding" className="scroll-mt-24">
          <div className="bg-gradient-to-br from-blue-900 via-primary to-indigo-900 text-white rounded-2xl p-6 md:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-accent/30 via-transparent to-transparent opacity-60"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-3xl font-bold font-serif leading-tight">
                  Apoorv Kumar – Coding Grandmaster
                </h3>
                <p className="opacity-90 leading-relaxed text-sm">
                  IIIT Pune celebrates the extraordinary competitive coding success of Apoorv Kumar (Batch 2024). He reached the highest echelons of programming proficiency through dedication and a robust peer coding environment nurtured by our elite club.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-white/10 p-3 rounded-lg text-center backdrop-blur-sm">
                    <span className="text-xl font-bold text-yellow-300">Grandmaster</span>
                    <p className="text-[10px] opacity-75 mt-0.5">Codeforces Rank</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg text-center backdrop-blur-sm">
                    <span className="text-xl font-bold text-yellow-300">7-Star Coder</span>
                    <p className="text-[10px] opacity-75 mt-0.5">Codechef Rank</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg text-center backdrop-blur-sm">
                    <span className="text-xl font-bold text-yellow-300">AIR 9</span>
                    <p className="text-[10px] opacity-75 mt-0.5">Codechef & Codeforces</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-md space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm tracking-wider uppercase opacity-75">Coding Culture</span>
                  <Zap className="text-yellow-300" size={20} />
                </div>
                <p className="text-xs leading-relaxed opacity-95">
                  Apoorv’s accomplishments have motivated dozens of junior batches to excel. Our student-led coding club, <strong>Bit-Legion</strong>, plays a crucial role in maintaining regular contests, hack sessions, and preparing students for FAANG level interviews.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Section 4: Entrepreneurship and Publications */}
        <section id="entrepreneurship" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Startups */}
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-md border border-gray-150 dark:border-gray-800 p-6 md:p-8 space-y-4">
            <h3 className="text-2xl font-bold font-serif text-primary dark:text-white">
              Startup Incubations
            </h3>
            <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Incubated Aerial Robotics Startup
            </h4>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Final Year CSE student <strong>Umang Kalra</strong> and his team founded a startup in December 2020 dedicated to developing aerial robotics, drone automation, and IoT solutions across various disciplines.
            </p>

            <div className="bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl border border-gray-150 dark:border-gray-800 space-y-2">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">Incubated & Supported by:</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Sher-e-Kashmir University of Agricultural Sciences and Technology, Jammu.
              </p>
              <p className="text-xs text-accent dark:text-accent-dark font-medium">
                Sponsored by the Government of India under the Remunerative Approaches for Agriculture and Allied Sectors Rejuvenation scheme.
              </p>
            </div>
          </div>

          {/* Student Papers */}
          <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-md border border-gray-150 dark:border-gray-800 p-6 md:p-8 space-y-4">
            <h3 className="text-2xl font-bold font-serif text-primary dark:text-white">
              Co-authored Publications
            </h3>
            <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Student Research Publications
            </h4>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Undergraduate students at IIIT Pune actively collaborate with faculty members to publish papers in prestigious peer-reviewed international journals and conferences.
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-accent pl-4 text-xs">
                <p className="font-bold text-gray-800 dark:text-gray-200">"Quantum Substitution Box Image Steganography"</p>
                <p className="text-gray-500 dark:text-gray-400 mt-0.5">
                  Co-authored by students <strong>Nainil Nandu, Tanay Patel, V. Dinesh Reddy</strong>. Published in the <em>Journal of Quantum Information Processing, 2023</em>.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-4 text-xs">
                <p className="font-bold text-gray-800 dark:text-gray-200">"Hardware and Software Security of IoT"</p>
                <p className="text-gray-500 dark:text-gray-400 mt-0.5">
                  Co-authored by student <strong>A.K. Singh</strong>. Published in the <em>IEEE International IoT, Electronics and Mechatronics Conference (IEMTRONICS 2021)</em>.
                </p>
              </div>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
};

export default StudentAchievementsPage;
