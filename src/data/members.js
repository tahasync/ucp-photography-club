/**
 * UCP Photography Club — 2026–27
 * Member records (single source of truth for every person and QR destination).
 *
 * Portraits, introductions and public links are stored directly on each record.
 * Keep every slug and path stable once its QR code has been printed.
 *
 * The `slug` IS the QR URL. Never rename a slug after cards are printed.
 */

/** Composite key used by the department pages. */
const key = (departmentSlug, positionSlug) =>
  `${departmentSlug}/${positionSlug}`;

export const members = {
  /* ---------------------------------------------------------------- *
   * President Body
   * ---------------------------------------------------------------- */
  president: {
    slug: 'president',
    path: '/president',
    name: 'Tayyab Iftikhar',
    position: 'President',
    positionLines: ['President'],
    body: 'President Body',
    group: 'present-body',
    departmentSlug: null,
    order: 1,
    image: '/images/members/president.jpg',
    imageWebp: '/images/members/president.webp',
    imagePlaceholder: false,
    bio: 'Some journeys are not built overnight. They are built through consistency, challenges, long hours, and responsibilities that shape you into someone capable of leading others.\n\nFrom starting as a General Member to stepping into Operations and now serving as President, every role has taught me lessons beyond photography: how to lead people, build systems, make decisions, and turn a vision into reality.\n\nHaving worked across hundreds of society events and experienced their scale and intensity, I have come to understand that a great team is not defined by individual talent alone, but by how effectively each person works towards a shared purpose.\n\nAs President, my vision goes beyond managing a team or achieving targets. It is about building a stronger foundation, creating opportunities for people to grow, setting higher standards, and developing a culture where excellence becomes the norm, not the exception.\n\nThe goal is not just to lead the year. It is to set a standard that lasts beyond it.\n\nThis is more than a position. It is a responsibility to build, to elevate, and to leave a legacy worth carrying forward.',
    bioIsPlaceholder: false,
    role: '',
    links: {
      instagram: 'https://www.instagram.com/vision_by_teebs2.0/',
      linkedin: 'https://www.linkedin.com/in/muhammad-tayyab-iftikhar-a7ba78397/',
      github: 'https://github.com/TayyabIftikhar7722'
    }
  },

  'vice-president': {
    slug: 'vice-president',
    path: '/vice-president',
    name: 'Taha Naeem',
    position: 'Vice President',
    positionLines: ['Vice', 'President'],
    body: 'President Body',
    group: 'present-body',
    departmentSlug: null,
    order: 2,
    image: '/images/members/vice-president.jpg',
    imageWebp: '/images/members/vice-president.webp',
    imagePlaceholder: false,
    bio: 'I am Taha Naeem, Vice President, and I help guide the club’s overall strategy alongside the President. After three years of dedicated service, I bring experience from my previous role as Director of Editing, where I managed editing for major events. I now focus on coordinating the club’s broader operations and helping directors carry out their plans. I am committed to building a resilient, high-performing leadership team and supporting the club’s growth this year.',
    bioIsPlaceholder: false,
    role: '',
    links: {
      instagram: 'https://www.instagram.com/heyitxtaha',
      linkedin: 'https://www.linkedin.com/in/heyitxtaha',
      github: 'https://github.com/tahasync',
      portfolio: '',
      email: ''
    }
  },

  /* ---------------------------------------------------------------- *
   * 01 / Operations
   * ---------------------------------------------------------------- */
  [key('operations', 'director')]: {
    slug: key('operations', 'director'),
    path: '/operations/director',
    name: 'Abdul Rahman',
    position: 'Director',
    positionLines: ['Director'],
    body: 'Operations',
    group: 'hierarchy',
    departmentSlug: 'operations',
    order: 1,
    image: '/images/members/director-operations.jpg',
    imageWebp: '/images/members/director-operations.webp',
    imagePlaceholder: false,
    bio: 'Hello, I am Abdul Rahman, the Director of Operations. As a recipient of a talent-based photography scholarship, I bring a sharp, detail-oriented perspective to our logistics. I oversee the club’s logistics, from event planning to resource management, and work to keep internal processes running smoothly. I aim to ensure every team has the resources it needs. With clear systems and strong teamwork, I hope we can take the club’s work to the next level.',
    bioIsPlaceholder: false,
    role: '',
    links: {
      instagram: 'https://www.instagram.com/Shootsbyrehman/',
      linkedin: 'https://www.linkedin.com/in/rehhmann'
    }
  },

  [key('operations', 'deputy-director')]: {
    slug: key('operations', 'deputy-director'),
    path: '/operations/deputy-director',
    name: 'Farhan Mansoor',
    position: 'Deputy Director',
    positionLines: ['Deputy', 'Director'],
    body: 'Operations',
    group: 'hierarchy',
    departmentSlug: 'operations',
    order: 2,
    image: '/images/members/deputy-director-operations.jpg',
    imageWebp: '/images/members/deputy-director-operations.webp',
    imagePlaceholder: false,

    bio: 'Hi everyone, I am Farhan Mansoor, the Deputy Director of Operations. My journey began as a general member, which gave me a grounded perspective as I stepped into this leadership role. I support the Director by helping keep our internal processes efficient, coordinated, and well executed. My focus is to bridge strategic planning and on-the-ground event work. I’m excited to serve the team and help solve the logistical challenges we encounter.',
    bioIsPlaceholder: false,
    role: '',
    links: {
      instagram: 'https://www.instagram.com/_whoisfarhan_/',
      linkedin: 'https://www.linkedin.com/in/farhan-mansoor-7b46a7362?utm_source=share_via&utm_content=profile&utm_medium=member_android'
    }
  },

  [key('operations', 'assistant-director')]: {
    slug: key('operations', 'assistant-director'),
    path: '/operations/assistant-director',
    name: 'Muqadas M. Ismail',
    position: 'Assistant Director',
    positionLines: ['Assistant', 'Director'],
    body: 'Operations',
    group: 'hierarchy',
    departmentSlug: 'operations',
    order: 3,
    image: '/images/members/assistant-director-operations.jpg',
    imageWebp: '/images/members/assistant-director-operations.webp',
    imagePlaceholder: false,

    bio: 'Hi, I’m Muqadas M. Ismail, the Assistant Director of Operations. Having started as a general member, I’m excited to take on hands-on logistics and event-day support. I work closely with the Operations leadership to keep details on track and help events run smoothly. I look forward to learning and growing with the team and contributing to each event’s success.',
    bioIsPlaceholder: false,
    role: '',
    links: {
      instagram: 'https://www.instagram.com/muqadas3633/'
    }
  },

  /* ---------------------------------------------------------------- *
   * 02 / Editing
   * ---------------------------------------------------------------- */
  [key('editing', 'director')]: {
    slug: key('editing', 'director'),
    path: '/editing/director',
    name: 'Mateen Kashif',
    position: 'Director',
    positionLines: ['Director'],
    body: 'Editing',
    group: 'hierarchy',
    departmentSlug: 'editing',
    order: 1,
    image: '/images/members/director-editing.jpg',
    imageWebp: '/images/members/director-editing.webp',
    imagePlaceholder: false,
    bio: 'Hello, I am Mateen Kashif, the Director of Editing. I began my journey as an Assistant in Editing and worked my way up to the Director role. I help set the creative standard and guide the written content we produce. My responsibility is to keep our messaging clear, impactful, and accurate. I’m excited to strengthen our writing and help members communicate their ideas effectively.',
    bioIsPlaceholder: false,
    role: '',
    links: {
      instagram: 'https://www.instagram.com/mateenkashif0508/',
      linkedin: 'https://www.linkedin.com/in/mateen-kashif-962874282'
    }
  },

  [key('editing', 'assistant-director')]: {
    slug: key('editing', 'assistant-director'),
    path: '/editing/assistant-director',
    name: 'Daniyal Dar',
    position: 'Assistant Director',
    positionLines: ['Assistant', 'Director'],
    body: 'Editing',
    group: 'hierarchy',
    departmentSlug: 'editing',
    order: 3,
    image: '/images/members/assistant-director-editing.jpg',
    imageWebp: '/images/members/assistant-director-editing.webp',
    imagePlaceholder: false,
    bio: 'Hi, I’m Daniyal Dar, the Assistant Director of Editing. After starting as a general member, I now handle initial proofreading and help move drafts through revision. I check that basic formatting guidelines are met before passing documents to senior editors. I’m excited to learn from my peers and contribute as a reliable extra set of eyes, helping keep the club’s written communications polished.',
    bioIsPlaceholder: false,
    role: '',
    links: {
      instagram: 'https://www.instagram.com/Daniyaldar777/',
      linkedin: 'https://www.linkedin.com/in/daniyaldar?utm_source=share_via&utm_content=profile&utm_medium=member_ios'
    }
  },

  [key('editing', 'deputy-director')]: {
    slug: key('editing', 'deputy-director'),
    path: '/editing/deputy-director',
    name: 'Zohaib Faisal',
    position: 'Deputy Director',
    positionLines: ['Deputy', 'Director'],
    body: 'Editing',
    group: 'hierarchy',
    departmentSlug: 'editing',
    order: 2,
    image: '/images/members/deputy-director-editing.jpg',
    imageWebp: '/images/members/deputy-director-editing.webp',
    imagePlaceholder: false,
    bio: 'Hi, I am Zohaib Faisal, the Deputy Director of Editing. My path from general member to the Editing team has taught me the value of precision and hard work. I work with our editors to refine content, revise drafts, and maintain our quality standards. I also help manage the editing timeline so each piece is polished before publication. I’m eager to collaborate with the team and produce strong written work this year.',
    bioIsPlaceholder: false,
    role: '',
    links: {
      instagram: 'https://www.instagram.com/zoh_aib_9000/',
      linkedin: 'https://www.linkedin.com/in/zohaib-faisal-12b559229?utm_source=share_via&utm_content=profile&utm_medium=member_android'
    }
  },

  /* ---------------------------------------------------------------- *
   * 03 / Comms
   * ---------------------------------------------------------------- */
  [key('comms', 'director-publications')]: {
    slug: key('comms', 'director-publications'),
    path: '/comms/director-publications',
    name: 'Eshaal Faisal',
    position: 'Director Publications',
    positionLines: ['Director', 'Publications'],
    body: 'Comms',
    group: 'hierarchy',
    departmentSlug: 'comms',
    order: 1,
    image: '/images/members/director-publications-comms.jpg',
    imageWebp: '/images/members/director-publications-comms.webp',
    imagePlaceholder: false,
    bio: 'Hello, I am Eshaal Faisal, the Director of Publications. I have served the society for two years, progressing from a deputy role in Publications to my current role. I oversee the creation of our print and digital publications and help shape the club’s voice. I’m excited to showcase our members’ work and create publications that set a high standard and leave a lasting impression.',
    bioIsPlaceholder: false,
    role: '',
    links: {
      instagram: 'https://www.instagram.com/eshaal.faisal_/',
      linkedin: 'https://www.linkedin.com/in/eshaal-faisal-928045329'
    }
  },

  [key('comms', 'deputy-director-publications')]: {
    slug: key('comms', 'deputy-director-publications'),
    path: '/comms/deputy-director-publications',
    name: 'Manahil Shafique',
    position: 'Deputy Director Publications',
    positionLines: ['Deputy Director', 'Publications'],
    body: 'Comms',
    group: 'hierarchy',
    departmentSlug: 'comms',
    order: 2,
    image: '/images/members/deputy-director-publications-comms.jpg',
    imageWebp: '/images/members/deputy-director-publications-comms.webp',
    imagePlaceholder: false,
    bio: 'Hello, I am Manahil Shafique, the Deputy Director of Publications. Since starting as a general member, I have grown into this role and taken on the hands-on work of bringing concepts to completion. I coordinate writing, design, and editing to shape cohesive publications. I look forward to helping the team deliver thoughtful work and bring ambitious publication ideas to life this year.',
    bioIsPlaceholder: false,
    role: '',
    links: {
      instagram: 'https://instagram.com/unbound.x9?cplk=cXRjMnNyeHIzdnk%3D'
    }
  },

  [key('comms', 'director-communications')]: {
    slug: key('comms', 'director-communications'),
    path: '/comms/director-communications',
    name: 'Anamta Jahangir',
    position: 'Director Communications',
    positionLines: ['Director', 'Communications'],
    body: 'Comms',
    group: 'hierarchy',
    departmentSlug: 'comms',
    order: 3,
    image: '/images/members/director-communications-comms.jpg',
    imageWebp: '/images/members/director-communications-comms.webp',
    imagePlaceholder: false,
    bio: 'Hi everyone, I am Anamta Jahangir, the Director of Communications. I have served in this role for the past year and a half, bringing continuity to the position. I coordinate communication between the club, external partners, the media, and our wider audience. My focus is on clarity, transparency, and building lasting relationships that can create opportunities for our members.',
    bioIsPlaceholder: false,
    role: '',
    links: {
      instagram: 'https://www.instagram.com/anamtajahangiralam/'
    }
  },

  /* ---------------------------------------------------------------- *
   * 04 / Social Media
   * ---------------------------------------------------------------- */
  [key('social-media', 'director')]: {
    slug: key('social-media', 'director'),
    path: '/social-media/director',
    name: 'Syed M. Talha',
    position: 'Director',
    positionLines: ['Director'],
    body: 'Social Media',
    group: 'hierarchy',
    departmentSlug: 'social-media',
    order: 1,
    image: '/images/members/director-social-media.jpg',
    imageWebp: '/images/members/director-social-media.webp',
    imagePlaceholder: false,
    bio: 'Hello everyone, I’m Syed M. Talha, the Director of Social Media. After two years with the society, I have progressed from a deputy role in Social Media to this position. I work to build the club’s voice and community through engaging digital content. I hope our team will reach and engage more people this year, and I’m ready to bring fresh ideas to the club’s digital channels.',
    bioIsPlaceholder: false,
    role: '',
    links: {
      instagram: 'https://www.instagram.com/syedtalha_009/'
    }
  },

  [key('social-media', 'deputy-director')]: {
    slug: key('social-media', 'deputy-director'),
    path: '/social-media/deputy-director',
    name: 'Manal Chaudhry',
    position: 'Deputy Director',
    positionLines: ['Deputy', 'Director'],
    body: 'Social Media',
    group: 'hierarchy',
    departmentSlug: 'social-media',
    order: 2,
    image: '/images/members/deputy-director-social-media.jpg',
    imageWebp: '/images/members/deputy-director-social-media.webp',
    imagePlaceholder: false,
    bio: 'Hi, I’m Manal Chaudhry, the Deputy Director of Social Media. After starting as a general member, I’m excited to help shape our strategy and manage the content calendar. I track analytics, plan schedules, and help maintain a consistent visual style across our platforms. I connect creative ideas with timely execution and look forward to growing our digital reach and engaging our audience.',
    bioIsPlaceholder: false,
    role: '',
    links: {
      instagram: 'https://www.instagram.com/manalchaudharyyy/',
      linkedin: 'https://www.linkedin.com/in/manal-chaudhry-3798b4222?utm_source=share_via&utm_content=profile&utm_medium=member_ios'
    }
  },

  /* ---------------------------------------------------------------- *
   * 05 / Creatives
   * ---------------------------------------------------------------- */
  [key('creatives', 'director-graphics')]: {
    slug: key('creatives', 'director-graphics'),
    path: '/creatives/director-graphics',
    name: 'Hadia Ammar',
    position: 'Director Graphics',
    positionLines: ['Director', 'Graphics'],
    body: 'Creatives',
    group: 'hierarchy',
    departmentSlug: 'creatives',
    order: 1,
    image: '/images/members/director-graphics-creatives.jpg',
    imageWebp: '/images/members/director-graphics-creatives.webp',
    imagePlaceholder: false,
    bio: 'Hi, I am Hadia Ammar, the Director of Graphics. I have been a member of the club for three years and now lead the Graphics team. I help shape the club’s visual identity by turning concepts into digital designs. I hope our work reflects the club’s passion and gives each project a fresh, professional look.',
    bioIsPlaceholder: false,
    role: '',
    links: {
      instagram: 'https://www.instagram.com/_hadiaammar/',
      linkedin: 'https://www.linkedin.com/in/hadia-ammar/'
    }
  },

  [key('creatives', 'director-art-craft')]: {
    slug: key('creatives', 'director-art-craft'),
    path: '/creatives/director-art-craft',
    name: 'Farmeen Aejaz Chughtaie',
    position: 'Director Arts & Crafts',
    positionLines: ['Director', 'Arts & Crafts'],
    body: 'Creatives',
    group: 'hierarchy',
    departmentSlug: 'creatives',
    order: 2,
    image: '/images/members/director-arts-crafts-creatives.jpg',
    imageWebp: '/images/members/director-arts-crafts-creatives.webp',
    imagePlaceholder: false,
    bio: 'Hi, I am Farmeen Aejaz Chughtaie, the Director of Arts & Crafts. My journey from general member to Director has strengthened my interest in the club’s hands-on creative work. I lead projects that bring color and creativity to our branding and in-person events. I hope our work inspires others and adds a personal touch to what we do. I look forward to creating memorable experiences for our members and guests.',
    bioIsPlaceholder: false,
    role: '',
    links: {
      linkedin: 'https://www.linkedin.com/in/farmeen-chughtai-7a0a1a440?utm_source=share_via&utm_content=profile&utm_medium=member_android'
    }
  },

  /* ---------------------------------------------------------------- *
   * Patrons Body — official names and introductions supplied by the club.
   * ---------------------------------------------------------------- */
  'patrons/patron': {
    slug: 'patrons/patron',
    path: '/patrons/patron',
    name: 'Mr Haider Miraj',
    position: 'Patron',
    positionLines: ['Patron'],
    body: 'Patrons Body',
    group: 'patrons',
    departmentSlug: null,
    order: 1,
    image: '/images/members/patron.jpg',
    imageWebp: '/images/members/patron.webp',
    imagePlaceholder: false,
    bio: 'Mr Haider Miraj is the Patron of the UCP Photography Club and the Director of Communications at the University of Central Punjab. His guidance supports the club’s vision, strengthens its initiatives, and promotes creativity and excellence in visual storytelling.',
    bioIsPlaceholder: false,
    role: '',
    links: {
      instagram: 'https://www.instagram.com/haidermiraj/'
    }
  },

  'patrons/co-patron': {
    slug: 'patrons/co-patron',
    path: '/patrons/co-patron',
    name: 'Mr Abdul Hannan',
    position: 'Co-Patron',
    positionLines: ['Co-Patron'],
    body: 'Patrons Body',
    group: 'patrons',
    departmentSlug: null,
    order: 2,
    image: '/images/members/co-patron.jpg',
    imageWebp: '/images/members/co-patron.webp',
    imagePlaceholder: false,
    bio: 'Mr Abdul Hannan is the Co-Patron of the UCP Photography Club and provides guidance and support to its leadership and members. His contribution supports the club’s continued growth and a collaborative environment that values creativity, professionalism, and photography.',
    bioIsPlaceholder: false,
    role: '',
    links: {
      instagram: 'https://www.instagram.com/abdul_hannan56/'
    }
  }

};

