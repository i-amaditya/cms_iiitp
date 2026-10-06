import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Navigate } from 'react-router';
import PageHeader from '../components/shared/PageHeader';
import Breadcrumb from '../components/shared/Breadcrumb';
import { Mail, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import nonTeachingStaffData from '../data/non_teaching_staff.json';

const NonTeachingStaffPage = () => {
  const { type } = useParams();
  
  // Validate type, default to regular if invalid
  const staffType = type?.toLowerCase() === 'contract' ? 'Contract' : 'Regular';
  const urlType = staffType.toLowerCase();

  // If the URL parameter was missing or invalid, we redirect (or we can just render the default)
  // App.jsx handles the redirect from `/people/non-teaching-staff` to `/people/non-teaching-staff/regular`
  
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // Filter staff by Type
  const typeFilteredStaff = useMemo(() => {
    return nonTeachingStaffData.filter(staff => staff.type === staffType);
  }, [staffType]);

  const departments = useMemo(() => {
    const deps = typeFilteredStaff.map(staff => staff.departmentShort).filter(Boolean);
    return ['All', ...new Set(deps)].sort((a, b) => {
        if (a === 'All') return -1;
        if (b === 'All') return 1;
        return a.localeCompare(b);
    });
  }, [typeFilteredStaff]);

  useEffect(() => {
    setSelectedDepartment('All');
  }, [staffType]);

  const displayedStaff = useMemo(() => {
    if (selectedDepartment === 'All') return typeFilteredStaff;
    return typeFilteredStaff.filter(staff => staff.departmentShort === selectedDepartment);
  }, [typeFilteredStaff, selectedDepartment]);

  return (
    <div className="min-h-screen pb-20">
      <PageHeader 
        title={`${staffType} Non-Teaching Staff`} 
        subtitle="The dedicated team supporting our institution's operations"
        backgroundImage="/campus-image.jpg"
        compact={true}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Department Filters */}
        {departments.length > 2 && (
          <div className="flex flex-wrap justify-center gap-3 mt-6 mb-10">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedDepartment === dept
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white dark:bg-surface-dark text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        )}

        {/* Staff Grid */}
        {displayedStaff.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10 h-full"
          >
            <AnimatePresence>
              {displayedStaff.map((staff, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  key={staff.name + index}
                  className="bg-white dark:bg-surface-dark rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col h-full group relative"
                >

                  {/* Image Section */}
                  <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mt-6 bg-gray-100 dark:bg-gray-800 relative overflow-hidden rounded-full shadow-md border-4 border-white dark:border-gray-800 shrink-0">
                    {staff.image ? (
                      <img 
                        src={staff.image}
                        alt={staff.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(staff.name) + "&background=1B3A6B&color=fff&size=512";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-50 dark:bg-gray-800 text-primary dark:text-gray-400">
                        <span className="text-5xl font-serif opacity-30">{staff.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-3 flex-grow flex flex-col items-center text-center bg-white dark:bg-surface-dark z-10 w-full mt-1">
                    <h3 className="text-lg font-bold font-serif text-gray-900 dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-accent transition-colors line-clamp-1 w-full">
                      {staff.name}
                    </h3>

                    {/* Fixed height container for designation and department */}
                    <div className="h-14 flex flex-col items-center justify-start w-full mb-1">
                      <p className="text-sm text-brand-red font-medium whitespace-pre-line line-clamp-2 leading-tight mb-0.5">
                        {staff.designation || 'Staff Member'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate w-full px-2">
                        {staff.departmentShort}
                      </p>
                    </div>

                    {/* Fixed height container for extra details / email */}
                    <div className="h-12 w-full flex flex-col items-center">
                      <div className="w-8 h-px bg-gray-200 dark:bg-gray-700 mb-1.5 mt-0.5 shrink-0"></div>
                      
                      {staff.email ? (
                        <a 
                          href={`mailto:${staff.email}`}
                          className="flex items-center text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-full justify-center px-2"
                        >
                          <Mail className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                          <span className="truncate">{staff.email}</span>
                        </a>
                      ) : staff.description ? (
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-relaxed line-clamp-2 px-2 w-full">
                          {staff.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-12 text-center py-24 bg-white dark:bg-surface-dark rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border-0">
            <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">
              No Staff Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              There are no {staffType.toLowerCase()} staff members currently listed in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NonTeachingStaffPage;
