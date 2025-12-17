# Data Model

## Core Entity: ResumeData
The application is driven by a single static data object representing the user's profile.

### Relationships
- **Root** contains **Header**, **Summary**, **Skills**, **Experience**, **Contact**.
- **Experience** contains list of **Roles**.
- **Skills** contains list of **Categories** which contain list of **SkillItems**.

## Schema Definitions

### HeaderInfo
| Field | Type | Description |
|-------|------|-------------|
| name | string | Full Name |
| title | string | Professional Title |
| tagline | string | Short punchy intro |
| location | string | City, Country |

### ExperienceRole
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| company | string | Company Name |
| role | string | Job Title |
| period | string | e.g. "2023 - Present" |
| type | Enum | "Embedded" \| "VR/AR" \| "Full Stack" |
| description | string[] | Bullet points of achievements |
| techStack | string[] | Technologies used |

### SkillCategory
| Field | Type | Description |
|-------|------|-------------|
| name | string | Category Name (e.g. "Languages") |
| items | string[] | List of skills |

### ContactInfo
| Field | Type | Description |
|-------|------|-------------|
| email | string | Email address |
| phone | string | Phone number |
| linkedin | string | LinkedIn URL |
| github | string | GitHub URL |
