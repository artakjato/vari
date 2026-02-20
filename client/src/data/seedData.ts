import type { Industry, Role } from '../lib/types'; 

export const industries : Industry[] =[
  {
 _id: '1',
    slug: 'web-development',
    name: 'Web Development',
    subtitle: 'Building what people see',
    color: '#D4845A',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    position: { x: 400, y: 300 },
    children: [
      {
        name: 'Frontend',
        slug: 'frontend',
        stacks: [
          { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', url: 'https://react.dev' },
          { name: 'Vue', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', url: 'https://vuejs.org' },
          { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg', url: 'https://angular.io' },
        ],
      },
      {
        name: 'Backend',
        slug: 'backend',
        stacks: [
          { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', url: 'https://nodejs.org' },
          { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', url: 'https://expressjs.com' },
        ],
      },
    ],
  },
  {
    _id: '2',
    slug: 'mobile-development',
    name: 'Mobile Development',
    subtitle: 'Apps in your pocket',
    color: '#B8956A',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',
    position: { x: 750, y: 250 },
    children: [
      {
        name: 'iOS',
        slug: 'ios',
        stacks: [
          { name: 'Swift', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg', url: 'https://swift.org' },
          { name: 'SwiftUI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg', url: 'https://developer.apple.com/xcode/swiftui/' },
        ],
      },
      {
        name: 'Android',
        slug: 'android',
        stacks: [
          { name: 'Kotlin', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg', url: 'https://kotlinlang.org' },
        ],
      },
      {
        name: 'Cross-Platform',
        slug: 'cross-platform',
        stacks: [
          { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', url: 'https://reactnative.dev' },
          { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', url: 'https://flutter.dev' },
        ],
      },
    ],
  },
  {
    _id: '3',
    slug: 'gaming',
    name: 'Gaming',
    subtitle: 'Building virtual worlds',
    color: '#7B8FA1',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg',
    position: { x: 200, y: 500 },
    children: [
      {
        name: '3D Engines',
        slug: 'engines-3d',
        stacks: [
          { name: 'Unity', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg', url: 'https://unity.com' },
          { name: 'Unreal', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg', url: 'https://unrealengine.com' },
        ],
      },
      {
        name: 'Game Logic',
        slug: 'game-logic',
        stacks: [
          { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/' },
          { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', url: 'https://isocpp.org' },
        ],
      },
    ],
  },
  {
    _id: '4',
    slug: 'data-ai',
    name: 'Data & AI',
    subtitle: 'Turning data into decisions',
    color: '#A3B18A',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    position: { x: 600, y: 550 },
    children: [
      {
        name: 'Machine Learning',
        slug: 'machine-learning',
        stacks: [
          { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', url: 'https://python.org' },
          { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', url: 'https://tensorflow.org' },
          { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', url: 'https://pytorch.org' },
        ],
      },
      {
        name: 'Data Engineering',
        slug: 'data-engineering',
        stacks: [
          { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', url: 'https://www.postgresql.org' },
        ],
      },
    ],
  },
  {
    _id: '5',
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    subtitle: 'Protecting systems & data',
    color: '#6B7A8D',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    position: { x: 950, y: 450 },
    children: [
      {
        name: 'Offensive Security',
        slug: 'offensive-security',
        stacks: [
          { name: 'Kali Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', url: 'https://kali.org' },
          { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', url: 'https://python.org' },
        ],
      },
      {
        name: 'Defensive Security',
        slug: 'defensive-security',
        stacks: [
          { name: 'SIEM Tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', url: 'https://www.splunk.com' },
        ],
      },
    ],
  },
   {
    _id: '6',
    slug: 'cloud-infrastructure',
    name: 'Cloud & Infra',
    subtitle: 'The invisible backbone',
    color: '#5B8C5A',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    position: { x: 150, y: 200 },
    children: [
      {
        name: 'Cloud Platforms',
        slug: 'cloud-platforms',
        stacks: [
          { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', url: 'https://aws.amazon.com' },
          { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', url: 'https://azure.microsoft.com' },
          { name: 'GCP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg', url: 'https://cloud.google.com' },
        ],
      },
    ],
  },
  {
    _id: '7',
    slug: 'devops',
    name: 'DevOps',
    subtitle: 'Ship faster, break less',
    color: '#C97B3D',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    position: { x: 500, y: 100 },
    children: [
      {
        name: 'Containers',
        slug: 'containers',
        stacks: [
          { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', url: 'https://docker.com' },
          { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', url: 'https://kubernetes.io' },
        ],
      },
      {
        name: 'CI/CD',
        slug: 'ci-cd',
        stacks: [
          { name: 'GitHub Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', url: 'https://github.com/features/actions' },
          { name: 'Jenkins', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg', url: 'https://jenkins.io' },
        ],
      },
    ],
  },
  {
    _id: '8',
    slug: 'embedded-systems',
    name: 'Embedded Systems',
    subtitle: 'Code meets hardware',
    color: '#8B6F47',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg',
    position: { x: 900, y: 150 },
    children: [
      {
        name: 'Microcontrollers',
        slug: 'microcontrollers',
        stacks: [
          { name: 'Arduino', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg', url: 'https://arduino.cc' },
          { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', url: 'https://en.cppreference.com/w/c' },
        ],
      },
      {
        name: 'IoT',
        slug: 'iot',
        stacks: [
          { name: 'Raspberry Pi', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg', url: 'https://raspberrypi.org' },
          { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', url: 'https://python.org' },
        ],
      },
    ],
  },
  {
  _id: '9',
  slug: 'gaming',
  name: 'Gaming',
  subtitle: 'Building interactive worlds',
  color: '#6A5ACD',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg',
  position: { x: 650, y: 260 },
  children: [
    {
      name: 'Gameplay',
      slug: 'gameplay',
      stacks: [
        { name: 'Unity', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg', url: 'https://unity.com' },
        { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', url: 'https://learn.microsoft.com/dotnet/csharp/' },
        { name: 'Godot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg', url: 'https://godotengine.org' },
      ],
    },
    {
      name: 'Engine & Tools',
      slug: 'engine-tools',
      stacks: [
        { name: 'Unreal Engine', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg', url: 'https://www.unrealengine.com' },
        { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', url: 'https://isocpp.org' },
        { name: 'OpenGL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opengl/opengl-original.svg', url: 'https://www.opengl.org' },
      ],
    },
    {
      name: 'Online & Live Ops',
      slug: 'online-liveops',
      stacks: [
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', url: 'https://www.docker.com' },
        { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', url: 'https://kubernetes.io' },
        { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', url: 'https://redis.io' },
      ],
    },
  ],
},
{
  _id: '10',
  slug: 'cloud-infra',
  name: 'Cloud & Infra',
  subtitle: 'Keeping systems alive',
  color: '#2B7CD3',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
  position: { x: 520, y: 470 },
  children: [
    {
      name: 'Cloud Platforms',
      slug: 'cloud-platforms',
      stacks: [
        { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', url: 'https://azure.microsoft.com' },
        { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', url: 'https://aws.amazon.com' },
        { name: 'GCP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg', url: 'https://cloud.google.com' },
      ],
    },
    {
      name: 'DevOps & CI/CD',
      slug: 'devops-cicd',
      stacks: [
        { name: 'Terraform', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg', url: 'https://www.terraform.io' },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', url: 'https://www.docker.com' },
        { name: 'Jenkins', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg', url: 'https://www.jenkins.io' },
      ],
    },
    {
      name: 'Observability',
      slug: 'observability',
      stacks: [
        { name: 'Prometheus', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg', url: 'https://prometheus.io' },
        { name: 'Grafana', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg', url: 'https://grafana.com' },
        { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', url: 'https://www.linux.org' },
      ],
    },
  ],
},
{
  _id: '11',
  slug: 'embedded-systems',
  name: 'Embedded Systems',
  subtitle: 'Shipping code into hardware',
  color: '#3A9D7A',
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
  position: { x: 280, y: 520 },
  children: [
    {
      name: 'Firmware',
      slug: 'firmware',
      stacks: [
        { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', url: 'https://en.cppreference.com/w/c' },
        { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', url: 'https://isocpp.org' },
        { name: 'Rust', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg', url: 'https://www.rust-lang.org' },
      ],
    },
    {
      name: 'RTOS & Low-Level',
      slug: 'rtos-lowlevel',
      stacks: [
        { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', url: 'https://www.linux.org' },
        { name: 'GCC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gcc/gcc-original.svg', url: 'https://gcc.gnu.org' },
        { name: 'CMake', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cmake/cmake-original.svg', url: 'https://cmake.org' },
      ],
    },
    {
      name: 'IoT Prototyping',
      slug: 'iot-prototyping',
      stacks: [
        { name: 'Arduino', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg', url: 'https://www.arduino.cc' },
        { name: 'Raspberry Pi', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg', url: 'https://www.raspberrypi.com' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', url: 'https://www.python.org' },
      ],
    },
  ],
},
];

export const roles: Role[] = [
  //Web development roles
   {
    _id: 'r1',
    slug: 'fullstack-engineer',
    name: 'Full-Stack Engineer',
    description: 'Builds both frontend and backend systems. Versatile but must stay current on many technologies.',
    industrySlug: 'web-development',
    tradeoffs: ['High versatility', 'Jack of all trades risk', 'Strong job market'],
  },
  {
    _id: 'r2',
    slug: 'frontend-engineer',
    name: 'Frontend Engineer',
    description: 'Specializes in user interfaces, accessibility, and browser performance.',
    industrySlug: 'web-development',
    tradeoffs: ['Creative expression', 'Rapid framework churn', 'Visual impact'],
  },
  {
    _id: 'r3',
    slug: 'backend-engineer',
    name: 'Backend Engineer',
    description: 'Designs APIs, databases, and server logic that power applications.',
    industrySlug: 'web-development',
    tradeoffs: ['System design depth', 'Less visual feedback', 'High scalability focus'],
  },
  // Mobile roles
  {
    _id: 'r4',
    slug: 'ios-developer',
    name: 'iOS Developer',
    description: 'Builds native Apple apps using Swift and SwiftUI for iPhone and iPad.',
    industrySlug: 'mobile-development',
    tradeoffs: ['Apple ecosystem lock-in', 'Premium market', 'Great developer tools'],
  },
  {
    _id: 'r5',
    slug: 'android-developer',
    name: 'Android Developer',
    description: 'Creates apps for the Android platform using Kotlin and Jetpack Compose.',
    industrySlug: 'mobile-development',
    tradeoffs: ['Massive user base', 'Device fragmentation', 'Open-source ecosystem'],
  },
  // Data & AI roles
  {
    _id: 'r6',
    slug: 'ml-engineer',
    name: 'ML Engineer',
    description: 'Builds and deploys machine learning models into production systems.',
    industrySlug: 'data-ai',
    tradeoffs: ['Cutting-edge field', 'Heavy math requirement', 'High compensation'],
  },
  // DevOps roles
  {
    _id: 'r7',
    slug: 'devops-engineer',
    name: 'DevOps Engineer',
    description: 'Automates deployments, manages infrastructure, and ensures system reliability.',
    industrySlug: 'devops',
    tradeoffs: ['High demand', 'On-call responsibilities', 'Broad skill set required'],
  },
  // Cybersecurity roles
  {
    _id: 'r8',
    slug: 'security-analyst',
    name: 'Security Analyst',
    description: 'Monitors and protects systems from cyber threats and vulnerabilities.',
    industrySlug: 'cybersecurity',
    tradeoffs: ['Critical importance', 'Constant learning', 'High stress during incidents'],
  },
  // Gaming roles
{
  _id: 'r9',
  slug: 'gameplay-engineer',
  name: 'Gameplay Engineer',
  description: 'Implements core game mechanics, player controls, and moment-to-moment feel.',
  industrySlug: 'gaming',
  tradeoffs: ['Highly creative', 'Constant iteration', 'Hard to test objectively'],
},
{
  _id: 'r10',
  slug: 'engine-programmer',
  name: 'Engine Programmer',
  description: 'Builds rendering, physics, streaming, and performance-critical engine systems.',
  industrySlug: 'gaming',
  tradeoffs: ['Deep technical work', 'Low-level complexity', 'Performance pressure'],
},
{
  _id: 'r11',
  slug: 'online-systems-engineer',
  name: 'Online Systems Engineer',
  description: 'Designs matchmaking, multiplayer services, and live game backend systems.',
  industrySlug: 'gaming',
  tradeoffs: ['Real-world scale', 'On-call realities', 'Cheating and abuse battles'],
},

// Cloud & Infra roles
{
  _id: 'r12',
  slug: 'devops-engineer',
  name: 'DevOps Engineer',
  description: 'Automates build, deploy, and infrastructure workflows to ship reliably.',
  industrySlug: 'cloud-infra',
  tradeoffs: ['High leverage', 'Toolchain sprawl', 'Shared ownership ambiguity'],
},
{
  _id: 'r13',
  slug: 'site-reliability-engineer',
  name: 'Site Reliability Engineer',
  description: 'Keeps services healthy through SLOs, incident response, and resilience engineering.',
  industrySlug: 'cloud-infra',
  tradeoffs: ['Clear impact', 'Pager fatigue risk', 'Requires strong fundamentals'],
},
{
  _id: 'r14',
  slug: 'platform-engineer',
  name: 'Platform Engineer',
  description: 'Builds internal platforms and paved roads so product teams can move fast safely.',
  industrySlug: 'cloud-infra',
  tradeoffs: ['Multiplier effect', 'Internal customer politics', 'Long payoff cycles'],
},

// Embedded Systems roles
{
  _id: 'r15',
  slug: 'firmware-engineer',
  name: 'Firmware Engineer',
  description: 'Writes and debugs low-level code that runs directly on devices and microcontrollers.',
  industrySlug: 'embedded-systems',
  tradeoffs: ['Close to hardware', 'Debugging can be brutal', 'Constraints everywhere'],
},
{
  _id: 'r16',
  slug: 'embedded-software-engineer',
  name: 'Embedded Software Engineer',
  description: 'Builds device features, drivers, and integrations across firmware and system layers.',
  industrySlug: 'embedded-systems',
  tradeoffs: ['Broad scope', 'Hardware dependencies', 'Slower iteration loops'],
},
{
  _id: 'r17',
  slug: 'iot-engineer',
  name: 'IoT Engineer',
  description: 'Connects devices to cloud services, handles telemetry, updates, and security concerns.',
  industrySlug: 'embedded-systems',
  tradeoffs: ['End-to-end systems', 'Security is non-negotiable', 'Field failures are expensive'],
},
];

export const seedData = { industries, roles }; 