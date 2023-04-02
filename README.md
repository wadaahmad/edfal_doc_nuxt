# EDFAL DOCUMENTATION - NUXT.JS 2 With bridge enabled 

This is Small App to create any documentatation, back-end is separated but it's in private, contact me if you needed [Linkedin](https://www.linkedin.com/in/wada-ahmad/)

## Design pattern
Created with modular pattern, folder structrures :
1. Modules - all features is created by splitting to a small module, all dependency (state, api, component) is isolated per modul,the benefits are easier to maintenance and scallable. 
2. Repositoy - For global composable 
3. bVue -  is custom component to wrap bootstrap 5
4. components - Global component 


## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
