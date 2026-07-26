## Task 2: Monitor Progress and Adjust
## Purpose
The purpose of this task was to monitor the team’s progress, track completed work, identify development issues, and make the adjustments required to keep the FlexSight MVP on schedule.
## Progress Tracking
| Tracking Method | Usage |
|---|---|
| Sprint plan | Used to track tasks, responsibilities, dependencies, deadlines, and completion status |
| GitHub commit history | Used to track backend, frontend, sensor, testing, documentation, and deployment updates |
| Short team updates | Used to discuss completed work, current tasks, blockers, and required adjustments |
| Task statuses | Tasks were tracked as Planned, In Progress, Testing, or Completed |
## Sprint Progress
| Sprint | Planned Tasks | Completed Tasks | Completion Rate |
|---|---:|---:|---:|
| Sprint 1 | 6 | 6 | 100% |
| Sprint 2 | 5 | 5 | 100% |
| Sprint 3 | 7 | 7 | 100% |
| Total | 18 | 18 | 100% |
The average sprint velocity was calculated as:
18 completed tasks ÷ 3 sprints = 6 completed tasks per sprint
## Fix Frontend Interface Issues
### Steps
1. *Analyze Users menu issue* - Identified that the Users navigation item remained highlighted on related routes.
2. *Fix Users menu highlight* - Added exact route matching to the Users navigation link.
3. *Analyze Settings layout* - Identified layout problems in the Settings page boxes.
4. *Fix Settings boxes* - Updated the Settings page structure and related styles.
5. *Analyze Add Device layout* - Identified size and alignment problems in the Add Device box.
6. *Fix Add Device box* - Adjusted the form size and layout.
7. *Build verification* - Ran the frontend production build after applying the fixes.
### ✅ Bugs Fixed
- ✅ Users menu highlight - Added exact route matching in Sidebar.jsx.
- ✅ Settings page boxes - Updated the Settings layout and styles.
- ✅ Add Device box - Corrected the form size and layout.
### Progress
1. Fix the Users menu highlight.
2. Fix the Settings page boxes.
3. Fix the Add Device box.
4. Run the frontend production build.
5. Verify that the updated pages compile successfully.
### Verification
- The frontend production build completed successfully using npm run build.
- The updated interface files compiled successfully.
- Detailed final testing evidence is documented under Task 4.
## Debugging Metrics
| Metric | Result |
|---|---:|
| Recorded bugs | 3 |
| Resolved bugs | 3 |
| Unresolved bugs | 0 |
| Bug resolution rate | 100% |
The bug resolution rate was calculated as:
3 resolved bugs ÷ 3 recorded bugs × 100 = 100%
## Progress Adjustments
| Change | Adjustment | Result |
|---|---|---|
| Additional integration work continued after Sprint 3 | The team completed additional repository updates from 21 to 23 July 2026 | Frontend and backend integration was updated |
| The password-reset implementation was removed from the final version | Password-reset pages, routes, fields, and migration files were removed | The final repository no longer includes the password-reset workflow |
| Authentication required an additional update | Login was updated to use usernames and the signed-in username was added to the Topbar | Authentication and user identification were updated |
| Alert information required additional tracking | resolved_by and resolved_at were added to alert responses and the Alerts table | Resolved alerts now include resolution information |
| Access checks required final updates | Backend permissions, protected routes, Sidebar visibility, and Settings options were updated | Frontend and backend access checks were updated |
| Dashboard data handling required an additional update | Dashboard data fetching and device API handling were updated | Dashboard data handling was simplified |
## Team Monitoring Responsibilities
| Team Member | Monitoring Responsibility |
|---|---|
| Hamsa Bnian Alammar | Followed sprint deadlines, coordinated team activities, and monitored overall progress |
| Rabea Thabit | Tracked repository integration, backend changes, permission updates, and deployment work |
| Munirah Alotaibi | Checked completed features, recorded the three interface issues, and verified the implemented corrections |
## Testing Note
The repository includes a Python file containing unit and production integration test cases. The file is recorded as testing work added during development. Detailed execution results, corrections, and final testing evidence are covered under Task 4.
## Task Result
All planned sprint tasks were recorded as completed. Three frontend interface bugs were documented and corrected, resulting in a 100% resolution rate. Additional authentication, alert, access-control, and integration updates were completed after Sprint 3 and recorded in the repository.
