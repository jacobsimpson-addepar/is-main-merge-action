# is-main-merge-action

This action checks that the current branch is based on the expected branch. It is intended to
prevent stack PRs (PRs that are based on other PRs) from merging before the PRs earlier in the
stack.

## Inputs

## `expected-base-branch`

**Required** The name of the branch a PR should be based on in order to merge.

## Outputs

None.

## Example usage

uses: jacobsimpson-addepar/is-main-merge-action@v1.3
with:
  expected-base-branch: 'main'
