const FacebookIcon = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#1877F2" /><path d="M15.5 12h-2v8h-3v-8h-1.5v-2.5H10.5v-1.75c0-1.2.35-1.95 2.1-1.95h1.9v2.4h-1.2c-.44 0-.55.22-.55.6v.7h1.75L15.5 12z" fill="white" /></svg>;
const TwitterIcon = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="black" /><path d="M15.36 6H17.2l-4.01 4.58L17.91 18h-3.7l-2.9-3.79-3.35 3.79H6.12l4.3-4.91L6 6h3.8l2.62 3.44L15.36 6zm-.64 10.9h1.02l-7.3-9.5H7.32l7.4 9.5z" fill="white" /></svg>;
const LinkedinIcon = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#0A66C2" /><path d="M17.8 18H15v-4.1c0-1 0-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.3V18H9.3V9.5h2.6v1.2h.1c.4-.7 1.3-1.4 2.6-1.4 2.8 0 3.3 1.8 3.3 4.2V18zM6.6 8.3c-.9 0-1.6-.7-1.6-1.6 0-.9.7-1.6 1.6-1.6.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6zM5.3 18h2.6V9.5H5.3V18z" fill="white" /></svg>;
const TopBar = () => {
  return (
    <div className="bg-surface dark:bg-surface-dark text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-text dark:text-text-dark font-medium">
          An Institute of National Importance
        </div>
        <div className="flex items-center space-x-4 text-text dark:text-text-dark">
          <div className="flex items-center space-x-2">
            <a href="#" aria-label="Facebook" className="hover:text-accent dark:hover:text-accent-dark transition-colors"><FacebookIcon size={16} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-accent dark:hover:text-accent-dark transition-colors"><TwitterIcon size={16} /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-accent dark:hover:text-accent-dark transition-colors"><LinkedinIcon size={16} /></a>
          </div>
          <div className="h-3 w-px bg-gray-300 dark:bg-gray-700"></div>
          <div className="flex items-center space-x-2">
            <button className="hover:text-accent dark:hover:text-accent-dark transition-colors font-medium">EN</button>
            <span className="text-gray-400 dark:text-gray-600">|</span>
            <button className="hover:text-accent dark:hover:text-accent-dark transition-colors font-medium">हिं</button>
          </div>
          <div className="h-3 w-px bg-gray-300 dark:bg-gray-700"></div>
          <div className="flex items-center space-x-2">
            <button className="hover:text-accent dark:hover:text-accent-dark transition-colors font-medium">A-</button>
            <button className="hover:text-accent dark:hover:text-accent-dark transition-colors font-medium">A</button>
            <button className="hover:text-accent dark:hover:text-accent-dark transition-colors font-medium">A+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
