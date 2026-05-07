# Full Project Test Documentation (Study Flow)

## FEATURE 1: User Authentication (Login)

### 1. Specification (Đặc tả)
- **Username**: Must not be empty.
- **Password**: Must not be empty.
- **System Behavior**: Valid credentials generate a JWT token and redirect to Dashboard. Invalid credentials display "Incorrect username or password". Missing fields trigger browser HTML5 validation.

### 2. Use Case
**Name**: User Login
**Actor**: Unregistered/Logged-out User
**Description**: User attempts to authenticate to access protected routes.
**Pre-conditions**: User is on the `/login` page.
**Post-conditions**: User is redirected to `/dashboard` upon success.

### 3. Scenarios (Kịch bản)
1. **SC1**: Login with valid credentials.
2. **SC2**: Login with invalid password.
3. **SC3**: Login with non-existent username.
4. **SC4**: Login with empty fields.

### 4. Test Cases (20 Cases)
| TC ID | Scenario | Username | Password | Expected Result |
|---|---|---|---|---|
| TC-LOG-001 | SC1 | `validUser` | `CorrectPass1!` | Success, redirect to Dashboard |
| TC-LOG-002 | SC1 | `adminUser` | `Admin@123` | Success, redirect to Dashboard |
| TC-LOG-003 | SC2 | `validUser` | `WrongPass1!` | Fail: "Incorrect username or password" |
| TC-LOG-004 | SC2 | `validUser` | `correctpass1!` | Fail: "Incorrect username or password" (Case sensitive) |
| TC-LOG-005 | SC2 | `validUser` | ` CorrectPass1! ` | Fail: "Incorrect username or password" (Spaces) |
| TC-LOG-006 | SC2 | `validUser` | `Correct` | Fail: "Incorrect username or password" |
| TC-LOG-007 | SC2 | `validUser` | `12345678` | Fail: "Incorrect username or password" |
| TC-LOG-008 | SC2 | `validUser` | `wrong` | Fail: "Incorrect username or password" |
| TC-LOG-009 | SC2 | `validUser` | `CorrectPass1!@` | Fail: "Incorrect username or password" |
| TC-LOG-010 | SC3 | `invalidUser` | `CorrectPass1!` | Fail: "Incorrect username or password" |
| TC-LOG-011 | SC3 | `unknown123` | `AnyPass123!` | Fail: "Incorrect username or password" |
| TC-LOG-012 | SC3 | `admin` | `Admin@123` | Fail: "Incorrect username or password" |
| TC-LOG-013 | SC3 | `test` | `test` | Fail: "Incorrect username or password" |
| TC-LOG-014 | SC3 | `user` | `password` | Fail: "Incorrect username or password" |
| TC-LOG-015 | SC4 | `` | `CorrectPass1!` | Fail: Browser requires username |
| TC-LOG-016 | SC4 | `validUser` | `` | Fail: Browser requires password |
| TC-LOG-017 | SC4 | `` | `` | Fail: Browser requires fields |
| TC-LOG-018 | SC4 | ` ` | `CorrectPass1!` | Fail: "Incorrect username or password" |
| TC-LOG-019 | SC4 | `validUser` | ` ` | Fail: "Incorrect username or password" |
| TC-LOG-020 | SC4 | `' OR 1=1 --` | `admin` | Fail: "Incorrect username or password" (SQLi handled by SQLAlchemy) |

---

## FEATURE 2: Profile Management

### 1. Specification (Đặc tả)
- **Avatar URL**: Must be a string.
- **Email**: Must follow standard email format.
- **New Password**: Optional. If provided, must pass strong complexity checks (Min 8 chars, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Char).
- **Nickname / Role**: Free text.

### 2. Use Case
**Name**: Update Profile
**Actor**: Authenticated User
**Description**: User modifies personal information from the Profile page.
**Pre-conditions**: User is logged in and navigates to `/profile`.

### 3. Scenarios (Kịch bản)
1. **SC1**: Update Avatar, Nickname, and Role successfully.
2. **SC2**: Update Email to a valid new email.
3. **SC3**: Update Password with a valid strong password.
4. **SC4**: Attempt to update Password with weak constraints.
5. **SC5**: Attempt to update Email to an invalid format.

