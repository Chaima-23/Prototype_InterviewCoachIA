// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import {
  Bot, FileText, Briefcase, Sparkles, Mic, MicOff, Send, SkipForward,
  CheckCircle2, AlertCircle, TrendingUp, Award, Clock, ChevronRight,
  ChevronLeft, Upload, Play, Download, User, Settings, CreditCard,
  BarChart3, LayoutDashboard, PlusCircle, History, Building2, Globe,
  LogOut, Menu, X, ShieldCheck, Zap, Leaf, Star, ArrowRight, RefreshCw,
  Check, Target, BookOpen, MessageSquare, Volume2, Eye, Filter, Search,
  GraduationCap, Users, Layers, HelpCircle, Lock, Mail
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, Cell
} from 'recharts';

// ============================================================================
// TRANSLATIONS & MULTILINGUAL DICTIONARY (FR / EN / AR)
// ============================================================================
const TRANSLATIONS = {
  fr: {
    dir: 'ltr',
    langName: 'Français',
    slogan: 'Votre prochain entretien commence ici.',
    subtitle: 'Entraînez-vous 24h/24 avec un recruteur virtuel intelligent qui analyse votre CV, s’adapte à vos réponses et booste vos chances de décrocher le poste.',
    ctaStart: 'Commencer gratuitement',
    ctaDiscover: 'Découvrir la plateforme',
    ctaJuryDemo: 'Accès Démo Jury (1 clic)',
    navHome: 'Accueil',
    navFeatures: 'Fonctionnalités',
    navPricing: 'Tarifs',
    navB2B: 'Espace Université B2B',
    navLogin: 'Connexion',
    welcome: 'Bonjour',
    newSim: 'Nouvelle simulation',
    overview: 'Vue générale',
    mySims: 'Mes simulations',
    myReports: 'Mes rapports',
    profile: 'Mon profil',
    subscription: 'Abonnement',
    settings: 'Paramètres',
    b2bSpace: 'Espace Établissement',
    logout: 'Déconnexion'
  },
  en: {
    dir: 'ltr',
    langName: 'English',
    slogan: 'Your next job interview starts here.',
    subtitle: 'Practice 24/7 with an intelligent virtual recruiter that analyzes your resume, adapts to your answers, and boosts your hiring potential.',
    ctaStart: 'Start for free',
    ctaDiscover: 'Explore platform',
    ctaJuryDemo: '1-Click Jury Demo',
    navHome: 'Home',
    navFeatures: 'Features',
    navPricing: 'Pricing',
    navB2B: 'University B2B',
    navLogin: 'Sign In',
    welcome: 'Hello',
    newSim: 'New Simulation',
    overview: 'Overview',
    mySims: 'My Simulations',
    myReports: 'My Reports',
    profile: 'My Profile',
    subscription: 'Subscription',
    settings: 'Settings',
    b2bSpace: 'Institution Space',
    logout: 'Sign Out'
  },
  ar: {
    dir: 'rtl',
    langName: 'العربية',
    slogan: 'مقابلة عملك القادمة تبدأ من هنا.',
    subtitle: 'تدرّب على مدار الساعة مع مُوظِّف افتراضي ذكي يحلل سيرتك الذاتية، ويتكيف مع إجاباتك، ويعزز فرصك في الحصول على الوظيفة.',
    ctaStart: 'ابدأ مجاناً',
    ctaDiscover: 'اكتشف المنصة',
    ctaJuryDemo: 'دخول تجريبي سريع',
    navHome: 'الرئيسية',
    navFeatures: 'المميزات',
    navPricing: 'الأسعار',
    navB2B: 'فضاء الجامعات',
    navLogin: 'تسجيل الدخول',
    welcome: 'مرحباً',
    newSim: 'محاكاة جديدة',
    overview: 'نظرة عامة',
    mySims: 'محاكاتي',
    myReports: 'تقاريري',
    profile: 'ملفي الشخصي',
    subscription: 'الاشتراك',
    settings: 'الإعدادات',
    b2bSpace: 'فضاء المؤسسات',
    logout: 'تسجيل الخروج'
  }
};

// ============================================================================
// INITIAL DEMO DATA (SEEDED FOR REALISTIC JURY PRESENTATION)
// ============================================================================
const INITIAL_USER = {
  id: 'usr_chaima_01',
  name: 'Chaima Zidi',
  email: 'chaima.zidi@iit-sfax.tn',
  role: 'Ingénieure Génie Logiciel & IA (Jeune Diplômée)',
  university: 'Institut International de Technologie (IIT)',
  location: 'Sfax, Tunisie',
  plan: 'Freemium',
  avatarInitials: 'CZ',
  cvUploaded: 'CV_Chaima_Zidi_FullStack_2026.pdf',
  targetJob: 'Développeur Full-Stack React / Node.js & IA'
};

const INITIAL_SIMULATIONS = [
  {
    id: 'sim_101',
    date: '2026-11-10',
    jobTitle: 'Développeur Frontend React',
    company: 'Vermeg Tunisie',
    type: 'Technique',
    difficulty: 'Débutant',
    language: 'Français',
    mode: 'Texte',
    duration: 15,
    overallScore: 68,
    metrics: {
      quality: 70,
      technical: 72,
      clarity: 66,
      star: 58,
      fillerWordsCount: 6
    },
    strengths: [
      'Bonne maîtrise des concepts fondamentaux de React (Hooks, State).',
      'Attitude positive et motivée.'
    ],
    improvements: [
      'Structurer davantage les exemples avec la méthode STAR (Situation, Tâche, Action, Résultat).',
      'Quantifier les impacts techniques de vos projets académiques.'
    ],
    recommendations: [
      'Préparer 2 cas concrets d’optimisation de performance web avec chiffres à l’appui.',
      'Réduire l’usage de "du coup" et "en fait".'
    ],
    qaList: [
      {
        question: 'Pouvez-vous me présenter votre parcours et votre projet de fin d’études ?',
        answer: 'Je suis diplômée de l’IIT en génie logiciel. En fait, j’ai développé une plateforme web en React et Node.js pour la gestion intelligente des ressources.',
        aiReaction: 'Très bon début ! Pour un recruteur, précisez dès l’introduction l’impact mesurable de votre projet.',
        suggestedAnswer: 'Diplômée en génie logiciel à l’IIT, j’ai conçu une plateforme React/Node.js qui a réduit de 35% le temps de traitement administratif lors de mon PFE.'
      },
      {
        question: 'Comment gérez-vous l’état global dans une application React complexe ?',
        answer: 'J’utilise Context API pour les petits projets et Redux Toolkit ou Zustand quand il y a beaucoup de données partagées.',
        aiReaction: 'Pertinent. N’hésitez pas à expliquer le critère de choix entre les deux.',
        suggestedAnswer: 'Je privilégie React Context pour les états légers (thème, authentification) et Zustand ou Redux Toolkit pour les flux asynchrones complexes afin d’éviter les re-rendus inutiles.'
      }
    ]
  },
  {
    id: 'sim_102',
    date: '2026-11-15',
    jobTitle: 'Ingénieur Logiciel Junior',
    company: 'Telnet Holding',
    type: 'RH',
    difficulty: 'Intermédiaire',
    language: 'Français',
    mode: 'Vocal',
    duration: 20,
    overallScore: 75,
    metrics: {
      quality: 76,
      technical: 74,
      clarity: 78,
      star: 70,
      fillerWordsCount: 4
    },
    strengths: [
      'Discours fluide et posture professionnelle.',
      'Bonne articulation entre compétences techniques et travail en équipe.'
    ],
    improvements: [
      'Approfondir la gestion des conflits ou imprévus en projet Agile.',
      'Conclure chaque réponse comportementale par les leçons apprises.'
    ],
    recommendations: [
      'Travailler le pitch de 90 secondes sur vos motivations pour l’entreprise.',
      'Utiliser des verbes d’action précis ("J’ai conçu", "J’ai déployé").'
    ],
    qaList: [
      {
        question: 'Parlez-moi d’une situation où vous avez dû respecter un délai très serré en équipe.',
        answer: 'Lors de notre hackathon universitaire, nous avions 48h pour livrer un prototype IA. J’ai réparti les tâches sur Trello et nous avons livré à temps avec la 2ème place.',
        aiReaction: 'Excellente application de la structure STAR avec un résultat concret !',
        suggestedAnswer: 'Lors d’un hackathon de 48h (Situation), je devais coordonner 4 développeurs pour livrer un MVP fonctionnel (Tâche). J’ai mis en place des points Agile toutes les 6h et priorisé les fonctionnalités clés (Action), ce qui nous a permis de remporter le 2e prix (Résultat).'
      }
    ]
  },
  {
    id: 'sim_103',
    date: '2026-11-20',
    jobTitle: 'Développeur Full-Stack JS / Python',
    company: 'Instadeep Partner Lab',
    type: 'Technique',
    difficulty: 'Intermédiaire',
    language: 'Français',
    mode: 'Texte',
    duration: 20,
    overallScore: 81,
    metrics: {
      quality: 82,
      technical: 84,
      clarity: 80,
      star: 77,
      fillerWordsCount: 2
    },
    strengths: [
      'Excellente maîtrise de l’architecture API REST et des bases de données.',
      'Net progrès sur la clarté et la concision des réponses.'
    ],
    improvements: [
      'Aborder spontanément les aspects sécurité (JWT, validation, OWASP) et tests automatisés.'
    ],
    recommendations: [
      'Passer au niveau Avancé pour simuler des questions de System Design et scalabilité.'
    ],
    qaList: [
      {
        question: 'Comment sécurisez-vous une API REST destinée à une application SaaS ?',
        answer: 'J’utilise des tokens JWT avec refresh token, le hachage bcrypt pour les mots de passe, la validation des entrées et HTTPS avec CORS configuré.',
        aiReaction: 'Réponse solide et complète sur les fondamentaux de sécurité.',
        suggestedAnswer: 'J’implémente une authentification stateless via JWT courte durée + Refresh Token en cookie HttpOnly, le contrôle d’accès par rôles (RBAC), la validation stricte des schémas (Zod/Pydantic) et le rate-limiting.'
      }
    ]
  }
];

const DEFAULT_OBJECTIVES = [
  { id: 'obj_1', text: 'Compléter 3 simulations techniques Full-Stack cette semaine', done: true },
  { id: 'obj_2', text: 'Atteindre un score STAR supérieur à 80/100', done: false },
  { id: 'obj_3', text: 'Réaliser une simulation en mode vocal en Anglais', done: false },
  { id: 'obj_4', text: 'Optimiser la compatibilité CV / Offre au-dessus de 85%', done: true }
];

const SAMPLE_JOB_OFFER = `Poste : Développeur Full-Stack React / Node.js & Intégration IA
Entreprise : TechNova Digital Tunis
Type : CDI / Premier emploi (Jeune diplômé accepté)

Missions principales :
- Concevoir et développer des interfaces web modernes et réactives avec React, TypeScript et Tailwind CSS.
- Développer des API REST performantes sous Node.js / Express ou Python FastAPI.
- Intégrer des services d'intelligence artificielle (LLM, analyse sémantique) et optimiser les temps de réponse.
- Collaborer en méthodologie Agile Scrum, écrire des tests unitaires et participer aux revues de code.

Compétences requises :
- Diplôme d'ingénieur ou Master en informatique.
- Maîtrise de React, JavaScript/TypeScript, Node.js, SQL/PostgreSQL, Git.
- Connaissance appréciée de Docker, CI/CD et des architectures cloud.`;

const B2B_DATA = {
  institutionName: 'Institut International de Technologie (IIT) - Sfax',
  licenseCapacity: 500,
  enrolledStudents: 485,
  totalSimulations: 1420,
  averageScore: 74,
  progressionRate: '+19%',
  employabilityIndex: '87%',
  monthlyActivity: [
    { month: 'Sept', simulations: 180, avgScore: 64 },
    { month: 'Oct', simulations: 310, avgScore: 68 },
    { month: 'Nov', simulations: 460, avgScore: 72 },
    { month: 'Déc', simulations: 470, avgScore: 74 }
  ],
  weakSkillsRanking: [
    { skill: 'Structuration méthode STAR', gapPercentage: 64, studentsAffected: 310 },
    { skill: 'Architecture Cloud & DevOps', gapPercentage: 52, studentsAffected: 252 },
    { skill: 'Entretien technique en Anglais', gapPercentage: 47, studentsAffected: 228 },
    { skill: 'Négociation & Pitch salarial', gapPercentage: 41, studentsAffected: 198 },
    { skill: 'Optimisation SQL & Scalabilité', gapPercentage: 33, studentsAffected: 160 }
  ],
  departments: [
    { name: 'Génie Logiciel & Systèmes d’Info', students: 215, avgScore: 77, employability: '91%' },
    { name: 'Data Science & Intelligence Artificielle', students: 140, avgScore: 76, employability: '89%' },
    { name: 'Génie Industriel & Génie Civil', students: 130, avgScore: 69, employability: '81%' }
  ]
};

// ============================================================================
// CUSTOM SVG BRAND LOGO & ILLUSTRATIONS
// ============================================================================
const BrandLogo = ({ size = 'md', light = false }) => {
  const iconSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  return (
    <div className="flex items-center gap-2.5 select-none">
      <div className={`${iconSize} rounded-xl bg-gradient-to-br from-[#102A43] via-[#1769AA] to-[#35C6D8] flex items-center justify-center shadow-md shadow-[#1769AA]/20 relative overflow-hidden`}>
        <svg viewBox="0 0 36 36" className="w-6 h-6 text-white" fill="none">
          <path d="M18 4C10.268 4 4 9.82 4 17C4 20.55 5.54 23.76 8.04 26.08L6.5 31.5L12.35 29.32C14.12 29.76 16.02 30 18 30C25.732 30 32 24.18 32 17C32 9.82 25.732 4 18 4Z" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 17V14M18 20V11M23 18V13" stroke="#35C6D8" strokeWidth="2.6" strokeLinecap="round"/>
        </svg>
      </div>
      <span className={`${textSize} font-extrabold tracking-tight ${light ? 'text-white' : 'text-[#102A43]'}`}>
        Interview<span className="text-[#1769AA]">Coach</span><span className="text-[#35C6D8]">IA</span>
      </span>
    </div>
  );
};

