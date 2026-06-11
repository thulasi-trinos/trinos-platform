import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

import { BCRYPT_COST } from '../config/constants';

const prisma = new PrismaClient();

const SEED_PASSWORD = 'Trinos@2026';
const YEAR = new Date().getFullYear();

// Edit window (mirrors SystemConfig 'report.edit_window_minutes' default, OI-02).
const EDIT_WINDOW_MIN = 60;

// ─── Seed data definitions ───────────────────────────────────────────────────

const TEAMS = ['Engineering', 'Design', 'Operations'] as const;
type TeamName = (typeof TEAMS)[number];

interface SeedUser {
  email: string;
  name: string;
  designation?: string;
  team?: TeamName; // omitted for org-wide roles (admin, MDs)
  roles: Role[];
  isSuperAdmin?: boolean;
}

const USERS: SeedUser[] = [
  // 1. Platform administrator — manages users/teams/settings, NO report access.
  {
    email: 'admin@trinos.app',
    name: 'Platform Admin',
    designation: 'Platform Administrator',
    roles: [Role.ADMIN],
  },

  // 2. MDs / executives — org-wide read, super admins (FR-ADM-07).
  {
    email: 'md@trinos.app',
    name: 'Maya Devarajan (MD)',
    designation: 'Managing Director',
    roles: [Role.MD],
    isSuperAdmin: true,
  },
  {
    email: 'cto@trinos.app',
    name: 'Ravi Kp (CTO)',
    designation: 'Chief Technology Officer',
    roles: [Role.MD],
    isSuperAdmin: true,
  },

  // 4. Team leads (one per team; leads also submit reports — RBAC matrix).
  {
    email: 'lead.eng@trinos.app',
    name: 'Anita Rao',
    designation: 'Engineering Lead',
    team: 'Engineering',
    roles: [Role.TEAM_LEAD],
  },
  {
    email: 'lead.des@trinos.app',
    name: 'Sam Mehta',
    designation: 'Design Lead',
    team: 'Design',
    roles: [Role.TEAM_LEAD],
  },
  {
    email: 'lead.ops@trinos.app',
    name: 'Leo Fernandez',
    designation: 'Operations Lead',
    team: 'Operations',
    roles: [Role.TEAM_LEAD, Role.EMPLOYEE], // multi-role demonstration
  },

  // 5. Employees / interns (2–3 per team).
  { email: 'emp1.eng@trinos.app', name: 'Dev Kumar', designation: 'Software Engineer', team: 'Engineering', roles: [Role.EMPLOYEE] },
  { email: 'emp2.eng@trinos.app', name: 'Priya N', designation: 'Software Engineer', team: 'Engineering', roles: [Role.EMPLOYEE] },
  { email: 'intern.eng@trinos.app', name: 'Kiran S', designation: 'Engineering Intern', team: 'Engineering', roles: [Role.EMPLOYEE] },
  { email: 'emp1.des@trinos.app', name: 'Tara Joshi', designation: 'Product Designer', team: 'Design', roles: [Role.EMPLOYEE] },
  { email: 'emp2.des@trinos.app', name: 'Omar A', designation: 'UX Designer', team: 'Design', roles: [Role.EMPLOYEE] },
  { email: 'emp1.ops@trinos.app', name: 'Nisha P', designation: 'Operations Analyst', team: 'Operations', roles: [Role.EMPLOYEE] },
  { email: 'emp2.ops@trinos.app', name: 'Vikram R', designation: 'Operations Associate', team: 'Operations', roles: [Role.EMPLOYEE] },
];

// 6. SystemConfig defaults (JSON values: numbers stay numeric, times/zones are strings).
const SYSTEM_CONFIG: Record<string, unknown> = {
  'report.edit_window_minutes': EDIT_WINDOW_MIN,
  'report.deadline_local_time': '18:00',
  'org.timezone': 'Asia/Kolkata',
  'auth.session_timeout_hours': 8,
  'report.retention_months': 12,
};

