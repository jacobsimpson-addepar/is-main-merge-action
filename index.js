const core = require('@actions/core');
const github = require('@actions/github');

try {
  // This action is intended to check if a pull request has the expected base branch. If this action
  // was not triggered by a pull request, then it is set up incorrectly and should always fail. If
  // the event was triggered by a pull request, then the event payload should have a pull_request
  // section.
  if (!github.context.payload.pull_request) {
    core.setFailed('This event does not have `pull_request` information. It does not seem to be triggered by a pull_request and can not be checked.');
    return;
  }

  // `expected-base-branch` input defined in action metadata file.
  const expectedBaseBranch = core.getInput('expected-base-branch');
  console.log(`Expected base branch = '${expectedBaseBranch}'`);

  console.log(`Event property 'pull_request' = ${JSON.stringify(github.context.payload.pull_request, undefined, 2)}`);

  const baseBranch = github.context.payload.pull_request.base.ref;
  console.log(`Actual base branch = '${baseBranch}'`);

  if (baseBranch !== expectedBaseBranch) {
    core.setFailed(`This pull request is not based on the ${expectedBaseBranch} branch. It should not be merged until the PRs it is based on are merged.`);
  }
} catch (error) {
  core.setFailed(error.message);
}
