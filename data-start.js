import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const adminData = {
    name: 'admin',
    email: 'admin',
    role: `admin`,
    password: `A324vW1coF`,
}


async function main() {
    const admin = await prisma.user.findFirst({
        where: {
            email: `admin`
        }
    })
    if (!admin) {
        await prisma.user.create({
            data: adminData,
        })
        console.log(`Админ создан`);
    }
    else {
        await prisma.user.update({
            where: { id: admin.id },
            data: adminData,
        })
        console.log(`Админ обновлен`);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })