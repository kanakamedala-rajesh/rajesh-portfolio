# Data Layer

The application's content is decoupled from the UI components, residing in a strongly-typed data file. This allows for easy updates to the portfolio content without modifying component logic.

## Data Source

**File**: `src/data/resume.ts`

This file exports a constant `resumeData` object which is consumed by various sections of the app.

## Schema Definition (`ResumeData`)

The data conforms to the following TypeScript interface:

```typescript
export interface ResumeData {
  header: {
    name: string; // e.g., "RAJESH KANAKAMEDALA"
    title: string; // e.g., "Senior Software Engineer"
    tagline: string; // Short professional summary
    location: string;
  };
  summary: string; // Long-form bio
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
    type: "Embedded" | "VR/AR" | "Full Stack"; // Determines icon/color theme in UI
    description: string[]; // Bullet points
    techStack: string[];
  }[];
  contact: {
    email: string;
    phone: string;
    linkedin: string;
  };
}
```

## Security Note

Sensitive contact information (Email, Phone) in `resume.ts` is retrieved via Environment Variables (`process.env.NEXT_PUBLIC_CONTACT_EMAIL`) to prevent scraping or accidental exposure in public repositories.
