import { useEffect } from 'react';

export function MetaTags() {
  useEffect(() => {
    // Set document title
    document.title = 'Kurt Michael Mirafelix | Portfolio';

    // Set or update meta tags
    const metaTags = [
      { name: 'description', content: 'Student Developer specializing in React & TypeScript. Building elegant, performant web applications with exceptional user experiences.' },
      { name: 'keywords', content: 'Developer, React Developer, TypeScript, Web Developer, Portfolio, Kurt Michael Mirafelix, Kurt Michael Mirafelix Portfolio' },
      { name: 'author', content: 'Kurt Michael Mirafelix' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'google-site-verification', content: 'dPE4N9Svx3zdJfYfGaRbQdqkO7t-vIs53TU1GowbjvY' },

      // Open Graph / Facebook
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Kurt Michael Mirafelix | Portfolio' },
      { property: 'og:description', content: 'Student Developer specializing in React & TypeScript. President\'s Lister at Cavite State University with a 1.31 GWA.' },
      { property: 'og:url', content: 'https://kurt-mirafelix.kmirafelix.workers.dev/' },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Kurt Michael Mirafelix | Portfolio' },
      { name: 'twitter:description', content: 'Student Developer specializing in React & TypeScript. Building elegant, performant web applications.' },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const attribute = name ? 'name' : 'property';
      const value = name || property;
      let meta = document.querySelector(`meta[${attribute}="${value}"]`);

      if (!meta) {
        meta = document.createElement('meta');
        if (name) {
          meta.setAttribute('name', name);
        } else if (property) {
          meta.setAttribute('property', property);
        }
        document.head.appendChild(meta);
      }

      meta.setAttribute('content', content);
    });

    // JSON-LD Structured Data — tells Google this site belongs to a real person
    // This is the most powerful SEO signal for ranking for your own name
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Kurt Michael Mirafelix',
      url: 'https://kurt-mirafelix.kmirafelix.workers.dev/',
      jobTitle: 'Computer Science Student & Developer',
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Cavite State University',
      },
      knowsAbout: ['React', 'TypeScript', 'Web Development', 'Cloud Computing', 'Cybersecurity'],
      sameAs: [
        'https://www.linkedin.com/in/kurt-mirafelix',
        'https://github.com/kmirafelix',
      ],
    };

    // Inject or update the JSON-LD script tag
    let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }, []);

  return null;
}
