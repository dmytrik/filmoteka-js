# Parcel Template  
This project was created using Parcel. To get familiar with its setup and additional capabilities, refer to the [documentation](https://parceljs.org/).  

## Setting Up a New Project  
1. Ensure that the LTS version of Node.js is installed on your computer. [Download and install](https://nodejs.org/en/) it if necessary.  
2. Clone this repository.  
3. Rename the folder from `parcel-project-template` to your project name.  
4. Create a new empty repository on GitHub.  
5. Open the project in VSCode, launch the terminal, and link the project to the GitHub repository following [this guide](https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories#changing-a-remote-repositorys-url).  
6. Install project dependencies by running: `npm install`.
7. Start development mode by executing the `npm start` command.
8. Go to the following address in your browser [http://localhost:1234](http://localhost:1234).
   This page will be automatically reloaded after saving the changes in the
   project files.

## Files and folders

- All parshals of style files should lie in the `src/sass` folder and be imported into the
  page style files. For example, for `index.html` the style file is called
  `index.scss`.
- You add images to the `src/images` folder. The builder optimizes them, but only
  when the production version of the project is deployed. All this happens in the cloud so it doesn't
  load your computer, because on weak machines it can take a long time.
  a lot of time.

## Deploy

To customize your project's deployment, there are a few additional steps to follow
to customize your repository. Go to the `Settings` tab and in the sub-section
`Actions` select the `General` option.

![GitHub actions settings](./assets/actions-config-step-1.png)

Scroll down the page to the last section, where you make sure you select options like
in the following image and click `Save`. Without these settings, the build will not have
not have enough permissions to automate the deployment process.

![GitHub actions settings](./assets/actions-config-step-2.png)

The production version of the project will be automatically built and deployed to GitHub
Pages, to the `gh-pages` branch, every time the `main` branch is updated. For example,
after a direct push or an accepted pool-request. To do this, you need in the file
`package.json` file edit the `homepage` field and the `build` script by replacing
`your_username` and `your_repo_name` to your own, and submit the changes to GitHub.

```json
"homepage": "https://your_username.github.io/your_repo_name/",
"scripts": {
  "build": "parcel build src/*.html --public-url /your_repo_name/"
},
```

Next you need to go into the GitHub repository settings (`Settings` > `Pages`) and
set the distribution of the production version of the files from the `/root` folder of the `gh-pages` branch, if it was not done automatically.
this was not done automatically.

![GitHub Pages settings](./assets/repo-settings.png)



### Deploy Status

Deploy status of the last commit is displayed by the icon next to its identifier.

- **Yellow color** - the project is being built and deployed.
- **Green color** - deploy completed successfully.
- **Red color** - an error occurred during linking, building or deploying.

More detailed information about the status can be viewed by clicking on the icon and in the
drop-down window by clicking `Details` link.

![Deployment status](./assets/status.png)

### Live Page

After a while, usually a couple of minutes, the live page can be viewed
at the address specified in the edited `homepage` property. For example, here is
is a link to the live version for this repository
[https://goitacademy.github.io/parcel-project-template](https://goitacademy.github.io/parcel-project-template).

If a blank page opens, make sure there are no errors in the `Console` tab
related to incorrect paths to CSS and JS files of the project (**404**). Most likely
most likely you have wrong value of `homepage` property or `build` script in `package.json` file.
`package.json` file.

## How it works

![How it works](./assets/how-it-works.png)

1. After each push to the `main` branch of the GitHub repository, a special
   script (GitHub Action) from the `.github/workflows/deploy.yml` file.
2. All repository files are copied to the server, where the project is initialized and
   is initialized and built before being deployed.
3. If all the steps are successful, the built production version of the project files
   is sent to the `gh-pages` branch. Otherwise, the log of the
   script execution log will indicate what the problem is.
