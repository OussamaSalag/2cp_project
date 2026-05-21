export type Language = "en" | "ar" | "fr" | "es";

export const languageNames: Record<Language, string> = {
  en: "English",
  ar: "العربية",
  fr: "Français",
  es: "Español",
};

type TranslationKeys = {
  // Common
  teamup: string;
  login: string;
  getStarted: string;
  saveChanges: string;
  search: string;
  back: string;
  backToHome: string;
  submit: string;
  cancel: string;
  edit: string;
  view: string;
  follow: string;
  online: string;
  offline: string;
  seeAll: string;
  members: string;
  active: string;
  open: string;
  done: string;

  // Nav / Sidebar
  overview: string;
  dashboard: string;
  projects: string;
  tasks: string;
  group: string;
  inbox: string;
  profile: string;
  settings: string;
  help: string;

  // Landing
  landingTagline: string;
  heroTitle1: string;
  heroTitle2: string;
  heroTitle3: string;
  heroDesc: string;
  explorePlatform: string;
  browseProjects: string;
  activeProjects: string;
  students: string;
  mentors: string;
  tasksCompleted: string;
  everythingTeamNeeds: string;
  featuresDesc: string;
  projectHub: string;
  projectHubDesc: string;
  taskManager: string;
  taskManagerDesc: string;
  teamInbox: string;
  teamInboxDesc: string;
  footerText: string;

  // Dashboard
  welcomeBack: string;
  goodMorning: string;
  continueJourney: string;
  myTeams: string;
  newMessages: string;
  ourCommunity: string;
  incompleteTasks: string;
  from: string;
  activityThisWeek: string;
  yourMentors: string;
  clickForQuote: string;

  // Projects page
  newProject: string;
  explore: string;
  join: string;
  create: string;
  searchProjects: string;

  // Tasks page
  myTasks: string;
  fromTeamLeader: string;
  fromMentor: string;
  fromTeamMembers: string;
  due: string;
  completed: string;
  progress: string;

  // Group page
  myGroup: string;
  searchMembers: string;

  // Inbox page
  typeMessage: string;

  // Profile page
  schoolEmail: string;
  role: string;
  grade: string;
  school: string;
  language: string;
  mySkills: string;
  myTeamsProfile: string;
  uploadCover: string;
  change: string;
  delete: string;
  student: string;
  mentor: string;

  // Settings page
  notifications: string;
  pushNotifications: string;
  pushNotificationsDesc: string;
  emailNotifications: string;
  emailNotificationsDesc: string;
  soundEffects: string;
  soundEffectsDesc: string;
  appearance: string;
  darkMode: string;
  darkModeDesc: string;
  privacy: string;
  profileVisibility: string;
  profileVisibilityDesc: string;
  showOnlineStatus: string;
  showOnlineStatusDesc: string;

  // Help page
  helpCenter: string;
  faq: string;
  commonQuestions: string;
  contactSupport: string;
  getInTouch: string;
  documentation: string;
  learnMore: string;
  frequentlyAskedQuestions: string;
  faq1Q: string;
  faq1A: string;
  faq2Q: string;
  faq2A: string;
  faq3Q: string;
  faq3A: string;
  faq4Q: string;
  faq4A: string;

  // Signup
  createAccount: string;
  username: string;
  chooseUsername: string;
  whatAreYou: string;
  yourSkills: string;
  selectAtLeast3: string;
  selectYourGrade: string;
  alreadyHaveAccount: string;
  emailPlaceholder: string;
  emailDomainHint: string;
  emailDomainError: string;

  // Login
  welcomeBackLogin: string;
  loginDesc: string;
  sendCode: string;
  verifyCode: string;
  enterCode: string;
  codeSentTo: string;
  resendCode: string;
  dontHaveAccount: string;
  signUp: string;
  verificationRequired: string;
  verificationDesc: string;

  // Search placeholder
  searchPlaceholder: string;
};