### 4. Test Cases (30 Cases)
| TC ID | Scenario | Avatar URL | Email | Nickname | Role | New Password | Expected Result |
|---|---|---|---|---|---|---|---|
| TC-PRO-001 | SC1 | `http://img.com/1` | `user@a.com` | `Nick` | `Student` | `` | Success: "Profile updated successfully!" |
| TC-PRO-002 | SC1 | `https://x.com/a.png`| `user@a.com` | `John` | `Dev` | `` | Success: "Profile updated successfully!" |
| TC-PRO-003 | SC1 | `` | `user@a.com` | `NoAvt` | `None` | `` | Success: Avatar removes |
| TC-PRO-004 | SC1 | `invalid-url` | `user@a.com` | `Nick` | `Role` | `` | Success (URL validation is not strict yet, displays broken image) |
| TC-PRO-005 | SC2 | `url` | `new@test.com` | `Nick` | `Role` | `` | Success: Email updated |
| TC-PRO-006 | SC2 | `url` | `admin@corp.org`| `Nick` | `Role` | `` | Success: Email updated |
| TC-PRO-007 | SC2 | `url` | `my.name@domain.co`| `Nick` | `Role` | `` | Success: Email updated |
| TC-PRO-008 | SC3 | `url` | `user@a.com` | `Nick` | `Role` | `NewP@ssw0rd` | Success: Password updated |
| TC-PRO-009 | SC3 | `url` | `user@a.com` | `Nick` | `Role` | `!1Qaz2wsx` | Success: Password updated |
| TC-PRO-010 | SC3 | `url` | `user@a.com` | `Nick` | `Role` | `H@rdPass123` | Success: Password updated |
| TC-PRO-011 | SC4 | `url` | `user@a.com` | `Nick` | `Role` | `weak` | Fail: Update failed (Validation error on length) |
| TC-PRO-012 | SC4 | `url` | `user@a.com` | `Nick` | `Role` | `nouppercase1!` | Fail: Update failed (No uppercase) |
| TC-PRO-013 | SC4 | `url` | `user@a.com` | `Nick` | `Role` | `NOLOWERCASE1!` | Fail: Update failed (No lowercase) |
| TC-PRO-014 | SC4 | `url` | `user@a.com` | `Nick` | `Role` | `NoNumberPass!` | Fail: Update failed (No number) |
| TC-PRO-015 | SC4 | `url` | `user@a.com` | `Nick` | `Role` | `NoSpecialChar1` | Fail: Update failed (No special char) |
| TC-PRO-016 | SC4 | `url` | `user@a.com` | `Nick` | `Role` | `short1!` | Fail: Update failed (Too short) |
| TC-PRO-017 | SC4 | `url` | `user@a.com` | `Nick` | `Role` | `12345678` | Fail: Update failed |
| TC-PRO-018 | SC4 | `url` | `user@a.com` | `Nick` | `Role` | `password` | Fail: Update failed |
| TC-PRO-019 | SC4 | `url` | `user@a.com` | `Nick` | `Role` | `PASSWORD` | Fail: Update failed |
| TC-PRO-020 | SC4 | `url` | `user@a.com` | `Nick` | `Role` | `!@#$%^&*` | Fail: Update failed |
| TC-PRO-021 | SC5 | `url` | `plainaddress` | `Nick` | `Role` | `` | Fail: Invalid email format |
| TC-PRO-022 | SC5 | `url` | `@no-local.com` | `Nick` | `Role` | `` | Fail: Invalid email format |
| TC-PRO-023 | SC5 | `url` | `no-domain@.com`| `Nick` | `Role` | `` | Fail: Invalid email format |
| TC-PRO-024 | SC5 | `url` | `space in@email.com`| `Nick` | `Role` | `` | Fail: Invalid email format |
| TC-PRO-025 | SC5 | `url` | `missing@tld` | `Nick` | `Role` | `` | Fail: Invalid email format |
| TC-PRO-026 | SC5 | `url` | `double@@test.com`| `Nick` | `Role` | `` | Fail: Invalid email format |
| TC-PRO-027 | SC5 | `url` | `just-string` | `Nick` | `Role` | `` | Fail: Invalid email format |
| TC-PRO-028 | SC5 | `url` | `email@123` | `Nick` | `Role` | `` | Fail: Invalid email format |
| TC-PRO-029 | SC5 | `url` | `email@domain.` | `Nick` | `Role` | `` | Fail: Invalid email format |
| TC-PRO-030 | SC5 | `url` | `.email@domain.com`| `Nick` | `Role` | `` | Fail: Invalid email format |

