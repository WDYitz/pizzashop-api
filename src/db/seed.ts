import { faker } from '@faker-js/faker'
import chalk from 'chalk'
import { db } from './connection'
import { restaurants, users } from './schema'

await db.delete(users)
await db.delete(restaurants)

console.log(chalk.yellow('✓ Database reseted!'))

await db.insert(users).values([
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'customer'
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: 'customer'
  },
])

console.log(chalk.green('✓ Customers created!'))

const [manager] = await db.insert(users).values([
  {
    name: faker.person.fullName(),
    email: 'admin@gmail.com',
    role: 'manager'
  }
]).returning({
  id: users.id
})

console.log(chalk.green('✓ Manager created!'))

await db.insert(restaurants).values([
  {
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    managerId: manager.id
  }
])

console.log(chalk.green('✓ Restaurant created!'))

console.log(chalk.greenBright('✓ Database seeded successfully!'))