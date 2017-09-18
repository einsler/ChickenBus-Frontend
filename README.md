# ChickenBus
## Installation
1. Run `npm install` in the root directory.
2. Run `npm run dev` in the root directory to get the app started. Any changes made will be hot loaded into the browser which will help you see changes made.

Note: `npm run start` is used for production.

## Creating a new React component
1. Create a directory for the component with the same name as the component.
2. Create a file for its props with the name format ComponentName.Props.ts
3. Create a file for the default css styles to apply to the component with the name format ComponentName.styles.ts
4. Create a file for the component with the name formate ComponentName.tsx
5. Create an index file that will export the props and components with the name index.ts
6. Add an export statement to the index.ts file in the component directory that will export all files from the component's index file.