## GIT FLOW

# в feature ветке

git add backend/
git commit -m "feat: migrate to prisma"
git push origin changed-backend-TypeORM-to-Prisma

# → PR в GitHub → merge

# после merge

git checkout main
git pull origin main

# тег

git tag -a v0.2.0-prisma -m "Migrate to Prisma"
git push origin v0.2.0-prisma

### Middlewares

# Используется чаще для логирования ошибок и т.п.

```
Выполняется до кода в controller и service

```

### Pipes

# Используется для валидации или трансформации получаемых файлов

```
Выполняется до кода в controller и service

```

### Guards

# Как охранник,например проверяет роли кто может делать записи а кто нет или кто на какой роут может попасть или проверка авториации(токены и т.п.)

```
Выполняется до кода в controller и service

```

### Decorators

# Использование кастомных декораторов например для получения user-agent

```
Создаётся с помощью createParamDecorator()

```