export const translations: Record<Language, TranslationKeys> = {
  en: {
    teamup: "TeamUp",
    login: "Login",
    getStarted: "Get Started",
    saveChanges: "Save Changes",
    search: "Search",
    back: "Back",
    backToHome: "Back to home",
    submit: "Submit",
    cancel: "Cancel",
    edit: "Edit",
    view: "View",
    follow: "Follow",
    online: "Online",
    offline: "Offline",
    seeAll: "See all",
    members: "members",
    active: "Active",
    open: "Open",
    done: "Done",

    overview: "Overview",
    dashboard: "Dashboard",
    projects: "Projects",
    tasks: "Tasks",
    group: "Group",
    inbox: "Inbox",
    profile: "Profile",
    settings: "Settings",
    help: "Help",

    landingTagline: "The future of student collaboration",
    heroTitle1: "Connect",
    heroTitle2: "Build",
    heroTitle3: "Innovate Together.",
    heroDesc: "The premium platform for ESI students to discover teammates, showcase projects, and build the next generation of technology.",
    explorePlatform: "Explore Platform",
    browseProjects: "Browse Projects",
    activeProjects: "Active Projects",
    students: "Students",
    mentors: "Mentors",
    tasksCompleted: "Tasks Completed",
    everythingTeamNeeds: "Everything your team needs",
    featuresDesc: "From project creation to real-time messaging — TeamUp has you covered.",
    projectHub: "Project Hub",
    projectHubDesc: "Explore, join, or create projects with your classmates.",
    taskManager: "Task Manager",
    taskManagerDesc: "Stay organized with tasks from leaders, mentors, and peers.",
    teamInbox: "Team Inbox",
    teamInboxDesc: "Real-time messaging to stay in sync with your team.",
    footerText: "© 2026 TeamUp. Built for students, by students.",

    welcomeBack: "WELCOME BACK",
    goodMorning: "Good Morning, Abdelliche Ayoub",
    continueJourney: "Continue your learning journey and achieve your goals!",
    myTeams: "My Teams",
    newMessages: "new",
    ourCommunity: "Our Community",
    incompleteTasks: "Incomplete Tasks",
    from: "From",
    activityThisWeek: "Activity This Week",
    yourMentors: "Your Mentors",
    clickForQuote: "Click for another quote",

    newProject: "New Project",
    explore: "Explore",
    join: "Join",
    create: "Create",
    searchProjects: "Search projects...",

    myTasks: "My Tasks",
    fromTeamLeader: "From Team Leader",
    fromMentor: "From Mentor",
    fromTeamMembers: "From Team Members",
    due: "Due",
    completed: "Completed",
    progress: "Progress",

    myGroup: "My Group",
    searchMembers: "Search members...",

    typeMessage: "Type a message...",

    schoolEmail: "School Email",
    role: "Role",
    grade: "Grade",
    school: "School",
    language: "Language",
    mySkills: "My Skills",
    myTeamsProfile: "My Teams",
    uploadCover: "Upload Cover",
    change: "Change",
    delete: "Delete",
    student: "Student",
    mentor: "Mentor",

    notifications: "Notifications",
    pushNotifications: "Push Notifications",
    pushNotificationsDesc: "Get notified about new tasks and messages",
    emailNotifications: "Email Notifications",
    emailNotificationsDesc: "Receive email updates for important events",
    soundEffects: "Sound Effects",
    soundEffectsDesc: "Play sounds for new messages",
    appearance: "Appearance",
    darkMode: "Dark Mode",
    darkModeDesc: "Switch to dark theme",
    privacy: "Privacy",
    profileVisibility: "Profile Visibility",
    profileVisibilityDesc: "Allow others to see your profile",
    showOnlineStatus: "Show Online Status",
    showOnlineStatusDesc: "Let team members see when you're active",

    helpCenter: "Help Center",
    faq: "FAQ",
    commonQuestions: "Common questions",
    contactSupport: "Contact Support",
    getInTouch: "Get in touch",
    documentation: "Documentation",
    learnMore: "Learn more",
    frequentlyAskedQuestions: "Frequently Asked Questions",
    faq1Q: "How do I join a project?",
    faq1A: "Go to the Projects page, browse available projects, and click 'Join' on any open project.",
    faq2Q: "How do I message my mentor?",
    faq2A: "Navigate to Inbox and select your mentor from the conversation list.",
    faq3Q: "Can I be in multiple teams?",
    faq3A: "Yes! You can join multiple teams and switch between them from your dashboard.",
    faq4Q: "How do I update my skills?",
    faq4A: "Visit your Profile page and edit your skills list from there.",

    createAccount: "Create Account",
    username: "Username",
    chooseUsername: "Choose a username",
    whatAreYou: "What are you?",
    yourSkills: "Your Skills",
    selectAtLeast3: "select at least 3",
    selectYourGrade: "Select your grade",
    alreadyHaveAccount: "Already have an account?",
    emailPlaceholder: "you@esi-sba.dz",
    emailDomainHint: "Must be an @esi-sba.dz email",
    emailDomainError: "Email must end with @esi-sba.dz",

    welcomeBackLogin: "Welcome Back",
    loginDesc: "Sign in with your ESI-SBA email",
    sendCode: "Send Verification Code",
    verifyCode: "Verify Code",
    enterCode: "Enter the 6-digit code",
    codeSentTo: "We sent a verification code to",
    resendCode: "Resend code",
    dontHaveAccount: "Don't have an account?",
    signUp: "Sign Up",
    verificationRequired: "Verify Your Email",
    verificationDesc: "Enter the verification code sent to your email to complete registration.",

    searchPlaceholder: "Search projects, tasks, people...",
  },

  ar: {
    teamup: "TeamUp",
    login: "تسجيل الدخول",
    getStarted: "ابدأ الآن",
    saveChanges: "حفظ التغييرات",
    search: "بحث",
    back: "رجوع",
    backToHome: "العودة للرئيسية",
    submit: "إرسال",
    cancel: "إلغاء",
    edit: "تعديل",
    view: "عرض",
    follow: "متابعة",
    online: "متصل",
    offline: "غير متصل",
    seeAll: "عرض الكل",
    members: "أعضاء",
    active: "نشط",
    open: "مفتوح",
    done: "مكتمل",

    overview: "نظرة عامة",
    dashboard: "لوحة التحكم",
    projects: "المشاريع",
    tasks: "المهام",
    group: "المجموعة",
    inbox: "الرسائل",
    profile: "الملف الشخصي",
    settings: "الإعدادات",
    help: "المساعدة",

    landingTagline: "مستقبل التعاون الطلابي",
    heroTitle1: "تواصل",
    heroTitle2: "ابنِ",
    heroTitle3: "ابتكر معاً.",
    heroDesc: "المنصة المتميزة لطلاب ESI لاكتشاف زملاء الفريق وعرض المشاريع وبناء الجيل القادم من التكنولوجيا.",
    explorePlatform: "استكشف المنصة",
    browseProjects: "تصفح المشاريع",
    activeProjects: "مشاريع نشطة",
    students: "طلاب",
    mentors: "مشرفون",
    tasksCompleted: "مهام مكتملة",
    everythingTeamNeeds: "كل ما يحتاجه فريقك",
    featuresDesc: "من إنشاء المشاريع إلى المراسلة الفورية — TeamUp يغطيك.",
    projectHub: "مركز المشاريع",
    projectHubDesc: "استكشف أو انضم أو أنشئ مشاريع مع زملائك.",
    taskManager: "مدير المهام",
    taskManagerDesc: "ابقَ منظماً مع المهام من القادة والمشرفين والزملاء.",
    teamInbox: "رسائل الفريق",
    teamInboxDesc: "مراسلة فورية للبقاء متزامناً مع فريقك.",
    footerText: "© 2026 TeamUp. صُنع للطلاب، بواسطة الطلاب.",

    welcomeBack: "مرحباً بعودتك",
    goodMorning: "صباح الخير، عبد الإله أيوب",
    continueJourney: "واصل رحلة التعلم وحقق أهدافك!",
    myTeams: "فرقي",
    newMessages: "جديد",
    ourCommunity: "مجتمعنا",
    incompleteTasks: "المهام غير المكتملة",
    from: "من",
    activityThisWeek: "النشاط هذا الأسبوع",
    yourMentors: "مشرفوك",
    clickForQuote: "انقر لاقتباس آخر",

    newProject: "مشروع جديد",
    explore: "استكشاف",
    join: "انضمام",
    create: "إنشاء",
    searchProjects: "ابحث عن مشاريع...",

    myTasks: "مهامي",
    fromTeamLeader: "من قائد الفريق",
    fromMentor: "من المشرف",
    fromTeamMembers: "من أعضاء الفريق",
    due: "الموعد",
    completed: "مكتمل",
    progress: "التقدم",

    myGroup: "مجموعتي",
    searchMembers: "ابحث عن أعضاء...",

    typeMessage: "اكتب رسالة...",

    schoolEmail: "البريد الجامعي",
    role: "الدور",
    grade: "المستوى",
    school: "المدرسة",
    language: "اللغة",
    mySkills: "مهاراتي",
    myTeamsProfile: "فرقي",
    uploadCover: "تحميل الغلاف",
    change: "تغيير",
    delete: "حذف",
    student: "طالب",
    mentor: "مشرف",

    notifications: "الإشعارات",
    pushNotifications: "إشعارات الدفع",
    pushNotificationsDesc: "احصل على إشعارات حول المهام والرسائل الجديدة",
    emailNotifications: "إشعارات البريد",
    emailNotificationsDesc: "استلم تحديثات البريد للأحداث المهمة",
    soundEffects: "المؤثرات الصوتية",
    soundEffectsDesc: "تشغيل الأصوات للرسائل الجديدة",
    appearance: "المظهر",
    darkMode: "الوضع الداكن",
    darkModeDesc: "التبديل إلى السمة الداكنة",
    privacy: "الخصوصية",
    profileVisibility: "ظهور الملف الشخصي",
    profileVisibilityDesc: "السماح للآخرين بمشاهدة ملفك الشخصي",
    showOnlineStatus: "إظهار حالة الاتصال",
    showOnlineStatusDesc: "السماح لأعضاء الفريق بمعرفة متى تكون نشطاً",

    helpCenter: "مركز المساعدة",
    faq: "الأسئلة الشائعة",
    commonQuestions: "أسئلة شائعة",
    contactSupport: "تواصل مع الدعم",
    getInTouch: "تواصل معنا",
    documentation: "التوثيق",
    learnMore: "اعرف المزيد",
    frequentlyAskedQuestions: "الأسئلة المتكررة",
    faq1Q: "كيف أنضم إلى مشروع؟",
    faq1A: "اذهب إلى صفحة المشاريع، تصفح المشاريع المتاحة، وانقر على 'انضمام' في أي مشروع مفتوح.",
    faq2Q: "كيف أراسل مشرفي؟",
    faq2A: "انتقل إلى الرسائل واختر مشرفك من قائمة المحادثات.",
    faq3Q: "هل يمكنني الانضمام لأكثر من فريق؟",
    faq3A: "نعم! يمكنك الانضمام لعدة فرق والتبديل بينها من لوحة التحكم.",
    faq4Q: "كيف أحدّث مهاراتي؟",
    faq4A: "قم بزيارة صفحة ملفك الشخصي وعدّل قائمة مهاراتك من هناك.",

    createAccount: "إنشاء حساب",
    username: "اسم المستخدم",
    chooseUsername: "اختر اسم مستخدم",
    whatAreYou: "ما هو دورك؟",
    yourSkills: "مهاراتك",
    selectAtLeast3: "اختر 3 على الأقل",
    selectYourGrade: "اختر مستواك",
    alreadyHaveAccount: "لديك حساب بالفعل؟",
    emailPlaceholder: "you@esi-sba.dz",
    emailDomainHint: "يجب أن يكون بريد @esi-sba.dz",
    emailDomainError: "يجب أن ينتهي البريد بـ @esi-sba.dz",

    welcomeBackLogin: "مرحباً بعودتك",
    loginDesc: "سجل الدخول ببريد ESI-SBA الخاص بك",
    sendCode: "إرسال رمز التحقق",
    verifyCode: "تحقق من الرمز",
    enterCode: "أدخل الرمز المكون من 6 أرقام",
    codeSentTo: "أرسلنا رمز التحقق إلى",
    resendCode: "إعادة إرسال الرمز",
    dontHaveAccount: "ليس لديك حساب؟",
    signUp: "إنشاء حساب",
    verificationRequired: "تحقق من بريدك الإلكتروني",
    verificationDesc: "أدخل رمز التحقق المرسل إلى بريدك لإكمال التسجيل.",

    searchPlaceholder: "ابحث عن مشاريع، مهام، أشخاص...",
  },

  fr: {
    teamup: "TeamUp",
    login: "Connexion",
    getStarted: "Commencer",
    saveChanges: "Enregistrer",
    search: "Rechercher",
    back: "Retour",
    backToHome: "Retour à l'accueil",
    submit: "Soumettre",
    cancel: "Annuler",
    edit: "Modifier",
    view: "Voir",
    follow: "Suivre",
    online: "En ligne",
    offline: "Hors ligne",
    seeAll: "Voir tout",
    members: "membres",
    active: "Actif",
    open: "Ouvert",
    done: "Terminé",

    overview: "Aperçu",
    dashboard: "Tableau de bord",
    projects: "Projets",
    tasks: "Tâches",
    group: "Groupe",
    inbox: "Messagerie",
    profile: "Profil",
    settings: "Paramètres",
    help: "Aide",

    landingTagline: "L'avenir de la collaboration étudiante",
    heroTitle1: "Connectez",
    heroTitle2: "Construisez",
    heroTitle3: "Innovez Ensemble.",
    heroDesc: "La plateforme premium pour les étudiants d'ESI pour découvrir des coéquipiers, présenter des projets et construire la prochaine génération de technologie.",
    explorePlatform: "Explorer la plateforme",
    browseProjects: "Parcourir les projets",
    activeProjects: "Projets actifs",
    students: "Étudiants",
    mentors: "Mentors",
    tasksCompleted: "Tâches terminées",
    everythingTeamNeeds: "Tout ce dont votre équipe a besoin",
    featuresDesc: "De la création de projets à la messagerie en temps réel — TeamUp vous couvre.",
    projectHub: "Hub de Projets",
    projectHubDesc: "Explorez, rejoignez ou créez des projets avec vos camarades.",
    taskManager: "Gestionnaire de Tâches",
    taskManagerDesc: "Restez organisé avec les tâches des leaders, mentors et pairs.",
    teamInbox: "Messagerie d'Équipe",
    teamInboxDesc: "Messagerie en temps réel pour rester synchronisé avec votre équipe.",
    footerText: "© 2026 TeamUp. Fait pour les étudiants, par les étudiants.",

    welcomeBack: "BON RETOUR",
    goodMorning: "Bonjour, Abdelliche Ayoub",
    continueJourney: "Continuez votre parcours d'apprentissage et atteignez vos objectifs !",
    myTeams: "Mes Équipes",
    newMessages: "nouveau",
    ourCommunity: "Notre Communauté",
    incompleteTasks: "Tâches Incomplètes",
    from: "De",
    activityThisWeek: "Activité cette semaine",
    yourMentors: "Vos Mentors",
    clickForQuote: "Cliquez pour une autre citation",

    newProject: "Nouveau Projet",
    explore: "Explorer",
    join: "Rejoindre",
    create: "Créer",
    searchProjects: "Rechercher des projets...",

    myTasks: "Mes Tâches",
    fromTeamLeader: "Du Chef d'Équipe",
    fromMentor: "Du Mentor",
    fromTeamMembers: "Des Membres de l'Équipe",
    due: "Échéance",
    completed: "Terminé",
    progress: "Progrès",

    myGroup: "Mon Groupe",
    searchMembers: "Rechercher des membres...",

    typeMessage: "Écrire un message...",

    schoolEmail: "Email universitaire",
    role: "Rôle",
    grade: "Niveau",
    school: "École",
    language: "Langue",
    mySkills: "Mes Compétences",
    myTeamsProfile: "Mes Équipes",
    uploadCover: "Télécharger la couverture",
    change: "Changer",
    delete: "Supprimer",
    student: "Étudiant",
    mentor: "Mentor",

    notifications: "Notifications",
    pushNotifications: "Notifications push",
    pushNotificationsDesc: "Recevez des notifications pour les nouvelles tâches et messages",
    emailNotifications: "Notifications par email",
    emailNotificationsDesc: "Recevez des mises à jour par email pour les événements importants",
    soundEffects: "Effets sonores",
    soundEffectsDesc: "Jouer des sons pour les nouveaux messages",
    appearance: "Apparence",
    darkMode: "Mode sombre",
    darkModeDesc: "Passer au thème sombre",
    privacy: "Confidentialité",
    profileVisibility: "Visibilité du profil",
    profileVisibilityDesc: "Permettre aux autres de voir votre profil",
    showOnlineStatus: "Afficher le statut en ligne",
    showOnlineStatusDesc: "Permettre aux membres de voir quand vous êtes actif",

    helpCenter: "Centre d'Aide",
    faq: "FAQ",
    commonQuestions: "Questions courantes",
    contactSupport: "Contacter le Support",
    getInTouch: "Nous contacter",
    documentation: "Documentation",
    learnMore: "En savoir plus",
    frequentlyAskedQuestions: "Questions Fréquemment Posées",
    faq1Q: "Comment rejoindre un projet ?",
    faq1A: "Allez sur la page Projets, parcourez les projets disponibles et cliquez sur 'Rejoindre' pour tout projet ouvert.",
    faq2Q: "Comment contacter mon mentor ?",
    faq2A: "Allez dans la Messagerie et sélectionnez votre mentor dans la liste des conversations.",
    faq3Q: "Puis-je être dans plusieurs équipes ?",
    faq3A: "Oui ! Vous pouvez rejoindre plusieurs équipes et naviguer entre elles depuis votre tableau de bord.",
    faq4Q: "Comment mettre à jour mes compétences ?",
    faq4A: "Visitez votre page Profil et modifiez votre liste de compétences.",

    createAccount: "Créer un Compte",
    username: "Nom d'utilisateur",
    chooseUsername: "Choisissez un nom d'utilisateur",
    whatAreYou: "Quel est votre rôle ?",
    yourSkills: "Vos Compétences",
    selectAtLeast3: "sélectionnez au moins 3",
    selectYourGrade: "Sélectionnez votre niveau",
    alreadyHaveAccount: "Vous avez déjà un compte ?",
    emailPlaceholder: "vous@esi-sba.dz",
    emailDomainHint: "Doit être un email @esi-sba.dz",
    emailDomainError: "L'email doit se terminer par @esi-sba.dz",

    welcomeBackLogin: "Bon Retour",
    loginDesc: "Connectez-vous avec votre email ESI-SBA",
    sendCode: "Envoyer le code de vérification",
    verifyCode: "Vérifier le code",
    enterCode: "Entrez le code à 6 chiffres",
    codeSentTo: "Nous avons envoyé un code de vérification à",
    resendCode: "Renvoyer le code",
    dontHaveAccount: "Pas encore de compte ?",
    signUp: "S'inscrire",
    verificationRequired: "Vérifiez votre email",
    verificationDesc: "Entrez le code de vérification envoyé à votre email pour terminer l'inscription.",

    searchPlaceholder: "Rechercher projets, tâches, personnes...",
  },

  es: {
    teamup: "TeamUp",
    login: "Iniciar Sesión",
    getStarted: "Comenzar",
    saveChanges: "Guardar Cambios",
    search: "Buscar",
    back: "Volver",
    backToHome: "Volver al inicio",
    submit: "Enviar",
    cancel: "Cancelar",
    edit: "Editar",
    view: "Ver",
    follow: "Seguir",
    online: "En línea",
    offline: "Desconectado",
    seeAll: "Ver todo",
    members: "miembros",
    active: "Activo",
    open: "Abierto",
    done: "Completado",

    overview: "Vista General",
    dashboard: "Panel",
    projects: "Proyectos",
    tasks: "Tareas",
    group: "Grupo",
    inbox: "Bandeja",
    profile: "Perfil",
    settings: "Configuración",
    help: "Ayuda",

    landingTagline: "El futuro de la colaboración estudiantil",
    heroTitle1: "Conecta",
    heroTitle2: "Construye",
    heroTitle3: "Innova Juntos.",
    heroDesc: "La plataforma premium para estudiantes de ESI para descubrir compañeros de equipo, mostrar proyectos y construir la próxima generación de tecnología.",
    explorePlatform: "Explorar Plataforma",
    browseProjects: "Ver Proyectos",
    activeProjects: "Proyectos Activos",
    students: "Estudiantes",
    mentors: "Mentores",
    tasksCompleted: "Tareas Completadas",
    everythingTeamNeeds: "Todo lo que tu equipo necesita",
    featuresDesc: "Desde la creación de proyectos hasta mensajería en tiempo real — TeamUp te cubre.",
    projectHub: "Hub de Proyectos",
    projectHubDesc: "Explora, únete o crea proyectos con tus compañeros.",
    taskManager: "Gestor de Tareas",
    taskManagerDesc: "Mantente organizado con tareas de líderes, mentores y compañeros.",
    teamInbox: "Bandeja del Equipo",
    teamInboxDesc: "Mensajería en tiempo real para mantenerte sincronizado con tu equipo.",
    footerText: "© 2026 TeamUp. Hecho para estudiantes, por estudiantes.",

    welcomeBack: "BIENVENIDO DE VUELTA",
    goodMorning: "Buenos Días, Abdelliche Ayoub",
    continueJourney: "¡Continúa tu camino de aprendizaje y alcanza tus metas!",
    myTeams: "Mis Equipos",
    newMessages: "nuevo",
    ourCommunity: "Nuestra Comunidad",
    incompleteTasks: "Tareas Incompletas",
    from: "De",
    activityThisWeek: "Actividad esta semana",
    yourMentors: "Tus Mentores",
    clickForQuote: "Haz clic para otra cita",

    newProject: "Nuevo Proyecto",
    explore: "Explorar",
    join: "Unirse",
    create: "Crear",
    searchProjects: "Buscar proyectos...",

    myTasks: "Mis Tareas",
    fromTeamLeader: "Del Líder de Equipo",
    fromMentor: "Del Mentor",
    fromTeamMembers: "De los Miembros del Equipo",
    due: "Vence",
    completed: "Completado",
    progress: "Progreso",

    myGroup: "Mi Grupo",
    searchMembers: "Buscar miembros...",

    typeMessage: "Escribe un mensaje...",

    schoolEmail: "Email universitario",
    role: "Rol",
    grade: "Nivel",
    school: "Escuela",
    language: "Idioma",
    mySkills: "Mis Habilidades",
    myTeamsProfile: "Mis Equipos",
    uploadCover: "Subir Portada",
    change: "Cambiar",
    delete: "Eliminar",
    student: "Estudiante",
    mentor: "Mentor",

    notifications: "Notificaciones",
    pushNotifications: "Notificaciones push",
    pushNotificationsDesc: "Recibe notificaciones sobre nuevas tareas y mensajes",
    emailNotifications: "Notificaciones por email",
    emailNotificationsDesc: "Recibe actualizaciones por email para eventos importantes",
    soundEffects: "Efectos de sonido",
    soundEffectsDesc: "Reproducir sonidos para mensajes nuevos",
    appearance: "Apariencia",
    darkMode: "Modo oscuro",
    darkModeDesc: "Cambiar al tema oscuro",
    privacy: "Privacidad",
    profileVisibility: "Visibilidad del perfil",
    profileVisibilityDesc: "Permitir que otros vean tu perfil",
    showOnlineStatus: "Mostrar estado en línea",
    showOnlineStatusDesc: "Permitir que los miembros vean cuándo estás activo",

    helpCenter: "Centro de Ayuda",
    faq: "FAQ",
    commonQuestions: "Preguntas comunes",
    contactSupport: "Contactar Soporte",
    getInTouch: "Contáctanos",
    documentation: "Documentación",
    learnMore: "Saber más",
    frequentlyAskedQuestions: "Preguntas Frecuentes",
    faq1Q: "¿Cómo me uno a un proyecto?",
    faq1A: "Ve a la página de Proyectos, explora los proyectos disponibles y haz clic en 'Unirse' en cualquier proyecto abierto.",
    faq2Q: "¿Cómo contacto a mi mentor?",
    faq2A: "Ve a la Bandeja y selecciona tu mentor de la lista de conversaciones.",
    faq3Q: "¿Puedo estar en varios equipos?",
    faq3A: "¡Sí! Puedes unirte a varios equipos y cambiar entre ellos desde tu panel.",
    faq4Q: "¿Cómo actualizo mis habilidades?",
    faq4A: "Visita tu página de Perfil y edita tu lista de habilidades desde ahí.",

    createAccount: "Crear Cuenta",
    username: "Nombre de usuario",
    chooseUsername: "Elige un nombre de usuario",
    whatAreYou: "¿Cuál es tu rol?",
    yourSkills: "Tus Habilidades",
    selectAtLeast3: "selecciona al menos 3",
    selectYourGrade: "Selecciona tu nivel",
    alreadyHaveAccount: "¿Ya tienes una cuenta?",
    emailPlaceholder: "tu@esi-sba.dz",
    emailDomainHint: "Debe ser un email @esi-sba.dz",
    emailDomainError: "El email debe terminar en @esi-sba.dz",

    welcomeBackLogin: "Bienvenido de Vuelta",
    loginDesc: "Inicia sesión con tu email ESI-SBA",
    sendCode: "Enviar código de verificación",
    verifyCode: "Verificar código",
    enterCode: "Ingresa el código de 6 dígitos",
    codeSentTo: "Enviamos un código de verificación a",
    resendCode: "Reenviar código",
    dontHaveAccount: "¿No tienes una cuenta?",
    signUp: "Registrarse",
    verificationRequired: "Verifica tu email",
    verificationDesc: "Ingresa el código de verificación enviado a tu email para completar el registro.",

    searchPlaceholder: "Buscar proyectos, tareas, personas...",
  },
};
