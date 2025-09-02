# Triathlog - Requirements
## Context
Triathlon is a very comprehensive sport. Including multiple disciplines (swimming, biking and running) at once. Getting prepared for a triathlon race requires a great amount of training.

Getting all of this traning fit in your daily schedule calls for great planning. _Triathlog_ aims to solve this issue by allowing users to plan there traning week ahead and keeping track of traningblocks done or yet to be completed.

## Techstack
- Fullstack Framework: [SvelteKit](https://svelte.dev/docs/kit/introduction)
- TBD

## Requirements
### Story 1 - Add training block (_Must_)
As a user, I want to add a triathlon specific traning block

**Acceptance Criteria**
- A tranings block should atleast include the following information
    - Type
        e.g. Swim/Bike/Run/Strenght 
    - Date
        e.g. 03.09.2025
    - Start Time
        e.g. 18:00
    - Duration
        e.g. 2:30h
    - Description (optional)
        e.g. 8x400m sprints
- A tranings block can only be safed once all required fields have been filled out.
- Serverside data persistence must be guaranteed.

### Story 2 - Weekly overview (_Must_)
As a user, I want to have see all my traning blocks planned for the week.

**Acceptance Criteria**
- All traning blocks added for the current week can be seen in the overview.
- The traning blocks are sorted by days.
- If multiple traning blocks are planned for the day, they are further sorted by time.

### Story 3 - Delete previously added traning blocks (_Must_)
As a user, I want to be able to delete a previously added traning block.

**Acceptance Criteria**
- A user can delete a previously added traning block one at a time.
- Removed tranings blocks are deleted or invalidated from the data persistance layer

### Story 4 - Mark as done (_Should_)
As a user, I want to be able to mark a traning block as completed.

**Acceptance Criteria**
- A user can mark a planned traning block as done one at a time
- A visual cofirmation is shown, confirming the "marked as done" state
- The "marked as done" state is persisted in the data persistance layer

### Story 5 - Recurring traning blocks (_Could_)
As a user, I want to be able to make certain traning blocks recurring.

**Acceptance Criteria**
- User can make a traning block reccur.
- Supported intervals e.g. daily,weekly or monthly can be set
- A max number of recurrences can be set. e.g 10

### Story 6 - Stats (_Could_)
As a user, I want to see some stats about my planned and completed traning blocks.

**Acceptance Criteria**
- Stats include total number of planned traning sessions for the week
- Stats include total planned traning time for the week
- Stats include already completed number of traning sessions for the week
- Stats include already completed traning time for the week

## Quality Features
- Functionality should be validated using automated unit & integration tests.
- The solution should be portable (local runable on every desktop)
- With a 4G connection inital page load should be completed within 1sec