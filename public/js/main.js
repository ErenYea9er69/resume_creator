import { setupNavigation } from './modules/navigation.js';
import { setupPersonalInfo } from './modules/personalInfo.js';
import { setupExperience } from './modules/experience.js';
import { setupEducation } from './modules/education.js';
import { setupSkills } from './modules/skills.js';
import { setupProjects } from './modules/projects.js';
import { setupLanguages } from './modules/languages.js';
import { setupSummary } from './modules/summary.js';
import { setupExport } from './modules/export.js';
import { loadSampleData } from './modules/sampleData.js';

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupPersonalInfo();
  setupSummary();
  setupExperience();
  setupEducation();
  setupSkills();
  setupProjects();
  setupLanguages();
  setupExport();
  
  // Uncomment to load sample data for testing
  // loadSampleData();
}); 