// 8. Demo SUBMITTED reports so dashboards/escalation views render on first login.
interface SeedFlag {
  by: string; // flagger email
  role: Role;
  status: 'OPEN' | 'ESCALATED' | 'RESOLVED';
  escalatedToSuperAdmins?: boolean;
  note?: string;
}

interface SeedReport {
  author: string; // author email
  date: string; // YYYY-MM-DD
  didToday: string;
  next: string;
  blockers: string;
  notes?: string;
  flag?: SeedFlag;
}

const DEMO_REPORTS: SeedReport[] = [
  {
    author: 'emp1.eng@trinos.app',
    date: '2026-06-10',
    didToday: 'Shipped the auth middleware and wired up refresh-token rotation end to end.',
    next: 'Add integration tests for the lockout path.',
    blockers: 'None',
  },
  {
    author: 'emp2.eng@trinos.app',
    date: '2026-06-10',
    didToday: 'Built the report-routing worker and queued notifications through BullMQ.',
    next: 'Hook the worker up to the overdue scheduler.',
    blockers: 'Blocked on production DB credentials — infra ticket INFRA-204 is still open.',
    notes: 'Escalated in the team channel; needs lead follow-up.',
    flag: { by: 'lead.eng@trinos.app', role: Role.TEAM_LEAD, status: 'OPEN', note: 'Chasing infra for credentials.' },
  },
  {
    author: 'emp1.des@trinos.app',
    date: '2026-06-10',
    didToday: 'Finalised the dashboard wireframes and exported the design tokens.',
    next: 'Review the component spacing scale with engineering.',
    blockers: 'None',
  },
  {
    author: 'emp2.ops@trinos.app',
    date: '2026-06-11',
    didToday: 'Reconciled the vendor invoices and updated the SLA tracking sheet.',
    next: 'Confirm the renewal terms with the vendor.',
    blockers: 'Awaiting vendor SLA confirmation — renewal is at risk, escalating to MDs.',
    flag: {
      by: 'md@trinos.app',
      role: Role.MD,
      status: 'ESCALATED',
      escalatedToSuperAdmins: true,
      note: 'Vendor risk raised to executive review.',
    },
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────

/** Upsert a user (idempotent on email) and reconcile its roles (idempotent on userId+role). */
async function upsertUser(passwordHash: string, def: SeedUser, teamIdByName: Map<TeamName, string>) {
  const teamId = def.team ? teamIdByName.get(def.team) ?? null : null;

  const user = await prisma.user.upsert({
    where: { email: def.email },
    update: {
      name: def.name,
      designation: def.designation ?? null,
      teamId,
      isSuperAdmin: def.isSuperAdmin ?? false,
    },
    create: {
      email: def.email,
      name: def.name,
      designation: def.designation ?? null,
      passwordHash,
      teamId,
      isSuperAdmin: def.isSuperAdmin ?? false,
    },
  });

  for (const role of def.roles) {
    await prisma.userRole.upsert({
      where: { userId_role: { userId: user.id, role } },
      update: {},
      create: { userId: user.id, role },
    });
  }

  return user;
}

async function main(): Promise<void> {
  const passwordHash = await bcrypt.hash(SEED_PASSWORD, BCRYPT_COST);

  // 3. Teams — created first (without a lead) so users can reference them.
  const teamIdByName = new Map<TeamName, string>();
  for (const name of TEAMS) {
    const team = await prisma.team.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    teamIdByName.set(name, team.id);
  }

  // Users (admin, MDs, leads, employees) + their roles.
  const userIdByEmail = new Map<string, string>();
  for (const def of USERS) {
    const user = await upsertUser(passwordHash, def, teamIdByName);
    userIdByEmail.set(def.email, user.id);
  }

  // Assign each team's lead now that the lead users exist.
  const LEAD_BY_TEAM: Record<TeamName, string> = {
    Engineering: 'lead.eng@trinos.app',
    Design: 'lead.des@trinos.app',
    Operations: 'lead.ops@trinos.app',
  };
  for (const name of TEAMS) {
    const leadUserId = userIdByEmail.get(LEAD_BY_TEAM[name]);
    await prisma.team.update({ where: { name }, data: { leadUserId } });
  }

  // 6. SystemConfig defaults.
  const adminId = userIdByEmail.get('admin@trinos.app');
  for (const [key, value] of Object.entries(SYSTEM_CONFIG)) {
    await prisma.systemConfig.upsert({
      where: { key },
      update: {},
      create: { key, value: value as never, updatedById: adminId },
    });
  }

  // 9. One TEAM group channel per team, with the team's members + lead.
  for (const name of TEAMS) {
    const teamId = teamIdByName.get(name)!;
    let channel = await prisma.channel.findFirst({ where: { teamId, type: 'TEAM' } });
    if (!channel) {
      channel = await prisma.channel.create({
        data: { type: 'TEAM', teamId, name: `${name} Team` },
      });
    }

    const members = await prisma.user.findMany({ where: { teamId }, select: { id: true } });
    for (const member of members) {
      await prisma.channelMember.upsert({
        where: { channelId_userId: { channelId: channel.id, userId: member.id } },
        update: {},
        create: { channelId: channel.id, userId: member.id },
      });
    }
  }

  // 8. Demo SUBMITTED reports (+ blocker flags) so dashboards have data.
  let seq = 0;
  for (const def of DEMO_REPORTS) {
    seq += 1;
    const authorId = userIdByEmail.get(def.author);
    if (!authorId) continue;

    const author = await prisma.user.findUnique({ where: { id: authorId }, select: { teamId: true } });
    if (!author?.teamId) continue;

    const reportDate = new Date(`${def.date}T00:00:00.000Z`);
    const submittedAt = new Date(`${def.date}T12:00:00.000Z`);
    const editableUntil = new Date(submittedAt.getTime() + EDIT_WINDOW_MIN * 60_000);
    const hasBlockers = def.blockers.trim().toLowerCase() !== 'none';
    const code = `RPT-${YEAR}-${String(seq).padStart(4, '0')}`;

    const report = await prisma.report.upsert({
      where: { authorId_reportDate: { authorId, reportDate } },
      update: {
        fieldDidToday: def.didToday,
        fieldNext: def.next,
        fieldBlockers: def.blockers,
        fieldNotes: def.notes ?? null,
        hasBlockers,
        status: 'SUBMITTED',
        submittedAt,
        editableUntil,
      },
      create: {
        code,
        authorId,
        teamId: author.teamId,
        reportDate,
        fieldDidToday: def.didToday,
        fieldNext: def.next,
        fieldBlockers: def.blockers,
        fieldNotes: def.notes ?? null,
        hasBlockers,
        status: 'SUBMITTED',
        submittedAt,
        editableUntil,
      },
    });

    if (def.flag) {
      const flaggedById = userIdByEmail.get(def.flag.by);
      const existing = await prisma.blockerFlag.findFirst({ where: { reportId: report.id } });
      if (!existing && flaggedById) {
        await prisma.blockerFlag.create({
          data: {
            reportId: report.id,
            flaggedById,
            flaggedByRole: def.flag.role,
            status: def.flag.status,
            note: def.flag.note ?? null,
            escalatedToSuperAdmins: def.flag.escalatedToSuperAdmins ?? false,
            ...(def.flag.status === 'RESOLVED'
              ? { resolvedById: flaggedById, resolvedAt: submittedAt }
              : {}),
          },
        });
      }
    }
  }

  // 7. Per-year report-code counter. lastSeq tracks the codes the demo reports
  // already consumed so the next generated RPT-YYYY-NNNN doesn't collide.
  await prisma.reportCodeSeq.upsert({
    where: { year: YEAR },
    update: { lastSeq: DEMO_REPORTS.length },
    create: { year: YEAR, lastSeq: DEMO_REPORTS.length },
  });

  // eslint-disable-next-line no-console
  console.log(
    `✔ Seed complete — ${USERS.length} users, ${TEAMS.length} teams, ` +
      `${Object.keys(SYSTEM_CONFIG).length} config keys, ${DEMO_REPORTS.length} demo reports. ` +
      `Password for all: ${SEED_PASSWORD}`,
  );
}

main()
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
