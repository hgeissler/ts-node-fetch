### Setup

```
npm init -y
npm install typescript
npx tsc --init
```

### Structure

- add dist and src folder to project

### Add to tsconfig

```
{
  "compilerOptions": {
    "outDir": "dist
  },
  "include": ["src/**/*"]
}
```

### Start compiler

`npx tsc`

### Watch mode compiler

`npx tsc --watch`

### Add node-fetch + type declarations

`npm add node-fetch`  
`npm install @types/node-fetch`
