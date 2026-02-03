import React, { useState, useEffect } from 'react';

// Vibe Tribes data
const vibeTribes = {
  'pool-shark': {
    name: 'Pool Shark',
    tagline: 'Chlorine in your veins, mischief in your eyes',
    color: '#00CED1',
    icon: '🦈'
  },
  'tiki-philosopher': {
    name: 'Tiki Bar Philosopher',
    tagline: 'Deep thoughts, stronger drinks',
    color: '#FF6B35',
    icon: '🗿'
  },
  'coastal-grandpa': {
    name: 'Coastal Grandpa',
    tagline: 'Old money energy, new vacation plans',
    color: '#8FBC8F',
    icon: '⛵'
  },
  'yacht-rock': {
    name: 'Yacht Rock Revivalist',
    tagline: 'Smooth sailing, smoother sounds',
    color: '#DDA0DD',
    icon: '🎷'
  },
  'sunset-chaser': {
    name: 'Sunset Chaser',
    tagline: 'Golden hour is your personality',
    color: '#FF7F50',
    icon: '🌅'
  }
};

// Sample matched shirt
const matchedShirt = {
  name: "Do You Like Piña Cabanas?",
  price: "$158.00",
  vibe: "Sun-drunk and slightly salty. You've got Margaritaville energy but with better taste. The kind of person who shows up to brunch already bronzed.",
  tribe: 'tiki-philosopher',
  images: ['/pdp-1.png', '/pdp-2.png', '/pdp-3.png'],
  customizations: [
    { id: 1, name: "Tiny Lobster", location: "Left pocket", price: "+$25", icon: "🦞" },
    { id: 2, name: "Your Initials", location: "Cuff", price: "+$25", icon: "✨" },
    { id: 3, name: "Palm Tree", location: "Back collar", price: "+$25", icon: "🌴" }
  ]
};

