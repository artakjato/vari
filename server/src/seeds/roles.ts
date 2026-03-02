export const roles = [

  {
    slug: "fullstack-engineer",
    name: "Full-Stack Engineer",
    description: "Builds both frontend and backend systems. Versatile but must stay current on many technologies.",
    industrySlug: "web-development",
    districtSlug: "backend",
    learningPath: [
      { order: 1, title: "Web Fundamentals", description: "HTML, CSS, and JavaScript basics including DOM manipulation and responsive design.", estimatedHours: 60, resources: [{ name: "MDN Web Docs", url: "https://developer.mozilla.org", type: "free" }, { name: "freeCodeCamp", url: "https://freecodecamp.org", type: "free" }] },
      { order: 2, title: "Frontend Framework", description: "Pick React or Vue â€” learn components, state management, and routing.", estimatedHours: 80, resources: [{ name: "React Docs", url: "https://react.dev", type: "free" }] },
      { order: 3, title: "Backend & APIs", description: "Node.js with Express or NestJS, REST/GraphQL, authentication with JWT.", estimatedHours: 80, resources: [{ name: "Node.js Docs", url: "https://nodejs.org/en/docs/", type: "free" }, { name: "The Odin Project", url: "https://theodinproject.com", type: "free" }] },
      { order: 4, title: "Databases & Deployment", description: "PostgreSQL/MongoDB, Docker basics, and deploying to Vercel/Railway.", estimatedHours: 40, resources: [{ name: "PostgreSQL Tutorial", url: "https://postgresqltutorial.com", type: "free" }] },
    ],
    courses: [
      { name: "Full-Stack Open (Helsinki)", provider: "University of Helsinki", url: "https://fullstackopen.com", rating: 4.9, type: "free", timeToMarket: "1 Ã¥r", postGradSalary: 52000 },
      { name: "The Complete Web Developer", provider: "Udemy", url: "https://udemy.com", rating: 4.7, type: "paid", timeToMarket: "6 mÃ¥nader", postGradSalary: 48000 },
    ],
  },
  {
    slug: "frontend-engineer",
    name: "Frontend Engineer",
    description: "Specializes in user interfaces, accessibility, and browser performance.",
    industrySlug: "web-development",
    districtSlug: "frontend",
    learningPath: [
      { order: 1, title: "HTML & CSS Mastery", description: "Semantic HTML, Flexbox, Grid, animations, and responsive patterns.", estimatedHours: 50, resources: [{ name: "CSS-Tricks", url: "https://css-tricks.com", type: "free" }] },
      { order: 2, title: "JavaScript Deep Dive", description: "ES6+, closures, async/await, event loop, and DOM APIs.", estimatedHours: 60, resources: [{ name: "JavaScript.info", url: "https://javascript.info", type: "free" }] },
      { order: 3, title: "React Ecosystem", description: "Components, hooks, context, React Router, and state management.", estimatedHours: 80, resources: [{ name: "React Docs", url: "https://react.dev", type: "free" }, { name: "Epic React", url: "https://epicreact.dev", type: "paid" }] },
      { order: 4, title: "Testing & Performance", description: "Jest, React Testing Library, Lighthouse audits, and bundle optimization.", estimatedHours: 30, resources: [{ name: "Testing Library Docs", url: "https://testing-library.com", type: "free" }] },
    ],
    courses: [
      { name: "Frontend Career Path", provider: "Scrimba", url: "https://scrimba.com", rating: 4.8, type: "paid", timeToMarket: "6 mÃ¥nader", postGradSalary: 45000 },
      { name: "CS50 Web Programming", provider: "Harvard (edX)", url: "https://cs50.harvard.edu/web/", rating: 4.9, type: "free", timeToMarket: "12 veckor", postGradSalary: 42000 },
    ],
  },
  {
    slug: "backend-engineer",
    name: "Backend Engineer",
    description: "Designs APIs, databases, and server logic that power applications.",
    industrySlug: "web-development",
    districtSlug: "backend",
    learningPath: [
      { order: 1, title: "Programming Foundations", description: "Pick TypeScript, Python, or Go. Master data structures and OOP.", estimatedHours: 80, resources: [{ name: "TypeScript Handbook", url: "https://typescriptlang.org/docs/", type: "free" }] },
      { order: 2, title: "API Design", description: "RESTful conventions, GraphQL schema design, authentication, and rate limiting.", estimatedHours: 50, resources: [{ name: "GraphQL.org Learn", url: "https://graphql.org/learn/", type: "free" }] },
      { order: 3, title: "Database Engineering", description: "Relational modeling (PostgreSQL), document stores (MongoDB), and query optimization.", estimatedHours: 60, resources: [{ name: "Use The Index, Luke", url: "https://use-the-index-luke.com", type: "free" }] },
      { order: 4, title: "DevOps Essentials", description: "Docker, CI/CD pipelines, logging, monitoring, and basic Kubernetes.", estimatedHours: 40, resources: [{ name: "Docker Docs", url: "https://docs.docker.com", type: "free" }] },
    ],
    courses: [
      { name: "Backend Master Class (Go)", provider: "Udemy (TECH SCHOOL)", url: "https://udemy.com", rating: 4.8, type: "paid", timeToMarket: "4 mÃ¥nader", postGradSalary: 54000 },
      { name: "Designing Data-Intensive Apps", provider: "O'Reilly", url: "https://dataintensive.net", rating: 4.9, type: "paid", timeToMarket: "3 mÃ¥nader", postGradSalary: 56000 },
    ],
  },

  {
    slug: "ios-developer",
    name: "iOS Developer",
    description: "Builds native Apple apps using Swift and SwiftUI for iPhone and iPad.",
    industrySlug: "mobile-development", districtSlug: "ios",
    learningPath: [
      { order: 1, title: "Swift Language", description: "Syntax, optionals, protocols, generics, and async/await.", estimatedHours: 60, resources: [{ name: "Hacking with Swift", url: "https://hackingwithswift.com", type: "free" }] },
      { order: 2, title: "SwiftUI & UIKit", description: "Declarative UI, navigation, and UIKit interop.", estimatedHours: 80, resources: [{ name: "Apple Tutorials", url: "https://developer.apple.com/tutorials/swiftui", type: "free" }] },
      { order: 3, title: "Data & Networking", description: "Core Data, URLSession, Combine, and REST/GraphQL APIs.", estimatedHours: 40, resources: [{ name: "Donny Wals Blog", url: "https://donnywals.com", type: "free" }] },
    ],
    courses: [
      { name: "100 Days of SwiftUI", provider: "Hacking with Swift", url: "https://hackingwithswift.com/100/swiftui", rating: 4.9, type: "free", timeToMarket: "100 dagar", postGradSalary: 51000 },
      { name: "iOS & Swift Bootcamp", provider: "Udemy (Angela Yu)", url: "https://udemy.com", rating: 4.8, type: "paid", timeToMarket: "12 veckor", postGradSalary: 49000 },
    ],
  },
  {
    slug: "android-developer",
    name: "Android Developer",
    description: "Creates apps for the Android platform using Kotlin and Jetpack Compose.",
    industrySlug: "mobile-development", districtSlug: "android",
    learningPath: [
      { order: 1, title: "Kotlin Fundamentals", description: "Syntax, null safety, coroutines, and functional idioms.", estimatedHours: 50, resources: [{ name: "Kotlin Docs", url: "https://kotlinlang.org/docs/home.html", type: "free" }] },
      { order: 2, title: "Jetpack Compose", description: "Declarative UI, theming, navigation, and state hoisting.", estimatedHours: 60, resources: [{ name: "Android Compose Tutorial", url: "https://developer.android.com/jetpack/compose/tutorial", type: "free" }] },
      { order: 3, title: "Architecture & Data", description: "MVVM, Room, Retrofit, Hilt, and DataStore.", estimatedHours: 50, resources: [{ name: "Android Architecture Guide", url: "https://developer.android.com/topic/architecture", type: "free" }] },
    ],
    courses: [
      { name: "Android Basics with Compose", provider: "Google", url: "https://developer.android.com/courses", rating: 4.7, type: "free", timeToMarket: "4 mÃ¥nader", postGradSalary: 49000 },
    ],
  },

  {
    slug: "ml-engineer",
    name: "ML Engineer",
    description: "Builds and deploys machine learning models into production systems.",
    industrySlug: "data-ai", districtSlug: "machine-learning",
    learningPath: [
      { order: 1, title: "Python & Math Foundations", description: "NumPy, Pandas, linear algebra, probability, and statistics.", estimatedHours: 80, resources: [{ name: "Khan Academy", url: "https://khanacademy.org", type: "free" }] },
      { order: 2, title: "Classical ML", description: "Supervised/unsupervised learning, scikit-learn, and model evaluation.", estimatedHours: 60, resources: [{ name: "Kaggle Learn", url: "https://kaggle.com/learn", type: "free" }] },
      { order: 3, title: "Deep Learning", description: "Neural networks, CNNs, transformers, and PyTorch.", estimatedHours: 80, resources: [{ name: "fast.ai", url: "https://fast.ai", type: "free" }] },
      { order: 4, title: "MLOps & Deployment", description: "MLflow, Docker, model serving, monitoring, and CI/CD for ML.", estimatedHours: 50, resources: [{ name: "Made With ML", url: "https://madewithml.com", type: "free" }] },
    ],
    courses: [
      { name: "ML Specialization", provider: "Stanford (Coursera)", url: "https://coursera.org", rating: 4.9, type: "paid", timeToMarket: "3 mÃ¥nader", postGradSalary: 58000 },
      { name: "Practical Deep Learning", provider: "fast.ai", url: "https://course.fast.ai", rating: 4.8, type: "free", timeToMarket: "7 veckor", postGradSalary: 55000 },
    ],
  },

  {
    slug: "devops-engineer",
    name: "DevOps Engineer",
    description: "Automates deployments, manages infrastructure, and ensures system reliability.",
    industrySlug: "devops", districtSlug: "ci-cd",
    learningPath: [
      { order: 1, title: "Linux & Networking", description: "Shell scripting, TCP/IP, DNS, and SSH.", estimatedHours: 50, resources: [{ name: "Linux Journey", url: "https://linuxjourney.com", type: "free" }] },
      { order: 2, title: "Containers & Orchestration", description: "Docker, Kubernetes, and Helm charts.", estimatedHours: 60, resources: [{ name: "Kubernetes.io Tutorials", url: "https://kubernetes.io/docs/tutorials/", type: "free" }] },
      { order: 3, title: "CI/CD Pipelines", description: "GitHub Actions, GitLab CI, and artifact management.", estimatedHours: 40, resources: [{ name: "GitHub Actions Docs", url: "https://docs.github.com/en/actions", type: "free" }] },
      { order: 4, title: "Infrastructure as Code", description: "Terraform modules, Ansible, and cloud provisioning.", estimatedHours: 50, resources: [{ name: "Terraform Tutorials", url: "https://developer.hashicorp.com/terraform/tutorials", type: "free" }] },
      { order: 5, title: "Observability", description: "Prometheus, Grafana, logging, and SLO concepts.", estimatedHours: 30, resources: [{ name: "Prometheus Docs", url: "https://prometheus.io/docs/", type: "free" }] },
    ],
    courses: [
      { name: "DevOps with Docker", provider: "University of Helsinki", url: "https://devopswithdocker.com", rating: 4.7, type: "free", timeToMarket: "3 mÃ¥nader", postGradSalary: 52000 },
      { name: "CKA Certification Prep", provider: "KodeKloud", url: "https://kodekloud.com", rating: 4.8, type: "paid", timeToMarket: "8 veckor", postGradSalary: 58000 },
    ],
  },

  {
    slug: "security-analyst",
    name: "Security Analyst",
    description: "Monitors and protects systems from cyber threats and vulnerabilities.",
    industrySlug: "cybersecurity", districtSlug: "defensive-security",
    learningPath: [
      { order: 1, title: "Networking & OS", description: "TCP/IP, DNS, firewalls, Linux, and Windows AD.", estimatedHours: 60, resources: [{ name: "Professor Messer", url: "https://professormesser.com", type: "free" }] },
      { order: 2, title: "Security Fundamentals", description: "CIA triad, OWASP Top 10, encryption, and PKI.", estimatedHours: 40, resources: [{ name: "OWASP.org", url: "https://owasp.org", type: "free" }] },
      { order: 3, title: "SIEM & Incident Response", description: "Splunk/Elastic SIEM, log analysis, and threat hunting.", estimatedHours: 50, resources: [{ name: "Splunk Fundamentals", url: "https://education.splunk.com", type: "free" }] },
    ],
    courses: [
      { name: "CompTIA Security+ Prep", provider: "Professor Messer", url: "https://professormesser.com", rating: 4.8, type: "free", timeToMarket: "3 mÃ¥nader", postGradSalary: 48000 },
      { name: "SOC Level 1 Path", provider: "TryHackMe", url: "https://tryhackme.com", rating: 4.7, type: "paid", timeToMarket: "8 veckor", postGradSalary: 50000 },
    ],
  },

  {
    slug: "gameplay-engineer",
    name: "Gameplay Engineer",
    description: "Implements core game mechanics, player controls, and moment-to-moment feel.",
    industrySlug: "gaming", districtSlug: "game-logic",
    learningPath: [
      { order: 1, title: "C# or C++ Basics", description: "Language fundamentals, OOP, and debugging.", estimatedHours: 60, resources: [{ name: "Learn C# (Microsoft)", url: "https://learn.microsoft.com/en-us/dotnet/csharp/", type: "free" }] },
      { order: 2, title: "Game Engine Basics", description: "Unity or Unreal â€” scenes, scripting, physics.", estimatedHours: 80, resources: [{ name: "Unity Learn", url: "https://learn.unity.com", type: "free" }] },
      { order: 3, title: "Game Design Patterns", description: "State machines, component systems, and game loops.", estimatedHours: 40, resources: [{ name: "Game Programming Patterns", url: "https://gameprogrammingpatterns.com", type: "free" }] },
    ],
    courses: [
      { name: "Complete Unity Game Developer", provider: "Udemy (GameDev.tv)", url: "https://udemy.com", rating: 4.7, type: "paid", timeToMarket: "6 mÃ¥nader", postGradSalary: 45000 },
      { name: "CS50 Game Development", provider: "Harvard (edX)", url: "https://cs50.harvard.edu/games/", rating: 4.8, type: "free", timeToMarket: "12 veckor", postGradSalary: 43000 },
    ],
  },
  {
    slug: "engine-programmer",
    name: "Engine Programmer",
    description: "Builds rendering, physics, streaming, and performance-critical engine systems.",
    industrySlug: "gaming", districtSlug: "engines-3d",
    learningPath: [
      { order: 1, title: "C++ Mastery", description: "Templates, RAII, move semantics, multithreading.", estimatedHours: 100, resources: [{ name: "LearnCpp.com", url: "https://learncpp.com", type: "free" }] },
      { order: 2, title: "Graphics Programming", description: "OpenGL/Vulkan, shaders, and rendering pipelines.", estimatedHours: 80, resources: [{ name: "LearnOpenGL", url: "https://learnopengl.com", type: "free" }] },
      { order: 3, title: "Engine Architecture", description: "ECS, asset streaming, physics engines, memory allocators.", estimatedHours: 60, resources: [{ name: "Game Engine Architecture", url: "https://gameenginebook.com", type: "paid" }] },
    ],
    courses: [
      { name: "Computer Graphics", provider: "Stanford Online", url: "https://online.stanford.edu", rating: 4.6, type: "free", timeToMarket: "1 termin", postGradSalary: 55000 },
    ],
  },
  {
    slug: "online-systems-engineer",
    name: "Online Systems Engineer",
    description: "Designs matchmaking, multiplayer services, and live game backend systems.",
    industrySlug: "gaming", districtSlug: "engines-3d",
    learningPath: [
      { order: 1, title: "Networking Fundamentals", description: "TCP/UDP, latency compensation, and NAT traversal.", estimatedHours: 50, resources: [{ name: "Beej's Guide", url: "https://beej.us/guide/bgnet/", type: "free" }] },
      { order: 2, title: "Backend Services", description: "REST APIs, database design, and matchmaking.", estimatedHours: 60, resources: [{ name: "PlayFab Docs", url: "https://learn.microsoft.com/en-us/gaming/playfab/", type: "free" }] },
    ],
    courses: [
      { name: "Multiplayer Game Programming", provider: "Udemy", url: "https://udemy.com", rating: 4.4, type: "paid", timeToMarket: "3 mÃ¥nader", postGradSalary: 52000 },
    ],
  },

  {
    slug: "site-reliability-engineer",
    name: "Site Reliability Engineer",
    description: "Keeps services healthy through SLOs, incident response, and resilience engineering.",
    industrySlug: "cloud-infrastructure", districtSlug: "cloud-platforms",
    learningPath: [
      { order: 1, title: "Linux & Scripting", description: "Advanced shell, Python automation, and troubleshooting.", estimatedHours: 50, resources: [{ name: "Linux Bible", url: "https://linuxcommand.org", type: "free" }] },
      { order: 2, title: "Cloud Platforms", description: "AWS core services (EC2, S3, IAM, VPC).", estimatedHours: 60, resources: [{ name: "AWS Free Tier", url: "https://aws.amazon.com/free/", type: "free" }] },
      { order: 3, title: "SRE Practices", description: "SLIs/SLOs/SLAs, error budgets, and blameless postmortems.", estimatedHours: 40, resources: [{ name: "Google SRE Book", url: "https://sre.google/sre-book/table-of-contents/", type: "free" }] },
    ],
    courses: [
      { name: "SRE (Google)", provider: "Coursera", url: "https://coursera.org", rating: 4.6, type: "paid", timeToMarket: "3 mÃ¥nader", postGradSalary: 60000 },
      { name: "AWS Solutions Architect", provider: "A Cloud Guru", url: "https://acloudguru.com", rating: 4.7, type: "paid", timeToMarket: "8 veckor", postGradSalary: 62000 },
    ],
  },
  {
    slug: "platform-engineer",
    name: "Platform Engineer",
    description: "Builds internal platforms and paved roads so product teams can move fast safely.",
    industrySlug: "cloud-infrastructure", districtSlug: "containers",
    learningPath: [
      { order: 1, title: "Containers & Kubernetes", description: "Docker builds, K8s architecture, RBAC, and Helm.", estimatedHours: 60, resources: [{ name: "Kubernetes.io", url: "https://kubernetes.io/docs/", type: "free" }] },
      { order: 2, title: "Infrastructure as Code", description: "Terraform, state management, and GitOps.", estimatedHours: 50, resources: [{ name: "Terraform Learn", url: "https://developer.hashicorp.com/terraform/tutorials", type: "free" }] },
      { order: 3, title: "Developer Experience", description: "Backstage portals, golden paths, and self-service.", estimatedHours: 40, resources: [{ name: "Backstage.io", url: "https://backstage.io/docs/", type: "free" }] },
    ],
    courses: [
      { name: "CKA Certification", provider: "KodeKloud", url: "https://kodekloud.com", rating: 4.8, type: "paid", timeToMarket: "6 veckor", postGradSalary: 58000 },
    ],
  },
  {
    slug: "cloud-devops-engineer",
    name: "Cloud DevOps Engineer",
    description: "Automates build, deploy, and infrastructure workflows to ship reliably in cloud environments.",
    industrySlug: "cloud-infrastructure", districtSlug: "ci-cd",
    learningPath: [
      { order: 1, title: "Cloud Fundamentals", description: "AWS/GCP core services, IAM, and networking.", estimatedHours: 50, resources: [{ name: "AWS Cloud Practitioner", url: "https://aws.amazon.com/certification/certified-cloud-practitioner/", type: "free" }] },
      { order: 2, title: "CI/CD Mastery", description: "Pipeline design, GitHub Actions, and testing strategies.", estimatedHours: 40, resources: [{ name: "GitHub Actions Docs", url: "https://docs.github.com/en/actions", type: "free" }] },
      { order: 3, title: "IaC & Configuration", description: "Terraform, Ansible, and environment management.", estimatedHours: 40, resources: [{ name: "Ansible Docs", url: "https://docs.ansible.com", type: "free" }] },
    ],
    courses: [
      { name: "DevOps with Docker & K8s", provider: "University of Helsinki", url: "https://devopswithdocker.com", rating: 4.7, type: "free", timeToMarket: "4 mÃ¥nader", postGradSalary: 54000 },
    ],
  },

  {
    slug: "firmware-engineer",
    name: "Firmware Engineer",
    description: "Writes and debugs low-level code that runs directly on devices and microcontrollers.",
    industrySlug: "embedded-systems", districtSlug: "microcontrollers",
    learningPath: [
      { order: 1, title: "C Programming", description: "Pointers, memory layout, bitwise ops, and embedded C.", estimatedHours: 60, resources: [{ name: "cppreference C", url: "https://en.cppreference.com/w/c", type: "free" }] },
      { order: 2, title: "Microcontroller Basics", description: "GPIO, interrupts, timers, UART/SPI/I2C.", estimatedHours: 50, resources: [{ name: "Arduino Tutorials", url: "https://arduino.cc/en/Tutorial/", type: "free" }] },
      { order: 3, title: "RTOS & Debugging", description: "FreeRTOS, task scheduling, JTAG/SWD debugging.", estimatedHours: 40, resources: [{ name: "FreeRTOS Docs", url: "https://freertos.org", type: "free" }] },
    ],
    courses: [
      { name: "Embedded Systems Shape the World", provider: "UT Austin (edX)", url: "https://edx.org", rating: 4.7, type: "free", timeToMarket: "1 termin", postGradSalary: 50000 },
    ],
  },
  {
    slug: "embedded-software-engineer",
    name: "Embedded Software Engineer",
    description: "Builds device features, drivers, and integrations across firmware and system layers.",
    industrySlug: "embedded-systems", districtSlug: "iot",
    learningPath: [
      { order: 1, title: "C/C++ for Embedded", description: "Multi-file projects, Makefiles, and cross-compilation.", estimatedHours: 60, resources: [{ name: "LearnCpp.com", url: "https://learncpp.com", type: "free" }] },
      { order: 2, title: "Linux Device Drivers", description: "Kernel modules, device trees, and I/O subsystems.", estimatedHours: 50, resources: [{ name: "Kernel Docs", url: "https://kernel.org/doc/html/latest/", type: "free" }] },
    ],
    courses: [
      { name: "Linux Device Drivers", provider: "Bootlin", url: "https://bootlin.com/training/kernel/", rating: 4.6, type: "paid", timeToMarket: "1 vecka", postGradSalary: 52000 },
    ],
  },
  {
    slug: "iot-engineer",
    name: "IoT Engineer",
    description: "Connects devices to cloud services, handles telemetry, updates, and security concerns.",
    industrySlug: "embedded-systems", districtSlug: "iot",
    learningPath: [
      { order: 1, title: "Device Programming", description: "Python/MicroPython on Raspberry Pi, sensor interfacing.", estimatedHours: 40, resources: [{ name: "Raspberry Pi Projects", url: "https://projects.raspberrypi.org", type: "free" }] },
      { order: 2, title: "IoT Protocols & Security", description: "MQTT, CoAP, TLS, OTA updates, and provisioning.", estimatedHours: 40, resources: [{ name: "AWS IoT Core", url: "https://docs.aws.amazon.com/iot/", type: "free" }] },
      { order: 3, title: "Cloud Integration", description: "AWS IoT / Azure IoT Hub, time-series DBs.", estimatedHours: 30, resources: [{ name: "Azure IoT Path", url: "https://learn.microsoft.com/en-us/training/paths/introduction-to-azure-iot/", type: "free" }] },
    ],
    courses: [
      { name: "IoT Specialization", provider: "UMich (Coursera)", url: "https://coursera.org", rating: 4.5, type: "paid", timeToMarket: "6 mÃ¥nader", postGradSalary: 54000 },
      { name: "AWS IoT Workshop", provider: "AWS", url: "https://iot.awsworkshops.com", rating: 4.4, type: "free", timeToMarket: "2 dagar", postGradSalary: 52000 },
    ],
  },
];
