# Git Workflow Steps

## Step 1: Verify the Main Branch Is Clean

```
git checkout main
```

Then:

```
git status
```

Expected output:

```
On branch main
nothing to commit, working tree clean
```

## Step 2: List All Branches

```
git branch
```

or, to include remote branches:

```
git branch -a
```

Example:

```
* main
```

If `GitWork` still exists:

```
* main
  GitWork
```

## Step 3: Pull the Latest Changes

```
git pull origin main
```

If your repository uses `master` instead of `main`:

```
git pull origin master
```

## Step 4: Push Pending Changes

If you already added and committed the changes in the previous hands-on:

```
git push origin main
```

or simply:

```
git push
```

If this is your first push to the repository:

```
git push -u origin main
```

## Step 5: Verify on GitHub

1. Open your GitHub repository.
2. Refresh the page.
3. Confirm that:
   - The latest commit is visible.
   - The updated files (such as `hello.xml` and `.gitignore`) are present.
   - The commit message matches what you pushed.