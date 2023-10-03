# GitHub commands

Commands:

	git add . to stage the changes.
	git commit -m "Your commit message here" to commit the changes.
	git push origin temp-branch to push the changes to the "temp-branch" in the remote repository.

## cloning a repository with ssh and without token

git clone git@github.com:DiceGameITAcademy/DiceG.git


## WORKING WITH BRANCHES

To update your local "dev" branch with the changes from the remote "dev" branch, you can use the git pull command.

However, you have to pay attention to merge options. The first method compares your local with your remote repository. The second method replaces the local with the remote

FIRST METHOD

Here's how to do it from the terminal:

check you're on the right branch, then

git pull origin dev

Now you can work with the latest version of remote repository locally

To update your "edgar-branch" with the same content as your "dev" branch, you can follow these steps:

Step 1: Switch to the "edgar-branch"

If you are not already on the "edgar-branch," switch to it.

Step 2: Merge Changes from "dev" into "edgar-branch"

Now that you are on the "edgar-branch," you can merge the changes from the "dev" branch into it:

git merge dev

Step 3: Commit the Merge Changes

Once the merge is complete (with or without conflicts), commit the merge changes:

git commit -m "Merge 'dev' into 'edgar-branch'"

Step 4: Push the "edgar-branch" to the Remote Repository (Optional)

If you want to update the remote "edgar-branch" with these changes, push the "edgar-branch" to the remote repository:

git push origin edgar-branch


SECOND METHOD

If you want to replace the content of your local "edgar-branch" with the content of your local "dev" branch, you can do that by force-pushing the "dev" branch into the "edgar-branch." Here are the steps:

Step 1: Ensure You Are on the "edgar-branch" Locally:

Make sure you are on the "edgar-branch" in your local repository

Step 2: Replace the Content of "edgar-branch" with "dev" Locally:

Force-push the "dev" branch into the "edgar-branch" to replace its content:

git reset --hard dev

Step 3: Push the Updated "edgar-branch" to the Remote Repository (Optional):

If you want to update the remote "edgar-branch" with these changes, you can push the "edgar-branch" to the remote repository:

git push origin edgar-branch --force

The --force flag is used to force-push and overwrite the remote branch with your local changes. Be cautious when force-pushing, as it can overwrite remote changes.

# Delete local branch and clone the remote branch

To delete your local edgar-branch and then clone the remote edgar-branch from the GitHub repository, you can use the following Git commands:

- first checkout from the edgar branch

- then


    Delete Local edgar-branch:

    bash

git branch -d edgar-branch

This command will delete your local edgar-branch. If you have unmerged changes in the branch, you can use -D instead of -d to force deletion.

Clone the Remote edgar-branch:

bash

    git clone -b edgar-branch --single-branch https://github.com/DiceGameITAcademy/DiceG.git

    Replace https://github.com/DiceGameITAcademy/DiceG.git with the URL of your GitHub repository if it's different.

These commands will first delete your local edgar-branch and then clone the remote edgar-branch from the GitHub repository to your local machine. After running these commands, you should have a fresh copy of the remote edgar-branch in your local repository.







fetch the branch from the remote repository in order to work with it

-git fetch origin dev:dev

-git fetch origin edgar-branch:edgar-branch


# Create and switch to the new branch
git checkout -b edgarDev

# Push the newly created branch to the remote repository
git push origin edgarDev

Pull Latest Changes: It's a good practice to ensure your "main" branch is up to date with the latest changes from the remote repository:
git pull origin main

merge the branch: 
git merge edgarDev

stash changes
git stash

## Deleting Branches via Git Command Line (Optional):

If you prefer to delete branches using Git from the command line, you can use the following commands:

To delete a local branch:

git branch -d <branch-name>

To force delete a local branch (if it's not fully merged):

git branch -D <branch-name>

To delete a remote branch and remove it from the remote repository:

git push origin --delete <branch-name>



git config --add safe.directory 'E:\gato\web-dev\_mis recursos\paginayo' --global

git remote add origin https://github.com/OllinDesigns/ollinwebsite.git

git push -uf origin master


Clone

First thing is to create or choose a folder where your remote repository (from Github is going to be cloned.)

yo can go there in the file explorer from Ubuntu. Once you re in the folder you click the 3 dots that are on the right of the folder on the navigation bar, Then  
you click “open in terminal”.

The terminal will take you to this folder you choose. Once in there you type this command.

cmd

git clone git@github.com:yourUserNameOnGithub/yourRepositoryName.git

yourUserNameOnGithub: you have to type your user name exactly as it appears in GitHub
yourRepositoryName  type your repository name exactly as it appears in GitHub.

You can copy paste the name but be very careful how you write it. It should match exactly

This will clone the github repository to your computer. Check the folder you ve previoslyt chosen to save the cloner repository. the folder should appear there.

You can check quickly if is working. Drop any new files you want tp that folder.

then type in terminal

git status

it has to tell you something about your git status. Most likely you will see the new files in red. This mens you git is working and you have added files to your local directory

then you will add the files with the terminal
you ca either add all the new files with this command

git add . (make sure there is a space between add and .)

or you can add files one by one writing

git add [filename]
Suppose something like this

git add my-file.ts another-file.js new_file.rb

I

Then write git status again and if the files appear in red you re ready to commit

Commit

write

git commit -m 'TEXT WHAT YOU WANT TO WRITE FOR EXAMPLE: FIRST PUSH'

Now that the commit is made, we can push!

git push
if it doesnt work try:
git push --all --set-upstream origin






https://github.com/git-guides/git-add


https://rubygarage.org/blog/most-basic-git-commands-with-examples



Switch to the "temp-branch":

To switch to a branch, use the git checkout command:


git checkout temp-branch
