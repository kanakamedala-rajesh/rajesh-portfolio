export interface ResumeData {
  header: {
    name: string;
    title: string;
    tagline: string;
    location: string;
  };
  summary: string;
  skills: {
    category:
      | "Languages"
      | "Frameworks"
      | "Embedded/Systems"
      | "Cloud/DB"
      | "Methodologies";
    items: string[];
  }[];
  experience: {
    company: string;
    role: string;
    period: string;
    type: "Embedded" | "VR/AR" | "Full Stack";
    description: string[];
    techStack: string[];
  }[];
  contact: {
    email: string;
    phone: string;
    linkedin: string;
  };
}

export const resumeData: ResumeData = {
  header: {
    name: "RAJESH KANAKAMEDALA",
    title: "Senior Software Engineer",
    tagline: "Architecting Robust Full Stack, Android, and Embedded Systems",
    location: "Vijayawada, Andhra Pradesh, India",
  },
  summary:
    "With over 10 years of experience architecting and developing software that bridges the gap between complex hardware and intuitive user experiences, I am passionate about building robust, scalable, and efficient technology solutions. My career has been defined by a unique blend of high-level application development and low-level systems programming, allowing me to thrive in environments where the digital and physical worlds intersect—from full-stack web platforms to the embedded Linux systems powering the next generation of precision agriculture.",
  skills: [
    {
      category: "Languages",
      items: [
        "Java",
        "Kotlin",
        "C++",
        "Python",
        "JavaScript (ES6+)",
        "TypeScript",
        "HTML5/CSS3",
        "SQL",
        "PHP",
      ],
    },
    {
      category: "Frameworks",
      items: [
        "Node.js",
        "React",
        "Next.js",
        "Android SDK/NDK",
        "Express.js",
        "Dagger",
        "RxJava",
        "Retrofit",
        "Unity 3D",
      ],
    },
    {
      category: "Embedded/Systems",
      items: [
        "Embedded Linux",
        "OS Level BSP",
        "Linux Daemons",
        "System Programming",
        "CAN Protocol",
        "ZMQ",
      ],
    },
    {
      category: "Cloud/DB",
      items: [
        "PostgreSQL",
        "MySQL",
        "Git",
        "Jenkins",
        "Docker",
        "AWS",
        "Gerrit",
      ],
    },
    {
      category: "Methodologies",
      items: [
        "Agile/Scrum",
        "Software Architecture",
        "System Design",
        "RESTful API Design",
        "CI/CD",
        "TDD",
      ],
    },
  ],
  experience: [
    {
      company: "CNH Industrial",
      role: "Senior Software Engineer",
      period: "April 2023 - Present",
      type: "Embedded",
      description: [
        "Architected and delivered a new Android application from the ground up, implementing a scalable MVP & MVVM clean architecture.",
        "Engineered robust Java and C++ daemons for embedded Linux devices to monitor and control mission-critical farming equipment via CAN Protocol.",
        "Developed and maintained native shared libraries (C++) for both Android (ARM) and Linux (x86) platforms, enabling high-performance hardware interactions.",
      ],
      techStack: [
        "Android",
        "Java",
        "Kotlin",
        "C++",
        "Embedded Linux",
        "CAN Protocol",
      ],
    },
    {
      company: "CNH Industrial",
      role: "Senior Embedded Software Developer L3",
      period: "February 2017 - March 2023",
      type: "Embedded",
      description: [
        "Implemented JNI (Java Native Interface) bridges to integrate modern Java-based Android applications with legacy native C++ libraries.",
        "Designed and built custom Android UI components and corresponding shadow classes for comprehensive Robolectric testing.",
        "Delivered specialized Android and Linux applications communicating via ZMQ messaging.",
        "Led code reviews and evaluated product requirements within a large, multi-team Agile environment.",
      ],
      techStack: [
        "Java",
        "Kotlin",
        "C++",
        "Android SDK/NDK",
        "JNI",
        "ZMQ",
        "Robolectric",
      ],
    },
    {
      company: "Eagle Creek Software Services",
      role: "Virtual Reality Developer",
      period: "June 2016 - December 2016",
      type: "VR/AR",
      description: [
        "Designed and developed immersive Virtual Reality (VR) and Augmented Reality (AR) mobile applications for retail product visualization.",
        "Developed a flagship VR-based Android application using Unity 3D, Sketch Up, and Playcanvas.",
        "Implemented advanced AR features using Vuforia 5, allowing users to visualize products live in their own space.",
        "Built a custom OpenGL environment to render and animate 3D objects responding to user touch inputs.",
      ],
      techStack: [
        "Unity 3D",
        "Java",
        "Android",
        "VR/AR",
        "Google VR SDK",
        "Vuforia",
        "OpenGL",
      ],
    },
    {
      company: "VoxVilla, LLC",
      role: "Java Developer",
      period: "May 2015 - April 2016",
      type: "Full Stack",
      description: [
        "Delivered a complete, responsive front-end web application using Angular.js and Bootstrap.",
        "Developed the core back-end infrastructure using a Java-based stack (Servlets, JSP, Struts).",
        "Designed and implemented RESTful API services to handle data exchange in JSON format.",
        "Managed the PostgreSQL database schema, stored procedures, and triggers.",
      ],
      techStack: [
        "Java",
        "J2EE",
        "Angular.js",
        "Struts",
        "RESTful APIs",
        "PostgreSQL",
      ],
    },
  ],
  contact: {
    email: "kanakamedala.rajesh@gmail.com",
    phone: "9440083114",
    linkedin: "www.linkedin.com/in/kanakamedala-rajesh",
  },
};