// Community photos for PDP collage
const communityPhotos = [
  { id: 1, vibe: 'Pool vibes', initials: 'MK', image: '/ugc-example.png' },
  { id: 2, vibe: 'Golden hour', initials: 'JR', image: '/ugc-1.png' },
  { id: 3, vibe: 'Poolside drinks', initials: 'AL', image: '/ugc-2.png' },
  { id: 4, vibe: 'Resort life', initials: 'SC', image: '/ugc-3.png' },
  { id: 5, vibe: 'Backyard BBQ', initials: 'TW', image: null },
  { id: 6, vibe: 'Tropical vacation', initials: 'DP', image: null },
  { id: 7, vibe: 'Brunch crew', initials: 'NB', image: null },
  { id: 8, vibe: 'Festival vibes', initials: 'KL', image: null },
];

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [selectedCustomizations, setSelectedCustomizations] = useState([]);
  const [joinFamily, setJoinFamily] = useState(false);
  const [currentPdpImage, setCurrentPdpImage] = useState(0);

  // Simulate analysis progress
  useEffect(() => {
    if (screen === 'analyzing') {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setScreen('results'), 500);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [screen]);

  const handleUpload = () => {
    setUploadedImage(true);
    setScreen('analyzing');
  };

  const toggleCustomization = (id) => {
    setSelectedCustomizations(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const tribe = vibeTribes[matchedShirt.tribe];

  return (
    <div style={styles.container}>
      {/* Screen Navigation (for demo) */}
      <div style={styles.screenNav}>
        {['welcome', 'analyzing', 'results', 'customize', 'share', 'pdp'].map(s => (
          <button
            key={s}
            onClick={() => {
              setScreen(s);
              if (s === 'analyzing') setAnalysisProgress(0);
            }}
            style={{
              ...styles.navButton,
              background: screen === s ? '#FF6B35' : 'rgba(255,255,255,0.1)',
              color: screen === s ? '#1a1a1a' : '#999'
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Phone with Explanation Panels */}
      <div style={styles.phoneContainer}>
        {/* Left Explanation */}
        <div style={{...styles.explanationBox, ...styles.explanationLeft}}>
          {screen === 'welcome' && (
            <div style={styles.explanationContent}>
              <div style={styles.explanationTitle}>Upload your vibe</div>
              <div style={styles.explanationText}>
                Snap a pic of your happy place - poolside, beach, rooftop bar, wherever. We'll use it to find your perfect shirt match.
              </div>
            </div>
          )}
          {screen === 'results' && (
            <div style={styles.explanationContent}>
              <div style={styles.explanationTitle}>You've been matched</div>
              <div style={styles.explanationText}>
                Based on your photo's energy, we've assigned you a Vibe Tribe and found the shirt that belongs in your life.
              </div>
            </div>
          )}
          {screen === 'share' && (
            <div style={styles.explanationContent}>
              <div style={styles.explanationTitle}>Spread the vibe</div>
              <div style={styles.explanationText}>
                Share your match to stories, or join the Family Album so others can see your energy on the product page.
              </div>
            </div>
          )}
        </div>

        {/* Phone Frame */}
        <div style={styles.phoneFrame}>
        <div style={styles.phoneNotch}></div>
        <div style={styles.phoneScreen}>

          {/* SCREEN 1: Welcome */}
          {screen === 'welcome' && (
            <div style={styles.screenContent}>
              <div style={styles.welcomeLogo}>
                <img src="/tombolo-logo.png" alt="Tombolo" style={styles.welcomeLogoImage} />
              </div>
              <h1 style={styles.welcomeTitle}>Welcome to the good life.</h1>
              <p style={styles.welcomeText}>
                Show us your happy place, and we'll find the shirt that belongs there.
              </p>

              <div style={styles.uploadZone} onClick={handleUpload}>
                <div style={styles.uploadIcon}>📸</div>
                <div style={styles.uploadText}>Tap to upload your vibe</div>
                <div style={styles.uploadHint}>JPG, PNG up to 10MB</div>
              </div>

              <div style={styles.exampleVibes}>
                <div style={styles.exampleLabel}>Example vibes we love:</div>
                <div style={styles.exampleGrid}>
                  <div style={styles.exampleItem}>🏖️ Beach day</div>
                  <div style={styles.exampleItem}>🍹 Happy hour</div>
                  <div style={styles.exampleItem}>🚤 Boat trip</div>
                  <div style={styles.exampleItem}>🌅 Golden hour</div>
                </div>
              </div>

              <div style={styles.collageBanner}>
                <img
                  src="/collage-banner.png"
                  alt="Tombolo vibes"
                  style={styles.collageBannerImage}
                />
              </div>
            </div>
          )}

          {/* SCREEN 2: Analyzing */}
          {screen === 'analyzing' && (
            <div style={styles.screenContent}>
              <div style={styles.analyzingContainer}>
                <div style={styles.photoPreview}>
                  <img
                    src="/ugc-example.png"
                    alt="Your uploaded photo"
                    style={styles.uploadedPhoto}
                  />
                </div>

                <div style={styles.analyzerBox}>
                  <div style={styles.analyzerTitle}>Reading your energy...</div>

                  <div style={styles.progressBar}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${Math.min(analysisProgress, 100)}%`
                      }}
                    ></div>
                  </div>

                  <div style={styles.analysisSteps}>
                    <div style={{...styles.analysisStep, opacity: analysisProgress > 10 ? 1 : 0.3}}>
                      ✓ Detecting color temperature
                    </div>
                    <div style={{...styles.analysisStep, opacity: analysisProgress > 30 ? 1 : 0.3}}>
                      ✓ Reading setting cues
                    </div>
                    <div style={{...styles.analysisStep, opacity: analysisProgress > 50 ? 1 : 0.3}}>
                      ✓ Measuring leisure quotient
                    </div>
                    <div style={{...styles.analysisStep, opacity: analysisProgress > 70 ? 1 : 0.3}}>
                      ✓ Identifying aesthetic era
                    </div>
                    <div style={{...styles.analysisStep, opacity: analysisProgress > 90 ? 1 : 0.3}}>
                      ✓ Finding your perfect match
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 3: Results */}
          {screen === 'results' && (
            <div style={styles.screenContent}>
              <div style={styles.resultsHeader}>
                <div style={styles.matchBadge}>VIBE MATCHED</div>
              </div>

              {/* Vibe Tribe Assignment */}
              <div style={{...styles.tribeBadge, borderColor: tribe.color}}>
                <span style={styles.tribeIcon}>{tribe.icon}</span>
                <div style={styles.tribeInfo}>
                  <div style={styles.tribeName}>{tribe.name}</div>
                  <div style={styles.tribeTagline}>{tribe.tagline}</div>
                </div>
              </div>

              {/* Vibe Description */}
              <div style={styles.vibeDescription}>
                "{matchedShirt.vibe}"
              </div>

              {/* Side by Side: UGC + Product */}
              <div style={styles.matchComparison}>
                <div style={styles.matchImageWrapper}>
                  <img
                    src="/ugc-example.png"
                    alt="Your vibe"
                    style={styles.matchUgcImage}
                  />
                  <div style={styles.matchImageLabel}>Your vibe</div>
                </div>
                <div style={styles.matchConnector}>
                  <span style={styles.matchArrow}>→</span>
                </div>
                <div style={styles.matchImageWrapper}>
                  <img
                    src={matchedShirt.images[0]}
                    alt={matchedShirt.name}
                    style={styles.matchProductImage}
                  />
                  <div style={styles.matchImageLabel}>Your match</div>
                </div>
              </div>

              {/* Product Info */}
              <div style={styles.shirtInfoCard}>
                <div style={styles.shirtName}>{matchedShirt.name}</div>
                <div style={styles.shirtPrice}>{matchedShirt.price}</div>
              </div>

              {/* Action Buttons */}
              <div style={styles.resultActions}>
                <button
                  style={styles.primaryButton}
                  onClick={() => setScreen('customize')}
                >
                  Make it yours →
                </button>
                <button
                  style={styles.secondaryButton}
                  onClick={() => setScreen('pdp')}
                >
                  View full details
                </button>
              </div>

              {/* Other Tribe Members */}
              <div style={styles.tribeMembers}>
                <div style={styles.tribeMembersLabel}>Others in your tribe:</div>
                <div style={styles.memberAvatars}>
                  {[1,2,3,4,5].map(i => (
                    <div key={i} style={styles.memberAvatar}>
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                  <div style={styles.memberCount}>+47</div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 4: Customize */}
          {screen === 'customize' && (
            <div style={styles.screenContent}>
              <div style={styles.customizeHeader}>
                <button style={styles.backButton} onClick={() => setScreen('results')}>
                  ← Back
                </button>
                <div style={styles.customizeTitle}>Make it yours</div>
              </div>

              {/* Shirt Preview with Customization Zones */}
              <div style={styles.customizePreview}>
                <div style={styles.shirtOutline}>
                  <div style={styles.shirtBody}>
                    <img
                      src={matchedShirt.images[0]}
                      alt={matchedShirt.name}
                      style={styles.customizeShirtImage}
                    />
                    {/* Customization hotspots */}
                    <div
                      style={{
                        ...styles.hotspot,
                        top: '35%',
                        left: '20%',
                        background: selectedCustomizations.includes(1) ? '#FF6B35' : 'rgba(255,255,255,0.2)'
                      }}
                      onClick={() => toggleCustomization(1)}
                    >
                      {selectedCustomizations.includes(1) ? '🦞' : '+'}
                    </div>
                    <div
                      style={{
                        ...styles.hotspot,
                        bottom: '15%',
                        left: '10%',
                        background: selectedCustomizations.includes(2) ? '#FF6B35' : 'rgba(255,255,255,0.2)'
                      }}
                      onClick={() => toggleCustomization(2)}
                    >
                      {selectedCustomizations.includes(2) ? '✨' : '+'}
                    </div>
                    <div
                      style={{
                        ...styles.hotspot,
                        top: '10%',
                        right: '25%',
                        background: selectedCustomizations.includes(3) ? '#FF6B35' : 'rgba(255,255,255,0.2)'
                      }}
                      onClick={() => toggleCustomization(3)}
                    >
                      {selectedCustomizations.includes(3) ? '🌴' : '+'}
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Suggestion */}
              <div style={styles.aiSuggestion}>
                <div style={styles.aiIcon}>🤖</div>
                <div style={styles.aiText}>
                  Based on your vibe, you seem like the type who'd want a tiny lobster on the pocket.
                </div>
              </div>

              {/* Customization Options */}
              <div style={styles.customOptions}>
                {matchedShirt.customizations.map(custom => (
                  <div
                    key={custom.id}
                    style={{
                      ...styles.customOption,
                      borderColor: selectedCustomizations.includes(custom.id) ? '#FF6B35' : 'rgba(255,255,255,0.1)'
                    }}
                    onClick={() => toggleCustomization(custom.id)}
                  >
                    <div style={styles.customIcon}>{custom.icon}</div>
                    <div style={styles.customInfo}>
                      <div style={styles.customName}>{custom.name}</div>
                      <div style={styles.customLocation}>{custom.location}</div>
                    </div>
                    <div style={styles.customPrice}>{custom.price}</div>
                    <div style={{
                      ...styles.customCheck,
                      background: selectedCustomizations.includes(custom.id) ? '#FF6B35' : 'transparent',
                      borderColor: selectedCustomizations.includes(custom.id) ? '#FF6B35' : 'rgba(255,255,255,0.3)'
                    }}>
                      {selectedCustomizations.includes(custom.id) && '✓'}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total and CTA */}
              <div style={styles.customizeFooter}>
                <div style={styles.totalPrice}>
                  <span style={styles.totalLabel}>Total</span>
                  <span style={styles.totalAmount}>
                    ${158 + (selectedCustomizations.length * 25)}.00
                  </span>
                </div>
                <button
                  style={styles.primaryButton}
                  onClick={() => setScreen('share')}
                >
                  Add to cart
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 5: Share */}
          {screen === 'share' && (
            <div style={styles.screenContent}>
              <div style={styles.shareHeader}>
                <div style={styles.checkmark}>✓</div>
                <div style={styles.addedText}>Added to cart</div>
              </div>

              {/* Share Card Preview */}
              <div style={styles.shareCard}>
                <div style={styles.shareCardHeader}>
                  <img src="/tombolo-logo.png" alt="Tombolo" style={styles.shareCardLogoImage} />
                  <div style={styles.shareCardBadge}>VIBE CHECK</div>
                </div>
                <div style={styles.shareCardPhoto}>
                  <img
                    src="/ugc-example.png"
                    alt="Your vibe"
                    style={styles.shareCardPhotoImage}
                  />
                </div>
                <div style={styles.shareCardTribe}>
                  <span>{tribe.icon}</span> {tribe.name}
                </div>
                <div style={styles.shareCardMatch}>
                  Matched to: {matchedShirt.name}
                </div>
                <div style={styles.shareCardCTA}>
                  Find your vibe → tombolocompany.com/vibecheck
                </div>
              </div>

              {/* Join Family Album */}
              <div
                style={{
                  ...styles.familyOption,
                  borderColor: joinFamily ? '#FF6B35' : 'rgba(255,255,255,0.1)'
                }}
                onClick={() => setJoinFamily(!joinFamily)}
              >
                <div style={styles.familyIcon}>📸</div>
                <div style={styles.familyInfo}>
                  <div style={styles.familyTitle}>Join the Family Photo Album</div>
                  <div style={styles.familyDesc}>
                    Your photo will appear on this product's page, connecting you with fellow {tribe.name}s
                  </div>
                </div>
                <div style={{
                  ...styles.customCheck,
                  background: joinFamily ? '#FF6B35' : 'transparent',
                  borderColor: joinFamily ? '#FF6B35' : 'rgba(255,255,255,0.3)'
                }}>
                  {joinFamily && '✓'}
                </div>
              </div>

              {/* Share Actions */}
              <div style={styles.shareActions}>
                <button style={styles.shareButton}>
                  <span style={styles.shareButtonIcon}>📱</span>
                  Share to Stories
                </button>
                <button style={styles.shareButton}>
                  <span style={styles.shareButtonIcon}>💾</span>
                  Save Image
                </button>
              </div>

              <button
                style={styles.tertiaryButton}
                onClick={() => setScreen('pdp')}
              >
                Continue shopping
              </button>
            </div>
          )}

          {/* SCREEN 6: PDP with Community Collage */}
          {screen === 'pdp' && (
            <div style={styles.pdpScreen}>
              {/* Product Image Area */}
              <div style={styles.pdpImageArea}>
                <img
                  src={matchedShirt.images[currentPdpImage]}
                  alt={matchedShirt.name}
                  style={styles.pdpProductImage}
                />
                <div style={styles.pdpDots}>
                  {matchedShirt.images.map((_, index) => (
                    <span
                      key={index}
                      style={index === currentPdpImage ? styles.pdpDotActive : styles.pdpDot}
                      onClick={() => setCurrentPdpImage(index)}
                    ></span>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div style={styles.pdpInfo}>
                <div style={styles.pdpBadgeRow}>
                  <div style={styles.pdpMatchBadge}>✓ Matched for you</div>
                  <div style={styles.pdpTribeBadge}>
                    {tribe.icon} {tribe.name}
                  </div>
                </div>
                <h1 style={styles.pdpTitle}>{matchedShirt.name}</h1>
                <div style={styles.pdpPrice}>{matchedShirt.price}</div>
              </div>

              {/* Community Collage Section */}
              <div style={styles.collageSection}>
                <div style={styles.collageSectionHeader}>
                  <div style={styles.collageSectionTitle}>
                    🏠 The Family Album
                  </div>
                  <div style={styles.collageSectionSub}>
                    52 people were vibe-matched to this shirt
                  </div>
                </div>

                <div style={styles.collageGrid}>
                  {communityPhotos.map((photo) => (
                    <div key={photo.id} style={styles.collageItem}>
                      <div style={{
                        ...styles.collagePhoto,
                        backgroundImage: photo.image ? `url(${photo.image})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}>
                        {!photo.image && <span style={styles.collageInitials}>{photo.initials}</span>}
                      </div>
                      <div style={styles.collageVibe}>{photo.vibe}</div>
                    </div>
                  ))}
                </div>

                <button style={styles.collageViewAll}>
                  View all 52 →
                </button>
              </div>

              {/* Vibe Twins */}
              <div style={styles.vibeTwins}>
                <div style={styles.vibeTwinsTitle}>Your Vibe Twins</div>
                <div style={styles.vibeTwinsDesc}>
                  People with matching energy who also chose this shirt
                </div>
                <div style={styles.twinCards}>
                  <div style={styles.twinCard}>
                    <div style={{
                      ...styles.twinPhoto,
                      backgroundImage: 'url(/ugc-1.png)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}></div>
                    <div style={styles.twinName}>Golden hour</div>
                    <div style={styles.twinMatch}>94% vibe match</div>
                  </div>
                  <div style={styles.twinCard}>
                    <div style={{
                      ...styles.twinPhoto,
                      backgroundImage: 'url(/ugc-2.png)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}></div>
                    <div style={styles.twinName}>Poolside drinks</div>
                    <div style={styles.twinMatch}>91% vibe match</div>
                  </div>
                  <div style={styles.twinCard}>
                    <div style={{
                      ...styles.twinPhoto,
                      backgroundImage: 'url(/ugc-3.png)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}></div>
                    <div style={styles.twinName}>Resort life</div>
                    <div style={styles.twinMatch}>89% vibe match</div>
                  </div>
                </div>
              </div>

              {/* Sticky Add to Cart */}
              <div style={styles.stickyCart}>
                <div style={styles.stickyPrice}>{matchedShirt.price}</div>
                <button style={styles.stickyButton}>
                  Add to Cart
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

        {/* Right Explanation */}
        <div style={{...styles.explanationBox, ...styles.explanationRight}}>
          {screen === 'analyzing' && (
            <div style={styles.explanationContent}>
              <div style={styles.explanationTitle}>Reading your energy</div>
              <div style={styles.explanationText}>
                Our AI is analyzing colors, setting, mood, and aesthetic era to find your perfect match.
              </div>
            </div>
          )}
          {screen === 'customize' && (
            <div style={styles.explanationContent}>
              <div style={styles.explanationTitle}>Make it yours</div>
              <div style={styles.explanationText}>
                Add personal touches - a tiny lobster, your initials, or a palm tree. We suggest based on your vibe.
              </div>
            </div>
          )}
          {screen === 'pdp' && (
            <div style={styles.explanationContent}>
              <div style={styles.explanationTitle}>The Family Album</div>
              <div style={styles.explanationText}>
                See everyone else who was matched to this shirt. Find your Vibe Twins - people with similar energy.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ralph Footer */}
      <div style={styles.ralphFooter}>
        <div style={styles.ralphCredit}>Prototype created by</div>
        <img src="/ralph-logo.png" alt="Ralph" style={styles.ralphLogo} />
        <a href="mailto:brook@ralph.world" style={styles.ralphEmail}>
          brook@ralph.world
        </a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#1E1210',
    backgroundImage: 'url(/bg-pool.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    padding: '24px',
    fontFamily: "'DM Sans', -apple-system, sans-serif",
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
    marginBottom: '16px',
  },
  logoImage: {
    height: '40px',
    width: 'auto',
  },
  tagline: {
    fontSize: '12px',
    color: '#888',
    letterSpacing: '2px',
    marginTop: '4px',
  },
  screenNav: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    background: 'rgba(0,0,0,0.3)',
    backdropFilter: 'blur(10px)',
    padding: '12px 16px',
    borderRadius: '24px',
  },
  navButton: {
    padding: '6px 12px',
    borderRadius: '16px',
    border: 'none',
    fontSize: '11px',
    fontWeight: '600',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    transition: 'all 0.2s',
  },
  phoneContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  explanationBox: {
    width: '200px',
    minHeight: '100px',
  },
  explanationLeft: {
    textAlign: 'right',
  },
  explanationRight: {
    textAlign: 'left',
  },
  explanationContent: {
    background: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '16px',
  },
  explanationTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '8px',
  },
  explanationText: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.8)',
    lineHeight: '1.5',
  },
  phoneFrame: {
    width: '375px',
    height: '720px',
    background: '#000',
    borderRadius: '40px',
    padding: '12px',
    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
    position: 'relative',
    flexShrink: 0,
  },
  phoneNotch: {
    width: '120px',
    height: '28px',
    background: '#000',
    borderRadius: '0 0 16px 16px',
    position: 'absolute',
    top: '12px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
  },
  phoneScreen: {
    width: '100%',
    height: '100%',
    background: '#1E1210',
    borderRadius: '32px',
    overflow: 'hidden',
    position: 'relative',
  },
  screenContent: {
    padding: '48px 20px 20px',
    height: '100%',
    overflowY: 'auto',
  },

  // Welcome Screen
  welcomeLogo: {
    textAlign: 'center',
    marginBottom: '16px',
  },
  welcomeLogoImage: {
    height: '48px',
    width: 'auto',
  },
  welcomeTitle: {
    fontSize: '22px',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: '1.3',
    marginBottom: '12px',
  },
  welcomeText: {
    fontSize: '14px',
    color: '#aaa',
    textAlign: 'center',
    marginBottom: '8px',
  },
  welcomeSubtext: {
    fontSize: '12px',
    color: '#666',
    textAlign: 'center',
    marginBottom: '24px',
  },
  uploadZone: {
    border: '2px dashed #5C4A3D',
    borderRadius: '16px',
    padding: '32px 20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '24px',
    background: 'rgba(92, 74, 61, 0.1)',
  },
  uploadIcon: {
    fontSize: '32px',
    marginBottom: '8px',
  },
  uploadText: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '4px',
  },
  uploadHint: {
    fontSize: '11px',
    color: '#666',
  },
  exampleVibes: {
    marginTop: '16px',
  },
  exampleLabel: {
    fontSize: '11px',
    color: '#666',
    marginBottom: '8px',
    textAlign: 'center',
  },
  exampleGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
  },
  exampleItem: {
    background: 'rgba(255,255,255,0.05)',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    textAlign: 'center',
  },
  collageBanner: {
    marginTop: '24px',
    marginLeft: '-20px',
    marginRight: '-20px',
    overflow: 'hidden',
  },
  collageBannerImage: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },

  // Analyzing Screen
  analyzingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '20px',
  },
  photoPreview: {
    marginBottom: '24px',
  },
  uploadedPhoto: {
    width: '160px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '16px',
    border: '2px solid rgba(255,255,255,0.1)',
  },
  analyzerBox: {
    width: '100%',
    textAlign: 'center',
  },
  analyzerTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '16px',
  },
  progressBar: {
    width: '100%',
    height: '4px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '2px',
    overflow: 'hidden',
    marginBottom: '24px',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #E8AA42, #F5D574)',
    borderRadius: '2px',
    transition: 'width 0.2s',
  },
  analysisSteps: {
    textAlign: 'left',
  },
  analysisStep: {
    fontSize: '12px',
    color: '#aaa',
    marginBottom: '8px',
    transition: 'opacity 0.3s',
  },

  // Results Screen
  resultsHeader: {
    textAlign: 'center',
    marginBottom: '16px',
  },
  matchBadge: {
    display: 'inline-block',
    background: 'linear-gradient(90deg, #E8AA42, #F5D574)',
    color: '#1E1210',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '1px',
  },
  tribeBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '12px',
    marginBottom: '16px',
    border: '2px solid',
  },
  tribeIcon: {
    fontSize: '28px',
  },
  tribeInfo: {
    flex: 1,
  },
  tribeName: {
    fontSize: '14px',
    fontWeight: '600',
  },
  tribeTagline: {
    fontSize: '11px',
    color: '#888',
  },
  vibeDescription: {
    fontSize: '14px',
    fontStyle: 'italic',
    color: '#ccc',
    lineHeight: '1.5',
    marginBottom: '20px',
    padding: '0 8px',
  },
  matchComparison: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '12px',
  },
  matchImageWrapper: {
    flex: 1,
    textAlign: 'center',
  },
  matchUgcImage: {
    width: '100%',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '12px',
    border: '2px solid rgba(255,255,255,0.1)',
  },
  matchProductImage: {
    width: '100%',
    height: '120px',
    objectFit: 'contain',
    borderRadius: '12px',
    background: '#F5EDE6',
  },
  matchImageLabel: {
    fontSize: '10px',
    color: '#666',
    marginTop: '6px',
  },
  matchConnector: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    flexShrink: 0,
  },
  matchArrow: {
    fontSize: '20px',
    color: '#FF6B35',
  },
  shirtInfoCard: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '12px',
    padding: '12px 16px',
    marginBottom: '16px',
  },
  shirtName: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '4px',
  },
  shirtPrice: {
    fontSize: '14px',
    color: '#FF6B35',
    fontWeight: '600',
  },
  resultActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '20px',
  },
  primaryButton: {
    background: '#FF6B35',
    color: '#fff',
    border: 'none',
    padding: '14px 24px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
  },
  secondaryButton: {
    background: 'transparent',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.2)',
    padding: '12px 24px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    width: '100%',
  },
  tertiaryButton: {
    background: 'transparent',
    color: '#888',
    border: 'none',
    padding: '12px 24px',
    fontSize: '13px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '8px',
  },
  tribeMembers: {
    marginTop: '16px',
  },
  tribeMembersLabel: {
    fontSize: '11px',
    color: '#666',
    marginBottom: '8px',
  },
  memberAvatars: {
    display: 'flex',
    alignItems: 'center',
  },
  memberAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'rgba(232, 170, 66, 0.3)',
    border: '2px solid #1E1210',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: '600',
    marginLeft: '-8px',
    color: '#E8AA42',
  },
  memberCount: {
    marginLeft: '8px',
    fontSize: '12px',
    color: '#888',
  },

  // Customize Screen
  customizeHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#888',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '4px 0',
  },
  customizeTitle: {
    fontSize: '18px',
    fontWeight: '600',
  },
  customizePreview: {
    marginBottom: '16px',
  },
  shirtOutline: {
    background: '#F5EDE6',
    borderRadius: '16px',
    padding: '12px',
    display: 'flex',
    justifyContent: 'center',
  },
  shirtBody: {
    position: 'relative',
    width: '180px',
    height: '180px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customizeShirtImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  hotspot: {
    position: 'absolute',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: '2px dashed rgba(0,0,0,0.3)',
  },
  aiSuggestion: {
    display: 'flex',
    gap: '12px',
    padding: '12px',
    background: 'rgba(255,107,53,0.1)',
    borderRadius: '12px',
    marginBottom: '16px',
    alignItems: 'flex-start',
  },
  aiIcon: {
    fontSize: '20px',
  },
  aiText: {
    fontSize: '12px',
    color: '#ccc',
    lineHeight: '1.4',
  },
  customOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '80px',
  },
  customOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '12px',
    border: '2px solid',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  customIcon: {
    fontSize: '24px',
  },
  customInfo: {
    flex: 1,
  },
  customName: {
    fontSize: '14px',
    fontWeight: '500',
  },
  customLocation: {
    fontSize: '11px',
    color: '#666',
  },
  customPrice: {
    fontSize: '12px',
    color: '#FF6B35',
    fontWeight: '600',
  },
  customCheck: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    color: '#fff',
    transition: 'all 0.2s',
  },
  customizeFooter: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    padding: '16px 20px',
    background: 'linear-gradient(transparent, #1E1210 30%)',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  totalPrice: {
    display: 'flex',
    flexDirection: 'column',
  },
  totalLabel: {
    fontSize: '11px',
    color: '#666',
  },
  totalAmount: {
    fontSize: '18px',
    fontWeight: '700',
  },

  // Share Screen
  shareHeader: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  checkmark: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #4CAF50, #8BC34A)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    margin: '0 auto 12px',
  },
  addedText: {
    fontSize: '18px',
    fontWeight: '600',
  },
  shareCard: {
    background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',
    borderRadius: '16px',
    padding: '16px',
    marginBottom: '16px',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  shareCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  shareCardLogoImage: {
    height: '20px',
    width: 'auto',
  },
  shareCardBadge: {
    fontSize: '9px',
    fontWeight: '600',
    background: '#FF6B35',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '8px',
    letterSpacing: '1px',
  },
  shareCardPhoto: {
    width: '100%',
    height: '120px',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '12px',
  },
  shareCardPhotoImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  shareCardTribe: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '4px',
  },
  shareCardMatch: {
    fontSize: '12px',
    color: '#888',
    marginBottom: '12px',
  },
  shareCardCTA: {
    fontSize: '10px',
    color: '#666',
    textAlign: 'center',
  },
  familyOption: {
    display: 'flex',
    gap: '12px',
    padding: '16px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '12px',
    border: '2px solid',
    cursor: 'pointer',
    marginBottom: '16px',
    alignItems: 'flex-start',
  },
  familyIcon: {
    fontSize: '24px',
  },
  familyInfo: {
    flex: 1,
  },
  familyTitle: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '4px',
  },
  familyDesc: {
    fontSize: '11px',
    color: '#888',
    lineHeight: '1.4',
  },
  shareActions: {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px',
  },
  shareButton: {
    flex: 1,
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    padding: '12px',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
  },
  shareButtonIcon: {
    fontSize: '16px',
  },

  // PDP Screen
  pdpScreen: {
    height: '100%',
    overflowY: 'auto',
    paddingBottom: '80px',
  },
  pdpImageArea: {
    height: '280px',
    background: '#F5EDE6',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  pdpProductImage: {
    height: '240px',
    width: 'auto',
    objectFit: 'contain',
  },
  pdpDots: {
    display: 'flex',
    gap: '6px',
    position: 'absolute',
    bottom: '12px',
  },
  pdpDotActive: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#FF6B35',
    cursor: 'pointer',
  },
  pdpDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'rgba(0,0,0,0.2)',
    cursor: 'pointer',
  },
  pdpInfo: {
    padding: '16px 20px',
  },
  pdpBadgeRow: {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px',
  },
  pdpMatchBadge: {
    fontSize: '10px',
    background: 'rgba(76,175,80,0.2)',
    color: '#4CAF50',
    padding: '4px 8px',
    borderRadius: '6px',
  },
  pdpTribeBadge: {
    fontSize: '10px',
    background: 'rgba(232, 170, 66, 0.2)',
    color: '#E8AA42',
    padding: '4px 8px',
    borderRadius: '6px',
  },
  pdpTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '4px',
  },
  pdpPrice: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#FF6B35',
  },
  collageSection: {
    padding: '20px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  collageSectionHeader: {
    marginBottom: '12px',
  },
  collageSectionTitle: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '4px',
  },
  collageSectionSub: {
    fontSize: '11px',
    color: '#888',
  },
  collageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
    marginBottom: '12px',
  },
  collageItem: {
    textAlign: 'center',
  },
  collagePhoto: {
    width: '100%',
    aspectRatio: '1',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4px',
  },
  collageInitials: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#666',
  },
  collageVibe: {
    fontSize: '8px',
    color: '#666',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  collageViewAll: {
    background: 'none',
    border: 'none',
    color: '#E8AA42',
    fontSize: '12px',
    cursor: 'pointer',
    padding: '0',
  },
  vibeTwins: {
    padding: '20px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  vibeTwinsTitle: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '4px',
  },
  vibeTwinsDesc: {
    fontSize: '11px',
    color: '#888',
    marginBottom: '12px',
  },
  twinCards: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
  },
  twinCard: {
    flex: '0 0 100px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '12px',
    padding: '12px',
    textAlign: 'center',
  },
  twinPhoto: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'rgba(232, 170, 66, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#E8AA42',
  },
  twinName: {
    fontSize: '10px',
    color: '#aaa',
    marginBottom: '4px',
  },
  twinMatch: {
    fontSize: '9px',
    color: '#4CAF50',
    fontWeight: '600',
  },
  stickyCart: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    padding: '12px 20px',
    background: '#1E1210',
    borderTop: '1px solid rgba(232, 170, 66, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stickyPrice: {
    fontSize: '18px',
    fontWeight: '700',
  },
  stickyButton: {
    background: '#FF6B35',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },

  // Legend
  legend: {
    marginTop: '24px',
    padding: '16px',
    background: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '375px',
  },
  ralphFooter: {
    marginTop: '16px',
    padding: '10px 20px',
    background: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  ralphCredit: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.7)',
  },
  ralphLogo: {
    height: '24px',
    width: 'auto',
  },
  ralphEmail: {
    fontSize: '11px',
    color: '#E8AA42',
    textDecoration: 'none',
    marginLeft: 'auto',
  },
  legendTitle: {
    fontSize: '11px',
    color: '#666',
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  legendItems: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '11px',
    color: '#888',
  },
  legendBox: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    background: 'rgba(255,255,255,0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
  },
};
