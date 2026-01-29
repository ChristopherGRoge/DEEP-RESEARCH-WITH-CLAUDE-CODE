"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("../../generated/prisma/client");
const adapter_libsql_1 = require("@prisma/adapter-libsql");
// Create Prisma adapter for local SQLite file
const adapter = new adapter_libsql_1.PrismaLibSql({
    url: process.env.DATABASE_URL || 'file:./research.db',
});
// Singleton pattern for Prisma client
const globalForPrisma = globalThis;
exports.prisma = globalForPrisma.prisma ?? new client_1.PrismaClient({ adapter });
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = exports.prisma;
}
exports.default = exports.prisma;
//# sourceMappingURL=client.js.map