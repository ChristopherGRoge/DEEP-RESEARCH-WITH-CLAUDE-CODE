import prisma from '../db/client';
import { ResearchWorkflow } from '../../generated/prisma/client';

export interface CreateProjectInput {
  name: string;
  description?: string;
  searchQuery?: string;
  workflow?: ResearchWorkflow;
}

export interface UpdateProjectInput {
  name?: string;
  description?: string;
  searchQuery?: string;
  workflow?: ResearchWorkflow;
}

/**
 * Create a new research project
 */
export async function createProject(input: CreateProjectInput) {
  const project = await prisma.researchProject.create({
    data: {
      name: input.name,
      description: input.description,
      searchQuery: input.searchQuery,
      workflow: input.workflow || ResearchWorkflow.DISCOVERY,
    },
  });

  await prisma.researchLog.create({
    data: {
      action: 'project_created',
      details: { projectId: project.id, name: project.name },
    },
  });

  return project;
}

/**
 * Get a project by ID
 */
export async function getProject(projectId: string) {
  return prisma.researchProject.findUnique({
    where: { id: projectId },
    include: {
      entities: {
        include: {
          assertions: {
            include: {
              sources: { include: { source: true } },
              reasoning: true,
            },
          },
        },
      },
    },
  });
}

/**
 * List all projects
 */
export async function listProjects() {
  return prisma.researchProject.findMany({
    include: {
      _count: {
        select: { entities: true },
      },
    },
    orderBy: { updatedAt: 'desc' },
  });
}

/**
 * Update a project
 */
export async function updateProject(projectId: string, input: UpdateProjectInput) {
  const project = await prisma.researchProject.update({
    where: { id: projectId },
    data: input,
  });

  await prisma.researchLog.create({
    data: {
      action: 'project_updated',
      details: { projectId: project.id, changes: JSON.parse(JSON.stringify(input)) },
    },
  });

  return project;
}

/**
 * Delete a project and all related data
 */
export async function deleteProject(projectId: string) {
  await prisma.researchLog.create({
    data: {
      action: 'project_deleted',
      details: { projectId },
    },
  });

  return prisma.researchProject.delete({
    where: { id: projectId },
  });
}

/**
 * Find project by name (case-insensitive)
 */
export async function findProjectByName(name: string) {
  return prisma.researchProject.findFirst({
    where: {
      name: {
        equals: name,
        mode: 'insensitive',
      },
    },
    include: {
      _count: {
        select: { entities: true },
      },
    },
  });
}
