import React from 'react';

export const CompanyLogo = ({ name, className = 'w-full h-full' }) => {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 1. Google
  if (normalized.includes('google')) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
      </svg>
    );
  }

  // 2. Microsoft
  if (normalized.includes('microsoft')) {
    return (
      <svg viewBox="0 0 23 23" className={className}>
        <rect x="0" y="0" width="10.5" height="10.5" fill="#F25022"/>
        <rect x="12.5" y="0" width="10.5" height="10.5" fill="#7FBA00"/>
        <rect x="0" y="12.5" width="10.5" height="10.5" fill="#00A4EF"/>
        <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900"/>
      </svg>
    );
  }

  // 3. Amazon
  if (normalized.includes('amazon')) {
    return (
      <svg viewBox="0 0 16 16" className={className}>
        <path fill="#FF9900" d="M10.813 11.968c.157.083.36.074.5-.05l.005.005a90 90 0 0 1 1.623-1.405c.173-.143.143-.372.006-.563l-.125-.17c-.345-.465-.673-.906-.673-1.791v-3.3l.001-.335c.008-1.265.014-2.421-.933-3.305C10.404.274 9.06 0 8.03 0 6.017 0 3.77.75 3.296 3.24c-.047.264.143.404.316.443l2.054.22c.19-.009.33-.196.366-.387.176-.857.896-1.271 1.703-1.271.435 0 .929.16 1.188.55.264.39.26.91.257 1.376v.432q-.3.033-.621.065c-1.113.114-2.397.246-3.36.67C3.873 5.91 2.94 7.08 2.94 8.798c0 2.2 1.387 3.298 3.168 3.298 1.506 0 2.328-.354 3.489-1.54l.167.246c.274.405.456.675 1.047 1.166ZM6.03 8.431C6.03 6.627 7.647 6.3 9.177 6.3v.57c.001.776.002 1.434-.396 2.133-.336.595-.87.961-1.465.961-.812 0-1.286-.619-1.286-1.533M.435 12.174c2.629 1.603 6.698 4.084 13.183.997.28-.116.475.078.199.431C13.538 13.96 11.312 16 7.57 16 3.832 16 .968 13.446.094 12.386c-.24-.275.036-.4.199-.299z"/>
        <path fill="#FF9900" d="M13.828 11.943c.567-.07 1.468-.027 1.645.204.135.176-.004.966-.233 1.533-.23.563-.572.961-.762 1.115s-.333.094-.23-.137c.105-.23.684-1.663.455-1.963-.213-.278-1.177-.177-1.625-.13l-.09.009q-.142.013-.233.024c-.193.021-.245.027-.274-.032-.074-.209.779-.556 1.347-.623"/>
      </svg>
    );
  }

  // 4. Qualcomm
  if (normalized.includes('qualcomm')) {
    return (
      <svg viewBox="0 0 120 30" className={className}>
        <circle cx="15" cy="15" r="9" stroke="#0052CA" strokeWidth="2.5" fill="none" />
        <path d="M21 21 L27 27" stroke="#0052CA" strokeWidth="3" strokeLinecap="round" />
        <text x="35" y="21" fontSize="16" fontWeight="bold" fontFamily="sans-serif" fill="#0052CA" letterSpacing="0.2">Qualcomm</text>
      </svg>
    );
  }

  // 5. NVIDIA
  if (normalized.includes('nvidia')) {
    return (
      <svg viewBox="0 0 100 30" className={className}>
        <path fill="#76B900" d="M20 6c-3-3-7.5-4.5-12-4.5v2c4 0 7.5 1.2 10.5 3.8C21.5 10 22 14 22 18H24c0-5-1.5-9.5-4-12z M15 10c-2-2-4.5-3-7.5-3v2c2.5 0 4.5.8 6 2.3C15.5 13 16 15 16 18H18c0-3.5-1-6.5-3-8z M10 14c-1-1-2-1.5-3-1.5V14.5c1 0 2 .4 2.5 1C10 16 10 17 10 18H12c0-2-1-3-2-4z" />
        <text x="28" y="21" fontSize="14" fontWeight="900" fontFamily="sans-serif" fill="#76B900" letterSpacing="1">NVIDIA</text>
      </svg>
    );
  }

  // 6. Flipkart
  if (normalized.includes('flipkart')) {
    return (
      <svg viewBox="0 0 120 30" className={className}>
        <rect x="2" y="2" width="26" height="26" rx="6" fill="#FFE11B" />
        <path d="M10 10c2-3 6-3 8 0 M8 13h14v10a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3z" fill="#2874F0" />
        <text x="36" y="21" fontSize="17" fontWeight="bold" fontFamily="sans-serif" fill="#2874F0" fontStyle="italic">flipkart</text>
      </svg>
    );
  }

  // 7. Deloitte
  if (normalized.includes('deloitte')) {
    return (
      <svg viewBox="0 0 100 30" className={className}>
        <text x="0" y="21" fontSize="21" fontWeight="900" fontFamily="sans-serif" className="text-gray-800 dark:text-white" letterSpacing="-0.8">Deloitte.</text>
      </svg>
    );
  }

  // 8. Accenture
  if (normalized.includes('accenture')) {
    return (
      <svg viewBox="0 0 110 30" className={className}>
        <text x="0" y="21" fontSize="18" fontWeight="bold" fontFamily="sans-serif" className="text-gray-800 dark:text-white" letterSpacing="-0.5">accenture</text>
        <path d="M96 9l6 4-6 4 2-4-2-4z" fill="#A100FF" stroke="#A100FF" strokeWidth="1" strokeLinecap="round" />
      </svg>
    );
  }

  // 9. Samsung R&D / Samsung
  if (normalized.includes('samsung')) {
    return (
      <svg viewBox="0 0 120 30" className={className}>
        <ellipse cx="60" cy="15" rx="58" ry="13" fill="#1428A0" transform="rotate(-6 60 15)" />
        <text x="60" y="19" fontSize="12" fontWeight="900" fontFamily="sans-serif" fill="#FFFFFF" textAnchor="middle" letterSpacing="0.8">SAMSUNG</text>
      </svg>
    );
  }

  // 10. Goldman Sachs
  if (normalized.includes('goldman')) {
    return (
      <svg viewBox="0 0 140 30" className={className}>
        <text x="0" y="21" fontSize="17" fontWeight="bold" fontFamily="serif" className="text-gray-800 dark:text-white" letterSpacing="0.2">Goldman Sachs</text>
      </svg>
    );
  }

  // 11. Cisco
  if (normalized.includes('cisco')) {
    return (
      <svg viewBox="0 0 80 30" className={className} fill="#1BA0D7">
        <rect x="15" y="11" width="2" height="6" rx="1" />
        <rect x="20" y="7" width="2" height="10" rx="1" />
        <rect x="25" y="9" width="2" height="8" rx="1" />
        <rect x="30" y="3" width="2" height="14" rx="1" />
        <rect x="35" y="9" width="2" height="8" rx="1" />
        <rect x="40" y="7" width="2" height="10" rx="1" />
        <rect x="45" y="11" width="2" height="6" rx="1" />
        <text x="32" y="25" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.5">CISCO</text>
      </svg>
    );
  }

  // 12. Citi
  if (normalized.includes('citi')) {
    return (
      <svg viewBox="0 0 80 30" className={className}>
        <text x="40" y="23" fontSize="18" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fill="#003B70">citi</text>
        <path d="M22 11c6-6 30-6 36 0" stroke="#FF0000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  // 13. Intel
  if (normalized.includes('intel')) {
    return (
      <svg viewBox="0 0 80 30" className={className} fill="#0071C5">
        <ellipse cx="40" cy="15" rx="36" ry="12" fill="none" stroke="#0071C5" strokeWidth="1.5" strokeDasharray="30 10 10 10" />
        <text x="40" y="20" fontSize="14" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle" fontStyle="italic">intel</text>
      </svg>
    );
  }

  // 14. IBM
  if (normalized.includes('ibm')) {
    return (
      <svg viewBox="0 0 100 30" className={className} fill="#1F70C1">
        <text x="50" y="24" fontSize="26" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">IBM</text>
        <rect x="10" y="3" width="80" height="1.5" fill="white" className="dark:fill-surface-dark" />
        <rect x="10" y="6.5" width="80" height="1.5" fill="white" className="dark:fill-surface-dark" />
        <rect x="10" y="10" width="80" height="1.5" fill="white" className="dark:fill-surface-dark" />
        <rect x="10" y="13.5" width="80" height="1.5" fill="white" className="dark:fill-surface-dark" />
        <rect x="10" y="17" width="80" height="1.5" fill="white" className="dark:fill-surface-dark" />
        <rect x="10" y="20.5" width="80" height="1.5" fill="white" className="dark:fill-surface-dark" />
        <rect x="10" y="24" width="80" height="1.5" fill="white" className="dark:fill-surface-dark" />
      </svg>
    );
  }

  // 15. Siemens
  if (normalized.includes('siemens')) {
    return (
      <svg viewBox="0 0 100 30" className={className}>
        <text x="0" y="21" fontSize="17" fontWeight="900" fontFamily="sans-serif" fill="#009999" letterSpacing="0.5">SIEMENS</text>
      </svg>
    );
  }


  // 17. Infosys
  if (normalized.includes('infosys')) {
    return (
      <svg viewBox="0 0 100 30" className={className}>
        <text x="0" y="21" fontSize="19" fontWeight="bold" fontFamily="sans-serif" fill="#007CC2" letterSpacing="-0.2">Infosys</text>
      </svg>
    );
  }

  // 18. Wipro
  if (normalized.includes('wipro')) {
    return (
      <svg viewBox="0 0 100 30" className={className}>
        <g transform="translate(10, 0)">
          <circle cx="15" cy="15" r="9" fill="#341A5F" opacity="0.8" />
          <circle cx="21" cy="11" r="7" fill="#FF9900" opacity="0.6" />
          <circle cx="11" cy="20" r="5" fill="#00A4EF" opacity="0.7" />
          <circle cx="23" cy="21" r="4" fill="#86BC25" opacity="0.7" />
        </g>
        <text x="48" y="21" fontSize="16" fontWeight="bold" fontFamily="sans-serif" className="text-gray-800 dark:text-white">wipro</text>
      </svg>
    );
  }

  // 19. VMware
  if (normalized.includes('vmware')) {
    return (
      <svg viewBox="0 0 100 30" className={className}>
        <g fill="#607078" className="text-gray-600 dark:text-gray-400">
          <rect x="2" y="6" width="6" height="6" />
          <rect x="10" y="6" width="6" height="6" />
          <rect x="2" y="14" width="6" height="6" />
          <rect x="10" y="14" width="6" height="6" />
        </g>
        <text x="24" y="20" fontSize="15" fontWeight="bold" fontFamily="sans-serif" className="text-gray-800 dark:text-white">vmware</text>
      </svg>
    );
  }

  // 20. Capgemini
  if (normalized.includes('capgemini')) {
    return (
      <svg viewBox="0 0 130 30" className={className}>
        <path fill="#0070AD" d="M12 4c-5 0-9 4-9 9c0 7 9 13 9 13s9-6 9-13c0-5-4-9-9-9z M12 8c2 0 4 2 4 4c0 3-4 6-4 6s-4-3-4-4c0-2 2-4 4-4z" />
        <text x="28" y="20" fontSize="15" fontWeight="bold" fontFamily="sans-serif" fill="#0070AD">Capgemini</text>
      </svg>
    );
  }

  // 21. L&T Infotech
  if (normalized.includes('ltinfotech') || normalized.includes('l&t') || normalized.includes('lti')) {
    return (
      <svg viewBox="0 0 160 40" className={className}>
        <g transform="translate(5, 2)">
          <circle cx="18" cy="18" r="16" fill="none" stroke="#0F4C81" strokeWidth="2.5" />
          <circle cx="18" cy="18" r="13" fill="none" stroke="#F5A623" strokeWidth="1" />
          <path d="M10,18 c0,5 3,10 8,10 c5,0 8,-5 8,-10" fill="none" stroke="#F5A623" strokeWidth="1.5" />
          <text x="18" y="22" fontSize="11" fontWeight="bold" fontFamily="serif" fill="#0F4C81" textAnchor="middle">L&T</text>
        </g>
        <text x="48" y="26" fontSize="19" fontWeight="900" fontFamily="sans-serif" fill="#0F4C81" letterSpacing="0.5">LTI</text>
        <text x="82" y="26" fontSize="14" fontWeight="500" fontFamily="sans-serif" fill="#F5A623" letterSpacing="0.2">Mindtree</text>
      </svg>
    );
  }

  // 22. Zomato
  if (normalized.includes('zomato')) {
    return (
      <svg viewBox="0 0 100 30" className={className}>
        <text x="0" y="21" fontSize="21" fontWeight="900" fontFamily="sans-serif" fill="#E23744" letterSpacing="-0.5">zomato</text>
      </svg>
    );
  }

  // 23. Bajaj Finserv
  if (normalized.includes('bajaj')) {
    return (
      <svg viewBox="0 0 160 40" className={className}>
        <g fill="#005B9E">
          <path d="M10 8 L22 14 L10 20 Z" />
          <path d="M14 12 L28 17 L14 22 Z" opacity="0.8" />
          <path d="M18 16 L34 20 L18 24 Z" opacity="0.6" />
        </g>
        <text x="42" y="20" fontSize="13" fontWeight="bold" fontFamily="sans-serif" fill="#005B9E" letterSpacing="0.5">BAJAJ</text>
        <text x="42" y="32" fontSize="10" fontWeight="bold" fontFamily="sans-serif" fill="#888888" letterSpacing="1.5">FINSERV</text>
      </svg>
    );
  }

  // 24. Persistent Systems
  if (normalized.includes('persistent')) {
    return (
      <svg viewBox="0 0 130 30" className={className}>
        <text x="0" y="21" fontSize="18" fontWeight="bold" fontFamily="sans-serif" fill="#1A3B60">Persistent</text>
        <circle cx="98" cy="8" r="3.5" fill="#E26D21" />
      </svg>
    );
  }

  // Fallback for any other brand
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();
  return (
    <div className="w-full h-full flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-inner px-2">
      <span className="text-primary dark:text-accent-dark font-extrabold text-sm tracking-wide">{initials || name}</span>
    </div>
  );
};
