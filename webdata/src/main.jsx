import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Clear Google Translate cookie on new session visit
if (!sessionStorage.getItem('translate_initialized')) {
  sessionStorage.setItem('translate_initialized', 'true');
  const host = window.location.hostname;
  document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  if (host !== 'localhost' && host !== '127.0.0.1') {
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${host}; path=/;`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${host}; path=/;`;
  }
}

// Monkey patch to prevent React from crashing when Google Translate mutates text nodes
if (typeof Node === 'function' && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function(child) {
    if (child.parentNode !== this) {
      if (console) console.warn('Google Translate Crash Prevented: Cannot remove a child from a different parent');
      return child;
    }
    return originalRemoveChild.apply(this, arguments);
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function(newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (console) console.warn('Google Translate Crash Prevented: Cannot insert before a reference node from a different parent');
      return newNode;
    }
    return originalInsertBefore.apply(this, arguments);
  };

  const originalReplaceChild = Node.prototype.replaceChild;
  Node.prototype.replaceChild = function(newChild, oldChild) {
    if (oldChild && oldChild.parentNode !== this) {
      if (console) console.warn('Google Translate Crash Prevented: Cannot replace a child from a different parent');
      return oldChild;
    }
    return originalReplaceChild.apply(this, arguments);
  };
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
