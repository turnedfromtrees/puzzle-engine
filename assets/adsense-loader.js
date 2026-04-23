/**
 * Puzzle Engine - AdSense Loader
 * Auto-populates ad slots when AdSense is connected
 * 
 * Usage:
 * 1. Add your AdSense publisher ID below
 * 2. Create ad units in AdSense dashboard
 * 3. Add the ad unit IDs below
 * 4. Ads will automatically appear in designated slots
 */

const AD_CONFIG = {
  // Publisher ID (from AdSense dashboard)
  publisherId: '', // e.g., 'ca-pub-1234567890123456'
  
  // Ad unit IDs (create in AdSense, then paste here)
  adUnits: {
    'left-sidebar': '',  // e.g., '1234567890'
    'right-sidebar': '', // e.g., '1234567891'
    'inline': '',       // e.g., '1234567892'
    'mobile': ''        // e.g., '1234567893'
  },
  
  // Test mode (shows placeholder even without real ads)
  testMode: false
};

/**
 * Initialize AdSense
 * Call this when you're ready to activate ads
 */
function initAdSense() {
  if (!AD_CONFIG.publisherId) {
    console.log('AdSense: No publisher ID configured. Ads disabled.');
    return;
  }
  
  // Load AdSense script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CONFIG.publisherId}`;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
  
  // Activate ad slots
  document.body.classList.add('ads-active');
  
  // Populate each ad slot
  const adSlots = document.querySelectorAll('.ad-slot');
  adSlots.forEach(slot => {
    const adType = slot.dataset.adSlot;
    const adUnitId = AD_CONFIG.adUnits[adType];
    
    if (adUnitId) {
      // Clear placeholder content
      slot.innerHTML = '';
      
      // Create ad ins element
      const ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.display = 'block';
      ins.dataset.adClient = AD_CONFIG.publisherId;
      ins.dataset.adSlot = adUnitId;
      ins.dataset.adFormat = 'auto';
      ins.dataset.fullWidthResponsive = 'true';
      
      slot.appendChild(ins);
      
      // Push to AdSense
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  });
  
  console.log('AdSense: Initialized');
}

/**
 * Enable test mode (shows ad placeholders without real ads)
 */
function enableAdTestMode() {
  document.body.classList.add('ads-active');
  console.log('AdSense: Test mode enabled - showing placeholders');
}

// Auto-initialize on DOM ready if publisher ID is set
document.addEventListener('DOMContentLoaded', () => {
  if (AD_CONFIG.testMode) {
    enableAdTestMode();
  } else if (AD_CONFIG.publisherId) {
    initAdSense();
  }
});