// ============================================================================
// INTELLIGENT ADAPTIVE QUESTION & SCORING ENGINE
// ============================================================================
function generateTailoredQuestions(config, jobData) {
  const role = jobData?.title || 'Développeur Full-Stack React / Node.js';
  const company = jobData?.company || 'TechNova Digital';
  const type = config.type || 'Technique';
  const lang = config.language || 'Français';

  if (lang === 'English') {
    return [
      {
        id: 1,
        category: 'Introduction & Fit',
        text: `Hello! I am InterviewCoach IA. Welcome to this ${type} interview for the ${role} position at ${company}. Could you briefly introduce your background and explain what motivates you to join us?`,
        sampleHint: `I am a Software Engineering graduate from IIT with hands-on experience in React, Node.js, and AI integration. During my final year project, I built a scalable SaaS app that reduced manual workflows by 35%. I am excited about ${company}'s innovative stack.`
      },
      {
        id: 2,
        category: 'Core Expertise',
        text: `For the ${role} role, architectural choices are crucial. Can you describe a challenging technical problem you solved recently, detailing the context, your actions, and the measurable results?`,
        sampleHint: `In my capstone project (Situation), API latency spiked above 2.5s under load (Task). I implemented Redis caching, indexed PostgreSQL queries, and optimized React memoization (Action), cutting response time to 240ms (Result).`
      },
      {
        id: 3,
        category: 'Adaptability & Best Practices',
        text: `How do you ensure code quality, security, and maintainability when working in an Agile team with tight deadlines?`,
        sampleHint: `I rely on TypeScript strict typing, automated unit tests with Jest, Git pull request reviews, and OWASP security best practices such as JWT validation and input sanitization.`
      },
      {
        id: 4,
        category: 'Scenario & Collaboration',
        text: `Imagine a disagreement arises with a product manager or teammate regarding a technical trade-off. How do you handle it?`,
        sampleHint: `I listen objectively to their business constraints, prepare a concise comparison of pros, cons, and delivery impact for each option, and propose a data-driven compromise.`
      }
    ];
  }

  if (lang === 'العربية') {
    return [
      {
        id: 1,
        category: 'التقديم والملاءمة',
        text: `مرحباً بك في InterviewCoach IA. يسعدني إجراء هذه المقابلة لوظيفة ${role} في شركة ${company}. هل يمكنك تقديم نبذة عن مسارك الأكاديمي والمهني وما يحفزك للانضمام إلينا؟`,
        sampleHint: `أنا مهندسة برمجيات خريجة المعهد الدولي للتكنولوجيا (IIT)، لدي خبرة عملية في تطوير تطبيقات الويب الحديثة باستخدام React و Node.js ودمج حلول الذكاء الاصطناعي.`
      },
      {
        id: 2,
        category: 'الخبرة التقنية (STAR)',
        text: `حدثني عن تحدٍ تقني معقد واجهته في أحد مشاريعك. ما هو السياق، وما الخطوات التي اتخذتها، وما النتيجة المحققة؟`,
        sampleHint: `خلال مشروع التخرج، واجهنا بطئاً في استجابة قاعدة البيانات. قمت بتحسين الاستعلامات وإضافة نظام تخزين مؤقت، مما قلص وقت الاستجابة بنسبة 60%.`
      },
      {
        id: 3,
        category: 'جودة البرمجيات',
        text: `كيف تضمن جودة وأمان الكود البرمجي عند العمل ضمن فريق وفق منهجية Agile؟`,
        sampleHint: `أعتمد على كتابة الاختبارات الآلية، ومراجعة الكود عبر Git، وتطبيق معايير الأمان مثل التحقق من البيانات وحماية واجهات برمجة التطبيقات.`
      },
      {
        id: 4,
        category: 'العمل الجماعي',
        text: `كيف تتصرف إذا واجهت ضغطاً كبيراً لتسليم مشروع في وقت قصير؟`,
        sampleHint: `أقوم بتقسيم المهام حسب الأولوية، والتواصل بشفافية مع الفريق لتحديد الميزات الأساسية وتسليم نسخة مستقرة في الوقت المحدد.`
      }
    ];
  }

  // Default: Français (Tailored to Role & Interview Type)
  if (type === 'RH') {
    return [
      {
        id: 1,
        category: 'Présentation & Pitch',
        text: `Bonjour ! Je suis InterviewCoach IA, votre recruteur virtuel pour le poste de ${role} chez ${company}. Pouvez-vous vous présenter en 2 minutes et m’expliquer ce qui vous attire dans cette opportunité ?`,
        sampleHint: `Bonjour, je suis ingénieure diplômée de l'IIT en génie logiciel. Au cours de mes stages et de mon PFE, j'ai conçu des applications Full-Stack en React et Node.js. L'approche innovante de ${company} correspond exactement à mon souhait de contribuer à des produits à fort impact.`
      },
      {
        id: 2,
        category: 'Forces & Axes de progrès',
        text: `Quelles sont selon vous vos deux principales forces pour réussir en tant que ${role}, et quel est un axe sur lequel vous travaillez actuellement ?`,
        sampleHint: `Mes deux forces principales sont ma rigueur analytique et ma capacité d'apprentissage rapide sur les nouvelles stacks. Mon axe de progression concerne la prise de parole en public, que j'améliore activement grâce à des simulations régulières.`
      },
      {
        id: 3,
        category: 'Expérience STAR',
        text: `Racontez-moi une situation où vous avez dû faire face à un imprévu ou un désaccord au sein d’une équipe projet. Comment avez-vous réagi ?`,
        sampleHint: `Lors de mon PFE (Situation), un changement de spécification est survenu à deux semaines de la soutenance (Tâche). J'ai organisé une réunion de priorisation avec l'encadrant et découpé les tâches en sprints courts (Action), ce qui a permis de livrer 100% des fonctionnalités clés avec mention Très Bien (Résultat).`
      },
      {
        id: 4,
        category: 'Projection & Valeur ajoutée',
        text: `Où vous projetez-vous d’ici 2 à 3 ans et pourquoi devrions-nous retenir votre candidature plutôt qu’une autre ?`,
        sampleHint: `D'ici 3 ans, je souhaite évoluer vers un rôle de Lead Developer Full-Stack capable d'architecturer des solutions IA robustes. Ma double compétence développement web et intégration IA me rend immédiatement opérationnelle pour vos projets.`
      }
    ];
  }

  // Technique / Comportemental tailored to Full-Stack / Job Offer
  return [
    {
      id: 1,
      category: 'Introduction & Adéquation Poste',
      text: `Bonjour ! Bienvenue dans cet entretien ${type.toLowerCase()} pour le poste de ${role} chez ${company}. Pouvez-vous présenter votre parcours et les projets techniques dont vous êtes la plus fière ?`,
      sampleHint: `Bonjour ! Ingénieure en génie logiciel diplômée de l'IIT, je me suis spécialisée dans l'écosystème React, TypeScript et Node.js. Mon projet phare est une plateforme intelligente d'analyse de données ayant réduit de 40% le temps de traitement utilisateur.`
    },
    {
      id: 2,
      category: 'Architecture & Résolution de problème (STAR)',
      text: `Sur un poste de ${role}, la performance est clé. Décrivez-moi un défi technique concret que vous avez résolu (optimisation frontend, API lente ou base de données) en précisant le contexte, vos actions et les résultats chiffrés.`,
      sampleHint: `Sur mon projet Full-Stack (Situation), le chargement du tableau de bord prenait plus de 3 secondes (Tâche). J'ai mis en place la pagination côté serveur, l'indexation SQL et le lazy-loading des composants React (Action), faisant passer le temps de réponse à 280 ms (Résultat).`
    },
    {
      id: 3,
      category: 'Bonnes pratiques & Sécurité',
      text: `Comment structurez-vous vos API et comment garantissez-vous la sécurité et la maintenabilité du code dans un environnement Agile ?`,
      sampleHint: `J'applique une architecture modulaire (contrôleurs, services, repositories), le typage strict avec TypeScript, la validation des payloads, l'authentification JWT sécurisée ainsi que des tests unitaires automatisés avant chaque merge.`
    },
    {
      id: 4,
      category: 'Intégration IA & Veille',
      text: `Le poste chez ${company} implique l’intégration de fonctionnalités intelligentes. Comment gérez-vous la latence et la fiabilité des réponses d’un modèle IA dans une application web ?`,
      sampleHint: `J'utilise le streaming des réponses (SSE/WebSockets) pour améliorer la perception de vitesse, un système de cache sémantique pour les requêtes fréquentes, et des mécanismes de fallback avec validation JSON stricte.`
    }
  ];
}

function generateAdaptiveAIReaction(answerText, questionObj, lang = 'Français') {
  const clean = answerText.trim();
  const wordCount = clean.split(/\s+/).filter(Boolean).length;
  const hasNumbers = /\d+%|\d+\s*(ms|s|jours|semaines|mois|ans|utilisateurs|projets)/i.test(clean);
  const hasTechKeywords = /(react|node|api|sql|docker|git|jwt|agile|test|typescript|python|cache|architecture|star|résultat)/i.test(clean);

  if (lang === 'English') {
    if (wordCount < 15) {
      return 'Interesting start, though a bit brief. Could you give a concrete example with measurable results to strengthen your answer?';
    }
    if (!hasNumbers) {
      return 'Clear explanation! Adding a specific metric (e.g., latency reduction, percentage gained) would make this even more impactful for a recruiter.';
    }
    return 'Excellent structured response with concrete metrics! Let’s move on to the next dimension of your profile.';
  }

  if (lang === 'العربية') {
    if (wordCount < 12) {
      return 'إجابة جيدة كبداية، ولكنها مختصرة. هل يمكنك إعطاء مثال ملموس مع نتائج رقمية لتعزيز إجابتك؟';
    }
    return 'ممتاز! إجابة واضحة ومنظمة تعكس فهماً عميقاً. لننتقل إلى السؤال التالي.';
  }

  // Français
  if (wordCount < 16) {
    return 'Intéressant ! Votre réponse va à l’essentiel, mais un recruteur attendra plus de détails. Pouvez-vous donner un exemple concret ?';
  }
  if (hasTechKeywords && !hasNumbers) {
    return 'Très bonne maîtrise technique visible dans votre réponse ! Conseil : pensez à chiffrer l’impact obtenu (gain de temps, performance) pour maximiser votre score STAR.';
  }
  if (hasNumbers && hasTechKeywords) {
    return 'Excellente réponse structurée avec des indicateurs concrets ! C’est exactement le niveau de précision attendu en entretien.';
  }
  return 'Merci pour cette explication claire. Voyons maintenant comment vous abordez la suite de nos critères d’évaluation.';
}

