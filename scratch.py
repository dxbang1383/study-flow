import os

md_content = """# Registration Feature - Test Documentation

## 1. Specification (Đặc tả)
- **Username**: Must be at least 3 characters long. Must be unique.
- **Password**: Must be at least 8 characters long. Must contain at least one uppercase letter (A-Z), one lowercase letter (a-z), one number (0-9), and one special character (@$!%*?&).
- **Confirm Password**: Must exactly match the Password field.
- **Email**: Optional, but if provided, must be a valid email format. Must be unique.
- **Nickname & Role**: Optional text fields with no strict constraints.

## 2. Use Case
**Name**: User Registration
**Actor**: Unregistered Guest
**Description**: A guest attempts to create a new account by filling out the registration form.
**Pre-conditions**: The user is on the Registration page.
**Post-conditions**: If successful, a new user account is created in the database, and the user is redirected to the login page. If unsuccessful, the user remains on the page and sees appropriate error messages.

## 3. Scenarios (Kịch bản)
1. **SC1**: Register with valid details (Happy Path).
2. **SC2**: Register with invalid Username (Too short).
3. **SC3**: Register with an existing Username.
4. **SC4**: Register with invalid Passwords (Too short, missing uppercase, missing lowercase, missing number, missing special character).
5. **SC5**: Register with mismatched Confirm Password.
6. **SC6**: Register with invalid Email format.
7. **SC7**: Register with an existing Email.
8. **SC8**: Register with empty required fields.

## 4. Test Cases
| TC ID | Scenario | Username | Password | Confirm Password | Email | Expected Result |
|---|---|---|---|---|---|---|
"""

cases = []

def add(sc, u, p, cp, e, exp):
    cases.append(f"| TC{len(cases)+1:03d} | {sc} | `{u}` | `{p}` | `{cp}` | `{e}` | {exp} |")

valid_u = "johnDoe"
valid_p = "StrongP@ss1"
valid_e = "john@example.com"

# SC1: Valid (10 cases)
for i in range(1, 11):
    add("SC1", f"user{i}", "ValidP@ss1", "ValidP@ss1", f"user{i}@test.com", "Success")

# SC2: Invalid Username (10 cases)
short_users = ["a", "ab", "1", "12", "x", "xy", "A", "AB", "!", "!!"]
for i, u in enumerate(short_users):
    add("SC2", u, valid_p, valid_p, f"short{i}@test.com", "Fail: Username must be at least 3 chars")

# SC3: Existing Username (10 cases)
for i in range(10):
    add("SC3", "existingUser", valid_p, valid_p, f"newemail{i}@test.com", "Fail: Username already registered")

# SC4: Invalid Passwords (40 cases)
for i in range(8):
    add("SC4", f"u_noupp_{i}", f"weakp@ss{i}", f"weakp@ss{i}", valid_e, "Fail: Password must contain uppercase")
for i in range(8):
    add("SC4", f"u_nolow_{i}", f"WEAKP@SS{i}", f"WEAKP@SS{i}", valid_e, "Fail: Password must contain lowercase")
for i in range(8):
    add("SC4", f"u_nonum_{i}", f"WeakP@ssX", f"WeakP@ssX", valid_e, "Fail: Password must contain number")
for i in range(8):
    add("SC4", f"u_nospec_{i}", f"WeakPass{i}", f"WeakPass{i}", valid_e, "Fail: Password must contain special char")
for i in range(8):
    add("SC4", f"u_short_{i}", "W@s1", "W@s1", valid_e, "Fail: Password must be at least 8 chars")

# SC5: Mismatched Confirm Password (10 cases)
for i in range(10):
    add("SC5", f"u_mismatch_{i}", valid_p, valid_p+"x", valid_e, "Fail: Passwords do not match")

# SC6: Invalid Email (10 cases)
invalid_emails = ["plainaddress", "#@%^%#$@#$@#.com", "@example.com", "Joe Smith <email@example.com>", "email.example.com", "email@example@example.com", ".email@example.com", "email.@example.com", "email..email@example.com", "email@example.com (Joe Smith)"]
for i, e in enumerate(invalid_emails):
    add("SC6", f"u_bademail_{i}", valid_p, valid_p, e, "Fail: Invalid email format")

# SC7: Existing Email (10 cases)
for i in range(10):
    add("SC7", f"u_existemail_{i}", valid_p, valid_p, "existing@example.com", "Fail: Email already registered")

# SC8: Empty required fields (5 cases)
add("SC8", "", valid_p, valid_p, valid_e, "Fail: Browser validation required field")
add("SC8", valid_u, "", valid_p, valid_e, "Fail: Browser validation required field")
add("SC8", valid_u, valid_p, "", valid_e, "Fail: Browser validation required field")
add("SC8", "", "", "", "", "Fail: Browser validation required field")
add("SC8", "x", "", "", "", "Fail: Browser validation required field")

md_content += "\n".join(cases)

os.makedirs(r"c:\Bang1383\study-flow\frontend\guidelines", exist_ok=True)
with open(r"c:\Bang1383\study-flow\frontend\guidelines\Registration_Test_Cases.md", "w", encoding="utf-8") as f:
    f.write(md_content)
