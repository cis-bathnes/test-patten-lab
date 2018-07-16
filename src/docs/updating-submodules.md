### Updating submodules

To update the toolkit to the latest version's of the submodules within the toolkit repository you can use:

`$ git submodule update`

You'll need to monitor the submodules we build on to see when they change, and what those changes will do.

As we're building on top of the Gov.uk Elements and Frontend Toolkit there's potential for regression when updating them so this should be tested.

The submodules are:

* Gov.uk Elements <https://github.com/alphagov/govuk_elements>
* Gov.uk Frontend Toolkit <https://github.com/alphagov/govuk_frontend_toolkit>

The 'git submodule update' command actually tells Git that you want your submodules to each check out the commit already specified in the index of the superproject. If you want to update your submodules to the latest commit available from their remote, you will need to do this directly in the submodules.

So in summary:

`git submodule add ssh://bla submodule_dir`

`git submodule init`

time passes, submodule upstream is updated and you now want to update

change to the submodule directory
`cd submodule_dir`

checkout desired branch
`git checkout master`

update
`git pull`

get back to your project root
`cd ..`

now the submodules are in the state you want, so
`git commit -am "Pulled down update to submodule_dir"`
