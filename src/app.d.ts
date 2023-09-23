// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./lib/auth/lucia").Auth;
  type DatabaseUserAttributes = {
    email: string;
    name: string;
  };
  type DatabaseSessionAttributes = {};
}
