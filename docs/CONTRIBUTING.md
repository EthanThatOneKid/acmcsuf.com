# Contributing Information

Fork this repo to your personal repository.
Check out into a branch.
Push to that branch and open a Pull Request

## Mirroring to the Production Repo 😎

To configure a remote fork of the repository, execute the following commands:

```
git remote -v
git remote add upstream https://github.com/EthanThatOneKid/acmcsuf.com.git
git remote -v
```

To update a fork of this repository, execute the following commands:

```
git fetch upstream
git checkout main
git merge upstream/main
git push
```