/* -------------------------------------------------------------------------- *
 * Derived helpers — pages import these instead of filtering data themselves.
 * -------------------------------------------------------------------------- */

/** Normalises a slug or a URL path so lookups never depend on leading slashes. */
export const normalizeSlug = (value) =>
  String(value || '')
    .replace(/^\/+|\/+$/g, '')
    .replace(/\/{2,}/g, '/')
    .toLowerCase();

export const memberList = Object.values(members);

const byOrder = (a, b) => a.order - b.order;

/** Look up a member by slug ("vice-president") or by path ("/vice-president"). */
export const getMember = (slugOrPath) => members[normalizeSlug(slugOrPath)] || null;

/** One hierarchy team, in position order. */
export const membersByDepartment = (departmentSlug) =>
  memberList
    .filter((member) => member.departmentSlug === departmentSlug)
    .sort(byOrder);

export const presentBodyMembers = memberList
  .filter((member) => member.group === 'present-body')
  .sort(byOrder);

export const patronMembers = memberList
  .filter((member) => member.group === 'patrons')
  .sort(byOrder);

export const hierarchyMembers = memberList.filter(
  (member) => member.group === 'hierarchy'
);

/** The other people in the same body/team — powers the "also in ..." block. */
export const relatedMembers = (member) => {
  if (!member) return [];
  if (member.group === 'present-body') {
    return presentBodyMembers.filter((other) => other.slug !== member.slug);
  }
  if (member.group === 'patrons') {
    return patronMembers.filter((other) => other.slug !== member.slug);
  }
  return membersByDepartment(member.departmentSlug).filter(
    (other) => other.slug !== member.slug
  );
};

/** Route table for App.jsx — every person receives a stable QR destination. */
export const memberRoutes = memberList.map((member) => member.slug);