---

## FEATURE 3: Task Management (Kanban Board)

### 1. Specification (Đặc tả)
- **Task Creation**: Requires Title, Deadline (Date & Time), and Subject.
- **Task Status**: Todo, In Progress, Done.
- **Reminders**: Tasks that are overdue (Deadline < Current Time) trigger a notification in the TopNav if not "Done".

### 2. Use Case
**Name**: Manage Tasks
**Actor**: Authenticated User
**Description**: User adds, moves, and deletes tasks to manage their workload.
**Pre-conditions**: User is logged in and navigates to `/tasks`.

### 3. Scenarios (Kịch bản)
1. **SC1**: Create a new task with valid details.
2. **SC2**: Create a task missing required fields.
3. **SC3**: Change task status via drag and drop (or select).
4. **SC4**: Delete a task.
5. **SC5**: Notification triggers for overdue tasks.

### 4. Test Cases (30 Cases)
| TC ID | Scenario | Task Action | Details | Expected Result |
|---|---|---|---|---|
| TC-TSK-001 | SC1 | Create Task | Title: "Math HW", Deadline: Future, Subject: "Math" | Task appears in "Todo" |
| TC-TSK-002 | SC1 | Create Task | Title: "Read book", Deadline: Future, Subject: "Lit" | Task appears in "Todo" |
| TC-TSK-003 | SC1 | Create Task | Title: "Long title test with many characters...", Deadline: Future, Subj: "Any" | Task appears in "Todo" |
| TC-TSK-004 | SC1 | Create Task | Title: "Special chars !@#", Deadline: Future, Subj: "Any" | Task appears in "Todo" |
| TC-TSK-005 | SC1 | Create Task | Title: "12345", Deadline: Future, Subj: "Any" | Task appears in "Todo" |
| TC-TSK-006 | SC2 | Create Task | Title: "", Deadline: Future, Subject: "Math" | Fail: Alert/Prevention |
| TC-TSK-007 | SC2 | Create Task | Title: "HW", Deadline: "", Subject: "Math" | Fail: Alert/Prevention |
| TC-TSK-008 | SC2 | Create Task | Title: "HW", Deadline: Future, Subject: "" | Fail: Alert/Prevention |
| TC-TSK-009 | SC2 | Create Task | Title: "", Deadline: "", Subject: "" | Fail: Alert/Prevention |
| TC-TSK-010 | SC2 | Create Task | Title: "   ", Deadline: Future, Subject: "Math" | Fail: Empty string handling |
| TC-TSK-011 | SC3 | Move Task | Move "Todo" -> "In Progress" | Task moves to "In Progress" column |
| TC-TSK-012 | SC3 | Move Task | Move "In Progress" -> "Done" | Task moves to "Done" column |
| TC-TSK-013 | SC3 | Move Task | Move "Todo" -> "Done" | Task moves to "Done" column |
| TC-TSK-014 | SC3 | Move Task | Move "Done" -> "Todo" | Task moves to "Todo" column |
| TC-TSK-015 | SC3 | Move Task | Move "Done" -> "In Progress" | Task moves to "In Progress" |
| TC-TSK-016 | SC3 | Move Task | Move "In Progress" -> "Todo" | Task moves to "Todo" |
| TC-TSK-017 | SC4 | Delete Task | Click Delete on "Todo" task | Task is removed from list |
| TC-TSK-018 | SC4 | Delete Task | Click Delete on "In Progress" task | Task is removed from list |
| TC-TSK-019 | SC4 | Delete Task | Click Delete on "Done" task | Task is removed from list |
| TC-TSK-020 | SC4 | Delete Task | Create then immediately Delete | Task is created then removed |
| TC-TSK-021 | SC5 | Notification | Create Task with Deadline 1 min in past (Todo) | Notification bell updates in TopNav |
| TC-TSK-022 | SC5 | Notification | Create Task with Deadline 1 day in past (Todo) | Notification bell updates |
| TC-TSK-023 | SC5 | Notification | Create Task with Deadline 1 year in past (Todo) | Notification bell updates |
| TC-TSK-024 | SC5 | Notification | Move overdue task to "Done" | Notification disappears for this task |
| TC-TSK-025 | SC5 | Notification | Create Task with Deadline 1 min in future | No notification until 1 min passes |
| TC-TSK-026 | SC5 | Notification | Edit overdue task to Future deadline | Notification disappears |
| TC-TSK-027 | SC5 | Notification | Move overdue task from Done to Todo | Notification reappears |
| TC-TSK-028 | SC5 | Notification | Delete an overdue task | Notification count decreases |
| TC-TSK-029 | SC5 | Notification | Overdue task in "In Progress" | Notification triggers |
| TC-TSK-030 | SC5 | Notification | Create 5 overdue tasks | TopNav shows list of 5 reminders |

