/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("@/server/auth").Auth;
  type DatabaseUserAttributes = {
    username?: string;
    email?: string;
    name?: string;
    role: import("@prisma/client").Role;
  };
  type DatabaseSessionAttributes = {};
}