function evaluateCompletedSimulation(qaHistory, config, jobData, elapsedSeconds) {
  const answered = qaHistory.filter((item) => !item.skipped && item.answer.trim().length > 0);
  const totalQuestions = qaHistory.length || 1;
  const completionRatio = answered.length / totalQuestions;

  let totalWords = 0;
  let metricsCount = 0;
  let starStructureCount = 0;
  let fillerCount = 0;

  const fillerRegex = /\b(euh|du coup|en fait|genre|bah|voilà|tu vois|like|basically|um)\b/gi;

  answered.forEach((item) => {
    const txt = item.answer;
    const words = txt.split(/\s+/).filter(Boolean).length;
    totalWords += words;
    if (/\d+%|\d+/.test(txt)) metricsCount += 1;
    if (words >= 22) starStructureCount += 1;
    const matches = txt.match(fillerRegex);
    if (matches) fillerCount += matches.length;
  });

  const avgWords = answered.length > 0 ? totalWords / answered.length : 0;
  const baseScore = Math.round(
    Math.min(
      96,
      Math.max(
        48,
        52 * completionRatio +
          Math.min(24, (avgWords / 35) * 24) +
          (metricsCount / Math.max(1, answered.length)) * 14 +
          (starStructureCount / Math.max(1, answered.length)) * 10 -
          fillerCount * 1.5
      )
    )
  );

  const quality = Math.min(98, Math.max(50, baseScore + 2));
  const technical = Math.min(98, Math.max(52, baseScore + (config.type === 'Technique' ? 4 : 1)));
  const clarity = Math.min(98, Math.max(50, baseScore + (fillerCount <= 2 ? 3 : -3)));
  const star = Math.min(
    96,
    Math.max(48, Math.round(55 + (metricsCount / Math.max(1, answered.length)) * 25 + (starStructureCount / Math.max(1, answered.length)) * 15))
  );

  return {
    id: 'sim_' + Date.now(),
    date: new Date().toISOString().split('T')[0],
    jobTitle: jobData?.title || 'Développeur Full-Stack React / Node.js & IA',
    company: jobData?.company || 'TechNova Digital',
    type: config.type,
    difficulty: config.difficulty,
    language: config.language,
    mode: config.mode,
    duration: Math.max(1, Math.round(elapsedSeconds / 60)),
    overallScore: baseScore,
    metrics: {
      quality,
      technical,
      clarity,
      star,
      fillerWordsCount: fillerCount
    },
    strengths: [
      `Pertinence élevée vis-à-vis du poste de ${jobData?.title || 'Développeur Full-Stack'}.`,
      answered.length >= 3
        ? 'Constance et engagement sur l’ensemble des questions posées.'
        : 'Capacité à synthétiser les idées principales.',
      fillerCount <= 2
        ? 'Expression fluide avec très peu de mots parasites.'
        : 'Vocabulaire professionnel adapté au contexte.'
    ],
    improvements: [
      star < 80
        ? 'Systématiser la méthode STAR (Situation, Tâche, Action, Résultat chiffré) sur chaque mise en situation.'
        : 'Approfondir les compromis architecturaux (scalabilité, coûts cloud) sur les questions avancées.',
      fillerCount > 2
        ? `Réduire l'utilisation des tics de langage détectés (${fillerCount} occurrences : "du coup", "en fait").`
        : 'Ajouter encore plus d’indicateurs chiffrés (ROI, temps gagné, taux de couverture).'
    ],
    recommendations: [
      'Revoir les suggestions de réponses modèles ci-dessous pour ancrer les formulations à fort impact.',
      'Lancer une prochaine session en mode Vocal pour tester votre aisance orale sous chronomètre.'
    ],
    qaList: qaHistory.map((q) => ({
      question: q.question,
      answer: q.skipped ? '(Question passée par le candidat)' : q.answer,
      aiReaction: q.aiReaction || 'Analyse enregistrée.',
      suggestedAnswer: q.sampleHint || 'Structurez votre réponse en présentant le contexte précis, votre action technique et le résultat mesurable.'
    }))
  };
}

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // Persistent State Management via localStorage
  const [lang, setLang] = useState(() => localStorage.getItem('icia_lang') || 'fr');
  const [currentView, setCurrentView] = useState(() => localStorage.getItem('icia_view') || 'landing');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('icia_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [simulations, setSimulations] = useState(() => {
    const saved = localStorage.getItem('icia_simulations');
    return saved ? JSON.parse(saved) : INITIAL_SIMULATIONS;
  });
  const [objectives, setObjectives] = useState(() => {
    const saved = localStorage.getItem('icia_objectives');
    return saved ? JSON.parse(saved) : DEFAULT_OBJECTIVES;
  });

  // Active Report & Active Simulation Setup
  const [selectedReport, setSelectedReport] = useState(() => INITIAL_SIMULATIONS[INITIAL_SIMULATIONS.length - 1]);
  const [wizardStep, setWizardStep] = useState(1);
  const [cvData, setCvData] = useState({
    fileName: '',
    fileSize: '',
    uploaded: false,
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Git', 'Tailwind CSS', 'REST API'],
    experiences: [
      'Stage PFE - Développeur Full-Stack & IA (4 mois)',
      'Stage d’été - Développement Web React / Node.js (2 mois)',
      'Projet Académique - Plateforme SaaS Agile'
    ],
    highlights: [
      'Double compétence développement Full-Stack & intégration LLM',
      'Maîtrise des architectures modernes et bases relationnelles',
      'Bonne culture Agile et travail collaboratif'
    ]
  });

  const [jobData, setJobData] = useState({
    title: 'Développeur Full-Stack React / Node.js & IA',
    company: 'TechNova Digital',
    domain: 'Développement Web & IA',
    experienceLevel: 'Junior / Jeune Diplômé (0-2 ans)',
    description: SAMPLE_JOB_OFFER,
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Git', 'Docker', 'CI/CD', 'Tests Unitaires'],
    missingSkills: ['Docker / Conteneurisation', 'Pipelines CI/CD', 'Tests E2E (Cypress/Playwright)'],
    matchScore: 84
  });

  const [simConfig, setSimConfig] = useState({
    type: 'Technique',
    difficulty: 'Intermédiaire',
    language: 'Français',
    mode: 'Texte',
    duration: 20
  });

  // Modals & UI Helpers
  const [paymentModal, setPaymentModal] = useState({ open: false, planName: '', price: '' });
  const [toast, setToast] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('icia_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('icia_view', currentView);
  }, [currentView]);

  useEffect(() => {
    if (user) localStorage.setItem('icia_user', JSON.stringify(user));
    else localStorage.removeItem('icia_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('icia_simulations', JSON.stringify(simulations));
  }, [simulations]);

  useEffect(() => {
    localStorage.setItem('icia_objectives', JSON.stringify(objectives));
  }, [objectives]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3800);
  };

  const handleDemoLogin = (targetRoute = 'overview') => {
    setUser(INITIAL_USER);
    setCurrentView(targetRoute);
    showToast('Connecté avec le compte de démonstration : Chaima Zidi');
  };

  const handleResetDemo = () => {
    localStorage.removeItem('icia_user');
    localStorage.removeItem('icia_simulations');
    localStorage.removeItem('icia_objectives');
    setUser(INITIAL_USER);
    setSimulations(INITIAL_SIMULATIONS);
    setObjectives(DEFAULT_OBJECTIVES);
    setSelectedReport(INITIAL_SIMULATIONS[INITIAL_SIMULATIONS.length - 1]);
    setWizardStep(1);
    setCurrentView('overview');
    showToast('Données de démonstration réinitialisées avec succès !');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
    showToast('Vous êtes déconnecté.', 'info');
  };

  // ==========================================================================
  // RENDER ROUTER (LANDING / AUTH / B2B / CANDIDATE WORKSPACE)
  // ==========================================================================
  const isWorkspaceView = [
    'overview',
    'new-simulation',
    'simulation',
    'report',
    'history',
    'reports',
    'profile',
    'subscription',
    'settings'
  ].includes(currentView);

  return (
    <div dir={t.dir} className="min-h-screen bg-[#F8FAFC] text-[#102A43] font-sans antialiased selection:bg-[#35C6D8]/20 selection:text-[#102A43]">
      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-[#102A43] text-white px-5 py-3.5 rounded-2xl shadow-xl border border-[#35C6D8]/30 animate-bounce">
          <div className="w-6 h-6 rounded-full bg-[#35C6D8]/20 text-[#35C6D8] flex items-center justify-center">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* Payment Demo Modal (D17 / Flouci / Carte) */}
      {paymentModal.open && (
        <PaymentDemoModal
          planName={paymentModal.planName}
          price={paymentModal.price}
          onClose={() => setPaymentModal({ open: false, planName: '', price: '' })}
          onSuccess={(newPlan) => {
            if (user) {
              setUser({ ...user, plan: newPlan });
            } else {
              setUser({ ...INITIAL_USER, plan: newPlan });
            }
            setPaymentModal({ open: false, planName: '', price: '' });
            setCurrentView('overview');
            showToast(`Abonnement ${newPlan} activé avec succès !`);
          }}
        />
      )}

      {/* VIEW 1: LANDING PAGE */}
      {currentView === 'landing' && (
        <LandingPage
          t={t}
          lang={lang}
          setLang={setLang}
          user={user}
          onNavigate={setCurrentView}
          onDemoLogin={() => handleDemoLogin('overview')}
          onOpenPayment={(planName, price) => setPaymentModal({ open: true, planName, price })}
        />
      )}

      {/* VIEW 2: AUTHENTICATION PAGE */}
      {currentView === 'auth' && (
        <AuthPage
          t={t}
          lang={lang}
          setLang={setLang}
          onBack={() => setCurrentView('landing')}
          onLoginSuccess={(userData, redirect = 'overview') => {
            setUser(userData);
            setCurrentView(redirect);
            showToast(`Bienvenue, ${userData.name} !`);
          }}
        />
      )}

      {/* VIEW 3: UNIVERSITY / INSTITUTION B2B DASHBOARD */}
      {currentView === 'b2b' && (
        <B2BDashboard
          lang={lang}
          setLang={setLang}
          onBackToLanding={() => setCurrentView('landing')}
          onSwitchToCandidate={() => {
            if (!user) setUser(INITIAL_USER);
            setCurrentView('overview');
          }}
          showToast={showToast}
        />
      )}

      {/* VIEW 4: CANDIDATE SAAS WORKSPACE (SIDEBAR + MAIN CONTENT) */}
      {isWorkspaceView && (
        <div className="flex min-h-screen bg-[#F8FAFC]">
          {/* Mobile Sidebar Backdrop */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 bg-[#102A43]/50 z-30 lg:hidden backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}

          {/* Sidebar Navigation */}
          <aside
            className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-300 ${
              mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}
          >
            <div>
              {/* Logo Header */}
              <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100">
                <button onClick={() => setCurrentView('landing')} className="text-left focus:outline-none">
                  <BrandLogo size="sm" />
                </button>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Primary CTA Button in Sidebar */}
              <div className="p-4">
                <button
                  onClick={() => {
                    setWizardStep(1);
                    setCurrentView('new-simulation');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#1769AA] to-[#35C6D8] text-white font-semibold text-sm shadow-md shadow-[#1769AA]/20 hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  {t.newSim}
                </button>
              </div>

              {/* Navigation Menu Items */}
              <nav className="px-3 space-y-1">
                {[
                  { id: 'overview', label: t.overview, icon: LayoutDashboard },
                  { id: 'new-simulation', label: t.newSim, icon: Sparkles },
                  { id: 'history', label: t.mySims, icon: History },
                  { id: 'reports', label: t.myReports, icon: FileText },
                  { id: 'profile', label: t.profile, icon: User },
                  { id: 'subscription', label: t.subscription, icon: CreditCard },
                  { id: 'settings', label: t.settings, icon: Settings }
                ].map((item) => {
                  const Icon = item.icon;
                  const active = currentView === item.id || (item.id === 'reports' && currentView === 'report');
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentView(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
                        active
                          ? 'bg-[#1769AA]/10 text-[#1769AA] font-semibold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-[#102A43]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${active ? 'text-[#1769AA]' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                      {item.id === 'subscription' && (
                        <span className="ml-auto text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#35C6D8]/20 text-[#102A43]">
                          {(user || INITIAL_USER).plan}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Quick Switcher to University B2B Space for Jury */}
              <div className="px-4 mt-6">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Mode Démonstration Jury
                  </p>
                  <button
                    onClick={() => setCurrentView('b2b')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-[#102A43] hover:border-[#1769AA] transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#1769AA]" />
                      {t.b2bSpace} (IIT)
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom User Card */}
            <div className="p-4 border-t border-slate-100">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50">
                <div className="w-10 h-10 rounded-xl bg-[#102A43] text-white font-bold flex items-center justify-center text-sm shrink-0">
                  {(user || INITIAL_USER).avatarInitials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[#102A43] truncate">{(user || INITIAL_USER).name}</p>
                  <p className="text-xs text-slate-500 truncate">{(user || INITIAL_USER).university}</p>
                </div>
                <button
                  onClick={handleLogout}
                  title={t.logout}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </aside>

          {/* Main Workspace Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Top Workspace Header */}
            <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-[#102A43]">
                    {currentView === 'overview' && `${t.welcome}, ${(user || INITIAL_USER).name.split(' ')[0]} 👋`}
                    {currentView === 'new-simulation' && 'Préparation de votre simulation IA'}
                    {currentView === 'simulation' && 'Salle d’entretien virtuel en direct'}
                    {currentView === 'report' && 'Rapport d’évaluation détaillé'}
                    {currentView === 'history' && 'Historique & Suivi de progression'}
                    {currentView === 'reports' && 'Mes rapports d’analyse IA'}
                    {currentView === 'profile' && 'Mon profil candidat'}
                    {currentView === 'subscription' && 'Formules & Abonnement'}
                    {currentView === 'settings' && 'Paramètres de la plateforme'}
                  </h1>
                  <p className="text-xs text-slate-500 hidden sm:block">
                    InterviewCoachIA • Recruteur virtuel intelligent disponible 24h/24
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Language Switcher */}
                <LanguageSelector lang={lang} setLang={setLang} />

                {/* Reset Demo Button */}
                <button
                  onClick={handleResetDemo}
                  title="Réinitialiser les données de démonstration"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200/70 transition cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Démo</span>
                </button>
              </div>
            </header>

            {/* Dynamic Workspace Content */}
            <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
              {currentView === 'overview' && (
                <DashboardOverview
                  user={user || INITIAL_USER}
                  simulations={simulations}
                  objectives={objectives}
                  onToggleObjective={(id) =>
                    setObjectives(objectives.map((o) => (o.id === id ? { ...o, done: !o.done } : o)))
                  }
                  onStartNewSim={() => {
                    setWizardStep(1);
                    setCurrentView('new-simulation');
                  }}
                  onViewReport={(sim) => {
                    setSelectedReport(sim);
                    setCurrentView('report');
                  }}
                />
              )}

              {currentView === 'new-simulation' && (
                <SimulationWizard
                  step={wizardStep}
                  setStep={setWizardStep}
                  cvData={cvData}
                  setCvData={setCvData}
                  jobData={jobData}
                  setJobData={setJobData}
                  simConfig={simConfig}
                  setSimConfig={setSimConfig}
                  showToast={showToast}
                  onLaunchSimulation={() => setCurrentView('simulation')}
                />
              )}

              {currentView === 'simulation' && (
                <LiveInterviewRoom
                  config={simConfig}
                  jobData={jobData}
                  cvData={cvData}
                  onFinishSimulation={(qaHistory, elapsedSeconds) => {
                    const newReport = evaluateCompletedSimulation(qaHistory, simConfig, jobData, elapsedSeconds);
                    setSimulations([...simulations, newReport]);
                    setSelectedReport(newReport);
                    setCurrentView('report');
                    showToast('Entretien terminé ! Votre rapport IA a été généré.');
                  }}
                  onCancel={() => setCurrentView('overview')}
                />
              )}

              {currentView === 'report' && selectedReport && (
                <EvaluationReportView
                  report={selectedReport}
                  onNewSimulation={() => {
                    setWizardStep(1);
                    setCurrentView('new-simulation');
                  }}
                  onBackToDashboard={() => setCurrentView('overview')}
                  showToast={showToast}
                />
              )}

              {(currentView === 'history' || currentView === 'reports') && (
                <ProgressAndHistoryView
                  simulations={simulations}
                  onSelectReport={(sim) => {
                    setSelectedReport(sim);
                    setCurrentView('report');
                  }}
                  onNewSimulation={() => {
                    setWizardStep(1);
                    setCurrentView('new-simulation');
                  }}
                />
              )}

              {currentView === 'profile' && (
                <ProfileView
                  user={user || INITIAL_USER}
                  cvData={cvData}
                  onUpdateUser={(updated) => {
                    setUser(updated);
                    showToast('Profil mis à jour avec succès.');
                  }}
                />
              )}

              {currentView === 'subscription' && (
                <SubscriptionView
                  currentPlan={(user || INITIAL_USER).plan}
                  onSelectPlan={(planName, price) => setPaymentModal({ open: true, planName, price })}
                />
              )}

              {currentView === 'settings' && (
                <SettingsView
                  lang={lang}
                  setLang={setLang}
                  onResetDemo={handleResetDemo}
                  showToast={showToast}
                />
              )}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// LANGUAGE SELECTOR COMPONENT
// ============================================================================
function LanguageSelector({ lang, setLang }) {
  return (
    <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/70">
      {[
        { code: 'fr', label: 'FR' },
        { code: 'en', label: 'EN' },
        { code: 'ar', label: 'عربي' }
      ].map((item) => (
        <button
          key={item.code}
          onClick={() => setLang(item.code)}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
            lang === item.code
              ? 'bg-white text-[#1769AA] shadow-xs'
              : 'text-slate-500 hover:text-[#102A43]'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

// ============================================================================
// A. LANDING PAGE COMPONENT
// ============================================================================
function LandingPage({ t, lang, setLang, user, onNavigate, onDemoLogin, onOpenPayment }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <BrandLogo />

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#1769AA] transition cursor-pointer">
              {t.navHome}
            </button>
            <button onClick={() => scrollToSection('features')} className="hover:text-[#1769AA] transition cursor-pointer">
              {t.navFeatures}
            </button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-[#1769AA] transition cursor-pointer">
              {t.navPricing}
            </button>
            <button onClick={() => onNavigate('b2b')} className="hover:text-[#1769AA] transition flex items-center gap-1.5 cursor-pointer">
              <Building2 className="w-4 h-4 text-[#35C6D8]" />
              {t.navB2B}
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:text-[#1769AA] transition cursor-pointer">
              À propos
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSelector lang={lang} setLang={setLang} />
            {user ? (
              <button
                onClick={() => onNavigate('overview')}
                className="px-4 py-2.5 rounded-xl bg-[#102A43] text-white text-sm font-semibold hover:bg-[#1769AA] transition cursor-pointer"
              >
                Mon Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('auth')}
                  className="hidden sm:inline-flex px-4 py-2.5 rounded-xl text-sm font-semibold text-[#102A43] hover:bg-slate-100 transition cursor-pointer"
                >
                  {t.navLogin}
                </button>
                <button
                  onClick={() => onNavigate('auth')}
                  className="px-4 py-2.5 rounded-xl bg-[#1769AA] text-white text-sm font-semibold shadow-md shadow-[#1769AA]/20 hover:bg-[#102A43] transition cursor-pointer"
                >
                  {t.ctaStart}
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F1F5F9]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1769AA]/10 text-[#1769AA] text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#35C6D8]" />
                <span>AGENT IA DE PRÉPARATION AUX ENTRETIENS • 24H/24</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#102A43] tracking-tight leading-[1.12]">
                {t.slogan}
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                {t.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('auth')}
                  className="px-6 py-4 rounded-2xl bg-gradient-to-r from-[#102A43] via-[#1769AA] to-[#1769AA] text-white font-bold text-base shadow-xl shadow-[#1769AA]/25 hover:scale-[1.02] transition flex items-center gap-2 cursor-pointer"
                >
                  <span>{t.ctaStart}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={onDemoLogin}
                  className="px-6 py-4 rounded-2xl bg-[#35C6D8]/15 text-[#102A43] border border-[#35C6D8]/40 font-bold text-base hover:bg-[#35C6D8]/25 transition flex items-center gap-2 cursor-pointer"
                >
                  <Zap className="w-5 h-5 text-[#1769AA]" />
                  <span>{t.ctaJuryDemo}</span>
                </button>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#35C6D8]" /> Analyse CV PDF & Offre
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#35C6D8]" /> Français, Anglais & Arabe
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#35C6D8]" /> Méthode STAR & Scoring
                </span>
              </div>
            </div>

            {/* Right Interactive AI Recruiter Preview Card */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-lg">
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#1769AA]/20 via-[#35C6D8]/20 to-transparent rounded-3xl blur-2xl" />
                <div className="relative bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-6 space-y-5">
                  {/* Mockup Top Bar */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#102A43] to-[#1769AA] flex items-center justify-center text-white relative">
                        <Bot className="w-6 h-6 text-[#35C6D8]" />
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#102A43] text-sm">InterviewCoach IA</h3>
                        <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                          Simulation Technique • Full-Stack React
                        </p>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-xl bg-[#102A43] text-white text-xs font-bold">
                      Score STAR: 88/100
                    </div>
                  </div>

                  {/* Mockup Chat Exchange */}
                  <div className="space-y-3">
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                      <p className="text-[11px] font-bold uppercase text-[#1769AA] mb-1">Question 3 / 5 • Adaptative</p>
                      <p className="text-sm text-[#102A43] font-medium">
                        « Comment avez-vous optimisé les performances d’une API REST sur votre projet de fin d’études ? »
                      </p>
                    </div>

                    <div className="bg-[#1769AA] text-white rounded-2xl p-4 ml-6 shadow-md">
                      <p className="text-xs opacity-80 mb-1">Votre réponse (Mode Vocal)</p>
                      <p className="text-sm">
                        « J’ai implémenté un cache Redis et indexé nos requêtes PostgreSQL, réduisant le temps de réponse de 1,8s à 210ms. »
                      </p>
                    </div>

                    <div className="bg-[#35C6D8]/10 border border-[#35C6D8]/30 rounded-2xl p-3.5 flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-[#1769AA] shrink-0 mt-0.5" />
                      <div className="text-xs text-[#102A43]">
                        <span className="font-bold">Feedback IA instantané :</span> Excellente structure STAR avec indicateurs chiffrés (+88% de rapidité). Aucun mot parasite détecté !
                      </div>
                    </div>
                  </div>

                  {/* Mockup Bottom Audio Wave */}
                  <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      {[12, 22, 16, 28, 18, 24, 14, 20].map((h, idx) => (
                        <span
                          key={idx}
                          style={{ height: `${h}px` }}
                          className="w-1 rounded-full bg-gradient-to-t from-[#1769AA] to-[#35C6D8]"
                        />
                      ))}
                      <span className="ml-2 font-medium text-slate-600">Analyse sémantique active</span>
                    </div>
                    <span className="font-semibold text-[#1769AA]">Compatibilité CV: 84%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process Section */}
      <section id="steps" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1769AA]">Comment ça marche</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] mt-2">
              Trois étapes simples pour transformer votre préparation
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Importer son CV',
                desc: 'Déposez votre CV PDF et collez l’offre d’emploi visée. Notre IA extrait vos compétences et calcule votre taux de compatibilité.',
                icon: Upload
              },
              {
                step: '02',
                title: 'Simuler son entretien',
                desc: 'Échangez 24h/24 à l’écrit ou à l’oral avec InterviewCoach IA. Les questions s’adaptent dynamiquement à vos réponses.',
                icon: MessageSquare
              },
              {
                step: '03',
                title: 'Améliorer ses performances',
                desc: 'Recevez un score détaillé (méthode STAR, clarté, tics de langage) et suivez votre progression session après session.',
                icon: TrendingUp
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="group p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200/70 hover:bg-white hover:shadow-xl hover:border-[#35C6D8]/50 transition duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#1769AA]/10 text-[#1769AA] group-hover:bg-[#1769AA] group-hover:text-white flex items-center justify-center transition">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 group-hover:text-[#35C6D8]/40 transition">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#102A43] mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-20 bg-[#F8FAFC] border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1769AA]">Technologie & Innovation</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] mt-2">
              Une intelligence artificielle pensée pour l’employabilité
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Matching CV & Offre d’emploi',
                desc: 'Identification automatique des compétences acquises, des points forts et des lacunes par rapport au poste ciblé.',
                icon: Target
              },
              {
                title: 'Questions adaptatives en temps réel',
                desc: 'L’agent rebondit sur vos réponses, demande des précisions concrètes et ajuste le niveau de difficulté.',
                icon: Sparkles
              },
              {
                title: 'Évaluation STAR & Mots parasites',
                desc: 'Analyse fine de la structure Situation-Tâche-Action-Résultat et détection des hésitations ("euh", "du coup").',
                icon: Award
              },
              {
                title: 'Multilingue (FR, EN, AR)',
                desc: 'Préparez vos entretiens locaux et internationaux en français, anglais ou arabe selon les exigences du recruteur.',
                icon: Globe
              },
              {
                title: 'Écoconception & IA Sobre',
                desc: 'Architecture mutualisée, mise en cache intelligente et zéro papier : un coaching accessible à faible empreinte carbone.',
                icon: Leaf
              },
              {
                title: 'Espace Universités & Centres Carrière',
                desc: 'Tableaux de bord analytiques pour accompagner des centaines d’étudiants et mesurer leur employabilité.',
                icon: GraduationCap
              }
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#102A43] to-[#1769AA] text-[#35C6D8] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#102A43] text-lg mb-2">{feat.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1769AA]">Modèle Économique</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] mt-2">
              Des tarifs accessibles, 10x moins chers qu’un coaching classique
            </h2>
            <p className="text-slate-600 mt-3 text-sm">
              Paiement local simplifié en Dinars Tunisiens (D17, Flouci, Carte Bancaire).
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Freemium */}
            <div className="rounded-3xl p-8 bg-[#F8FAFC] border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="px-3 py-1 rounded-full bg-slate-200 text-[#102A43] text-xs font-bold">Découverte</span>
                <h3 className="text-2xl font-extrabold text-[#102A43] mt-4">Freemium</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#102A43]">0 DT</span>
                  <span className="text-slate-500 text-sm">/ toujours</span>
                </div>
                <p className="text-sm text-slate-600 mt-3">Idéal pour découvrir le simulateur et évaluer son niveau initial.</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1769AA]" /> 1 simulation par semaine
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1769AA]" /> Feedback de base après session
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1769AA]" /> Banque de questions limitée
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onNavigate('auth')}
                className="mt-8 w-full py-3.5 rounded-xl border-2 border-[#102A43] text-[#102A43] font-bold text-sm hover:bg-[#102A43] hover:text-white transition cursor-pointer"
              >
                Commencer gratuitement
              </button>
            </div>

            {/* Premium (Highlighted) */}
            <div className="rounded-3xl p-8 bg-[#102A43] text-white shadow-2xl shadow-[#102A43]/25 relative flex flex-col justify-between border-2 border-[#35C6D8]">
              <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-[#35C6D8] text-[#102A43] text-xs font-extrabold uppercase tracking-wide">
                Recommandé Candidats
              </div>
              <div>
                <span className="px-3 py-1 rounded-full bg-white/10 text-[#35C6D8] text-xs font-bold">Performance</span>
                <h3 className="text-2xl font-extrabold mt-4">Premium</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black">20 DT</span>
                  <span className="text-slate-300 text-sm">/ mois</span>
                </div>
                <p className="text-sm text-slate-300 mt-3">L’entraînement intensif complet pour décrocher votre prochain poste.</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-100">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#35C6D8]" /> Simulations illimitées 24h/24
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#35C6D8]" /> Analyse sémantique CV + Offre
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#35C6D8]" /> Mode vocal interactif & synthèse
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#35C6D8]" /> Rapports détaillés STAR & PDF
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#35C6D8]" /> Suivi de progression complet
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onOpenPayment('Premium', '20 DT / mois')}
                className="mt-8 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1769AA] to-[#35C6D8] text-white font-bold text-sm shadow-lg hover:opacity-95 transition cursor-pointer"
              >
                Souscrire à Premium
              </button>
            </div>

            {/* Campus B2B */}
            <div className="rounded-3xl p-8 bg-[#F8FAFC] border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#1769AA]/10 text-[#1769AA] text-xs font-bold">Universités & Écoles</span>
                <h3 className="text-2xl font-extrabold text-[#102A43] mt-4">Campus B2B</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#102A43]">6 000 DT</span>
                  <span className="text-slate-500 text-sm">/ an</span>
                </div>
                <p className="text-sm text-slate-600 mt-3">Solution clé en main pour les centres de carrière et établissements supérieurs.</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1769AA]" /> Licence pour ~500 étudiants
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1769AA]" /> Tableau de bord carrière & stats
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1769AA]" /> Option marque blanche
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1769AA]" /> Support pédagogique dédié
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onOpenPayment('Campus B2B', '6 000 DT / an')}
                className="mt-8 w-full py-3.5 rounded-xl bg-[#102A43] text-white font-bold text-sm hover:bg-[#1769AA] transition cursor-pointer"
              >
                Demander une licence B2B
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Clearly labeled as illustrative demo examples) */}
      <section id="about" className="py-20 bg-[#F8FAFC] border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
              Exemples illustratifs • Témoignages fictifs de démonstration
            </span>
            <h2 className="text-3xl font-extrabold text-[#102A43] mt-3">
              Ils préparent leur avenir professionnel avec InterviewCoachIA
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarra M.',
                role: 'Jeune diplômée en Génie Logiciel (Exemple)',
                quote: '« Grâce aux simulations techniques ciblées sur mon CV, j’ai appris à structurer mes réponses avec la méthode STAR et j’ai gagné en confiance dès mon premier entretien. »'
              },
              {
                name: 'Karim B.',
                role: 'Candidat en reconversion Data (Exemple)',
                quote: '« Pouvoir m’entraîner à 22h après mon travail sans jugement et voir mes progrès chiffrés m’a permis de corriger mes tics de langage en deux semaines. »'
              },
              {
                name: 'Dr. Henda K.',
                role: 'Responsable Centre de Carrière Universitaire (Exemple)',
                quote: '« Le tableau de bord B2B nous permet d’identifier les compétences transversales à renforcer chez nos étudiants avant les forums de recrutement. »'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 italic leading-relaxed mb-4">{item.quote}</p>
                <div className="border-t border-slate-100 pt-3">
                  <p className="font-bold text-sm text-[#102A43]">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#102A43] text-slate-300 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <BrandLogo light />
            <p className="text-xs text-slate-400 mt-2 max-w-md">
              Prototype SaaS innovant conçu à l’Institut International de Technologie (IIT) • Écoconception numérique & Agent IA multilingue.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
            <button onClick={() => onNavigate('auth')} className="hover:text-[#35C6D8] transition cursor-pointer">
              Espace Candidat
            </button>
            <button onClick={() => onNavigate('b2b')} className="hover:text-[#35C6D8] transition cursor-pointer">
              Espace Université B2B
            </button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-[#35C6D8] transition cursor-pointer">
              Tarifs (DT)
            </button>
            <span className="text-slate-500">© 2026–2027 InterviewCoachIA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============================================================================
// B. AUTHENTICATION PAGE COMPONENT
// ============================================================================
function AuthPage({ t, lang, setLang, onBack, onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'forgot'
  const [email, setEmail] = useState('chaima.zidi@iit-sfax.tn');
  const [password, setPassword] = useState('••••••••••••');
  const [fullName, setFullName] = useState('');
  const [university, setUniversity] = useState('Institut International de Technologie (IIT)');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'forgot') {
      setResetSent(true);
      return;
    }
    if (authMode === 'register') {
      onLoginSuccess({
        ...INITIAL_USER,
        name: fullName || 'Nouveau Candidat',
        email: email || 'candidat@iit-sfax.tn',
        university
      });
    } else {
      onLoginSuccess(INITIAL_USER);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-white to-[#1769AA]/5 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-[#102A43] transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Retour
          </button>
          <LanguageSelector lang={lang} setLang={setLang} />
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-8">
          <div className="flex justify-center mb-6">
            <BrandLogo />
          </div>

          {/* Instant Demo Access Banner for Jury */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#102A43] to-[#1769AA] text-white space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#35C6D8]">
                Accès Démonstration Rapide
              </span>
              <Sparkles className="w-4 h-4 text-[#35C6D8]" />
            </div>
            <p className="text-xs text-slate-200">
              Testez immédiatement le parcours complet avec un profil préconfiguré :
            </p>
            <div className="grid grid-cols-1 gap-2 pt-1">
              <button
                type="button"
                onClick={() => onLoginSuccess(INITIAL_USER, 'overview')}
                className="w-full py-2.5 px-3 rounded-xl bg-[#35C6D8] text-[#102A43] font-bold text-xs hover:bg-white transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <User className="w-4 h-4" />
                Compte Candidat (Chaima Zidi - Full-Stack)
              </button>
              <button
                type="button"
                onClick={() => onLoginSuccess(INITIAL_USER, 'b2b')}
                className="w-full py-2 px-3 rounded-xl bg-white/15 text-white font-semibold text-xs hover:bg-white/25 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                Espace Université B2B (IIT Sfax)
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setResetSent(false);
              }}
              className={`py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
                authMode === 'login' ? 'bg-white text-[#102A43] shadow-xs' : 'text-slate-500'
              }`}
            >
              Connexion
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('register');
                setResetSent(false);
              }}
              className={`py-2 text-xs font-bold rounded-lg transition cursor-pointer ${
                authMode === 'register' ? 'bg-white text-[#102A43] shadow-xs' : 'text-slate-500'
              }`}
            >
              Inscription candidat
            </button>
          </div>

          {authMode === 'forgot' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-[#102A43]">Mot de passe oublié</h2>
              <p className="text-xs text-slate-500">
                Entrez votre adresse e-mail pour recevoir un lien de réinitialisation sécurisé.
              </p>
              {resetSent ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                  Un e-mail de réinitialisation vient d’être envoyé à <strong>{email}</strong> (Simulation).
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1769AA]"
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#1769AA] text-white font-bold text-sm hover:bg-[#102A43] transition cursor-pointer"
              >
                Envoyer le lien
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="w-full text-xs text-slate-500 hover:text-[#1769AA] font-medium cursor-pointer"
              >
                Retour à la connexion
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nom complet</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Chaima Zidi"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1769AA]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Établissement / Profil</label>
                    <input
                      type="text"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1769AA]"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Adresse e-mail</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1769AA]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">Mot de passe</label>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setAuthMode('forgot')}
                      className="text-xs text-[#1769AA] hover:underline font-medium cursor-pointer"
                    >
                      Mot de passe oublié ?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1769AA]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#1769AA] text-white font-bold text-sm shadow-md shadow-[#1769AA]/20 hover:bg-[#102A43] transition cursor-pointer"
              >
                {authMode === 'login' ? 'Se connecter' : 'Créer mon compte candidat'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// C. CANDIDATE DASHBOARD OVERVIEW COMPONENT
// ============================================================================
function DashboardOverview({ user, simulations, objectives, onToggleObjective, onStartNewSim, onViewReport }) {
  const avgScore =
    simulations.length > 0
      ? Math.round(simulations.reduce((acc, s) => acc + s.overallScore, 0) / simulations.length)
      : 0;
  const latestSim = simulations[simulations.length - 1];
  const firstSim = simulations[0];
  const progressionDelta = latestSim && firstSim ? latestSim.overallScore - firstSim.overallScore : 0;

  const chartData = simulations.map((sim, idx) => ({
    name: `Session ${idx + 1}`,
    date: sim.date,
    score: sim.overallScore,
    star: sim.metrics?.star || sim.overallScore - 4
  }));

  return (
    <div className="space-y-8">
      {/* Top Action Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#102A43] via-[#1769AA] to-[#1769AA] text-white p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#35C6D8] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> Prêt pour votre prochain entretien ?
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Entraînez-vous sur une offre ciblée en 4 étapes
          </h2>
          <p className="text-sm text-slate-200">
            Importez votre CV PDF, ajoutez l’offre d’emploi et laissez InterviewCoach IA générer un entretien sur mesure.
          </p>
        </div>
        <button
          onClick={onStartNewSim}
          className="px-6 py-4 rounded-2xl bg-[#35C6D8] text-[#102A43] font-extrabold text-sm shadow-xl hover:bg-white transition flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Lancer une nouvelle simulation</span>
        </button>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Score moyen des entretiens</span>
            <div className="w-9 h-9 rounded-xl bg-[#1769AA]/10 text-[#1769AA] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#102A43]">{avgScore}</span>
            <span className="text-sm font-bold text-slate-400">/ 100</span>
          </div>
          <p className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Niveau compétitif confirmé
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Simulations réalisées</span>
            <div className="w-9 h-9 rounded-xl bg-[#35C6D8]/15 text-[#102A43] flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#102A43]">{simulations.length}</div>
          <p className="text-xs text-slate-500 mt-2">
            Dont {simulations.filter((s) => s.type === 'Technique').length} entretiens techniques
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Progression globale</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600">
            {progressionDelta >= 0 ? `+${progressionDelta}` : progressionDelta} pts
          </div>
          <p className="text-xs text-slate-500 mt-2">Depuis votre 1ère simulation</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Dernière simulation</span>
              <span className="px-2 py-0.5 rounded-full bg-[#1769AA]/10 text-[#1769AA] text-[11px] font-bold">
                {latestSim?.overallScore || 0}/100
              </span>
            </div>
            <p className="text-sm font-bold text-[#102A43] truncate">{latestSim?.jobTitle || 'Aucune'}</p>
            <p className="text-xs text-slate-400 mt-0.5">{latestSim?.date}</p>
          </div>
          {latestSim && (
            <button
              onClick={() => onViewReport(latestSim)}
              className="mt-3 text-xs font-bold text-[#1769AA] hover:text-[#102A43] flex items-center gap-1 cursor-pointer"
            >
              Voir le rapport détaillé <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Analytics Grid: Score Evolution Chart + Training Objectives */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Evolution Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-[#102A43] text-base">Évolution des scores d’entretien</h3>
              <p className="text-xs text-slate-500">Score global (/100) vs Maîtrise de la méthode STAR</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-[#1769AA]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1769AA]" /> Score Global
              </span>
              <span className="flex items-center gap-1.5 text-[#35C6D8]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#35C6D8]" /> Score STAR
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1769AA" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#1769AA" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: '14px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  name="Score Global"
                  stroke="#1769AA"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#scoreGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="star"
                  name="Structure STAR"
                  stroke="#35C6D8"
                  strokeWidth={2.5}
                  fillOpacity={0}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Training Objectives Checklist */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#102A43] text-base">Objectifs d’entraînement</h3>
              <span className="text-xs font-bold text-[#1769AA] bg-[#1769AA]/10 px-2.5 py-1 rounded-full">
                {objectives.filter((o) => o.done).length} / {objectives.length} atteints
              </span>
            </div>

            <div className="space-y-3">
              {objectives.map((obj) => (
                <button
                  key={obj.id}
                  onClick={() => onToggleObjective(obj.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition flex items-start gap-3 cursor-pointer ${
                    obj.done
                      ? 'bg-emerald-50/50 border-emerald-200/70 text-slate-500'
                      : 'bg-[#F8FAFC] border-slate-200/80 text-[#102A43] hover:border-[#1769AA]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                      obj.done ? 'bg-emerald-500 text-white' : 'border-2 border-slate-300 bg-white'
                    }`}
                  >
                    {obj.done && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <span className={`text-xs font-medium leading-relaxed ${obj.done ? 'line-through' : ''}`}>
                    {obj.text}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>CV actif : {user.cvUploaded}</span>
            <span className="text-emerald-600 font-semibold">Synchronisé</span>
          </div>
        </div>
      </div>

      {/* Personalized AI Recommendations */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 mb-5">
          <Sparkles className="w-5 h-5 text-[#1769AA]" />
          <h3 className="font-bold text-[#102A43] text-base">Recommandations personnalisées de l’IA</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              tag: 'Méthode STAR',
              title: 'Chiffrez vos résultats techniques',
              desc: 'Dans vos dernières réponses, vos actions techniques sont claires mais manquent parfois de métriques finales (ex: -40% de latence).'
            },
            {
              tag: 'Compétence Offre',
              title: 'Renforcez vos notions Docker & CI/CD',
              desc: '80% des offres Full-Stack analysées mentionnent la conteneurisation. Préparez un exemple concret de déploiement.'
            },
            {
              tag: 'Expression Orale',
              title: 'Testez le mode Vocal en conditions réelles',
              desc: 'Passez sur une session vocale de 20 minutes pour évaluer votre débit et éliminer les mots de remplissage.'
            }
          ].map((rec, i) => (
            <div key={i} className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/70">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#35C6D8]/20 text-[#102A43] text-[11px] font-bold mb-2">
                {rec.tag}
              </span>
              <h4 className="font-bold text-sm text-[#102A43] mb-1">{rec.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{rec.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// D. MULTI-STEP SIMULATION CREATION WIZARD (4 STEPS)
// ============================================================================
function SimulationWizard({
  step,
  setStep,
  cvData,
  setCvData,
  jobData,
  setJobData,
  simConfig,
  setSimConfig,
  showToast,
  onLaunchSimulation
}) {
  const [uploadProgress, setUploadProgress] = useState(cvData.uploaded ? 100 : 0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  const simulateFileUpload = (fileName, fileSize = '420 Ko') => {
    setUploadProgress(15);
    setCvData({ ...cvData, fileName, fileSize, uploaded: false });
    let prog = 15;
    const interval = setInterval(() => {
      prog += 25;
      if (prog >= 100) {
        clearInterval(interval);
        setUploadProgress(100);
        setCvData((prev) => ({ ...prev, fileName, fileSize, uploaded: true }));
        showToast(`CV "${fileName}" importé avec succès !`);
      } else {
        setUploadProgress(prog);
      }
    }, 180);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeKb = `${Math.max(120, Math.round(file.size / 1024))} Ko`;
      simulateFileUpload(file.name, sizeKb);
    }
  };

  const handleAnalyzeOfferAndGoToStep3 = () => {
    setIsAnalyzing(true);
    setStep(3);
    // Compute dynamic compatibility score based on job description keywords
    const descLower = (jobData.description + ' ' + jobData.title).toLowerCase();
    let score = 78;
    if (descLower.includes('react')) score += 4;
    if (descLower.includes('node')) score += 3;
    if (descLower.includes('ia') || descLower.includes('ai')) score += 3;
    setJobData((prev) => ({ ...prev, matchScore: Math.min(94, score) }));

    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1100);
  };

  const stepsMeta = [
    { num: 1, title: 'Importation du CV', icon: Upload },
    { num: 2, title: 'Offre d’emploi', icon: Briefcase },
    { num: 3, title: 'Analyse IA', icon: Sparkles },
    { num: 4, title: 'Configuration', icon: Settings }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Stepper Header */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stepsMeta.map((s) => {
            const Icon = s.icon;
            const isCurrent = step === s.num;
            const isCompleted = step > s.num;
            return (
              <button
                key={s.num}
                onClick={() => {
                  if (s.num < step) setStep(s.num);
                }}
                className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition cursor-pointer ${
                  isCurrent
                    ? 'bg-[#102A43] text-white border-[#102A43] shadow-md'
                    : isCompleted
                    ? 'bg-emerald-50/70 text-emerald-800 border-emerald-200'
                    : 'bg-[#F8FAFC] text-slate-400 border-slate-200/60'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                    isCurrent
                      ? 'bg-[#35C6D8] text-[#102A43]'
                      : isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase font-bold opacity-75">Étape {s.num}</p>
                  <p className="text-xs font-bold truncate">{s.title}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: CV UPLOAD */}
      {step === 1 && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-[#102A43]">Étape 1 : Importation de votre CV (PDF)</h2>
            <p className="text-sm text-slate-500 mt-1">
              Notre moteur sémantique extrait vos compétences techniques, expériences et réalisations.
            </p>
          </div>

          {/* Drag & Drop Zone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              if (file) simulateFileUpload(file.name, `${Math.round(file.size / 1024)} Ko`);
            }}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#1769AA]/40 hover:border-[#1769AA] bg-[#F8FAFC] hover:bg-[#1769AA]/5 rounded-3xl p-10 text-center transition cursor-pointer group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="w-16 h-16 rounded-2xl bg-white shadow-md text-[#1769AA] flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition">
              <Upload className="w-8 h-8" />
            </div>
            <p className="text-base font-bold text-[#102A43]">
              Glissez-déposez votre CV au format PDF ici
            </p>
            <p className="text-xs text-slate-500 mt-1">ou cliquez pour parcourir vos fichiers (Max 5 Mo)</p>
          </div>

          {/* 1-Click Demo CV Helper */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-[#35C6D8]/10 border border-[#35C6D8]/30">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[#1769AA] shrink-0" />
              <span className="text-xs font-medium text-[#102A43]">
                Pas de fichier sous la main pour la démo ? Chargez le CV candidat prérempli :
              </span>
            </div>
            <button
              type="button"
              onClick={() => simulateFileUpload('CV_Chaima_Zidi_FullStack_2026.pdf', '485 Ko')}
              className="px-4 py-2 rounded-xl bg-[#102A43] text-white text-xs font-bold hover:bg-[#1769AA] transition shrink-0 cursor-pointer"
            >
              Charger CV Démo PDF
            </button>
          </div>

          {/* File Status & Progress Bar */}
          {cvData.fileName && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs">
                    PDF
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#102A43]">{cvData.fileName}</p>
                    <p className="text-xs text-slate-500">{cvData.fileSize} • Extraction sécurisée</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#1769AA]">{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  style={{ width: `${uploadProgress}%` }}
                  className="h-full bg-gradient-to-r from-[#1769AA] to-[#35C6D8] transition-all duration-300"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              disabled={!cvData.uploaded}
              onClick={() => setStep(2)}
              className={`px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 transition cursor-pointer ${
                cvData.uploaded
                  ? 'bg-[#1769AA] text-white shadow-lg shadow-[#1769AA]/20 hover:bg-[#102A43]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyser mon CV</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: TARGET JOB OFFER */}
      {step === 2 && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-[#102A43]">Étape 2 : Offre d’emploi ciblée</h2>
              <p className="text-sm text-slate-500 mt-1">
                Renseignez le poste visé pour adapter les questions techniques et comportementales.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setJobData({
                  ...jobData,
                  title: 'Développeur Full-Stack React / Node.js & IA',
                  company: 'TechNova Digital',
                  domain: 'Développement Web & IA',
                  experienceLevel: 'Junior / Jeune Diplômé (0-2 ans)',
                  description: SAMPLE_JOB_OFFER
                });
                showToast('Offre Full-Stack préremplie !');
              }}
              className="px-3.5 py-2 rounded-xl bg-[#35C6D8]/15 text-[#102A43] text-xs font-bold hover:bg-[#35C6D8]/25 transition self-start cursor-pointer"
            >
              Remplir offre Full-Stack type
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Intitulé du poste *</label>
              <input
                type="text"
                value={jobData.title}
                onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1769AA]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Entreprise</label>
              <input
                type="text"
                value={jobData.company}
                onChange={(e) => setJobData({ ...jobData, company: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1769AA]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Domaine d’activité</label>
              <input
                type="text"
                value={jobData.domain}
                onChange={(e) => setJobData({ ...jobData, domain: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1769AA]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Niveau d’expérience</label>
              <select
                value={jobData.experienceLevel}
                onChange={(e) => setJobData({ ...jobData, experienceLevel: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-[#1769AA]"
              >
                <option>Stage PFE / Fin d’études</option>
                <option>Junior / Jeune Diplômé (0-2 ans)</option>
                <option>Confirmé (2-5 ans)</option>
                <option>Senior (5+ ans)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Description complète de l’offre d’emploi
            </label>
            <textarea
              rows={6}
              value={jobData.description}
              onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
              placeholder="Collez ici les missions et compétences requises de l'annonce..."
              className="w-full p-4 rounded-2xl border border-slate-200 text-sm leading-relaxed focus:outline-none focus:border-[#1769AA]"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Retour
            </button>
            <button
              onClick={handleAnalyzeOfferAndGoToStep3}
              className="px-6 py-3.5 rounded-2xl bg-[#1769AA] text-white font-bold text-sm shadow-lg shadow-[#1769AA]/20 hover:bg-[#102A43] transition flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyser l’offre</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: AI ANALYSIS & COMPATIBILITY BREAKDOWN */}
      {step === 3 && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          {isAnalyzing ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#1769AA]/10 text-[#1769AA] flex items-center justify-center mx-auto animate-pulse">
                <Bot className="w-9 h-9" />
              </div>
              <h3 className="text-lg font-extrabold text-[#102A43]">Analyse sémantique CV + Offre en cours...</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Extraction des compétences clés, cartographie des expériences et calcul du score d’adéquation.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <span className="text-xs font-bold uppercase text-[#1769AA]">Étape 3 : Diagnostic IA</span>
                  <h2 className="text-xl font-extrabold text-[#102A43] mt-1">
                    Compatibilité CV / {jobData.title}
                  </h2>
                </div>

                {/* Compatibility Score Pill */}
                <div className="flex items-center gap-4 bg-[#102A43] text-white px-5 py-3.5 rounded-2xl shadow-md">
                  <div>
                    <p className="text-[11px] uppercase text-[#35C6D8] font-bold">Adéquation Profil</p>
                    <p className="text-xs text-slate-300">Très bon alignement</p>
                  </div>
                  <div className="text-3xl font-black text-[#35C6D8]">{jobData.matchScore}%</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Extracted Candidate Skills & Experiences */}
                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-4">
                  <h3 className="font-bold text-sm text-[#102A43] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Compétences extraites de votre CV
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cvData.skills.map((sk) => (
                      <span
                        key={sk}
                        className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-[#102A43]"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <h4 className="font-bold text-xs uppercase text-slate-400 mb-2">Expériences détectées</h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {cvData.experiences.map((exp, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1769AA]" />
                          {exp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <h4 className="font-bold text-xs uppercase text-slate-400 mb-2">Points forts identifiés</h4>
                    <ul className="space-y-1.5 text-xs text-emerald-800">
                      {cvData.highlights.map((hl, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          {hl}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Offer Requirements & Gaps */}
                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-4">
                  <h3 className="font-bold text-sm text-[#102A43] flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#1769AA]" />
                    Compétences recherchées par l’offre
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {jobData.requiredSkills.map((sk) => (
                      <span
                        key={sk}
                        className="px-3 py-1 rounded-xl bg-[#1769AA]/10 text-[#1769AA] text-xs font-bold"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <h4 className="font-bold text-xs uppercase text-amber-700 mb-2 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" /> Compétences manquantes / à valoriser
                    </h4>
                    <div className="space-y-2">
                      {jobData.missingSkills.map((gap, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-center justify-between"
                        >
                          <span className="font-semibold">{gap}</span>
                          <span className="text-[11px] text-amber-700">Sera abordé par l’IA</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Modifier l’offre
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-6 py-3.5 rounded-2xl bg-[#1769AA] text-white font-bold text-sm shadow-lg shadow-[#1769AA]/20 hover:bg-[#102A43] transition flex items-center gap-2 cursor-pointer"
                >
                  <span>Configurer l’entretien</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* STEP 4: INTERVIEW CONFIGURATION */}
      {step === 4 && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-[#102A43]">Étape 4 : Paramétrage de la simulation</h2>
            <p className="text-sm text-slate-500 mt-1">
              Personnalisez les conditions de votre entretien avec InterviewCoach IA.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Type d'entretien */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Type d’entretien</label>
              <div className="grid grid-cols-3 gap-2">
                {['RH', 'Technique', 'Comportemental'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSimConfig({ ...simConfig, type })}
                    className={`py-3 px-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      simConfig.type === type
                        ? 'bg-[#102A43] text-white border-[#102A43]'
                        : 'bg-[#F8FAFC] text-slate-700 border-slate-200 hover:border-[#1769AA]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulté */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Niveau de difficulté</label>
              <div className="grid grid-cols-3 gap-2">
                {['Débutant', 'Intermédiaire', 'Avancé'].map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setSimConfig({ ...simConfig, difficulty: diff })}
                    className={`py-3 px-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      simConfig.difficulty === diff
                        ? 'bg-[#1769AA] text-white border-[#1769AA]'
                        : 'bg-[#F8FAFC] text-slate-700 border-slate-200 hover:border-[#1769AA]'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Langue */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Langue de l’entretien</label>
              <div className="grid grid-cols-3 gap-2">
                {['Français', 'English', 'العربية'].map((language) => (
                  <button
                    key={language}
                    type="button"
                    onClick={() => setSimConfig({ ...simConfig, language })}
                    className={`py-3 px-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      simConfig.language === language
                        ? 'bg-[#102A43] text-white border-[#102A43]'
                        : 'bg-[#F8FAFC] text-slate-700 border-slate-200 hover:border-[#1769AA]'
                    }`}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode (Texte / Vocal) */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Mode d’interaction</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'Texte', label: 'Mode Texte', icon: MessageSquare },
                  { id: 'Vocal', label: 'Mode Vocal (Simulé)', icon: Mic }
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSimConfig({ ...simConfig, mode: m.id })}
                      className={`py-3 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                        simConfig.mode === m.id
                          ? 'bg-[#1769AA] text-white border-[#1769AA]'
                          : 'bg-[#F8FAFC] text-slate-700 border-slate-200 hover:border-[#1769AA]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Durée */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Durée estimée</label>
              <div className="grid grid-cols-3 gap-3 max-w-md">
                {[10, 20, 30].map((min) => (
                  <button
                    key={min}
                    type="button"
                    onClick={() => setSimConfig({ ...simConfig, duration: min })}
                    className={`py-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      simConfig.duration === min
                        ? 'bg-[#102A43] text-white border-[#102A43]'
                        : 'bg-[#F8FAFC] text-slate-700 border-slate-200 hover:border-[#1769AA]'
                    }`}
                  >
                    {min} minutes
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(3)}
              className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Retour
            </button>
            <button
              onClick={onLaunchSimulation}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#102A43] via-[#1769AA] to-[#35C6D8] text-white font-extrabold text-sm shadow-xl shadow-[#1769AA]/25 hover:scale-[1.02] transition flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Lancer ma simulation</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// E. LIVE INTERACTIVE AI INTERVIEW SIMULATION ROOM
// ============================================================================
function LiveInterviewRoom({ config, jobData, cvData, onFinishSimulation, onCancel }) {
  const [questions] = useState(() => generateTailoredQuestions(config, jobData));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [qaHistory, setQaHistory] = useState([]);
  const [aiReaction, setAiReaction] = useState(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isRecording, setIsRecording] = useState(config.mode === 'Vocal');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex >= questions.length - 1;

  // Live Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Toggle Simulated Microphone Voice Transcription
  const handleToggleMic = () => {
    if (!isRecording) {
      setIsRecording(true);
      if (!userAnswer.trim() && currentQuestion?.sampleHint) {
        // Simulate gradual voice-to-text transcription
        const words = currentQuestion.sampleHint.split(' ');
        let idx = 0;
        const interval = setInterval(() => {
          idx += 4;
          setUserAnswer(words.slice(0, idx).join(' '));
          if (idx >= words.length) {
            clearInterval(interval);
            setIsRecording(false);
          }
        }, 160);
      }
    } else {
      setIsRecording(false);
    }
  };

  const handleSendAnswer = () => {
    if (!userAnswer.trim()) return;
    setIsRecording(false);
    setIsAiThinking(true);

    const reaction = generateAdaptiveAIReaction(userAnswer, currentQuestion, config.language);
    const updatedEntry = {
      question: currentQuestion.text,
      answer: userAnswer.trim(),
      aiReaction: reaction,
      sampleHint: currentQuestion.sampleHint,
      skipped: false
    };

    const nextHistory = [...qaHistory, updatedEntry];
    setQaHistory(nextHistory);
    setAiReaction(reaction);
    setUserAnswer('');

    setTimeout(() => {
      setIsAiThinking(false);
      if (!isLastQuestion) {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 950);
  };

  const handleSkipQuestion = () => {
    setIsRecording(false);
    const updatedEntry = {
      question: currentQuestion.text,
      answer: '',
      aiReaction: 'Question passée. Passons à la suite.',
      sampleHint: currentQuestion.sampleHint,
      skipped: true
    };
    const nextHistory = [...qaHistory, updatedEntry];
    setQaHistory(nextHistory);
    setAiReaction('Question passée. Adaptons la suite de l’entretien.');
    setUserAnswer('');
    if (!isLastQuestion) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleCompleteInterview = () => {
    setIsEvaluating(true);
    // Include current draft answer if user typed something before clicking Finish
    let finalHistory = [...qaHistory];
    if (userAnswer.trim()) {
      finalHistory.push({
        question: currentQuestion.text,
        answer: userAnswer.trim(),
        aiReaction: generateAdaptiveAIReaction(userAnswer, currentQuestion, config.language),
        sampleHint: currentQuestion.sampleHint,
        skipped: false
      });
    } else if (finalHistory.length === 0) {
      finalHistory.push({
        question: currentQuestion.text,
        answer: currentQuestion.sampleHint,
        aiReaction: 'Réponse de démonstration enregistrée.',
        sampleHint: currentQuestion.sampleHint,
        skipped: false
      });
    }

    setTimeout(() => {
      onFinishSimulation(finalHistory, elapsedSeconds);
    }, 1300);
  };

  if (isEvaluating) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-5 shadow-lg">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#102A43] to-[#1769AA] text-[#35C6D8] flex items-center justify-center mx-auto animate-bounce">
          <Sparkles className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-[#102A43]">Génération de votre rapport d’évaluation IA...</h2>
        <p className="text-sm text-slate-500">
          Analyse de la structure STAR, calcul de la pertinence technique et détection des mots parasites.
        </p>
        <div className="w-64 h-2 bg-slate-100 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#1769AA] to-[#35C6D8] w-4/5 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-12 gap-6 items-start">
      {/* Left Column: Virtual AI Recruiter Presence & Session Telemetry */}
      <div className="lg:col-span-4 space-y-5">
        <div className="bg-[#102A43] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#35C6D8]/10 blur-2xl" />

          {/* Recruiter Avatar & Status */}
          <div className="flex flex-col items-center text-center space-y-3 relative">
            <div className="relative">
              <div
                className={`w-24 h-24 rounded-3xl bg-gradient-to-br from-[#1769AA] to-[#35C6D8] p-0.5 shadow-lg ${
                  isAiThinking ? 'animate-pulse' : ''
                }`}
              >
                <div className="w-full h-full rounded-[22px] bg-[#102A43] flex items-center justify-center">
                  <Bot className="w-12 h-12 text-[#35C6D8]" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500 text-[#102A43] text-[10px] font-extrabold">
                En ligne
              </span>
            </div>

            <div>
              <h2 className="text-lg font-extrabold">InterviewCoach IA</h2>
              <p className="text-xs text-[#35C6D8] font-medium">
                {isAiThinking ? 'Analyse votre réponse...' : 'Recruteur Virtuel Actif • 24h/24'}
              </p>
            </div>

            {/* Simulated Voice Equalizer */}
            <div className="flex items-center justify-center gap-1 h-8 pt-1">
              {[10, 18, 26, 16, 28, 20, 14, 24, 12].map((bar, i) => (
                <span
                  key={i}
                  style={{ height: isAiThinking || isRecording ? `${bar}px` : '6px' }}
                  className="w-1.5 rounded-full bg-[#35C6D8] transition-all duration-300"
                />
              ))}
            </div>
          </div>

          {/* Timer & Question Progress */}
          <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 gap-3 text-center">
            <div className="bg-white/5 rounded-2xl p-3">
              <p className="text-[11px] text-slate-400 uppercase font-bold">Chronomètre</p>
              <p className="text-lg font-black text-white mt-0.5 flex items-center justify-center gap-1.5">
                <Clock className="w-4 h-4 text-[#35C6D8]" />
                {formatTime(elapsedSeconds)}
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-3">
              <p className="text-[11px] text-slate-400 uppercase font-bold">Progression</p>
              <p className="text-lg font-black text-[#35C6D8] mt-0.5">
                {Math.min(questions.length, qaHistory.length + 1)} / {questions.length}
              </p>
            </div>
          </div>

          {/* Session Metadata Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
            <span className="px-2.5 py-1 rounded-lg bg-white/10 text-[11px] font-medium">{config.type}</span>
            <span className="px-2.5 py-1 rounded-lg bg-white/10 text-[11px] font-medium">{config.difficulty}</span>
            <span className="px-2.5 py-1 rounded-lg bg-white/10 text-[11px] font-medium">{config.language}</span>
            <span className="px-2.5 py-1 rounded-lg bg-white/10 text-[11px] font-medium">Mode {config.mode}</span>
          </div>
        </div>

        {/* Finish Interview CTA Card */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <p className="text-xs text-slate-500">
            Vous pouvez clôturer la session à tout moment pour générer votre score et votre rapport STAR.
          </p>
          <button
            onClick={handleCompleteInterview}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Terminer l’entretien</span>
          </button>
          <button
            onClick={onCancel}
            className="w-full py-2 text-xs font-medium text-slate-400 hover:text-rose-600 transition cursor-pointer"
          >
            Quitter sans sauvegarder
          </button>
        </div>
      </div>

      {/* Right Column: Active Question, Adaptive AI Feedback & Response Box */}
      <div className="lg:col-span-8 space-y-5">
        {/* Previous Q&A Conversation History */}
        {qaHistory.length > 0 && (
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs max-h-64 overflow-y-auto space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Historique de l’entretien ({qaHistory.length} {qaHistory.length > 1 ? 'réponses' : 'réponse'})
            </p>
            {qaHistory.map((entry, idx) => (
              <div key={idx} className="space-y-2 border-b border-slate-100 pb-3 last:border-none last:pb-0">
                <p className="text-xs font-bold text-[#102A43]">
                  Q{idx + 1} : {entry.question}
                </p>
                <p className="text-xs bg-[#1769AA]/10 text-[#102A43] p-3 rounded-xl">
                  {entry.skipped ? <span className="italic text-slate-500">Question passée</span> : entry.answer}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Adaptive AI Reaction Banner */}
        {aiReaction && (
          <div className="p-4 rounded-2xl bg-[#35C6D8]/15 border border-[#35C6D8]/40 flex items-start gap-3 animate-fadeIn">
            <Sparkles className="w-5 h-5 text-[#1769AA] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-extrabold text-[#102A43]">Réaction de InterviewCoach IA :</p>
              <p className="text-sm text-[#102A43] mt-0.5">{aiReaction}</p>
            </div>
          </div>
        )}

        {/* Current Question Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#1769AA]/20 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-[#1769AA]/10 text-[#1769AA] text-xs font-bold">
              Question {currentIndex + 1} sur {questions.length} • {currentQuestion.category}
            </span>
            <span className="text-xs text-slate-400 font-medium">Poste : {jobData.title}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-[#102A43] leading-relaxed">
            « {currentQuestion.text} »
          </h3>

          {/* Quick Jury Demo Helper to Insert a Realistic Answer */}
          <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setUserAnswer(currentQuestion.sampleHint)}
              className="text-xs font-semibold text-[#1769AA] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" /> Insérer un exemple de réponse structurée (Démo)
            </button>
          </div>
        </div>

        {/* Candidate Answer Input Area */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Votre réponse au recruteur
            </label>
            {isRecording && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                Simulation vocale de démonstration active
              </span>
            )}
          </div>

          <textarea
            rows={4}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Rédigez votre réponse ici en structurant le contexte, vos actions et les résultats obtenus..."
            className="w-full p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-sm text-[#102A43] leading-relaxed focus:bg-white focus:outline-none focus:border-[#1769AA]"
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleMic}
                title="Simulation vocale de démonstration"
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                  isRecording
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-slate-100 text-[#102A43] hover:bg-slate-200'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#1769AA]" />}
                <span>{isRecording ? 'Arrêter micro (Simulé)' : 'Mode Vocal (Simulé)'}</span>
              </button>

              <button
                type="button"
                onClick={handleSkipQuestion}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition flex items-center gap-1.5 cursor-pointer"
              >
                <SkipForward className="w-4 h-4" />
                <span>Passer la question</span>
              </button>
            </div>

            {qaHistory.length >= questions.length - 1 && isLastQuestion ? (
              <button
                type="button"
                onClick={handleCompleteInterview}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#102A43] to-[#1769AA] text-white font-bold text-sm shadow-lg hover:opacity-95 transition flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-[#35C6D8]" />
                <span>Envoyer & Terminer l’entretien</span>
              </button>
            ) : (
              <button
                type="button"
                disabled={!userAnswer.trim() || isAiThinking}
                onClick={handleSendAnswer}
                className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition cursor-pointer ${
                  userAnswer.trim() && !isAiThinking
                    ? 'bg-[#1769AA] text-white shadow-md shadow-[#1769AA]/20 hover:bg-[#102A43]'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Envoyer ma réponse</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// F. DETAILED EVALUATION REPORT COMPONENT
// ============================================================================
function EvaluationReportView({ report, onNewSimulation, onBackToDashboard, showToast }) {
  const radarData = [
    { subject: 'Qualité réponses', value: report.metrics.quality, fullMark: 100 },
    { subject: 'Pertinence tech', value: report.metrics.technical, fullMark: 100 },
    { subject: 'Clarté orale', value: report.metrics.clarity, fullMark: 100 },
    { subject: 'Méthode STAR', value: report.metrics.star, fullMark: 100 },
    {
      subject: 'Fluidité',
      value: Math.max(55, 100 - report.metrics.fillerWordsCount * 6),
      fullMark: 100
    }
  ];

  const handleDownloadPDF = () => {
    const content = `RAPPORT D'EVALUATION - INTERVIEWCOACH IA\n=========================================\nPoste : ${report.jobTitle} (${report.company})\nDate : ${report.date}\nScore Global : ${report.overallScore}/100\nQualité des réponses : ${report.metrics.quality}/100\nPertinence technique : ${report.metrics.technical}/100\nClarté & Communication : ${report.metrics.clarity}/100\nStructure STAR : ${report.metrics.star}/100\nMots parasites détectés : ${report.metrics.fillerWordsCount}\n\nPOINTS FORTS :\n- ${report.strengths.join('\n- ')}\n\nAXES D'AMELIORATION :\n- ${report.improvements.join('\n- ')}`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Rapport_InterviewCoachIA_${report.date}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Rapport téléchargé avec succès !');
  };

  return (
    <div className="space-y-8">
      {/* Top Action Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {/* Score Badge */}
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#102A43] via-[#1769AA] to-[#35C6D8] p-1 shrink-0 shadow-lg">
            <div className="w-full h-full rounded-[20px] bg-white flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-[#102A43]">{report.overallScore}</span>
              <span className="text-[11px] font-bold text-slate-400">/ 100</span>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                {report.overallScore >= 80 ? 'Excellente performance' : report.overallScore >= 70 ? 'Bonne maîtrise' : 'En progression'}
              </span>
              <span className="text-xs text-slate-400">• {report.date} • {report.type}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#102A43]">{report.jobTitle}</h2>
            <p className="text-sm text-slate-500">Entreprise cible : {report.company} • Mode {report.mode}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleDownloadPDF}
            className="px-5 py-3 rounded-xl border border-slate-200 text-[#102A43] font-bold text-xs hover:bg-slate-50 transition flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#1769AA]" />
            <span>Télécharger mon rapport PDF</span>
          </button>
          <button
            onClick={onNewSimulation}
            className="px-5 py-3 rounded-xl bg-[#1769AA] text-white font-bold text-xs shadow-md hover:bg-[#102A43] transition flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Nouvelle simulation</span>
          </button>
        </div>
      </div>

      {/* Breakdown Metrics + Radar Chart */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
          <h3 className="font-bold text-[#102A43] text-base">Indicateurs détaillés de performance</h3>

          <div className="space-y-4">
            {[
              { label: 'Qualité et profondeur des réponses', score: report.metrics.quality, color: 'bg-[#1769AA]' },
              { label: 'Pertinence technique & adéquation poste', score: report.metrics.technical, color: 'bg-[#102A43]' },
              { label: 'Clarté et structure de communication', score: report.metrics.clarity, color: 'bg-[#35C6D8]' },
              { label: 'Application de la méthode STAR', score: report.metrics.star, color: 'bg-emerald-500' }
            ].map((bar, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#102A43]">{bar.label}</span>
                  <span className="text-[#1769AA]">{bar.score} / 100</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div style={{ width: `${bar.score}%` }} className={`h-full ${bar.color} rounded-full`} />
                </div>
              </div>
            ))}
          </div>

          {/* Filler Words Detector Box */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#102A43]">Détection des mots parasites</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Occurrences détectées (« euh », « du coup », « en fait »)
              </p>
            </div>
            <span
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold ${
                report.metrics.fillerWordsCount <= 2
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {report.metrics.fillerWordsCount} détecté(s)
            </span>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <h3 className="font-bold text-[#102A43] text-base mb-2">Profil de compétences évalué</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="72%" data={radarData}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="#1769AA"
                  strokeWidth={2.5}
                  fill="#35C6D8"
                  fillOpacity={0.35}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Strengths, Improvements & AI Recommendations */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-emerald-700 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Points forts
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
            {report.strengths.map((s, i) => (
              <li key={i} className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-amber-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> Axes d’amélioration
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
            {report.improvements.map((imp, i) => (
              <li key={i} className="p-3 rounded-xl bg-amber-50/60 border border-amber-100">
                {imp}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-[#1769AA] flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Recommandations IA
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
            {report.recommendations.map((rec, i) => (
              <li key={i} className="p-3 rounded-xl bg-[#1769AA]/5 border border-[#1769AA]/15">
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Question-by-Question Review */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
        <h3 className="font-bold text-[#102A43] text-lg">Questions à retravailler & Réponses modèles STAR</h3>
        <div className="space-y-4">
          {report.qaList.map((qa, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-3">
              <p className="font-bold text-sm text-[#102A43]">
                Question {idx + 1} : {qa.question}
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                  <span className="font-bold text-slate-400 uppercase block mb-1">Votre réponse</span>
                  <p className="text-slate-700 leading-relaxed">{qa.answer}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#1769AA]/5 border border-[#1769AA]/20">
                  <span className="font-bold text-[#1769AA] uppercase block mb-1">Suggestion optimale IA (STAR)</span>
                  <p className="text-[#102A43] leading-relaxed">{qa.suggestedAnswer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// G. PROGRESS TRACKING & HISTORY VIEW
// ============================================================================
function ProgressAndHistoryView({ simulations, onSelectReport, onNewSimulation }) {
  const [filterType, setFilterType] = useState('Tous');

  const filtered =
    filterType === 'Tous' ? simulations : simulations.filter((s) => s.type === filterType);

  const comparisonData = simulations.map((s, idx) => ({
    session: `S${idx + 1} (${s.type})`,
    Global: s.overallScore,
    Technique: s.metrics.technical,
    STAR: s.metrics.star
  }));

  return (
    <div className="space-y-8">
      {/* Comparison Bar Chart */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg font-extrabold text-[#102A43]">Comparaison multi-sessions</h2>
            <p className="text-xs text-slate-500">Évolution comparative entre score global, technique et méthode STAR</p>
          </div>
          <button
            onClick={onNewSimulation}
            className="px-4 py-2.5 rounded-xl bg-[#1769AA] text-white text-xs font-bold hover:bg-[#102A43] transition self-start cursor-pointer"
          >
            + Nouvelle simulation
          </button>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="session" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '14px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
              <Bar dataKey="Global" fill="#102A43" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Technique" fill="#1769AA" radius={[6, 6, 0, 0]} />
              <Bar dataKey="STAR" fill="#35C6D8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skills Improved vs To Reinforce + 4-Week AI Plan */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-bold text-[#102A43] text-base">Cartographie de vos compétences</h3>
          <div>
            <p className="text-xs font-bold text-emerald-700 mb-2">Compétences améliorées</p>
            <div className="flex flex-wrap gap-2">
              {['Architecture React & Hooks', 'Clarté du pitch de présentation', 'Sécurité API REST / JWT', 'Réduction des mots parasites'].map((s) => (
                <span key={s} className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-amber-700 mb-2">Compétences à renforcer</p>
            <div className="flex flex-wrap gap-2">
              {['Quantification des résultats STAR', 'Conteneurisation Docker / CI-CD', 'Entretien technique en Anglais'].map((s) => (
                <span key={s} className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="font-bold text-[#102A43] text-base">Plan d’entraînement personnalisé (4 semaines)</h3>
          <div className="space-y-2.5 text-xs">
            {[
              { wk: 'Semaine 1', focus: 'Maîtrise de la structure STAR sur 3 projets techniques du CV.' },
              { wk: 'Semaine 2', focus: 'Simulation Technique niveau Avancé (System Design & Scalabilité).' },
              { wk: 'Semaine 3', focus: 'Entraînement en Mode Vocal (Anglais professionnel, 20 min).' },
              { wk: 'Semaine 4', focus: 'Simulation complète en conditions réelles avant entretien final.' }
            ].map((p) => (
              <div key={p.wk} className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-200/70 flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-[#102A43] text-[#35C6D8] font-bold shrink-0">{p.wk}</span>
                <span className="text-slate-700 font-medium">{p.focus}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Simulation History List */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-bold text-[#102A43] text-base">Historique des simulations ({filtered.length})</h3>
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {['Tous', 'Technique', 'RH', 'Comportemental'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  filterType === type ? 'bg-white text-[#1769AA] shadow-xs' : 'text-slate-500'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filtered
            .slice()
            .reverse()
            .map((sim) => (
              <div key={sim.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#102A43]">{sim.jobTitle}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold">
                      {sim.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {sim.company} • {sim.date} • {sim.language} ({sim.mode})
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-lg font-black text-[#1769AA]">{sim.overallScore}/100</span>
                    <p className="text-[11px] text-slate-400">STAR: {sim.metrics.star}%</p>
                  </div>
                  <button
                    onClick={() => onSelectReport(sim)}
                    className="px-4 py-2 rounded-xl bg-[#102A43] text-white text-xs font-bold hover:bg-[#1769AA] transition cursor-pointer"
                  >
                    Consulter le rapport
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// H. UNIVERSITY / INSTITUTION B2B DASHBOARD
// ============================================================================
function B2BDashboard({ lang, setLang, onBackToLanding, onSwitchToCandidate, showToast }) {
  const [period, setPeriod] = useState('Année universitaire 2026-2027');
  const [departmentFilter, setDepartmentFilter] = useState('Tous les départements');

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top B2B Header */}
      <header className="bg-[#102A43] text-white border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BrandLogo light size="sm" />
            <span className="hidden md:inline-flex px-3 py-1 rounded-full bg-[#35C6D8]/20 text-[#35C6D8] text-xs font-bold">
              Espace Établissement • Campus B2B
            </span>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector lang={lang} setLang={setLang} />
            <button
              onClick={onSwitchToCandidate}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold transition cursor-pointer"
            >
              Vue Candidat
            </button>
            <button
              onClick={onBackToLanding}
              className="px-3.5 py-2 rounded-xl bg-[#35C6D8] text-[#102A43] text-xs font-bold hover:bg-white transition cursor-pointer"
            >
              Accueil
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Institution Header & Filters */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#102A43] text-[#35C6D8] flex items-center justify-center shrink-0">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase text-[#1769AA]">Centre de Carrière & Employabilité</span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#102A43]">{B2B_DATA.institutionName}</h1>
              <p className="text-xs text-slate-500">Licence Campus active • 500 sièges étudiants</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#102A43] bg-[#F8FAFC]"
            >
              <option>Ce mois (Novembre 2026)</option>
              <option>Semestre 1 (2026-2027)</option>
              <option>Année universitaire 2026-2027</option>
            </select>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#102A43] bg-[#F8FAFC]"
            >
              <option>Tous les départements</option>
              <option>Génie Logiciel & Systèmes d’Info</option>
              <option>Data Science & IA</option>
              <option>Génie Industriel</option>
            </select>

            <button
              onClick={() => showToast('Export CSV/PDF des statistiques employabilité généré !')}
              className="px-4 py-2.5 rounded-xl bg-[#1769AA] text-white text-xs font-bold hover:bg-[#102A43] transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Exporter Bilan
            </button>
          </div>
        </div>

        {/* 5 B2B KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: 'Étudiants inscrits', value: `${B2B_DATA.enrolledStudents} / 500`, sub: '97% taux d’activation', icon: Users },
            { label: 'Simulations réalisées', value: B2B_DATA.totalSimulations, sub: '+34% vs mois dernier', icon: MessageSquare },
            { label: 'Score moyen étudiants', value: `${B2B_DATA.averageScore}/100`, sub: 'Objectif cible: 75/100', icon: Award },
            { label: 'Taux de progression', value: B2B_DATA.progressionRate, sub: 'Entre session 1 et 4', icon: TrendingUp },
            { label: 'Indice d’employabilité', value: B2B_DATA.employabilityIndex, sub: 'Prêts pour stage PFE / CDI', icon: Briefcase }
          ].map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500">{kpi.label}</span>
                  <Icon className="w-4 h-4 text-[#1769AA]" />
                </div>
                <div className="text-2xl font-black text-[#102A43]">{kpi.value}</div>
                <p className="text-[11px] text-emerald-600 font-semibold mt-1">{kpi.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Charts & Weak Skills Ranking */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Monthly Student Simulations Chart */}
          <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
            <h3 className="font-bold text-[#102A43] text-base mb-1">Activité mensuelle des étudiants ({period})</h3>
            <p className="text-xs text-slate-500 mb-6">Volume de simulations et évolution de la moyenne de promotion</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={B2B_DATA.monthlyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '14px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
                  <Bar dataKey="simulations" name="Simulations réalisées" fill="#1769AA" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Ranking of Skills to Reinforce */}
          <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div>
              <h3 className="font-bold text-[#102A43] text-base">Classement des compétences à renforcer</h3>
              <p className="text-xs text-slate-500">Données agrégées pour orienter les ateliers du centre de carrière</p>
            </div>

            <div className="space-y-3.5">
              {B2B_DATA.weakSkillsRanking.map((item, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#102A43]">
                      #{i + 1} {item.skill}
                    </span>
                    <span className="text-slate-500">
                      {item.studentsAffected} étudiants ({item.gapPercentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${item.gapPercentage}%` }}
                      className="h-full bg-gradient-to-r from-[#102A43] to-[#35C6D8] rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Departments Breakdown Table */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <h3 className="font-bold text-[#102A43] text-base mb-4">Performance par filière académique</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {B2B_DATA.departments.map((dept, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/70 space-y-2">
                <p className="font-bold text-sm text-[#102A43]">{dept.name}</p>
                <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-200/60">
                  <span>{dept.students} étudiants</span>
                  <span className="font-bold text-[#1769AA]">Score: {dept.avgScore}/100</span>
                  <span className="font-bold text-emerald-600">Emp: {dept.employability}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

// ============================================================================
// I. PROFILE, SUBSCRIPTION, SETTINGS & DEMO PAYMENT MODAL
// ============================================================================
function ProfileView({ user, cvData, onUpdateUser }) {
  const [form, setForm] = useState(user);

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateUser(form);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
        <div className="w-16 h-16 rounded-2xl bg-[#102A43] text-white font-extrabold text-xl flex items-center justify-center">
          {form.avatarInitials}
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-[#102A43]">{form.name}</h2>
          <p className="text-xs text-slate-500">{form.role}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Nom complet</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Établissement / Entreprise</label>
          <input
            type="text"
            value={form.university}
            onChange={(e) => setForm({ ...form, university: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Poste recherché</label>
          <input
            type="text"
            value={form.targetJob}
            onChange={(e) => setForm({ ...form, targetJob: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
        </div>

        <div className="sm:col-span-2 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#1769AA]" />
            <div>
              <p className="text-xs font-bold text-[#102A43]">CV enregistré : {cvData.fileName || form.cvUploaded}</p>
              <p className="text-[11px] text-slate-500">Chiffré et supprimable à la demande (RGPD / Sécurité)</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">Actif</span>
        </div>

        <div className="sm:col-span-2 flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#1769AA] text-white font-bold text-sm hover:bg-[#102A43] transition cursor-pointer"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
}

function SubscriptionView({ currentPlan, onSelectPlan }) {
  const plans = [
    {
      name: 'Freemium',
      price: '0 DT',
      desc: '1 simulation par semaine, feedback de base, banque de questions limitée.',
      features: ['1 simulation / semaine', 'Feedback de base', 'Banque de questions limitée']
    },
    {
      name: 'Premium',
      price: '20 DT / mois',
      desc: 'Simulations illimitées, analyse CV & offre, mode vocal, rapports détaillés.',
      features: ['Simulations illimitées', 'Analyse CV + Offre', 'Mode vocal interactif', 'Rapports STAR & suivi']
    },
    {
      name: 'Campus B2B',
      price: '6 000 DT / an',
      desc: 'Licence pour ~500 étudiants, tableau de bord carrière, marque blanche.',
      features: ['Licence ~500 étudiants', 'Tableau de bord carrière', 'Marque blanche', 'Support dédié']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase text-slate-400">Votre formule actuelle</p>
          <h2 className="text-xl font-extrabold text-[#102A43] mt-0.5">Offre {currentPlan}</h2>
        </div>
        <span className="px-3.5 py-1.5 rounded-full bg-[#35C6D8]/20 text-[#102A43] text-xs font-bold">
          Facturation en Dinars Tunisiens (DT)
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p) => {
          const isCurrent = currentPlan === p.name;
          return (
            <div
              key={p.name}
              className={`p-6 rounded-3xl border flex flex-col justify-between ${
                isCurrent ? 'bg-[#102A43] text-white border-[#35C6D8]' : 'bg-white border-slate-200/80'
              }`}
            >
              <div>
                <h3 className="text-lg font-extrabold">{p.name}</h3>
                <p className={`text-2xl font-black mt-2 ${isCurrent ? 'text-[#35C6D8]' : 'text-[#1769AA]'}`}>
                  {p.price}
                </p>
                <p className={`text-xs mt-2 ${isCurrent ? 'text-slate-300' : 'text-slate-500'}`}>{p.desc}</p>
                <ul className="mt-5 space-y-2 text-xs">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle2 className={`w-4 h-4 ${isCurrent ? 'text-[#35C6D8]' : 'text-[#1769AA]'}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                disabled={isCurrent}
                onClick={() => onSelectPlan(p.name, p.price)}
                className={`mt-6 w-full py-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isCurrent
                    ? 'bg-white/15 text-white cursor-default'
                    : 'bg-[#1769AA] text-white hover:bg-[#102A43]'
                }`}
              >
                {isCurrent ? 'Formule active' : `Passer à ${p.name}`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SettingsView({ lang, setLang, onResetDemo, showToast }) {
  const [ecoMode, setEcoMode] = useState(true);

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
      <h2 className="text-lg font-extrabold text-[#102A43]">Paramètres de l’application</h2>

      <div className="flex items-center justify-between py-3 border-b border-slate-100">
        <div>
          <p className="text-sm font-bold text-[#102A43]">Langue de l’interface</p>
          <p className="text-xs text-slate-500">Français, Anglais ou Arabe</p>
        </div>
        <LanguageSelector lang={lang} setLang={setLang} />
      </div>

      <div className="flex items-center justify-between py-3 border-b border-slate-100">
        <div>
          <p className="text-sm font-bold text-[#102A43] flex items-center gap-1.5">
            <Leaf className="w-4 h-4 text-emerald-600" /> Mode Écoconception & IA Sobre
          </p>
          <p className="text-xs text-slate-500">Optimisation du cache sémantique et compression audio</p>
        </div>
        <button
          onClick={() => {
            setEcoMode(!ecoMode);
            showToast('Préférence d’écoconception mise à jour.');
          }}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
            ecoMode ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {ecoMode ? 'Activé' : 'Désactivé'}
        </button>
      </div>

      <div className="pt-2">
        <p className="text-sm font-bold text-[#102A43] mb-1">Données de démonstration (Jury)</p>
        <p className="text-xs text-slate-500 mb-3">
          Réinitialise l’historique des simulations et le profil candidat aux valeurs initiales.
        </p>
        <button
          onClick={onResetDemo}
          className="px-4 py-2.5 rounded-xl bg-slate-100 text-[#102A43] font-bold text-xs hover:bg-slate-200 transition flex items-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" /> Réinitialiser le prototype
        </button>
      </div>
    </div>
  );
}

function PaymentDemoModal({ planName, price, onClose, onSuccess }) {
  const [method, setMethod] = useState('D17');
  const [phoneOrCard, setPhoneOrCard] = useState('22 458 910');
  const [processing, setProcessing] = useState(false);

  const handlePay = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onSuccess(planName);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#102A43]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase text-[#1769AA]">Paiement Sécurisé (Démo)</span>
            <h3 className="text-lg font-extrabold text-[#102A43]">Souscription {planName}</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-600">Total à régler</span>
          <span className="text-xl font-black text-[#102A43]">{price}</span>
        </div>

        <form onSubmit={handlePay} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Moyen de paiement local</label>
            <div className="grid grid-cols-3 gap-2">
              {['D17', 'Flouci', 'Carte Bancaire'].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  className={`py-2.5 px-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    method === m
                      ? 'bg-[#102A43] text-white border-[#102A43]'
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {method === 'Carte Bancaire' ? 'Numéro de carte (Simulation)' : `Numéro mobile ${method}`}
            </label>
            <input
              type="text"
              required
              value={phoneOrCard}
              onChange={(e) => setPhoneOrCard(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1769AA] to-[#35C6D8] text-white font-bold text-sm shadow-lg hover:opacity-95 transition cursor-pointer"
          >
            {processing ? 'Validation en cours...' : `Confirmer le paiement (${price})`}
          </button>
        </form>
      </div>
    </div>
  );
}