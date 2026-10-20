export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  categoryLabel: string;
  summary: string;
  details: string[];
  environment: string;
  colorTheme: 'electric' | 'gender-reveal' | 'spark';
  placeholderNote: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'artificii-exterior' | 'gender-reveal' | 'scantei-reci' | 'atmosfera';
  categoryLabel: string;
  aspect: 'landscape' | 'vertical' | 'portrait';
  mediaType: 'photo' | 'video';
  caption: string;
  alt: string;
  palette: [string, string, string];
  isPlaceholder: boolean;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  technicalNote: string;
}

export const siteConfig = {
  brandName: 'Artificii Deli',
  domain: 'ArtificiiDeli.ro',
  tagline: 'Spectacole pirotehnice și efecte speciale pentru evenimente',
  statusNote: '[DATE DE CONTACT ȘI PORTOFOLIU ÎN CURS DE ACTUALIZARE CU MATERIALELE CLIENTULUI]',
  contact: {
    phoneDisplay: '[TELEFON DE CONFIRMAT]',
    phoneHref: '#contact',
    whatsappHref: 'https://wa.me/?text=Bun%C4%83%20ziua%2C%20doresc%20o%20ofert%C4%83%20pentru%20efecte%20pirotehnice%20la%20un%20eveniment.',
    email: 'contact@artificiideli.ro',
    serviceArea: '[ORAȘ / JUDEȚ ȘI ZONA DE ACOPERIRE: DE CONFIRMAT DE CLIENT]',
    legalName: '[DENUMIRE JURIDICĂ SRL / CUI: DE CONFIRMAT]',
  },
  navItems: [
    { label: 'Servicii', href: '#servicii' },
    { label: 'Portofoliu Foto-Video', href: '#galerie' },
    { label: 'Siguranță & Organizare', href: '#proces' },
    { label: 'Contact', href: '#contact' },
  ],
  services: [
    {
      id: 'spectacole-exterior',
      index: '01',
      title: 'Spectacole de artificii de exterior',
      categoryLabel: 'Cer deschis / Nunți & Evenimente Private',
      summary:
        'Coregrafii pirotehnice pe cerul nopții, calibrate pentru arhitectura locației și momentul culminant al petrecerii. Combinăm baterii cu deschidere la înălțime, comete ascendente și salve finale intense în nuanțe de albastru electric, alb argintiu și cyan.',
      details: [
        'Configurare adaptată spațiului exterior disponibil și distanțelor de siguranță',
        'Operare realizată de personal dedicat, cu echipament de declanșare controlată',
        'Ritm de tragere gândit pentru impact vizual continuu, fără pauze goale pe cer',
      ],
      environment: 'Exterior (grădini de evenimente, pontoane, domenii, spații deschise)',
      colorTheme: 'electric',
      placeholderNote: 'Serviciu de confirmat cu lista finală a clientului',
    },
    {
      id: 'gender-reveal',
      index: '02',
      title: 'Efecte pentru Gender Reveal (Zi & Noapte)',
      categoryLabel: 'Fum Cromatic & Pirotehnie Dedicată',
      summary:
        'Momentul dezvăluirii sexului copilului construit cu contrast cromatic puternic: coloane dense de fum roz intens sau albastru cyan pentru evenimente pe timp de zi, ori salve pirotehnice nocturne care colorează cerul dintr-o singură declanșare.',
      details: [
        'Opțiuni pentru lumină naturală (fum colorat dens și jerbe de zi) sau seară (artificii roz/albastre)',
        'Declanșare sincronizată cu numărătoarea inversă a părinților și a invitaților',
        'Unghiuri de amplasare alese special pentru încadrarea foto și video',
      ],
      environment: 'Exterior (ziua sau noaptea, în funcție de tipul efectului ales)',
      colorTheme: 'gender-reveal',
      placeholderNote: 'Serviciu de confirmat cu lista finală a clientului',
    },
    {
      id: 'efecte-interior',
      index: '03',
      title: 'Scântei reci (Cold Sparks) și efecte pentru momentele cheie',
      categoryLabel: 'Interior & Exterior / Dansul Mirilor & Tort',
      summary:
        'Fântâni de scântei reci fără fum înecăcios și fără miros, potrivite pentru deschiderea dansului, intrarea în sală sau prezentarea tortului. Oferă o coloană luminoasă curată care pune în valoare fotografia de eveniment.',
      details: [
        'Tehnologie cu scânteie rece, sigură pentru proximitatea invitaților și a decorului',
        'Înălțime și durată reglabile din consolă pe parcursul piesei muzicale',
        'Montaj discret pe ringul de dans sau pe aleea de primire',
      ],
      environment: 'Interior (săli de evenimente, corturi) și Exterior',
      colorTheme: 'spark',
      placeholderNote: 'Serviciu de confirmat cu lista finală a clientului',
    },
  ] satisfies ServiceItem[],
  galleryItems: [
    {
      id: 'cadru-01',
      title: 'Deschidere simetrică în albastru electric și alb',
      category: 'artificii-exterior',
      categoryLabel: 'Spectacol Exterior',
      aspect: 'landscape',
      mediaType: 'photo',
      caption: 'Salve de înălțime deasupra locației de eveniment (cadrul va fi înlocuit cu fotografia originală din arhiva WhatsApp).',
      alt: 'Reprezentare demonstrativă a unui spectacol de artificii pe cerul nopții în nuanțe de albastru și cyan',
      palette: ['#071426', '#087CFF', '#39D9FF'],
      isPlaceholder: true,
    },
    {
      id: 'cadru-02',
      title: 'Dezvăluire Gender Reveal în nuanțe de roz magenta și cyan',
      category: 'gender-reveal',
      categoryLabel: 'Gender Reveal',
      aspect: 'vertical',
      mediaType: 'video',
      caption: 'Format vertical 9:16 specific filmărilor de eveniment primite pe WhatsApp.',
      alt: 'Reprezentare demonstrativă pentru momentul Gender Reveal cu efecte cromatice roz și albastre',
      palette: ['#071426', '#EC42D7', '#39D9FF'],
      isPlaceholder: true,
    },
    {
      id: 'cadru-03',
      title: 'Fântâni de scântei reci sincronizate pentru momentul serii',
      category: 'scantei-reci',
      categoryLabel: 'Scântei Reci',
      aspect: 'portrait',
      mediaType: 'photo',
      caption: 'Efect luminos de proximitate pentru dansul mirilor sau prezentarea tortului.',
      alt: 'Reprezentare demonstrativă a fântânilor de scântei reci în timpul unui eveniment',
      palette: ['#0C1E36', '#39D9FF', '#F5FAFF'],
      isPlaceholder: true,
    },
    {
      id: 'cadru-04',
      title: 'Final de spectacol pirotehnic cu coroană luminoasă',
      category: 'artificii-exterior',
      categoryLabel: 'Spectacol Exterior',
      aspect: 'landscape',
      mediaType: 'video',
      caption: 'Secvență video de ansamblu cu deschidere largă și reflexii pe cerul nopții.',
      alt: 'Reprezentare demonstrativă a finalului unui spectacol de artificii cu accente albastre și roșii',
      palette: ['#071426', '#087CFF', '#FF405B'],
      isPlaceholder: true,
    },
    {
      id: 'cadru-05',
      title: 'Fum colorat dens pentru Gender Reveal în aer liber',
      category: 'gender-reveal',
      categoryLabel: 'Gender Reveal',
      aspect: 'portrait',
      mediaType: 'photo',
      caption: 'Contrast cromatic puternic pentru fotografiile de zi în grădină.',
      alt: 'Reprezentare demonstrativă a efectului de fum colorat pentru petrecere Gender Reveal',
      palette: ['#0C1E36', '#EC42D7', '#F5FAFF'],
      isPlaceholder: true,
    },
  ] satisfies GalleryItem[],
  processSteps: [
    {
      stepNumber: '01',
      title: 'Consultare și alegerea efectelor potrivite',
      description:
        'Stabilim împreună tipul evenimentului (nuntă, Gender Reveal, botez sau petrecere privată), intervalul orar și efectele care se potrivesc cel mai bine spațiului și bugetului.',
      technicalNote: 'Recomandare bazată pe specificul locației: interior, grădină sau spațiu deschis.',
    },
    {
      stepNumber: '02',
      title: 'Evaluarea terenului și a perimetrului de siguranță',
      description:
        'Verificăm zona de amplasare, distanța față de invitați, clădiri și vegetație, precum și condițiile tehnice necesare pentru o lansare curată și sigură.',
      technicalNote: 'Respectarea strictă a distanțelor de siguranță și a normelor în vigoare.',
    },
    {
      stepNumber: '03',
      title: 'Montaj la locație și sincronizare cu momentul cheie',
      description:
        'Echipa ajunge din timp pentru instalarea și verificarea echipamentelor, coordonându-se cu fotograful, videograful și organizatorul evenimentului.',
      technicalNote: 'Declanșare la secundă, exact când toți invitații și camerele sunt pregătite.',
    },
    {
      stepNumber: '04',
      title: 'Operare asistată și eliberarea zonei după eveniment',
      description:
        'După încheierea spectacolului, verificăm toate echipamentele utilizate și lăsăm perimetrul de lansare curat și sigur.',
      technicalNote: 'Fără griji logistice pentru organizatori sau pentru gazdele locației.',
    },
  ] satisfies ProcessStep[],
};
