# Firebase onAuthStateChanged Listener Inconsistency

This repository demonstrates a potential issue with Firebase's `onAuthStateChanged` listener.  In certain network or server-side error conditions, the listener may fail to detect session invalidation. This leads to an app continuing to operate under the assumption of authentication, even though the user's session is no longer valid on the Firebase server. This can cause security vulnerabilities and unexpected application behavior.

The repository contains two files: `authBug.js` (demonstrating the inconsistent behavior) and `authBugSolution.js` (presenting a robust solution).

## How to Reproduce

1. Clone the repository.
2. Install the required Firebase libraries.
3. Run `authBug.js`. Observe the inconsistencies in authentication status detection after simulating network changes or server-side session invalidation.
4. Run `authBugSolution.js` to see the solution and how it mitigates the problem.

## Solution

The provided solution involves adding supplementary checks, such as a periodic server-side verification of the token, to ensure that the client's authentication status is always in sync with the server's.