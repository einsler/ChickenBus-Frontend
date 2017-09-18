# ChickenBus
## Installation
1. Run `npm install` in the root directory.
2. Run `webpack` in the root directory to generate new files in the dist. This will be what is being served to the browser.
3. For now we are serving the index.html page statically, so just copy and paste the address of the file on your computer into a browser.

## Creating a new React component
1. Create a directory for the component with the same name as the component.
2. Create a file for its props with the name format ComponentName.Props.ts
3. Create a file for the default css styles to apply to the component with the name format ComponentName.styles.ts
4. Create a file for the component with the name formate ComponentName.tsx
5. Create an index file that will export the props and components with the name index.ts
6. Add an export statement to the index.ts file in the component directory that will export all files from the component's index file.