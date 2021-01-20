## Contributing Information

Fork this repo to your personal repository.
Check out into a branch.
Push to that branch and open a Pull Request

## Mirroring to the Production Repo 😎

To configure a remote fork a fork of the repository

```
git remote -v
git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
git remote -v
```

To update a fork of this repository, execute the following commands:

```
git fetch upstream
git checkout master
git merge upstream/master
git push
```
