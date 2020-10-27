# git-package

`git-package` allows you to manage releases backed by private git-repos while
keeping your history clean.

*npm* dependencies that point to git repos must have their compiled code
checked-in. In order to keep history clean, `git-package` creates release
branches where compiled files are removed from _.gitignore_.

## Prerequisites

* A remote named `origin`.
* SSH keys configured properly to access private git repo.

## Usage

* Add `git-package` to your package

    $ npm install --dev git-package

* Add `git-package` config to your `package.json` file specifying the folder
  containing compiled code. If you need to make release from specific branch, add it to your config also, by default `git-package` uses `master` branch.

    // fancy-private-pkg/package.json

    {
      ...
      "gitPackage": {
        "includeIgnored": [ "lib" ],
        "branch": "main" 
      }
    }


* Add your compiled code folder to `.gitignore`, and commit normally in your branch.

* Run `git-package`

    $ npm run git-package minor

  This will do the following:

    * Ensure that the command is run from `master` branch.
    * Run `npm run build`.
    * Bump package.json with the specified semver component: major/minor/patch.
    * Create a commit in `master` branch containing package.json version bump.
    * Create a `release/vX.X.X` branch.
    * Remove specified folders from `.gitgnore`.
    * Create a commit containing compiled code.
    * Tag it as `vX.X.X`.
    * Push `master`, `release/vX.X.X` and `vX.X.X` tag.

* You can now from another project, point to that private repo by adding this to `package.json` file:

    // another-project/package.json

    {
      "fancy-private-project": "git+ssh://git@github.com/your-org/fancy-private-pkg#v1.2.3",
    }
