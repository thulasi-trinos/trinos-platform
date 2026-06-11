import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import { BCRYPT_COST } from '../config/constants';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const password = await bcrypt.hash('Trinos@12345', BCRYPT_COST);

  // Super admin (escalation terminus)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@trinos.ai' },
    update: {},
    create: {
      email: 'admin@trinos.ai',
      name: 'Trinos Admin',
      passwordHash: password,
      roles: { create: [{ role: 'ADMIN' }] },
      isSuperAdmin: true,
    },
  });

  // A team with a lead
  const lead = await prisma.user.upsert({
    where: { email: 'lead@trinos.ai' },
    update: {},
    create: {
      email: 'lead@trinos.ai',
      name: 'Team Lead',
      designation: 'Engineering Lead',
      passwordHash: password,
      roles: { create: [{ role: 'TEAM_LEAD' }] },
    },
  });

  const team = await prisma.team.upsert({
    where: { name: 'Engineering' },
    update: { leadUserId: lead.id },
    create: { name: 'Engineering', leadUserId: lead.id },
  });

  await prisma.user.update({ where: { id: lead.id }, data: { teamId: team.id } });

  // An employee on that team
  await prisma.user.upsert({
    where: { email: 'employee@trinos.ai' },
    update: { teamId: team.id },
    create: {
      email: 'employee@trinos.ai',
      name: 'Eve Employee',
      designation: 'Software Engineer',
      passwordHash: password,
      roles: { create: [{ role: 'EMPLOYEE' }] },
      teamId: team.id,
    },
  });

  // Baseline system config (values are JSON: numbers stay numeric, times/zones are strings)
  const configDefaults: Record<string, unknown> = {
    'report.edit_window_minutes': 60,
    'report.deadline_local_time': '18:00',
    'org.timezone': 'Asia/Kolkata',
    'auth.session_timeout_hours': 8,
    'report.retention_months': 12,
  };

  for (const [key, value] of Object.entries(configDefaults)) {
    await prisma.systemConfig.upsert({
      where: { key },
      update: {},
      create: { key, value: value as never, updatedById: admin.id },
    });
  }

  // eslint-disable-next-line no-console
  console.log('✔ Seed complete: admin@trinos.ai / lead@trinos.ai / employee@trinos.ai (pw: Trinos@12345)');
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