---

## FEATURE 4: Study Timer

### 1. Specification (Đặc tả)
- **Modes**: Study (Focus) and Play (Break).
- **Study Mode Constraints**: User MUST select a Subject before starting.
- **Play Mode Constraints**: Subject selection is NOT required.
- **Timer Actions**: Start, Pause, Stop. Stopping logs the time to Analytics.

### 2. Use Case
**Name**: Track Time
**Actor**: Authenticated User
**Description**: User utilizes the Pomodoro timer to focus on studying and logs the completed time.
**Pre-conditions**: User is logged in and navigates to `/timer`.

### 3. Scenarios (Kịch bản)
1. **SC1**: Start Study mode without a subject.
2. **SC2**: Start Study mode with a selected subject.
3. **SC3**: Start Play mode without a subject.
4. **SC4**: Pause and Resume timer.
5. **SC5**: Stop timer and verify analytics.

### 4. Test Cases (20 Cases)
| TC ID | Scenario | Mode | Subject Selected | Action | Expected Result |
|---|---|---|---|---|---|
| TC-TMR-001 | SC1 | Study | No | Click Start | Alert: "Please select a subject before starting!" |
| TC-TMR-002 | SC1 | Study | No | Click Start multiple times | Alert: "Please select a subject before starting!" repeatedly |
| TC-TMR-003 | SC2 | Study | Yes (Math) | Click Start | Timer begins counting down |
| TC-TMR-004 | SC2 | Study | Yes (Physics) | Click Start | Timer begins counting down |
| TC-TMR-005 | SC2 | Study | Yes (English) | Click Start | Timer begins counting down |
| TC-TMR-006 | SC3 | Play | No | Click Start | Timer begins counting down |
| TC-TMR-007 | SC3 | Play | Yes (Optional) | Click Start | Timer begins counting down |
| TC-TMR-008 | SC4 | Study | Yes | Start -> Pause | Timer stops visually at current time |
| TC-TMR-009 | SC4 | Study | Yes | Start -> Pause -> Start | Timer resumes from paused time |
| TC-TMR-010 | SC4 | Play | No | Start -> Pause | Timer pauses |
| TC-TMR-011 | SC4 | Play | No | Start -> Pause -> Start | Timer resumes |
| TC-TMR-012 | SC5 | Study | Yes (Math) | Start -> wait 5s -> Stop | Timer resets, time logged to Analytics |
| TC-TMR-013 | SC5 | Study | Yes (Lit) | Start -> Stop immediately | Time logged (near 0) |
| TC-TMR-014 | SC5 | Play | No | Start -> Stop | Timer resets |
| TC-TMR-015 | SC2 | Study | Yes | Edit duration to 50 mins -> Start | Timer starts from 50:00 |
| TC-TMR-016 | SC2 | Study | Yes | Edit duration to 1 min -> Start -> Wait | Timer reaches 00:00 automatically |
| TC-TMR-017 | SC3 | Play | No | Edit duration to 5 mins -> Start | Timer starts from 05:00 |
| TC-TMR-018 | SC4 | Study | Yes | Start -> switch tab -> return | Timer continues counting correctly in background |
| TC-TMR-019 | SC4 | Play | No | Start -> switch tab -> return | Timer continues counting correctly |
| TC-TMR-020 | SC5 | Study | Yes | Reach 00:00 -> Check Analytics | 1 full session logged for the specific subject |
