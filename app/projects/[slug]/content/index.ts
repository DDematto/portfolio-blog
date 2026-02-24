import { Project } from '@/types/project';
import dynamic from 'next/dynamic';

// Import individual project data directly from components
import { projectData as codeJam6Data } from './CodeJam6';
import { projectData as frameGeniusData } from './FrameGenius';
import { projectData as mapGenerationData } from './MapGeneration';
import { projectData as legacyPortfolioData } from './LegacyPortfolio';
import { projectData as magnaVNNGData } from './MagnaVNNG';

// Export the aggregated data for the Projects grid
export const allProjects: Project[] = [
    codeJam6Data,
    frameGeniusData,
    mapGenerationData,
    legacyPortfolioData,
    magnaVNNGData
];

// Export the dynamically loaded components mapping
export const projectComponentsMap: Record<string, any> = {
    'codejam6': dynamic(() => import('@/app/projects/[slug]/content/CodeJam6')),
    'frame-genius': dynamic(() => import('@/app/projects/[slug]/content/FrameGenius')),
    'map-generation': dynamic(() => import('@/app/projects/[slug]/content/MapGeneration')),
    'portfolio': dynamic(() => import('@/app/projects/[slug]/content/LegacyPortfolio')),
    'magna-vnng': dynamic(() => import('@/app/projects/[slug]/content/MagnaVNNG')),
};
