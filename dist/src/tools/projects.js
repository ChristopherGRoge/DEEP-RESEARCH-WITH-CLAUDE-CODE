"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = createProject;
exports.getProject = getProject;
exports.listProjects = listProjects;
exports.updateProject = updateProject;
exports.deleteProject = deleteProject;
exports.findProjectByName = findProjectByName;
const client_1 = __importDefault(require("../db/client"));
const client_2 = require("../../generated/prisma/client");
/**
 * Create a new research project
 */
async function createProject(input) {
    const project = await client_1.default.researchProject.create({
        data: {
            name: input.name,
            description: input.description,
            searchQuery: input.searchQuery,
            workflow: input.workflow || client_2.ResearchWorkflow.DISCOVERY,
        },
    });
    await client_1.default.researchLog.create({
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
async function getProject(projectId) {
    return client_1.default.researchProject.findUnique({
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
async function listProjects() {
    return client_1.default.researchProject.findMany({
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
async function updateProject(projectId, input) {
    const project = await client_1.default.researchProject.update({
        where: { id: projectId },
        data: input,
    });
    await client_1.default.researchLog.create({
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
async function deleteProject(projectId) {
    await client_1.default.researchLog.create({
        data: {
            action: 'project_deleted',
            details: { projectId },
        },
    });
    return client_1.default.researchProject.delete({
        where: { id: projectId },
    });
}
/**
 * Find project by name (case-insensitive)
 */
async function findProjectByName(name) {
    return client_1.default.researchProject.findFirst({
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
//# sourceMappingURL=projects.js.map