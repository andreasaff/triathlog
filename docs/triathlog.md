# Triathlog - Requirements
## Context
Triathlon is a very comprehensive sport. Including multiple disciplines (swimming, biking and running) at once. Getting prepared for a triathlon race requires a great amount of training.

Getting all of this training to fit in your daily schedule calls for great planning. _Triathlog_ aims to solve this issue by allowing users to plan their traning week ahead and keep track of training sessions done or yet to be completed.

## Techstack
- Full-Stack Framework: [SvelteKit](https://svelte.dev/docs/kit/introduction)
- UI Library: [shadcn-svelte](https://shadcn-svelte.com/)
- CSS Framework: [TailwindCSS](https://tailwindcss.com/)
- ORM: [Drizzle](https://orm.drizzle.team/)
- DB: [SQLite](https://sqlite.org/)

## Requirements
### Story 1 - Add training block (_Must_)
As a user, I want to add a triathlon specific training block

**Acceptance Criteria**
- A trainings block should at least include the following information
    - Type
        e.g. Swim/Bike/Run/Strength 
    - Date
        e.g. 03.09.2025
    - Start Time
        e.g. 18:00
    - Duration
        e.g. 2:30h
    - Description (optional)
        e.g. 8x400m sprints
- A trainings block can only be saved once all required fields have been filled out.
- Server-side data persistence must be guaranteed.

### Story 2 - Weekly overview (_Must_)
As a user, I want to see all my training blocks planned for the week.

**Acceptance Criteria**
- All training blocks added for the current week can be seen in the overview.
- The training blocks are sorted by days.
- If multiple training blocks are planned for the day, they are further sorted by time.

### Story 3 - Delete previously added training blocks (_Must_)
As a user, I want to be able to delete a previously added training block.

**Acceptance Criteria**
- A user can delete a previously added training block one at a time.
- Removed trainings blocks are deleted or invalidated from the data persistence layer

### Story 4 - Mark as done (_Should_)
As a user, I want to be able to mark a training block as completed.

**Acceptance Criteria**
- A user can mark a planned training block as done one at a time
- A visual confirmation is shown, confirming the "marked as done" state
- The "marked as done" state is persisted in the data persistence layer

### Story 5 - Update existing training blocks (_Could_)
As a user, I want to be able to edit existing training blocks.

**Acceptance Criteria**
- A user can change the description of a training block
- A user can change the duration of a training block
- The change is reflected in the data persistence layer

### Story 6 - Recurring Training Blocks (_Could_)
As a user, I want to be able to make certain training blocks recurring.

**Acceptance Criteria**
- User can make a training block recur.
- Supported intervals, e.g. daily,weekly or monthly, can be set
- A max number of recurrences can be set. e.g 10

### Story 7 - Stats (_Could_)
As a user, I want to see some stats about my planned and completed training blocks.

**Acceptance Criteria**
- Stats include the total number of planned training sessions for the week
- Stats include total planned training time for the week
- Stats include the already completed number of training sessions for the week
- Stats include already completed training time for the week

## Quality Features
- Functionality should be validated using automated unit & integration tests.
- The solution should be portable (locally runnable on every desktop)
- With a 4G connection, the initial page load should be completed within 1sec