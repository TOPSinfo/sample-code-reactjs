/**
 * Authorization Roles
 */
const authRoles = {
  admin: ["team-admin", "event-admin", "billing-contract", "integrations"],
  team: ["team-admin"],
  user: ["admin", "presenter", "sponsor", "moderator"],
  onlyGuest: []
};

export const roles = {
  admin: "admin",
  sponsor: "sponsor",
  presenter: "presenter",
  moderator: "moderator",
  billing: "billing"
};

export default authRoles;
