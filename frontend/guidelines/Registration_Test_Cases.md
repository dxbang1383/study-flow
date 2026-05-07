# Registration Feature - Test Documentation

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
| TC001 | SC1 | `user1` | `ValidP@ss1` | `ValidP@ss1` | `user1@test.com` | Success |
| TC002 | SC1 | `user2` | `ValidP@ss1` | `ValidP@ss1` | `user2@test.com` | Success |
| TC003 | SC1 | `user3` | `ValidP@ss1` | `ValidP@ss1` | `user3@test.com` | Success |
| TC004 | SC1 | `user4` | `ValidP@ss1` | `ValidP@ss1` | `user4@test.com` | Success |
| TC005 | SC1 | `user5` | `ValidP@ss1` | `ValidP@ss1` | `user5@test.com` | Success |
| TC006 | SC1 | `user6` | `ValidP@ss1` | `ValidP@ss1` | `user6@test.com` | Success |
| TC007 | SC1 | `user7` | `ValidP@ss1` | `ValidP@ss1` | `user7@test.com` | Success |
| TC008 | SC1 | `user8` | `ValidP@ss1` | `ValidP@ss1` | `user8@test.com` | Success |
| TC009 | SC1 | `user9` | `ValidP@ss1` | `ValidP@ss1` | `user9@test.com` | Success |
| TC010 | SC1 | `user10` | `ValidP@ss1` | `ValidP@ss1` | `user10@test.com` | Success |
| TC011 | SC2 | `a` | `StrongP@ss1` | `StrongP@ss1` | `short0@test.com` | Fail: Username must be at least 3 chars |
| TC012 | SC2 | `ab` | `StrongP@ss1` | `StrongP@ss1` | `short1@test.com` | Fail: Username must be at least 3 chars |
| TC013 | SC2 | `1` | `StrongP@ss1` | `StrongP@ss1` | `short2@test.com` | Fail: Username must be at least 3 chars |
| TC014 | SC2 | `12` | `StrongP@ss1` | `StrongP@ss1` | `short3@test.com` | Fail: Username must be at least 3 chars |
| TC015 | SC2 | `x` | `StrongP@ss1` | `StrongP@ss1` | `short4@test.com` | Fail: Username must be at least 3 chars |
| TC016 | SC2 | `xy` | `StrongP@ss1` | `StrongP@ss1` | `short5@test.com` | Fail: Username must be at least 3 chars |
| TC017 | SC2 | `A` | `StrongP@ss1` | `StrongP@ss1` | `short6@test.com` | Fail: Username must be at least 3 chars |
| TC018 | SC2 | `AB` | `StrongP@ss1` | `StrongP@ss1` | `short7@test.com` | Fail: Username must be at least 3 chars |
| TC019 | SC2 | `!` | `StrongP@ss1` | `StrongP@ss1` | `short8@test.com` | Fail: Username must be at least 3 chars |
| TC020 | SC2 | `!!` | `StrongP@ss1` | `StrongP@ss1` | `short9@test.com` | Fail: Username must be at least 3 chars |
| TC021 | SC3 | `existingUser` | `StrongP@ss1` | `StrongP@ss1` | `newemail0@test.com` | Fail: Username already registered |
| TC022 | SC3 | `existingUser` | `StrongP@ss1` | `StrongP@ss1` | `newemail1@test.com` | Fail: Username already registered |
| TC023 | SC3 | `existingUser` | `StrongP@ss1` | `StrongP@ss1` | `newemail2@test.com` | Fail: Username already registered |
| TC024 | SC3 | `existingUser` | `StrongP@ss1` | `StrongP@ss1` | `newemail3@test.com` | Fail: Username already registered |
| TC025 | SC3 | `existingUser` | `StrongP@ss1` | `StrongP@ss1` | `newemail4@test.com` | Fail: Username already registered |
| TC026 | SC3 | `existingUser` | `StrongP@ss1` | `StrongP@ss1` | `newemail5@test.com` | Fail: Username already registered |
| TC027 | SC3 | `existingUser` | `StrongP@ss1` | `StrongP@ss1` | `newemail6@test.com` | Fail: Username already registered |
| TC028 | SC3 | `existingUser` | `StrongP@ss1` | `StrongP@ss1` | `newemail7@test.com` | Fail: Username already registered |
| TC029 | SC3 | `existingUser` | `StrongP@ss1` | `StrongP@ss1` | `newemail8@test.com` | Fail: Username already registered |
| TC030 | SC3 | `existingUser` | `StrongP@ss1` | `StrongP@ss1` | `newemail9@test.com` | Fail: Username already registered |
| TC031 | SC4 | `u_noupp_0` | `weakp@ss0` | `weakp@ss0` | `john@example.com` | Fail: Password must contain uppercase |
| TC032 | SC4 | `u_noupp_1` | `weakp@ss1` | `weakp@ss1` | `john@example.com` | Fail: Password must contain uppercase |
| TC033 | SC4 | `u_noupp_2` | `weakp@ss2` | `weakp@ss2` | `john@example.com` | Fail: Password must contain uppercase |
| TC034 | SC4 | `u_noupp_3` | `weakp@ss3` | `weakp@ss3` | `john@example.com` | Fail: Password must contain uppercase |
| TC035 | SC4 | `u_noupp_4` | `weakp@ss4` | `weakp@ss4` | `john@example.com` | Fail: Password must contain uppercase |
| TC036 | SC4 | `u_noupp_5` | `weakp@ss5` | `weakp@ss5` | `john@example.com` | Fail: Password must contain uppercase |
| TC037 | SC4 | `u_noupp_6` | `weakp@ss6` | `weakp@ss6` | `john@example.com` | Fail: Password must contain uppercase |
| TC038 | SC4 | `u_noupp_7` | `weakp@ss7` | `weakp@ss7` | `john@example.com` | Fail: Password must contain uppercase |
| TC039 | SC4 | `u_nolow_0` | `WEAKP@SS0` | `WEAKP@SS0` | `john@example.com` | Fail: Password must contain lowercase |
| TC040 | SC4 | `u_nolow_1` | `WEAKP@SS1` | `WEAKP@SS1` | `john@example.com` | Fail: Password must contain lowercase |
| TC041 | SC4 | `u_nolow_2` | `WEAKP@SS2` | `WEAKP@SS2` | `john@example.com` | Fail: Password must contain lowercase |
| TC042 | SC4 | `u_nolow_3` | `WEAKP@SS3` | `WEAKP@SS3` | `john@example.com` | Fail: Password must contain lowercase |
| TC043 | SC4 | `u_nolow_4` | `WEAKP@SS4` | `WEAKP@SS4` | `john@example.com` | Fail: Password must contain lowercase |
| TC044 | SC4 | `u_nolow_5` | `WEAKP@SS5` | `WEAKP@SS5` | `john@example.com` | Fail: Password must contain lowercase |
| TC045 | SC4 | `u_nolow_6` | `WEAKP@SS6` | `WEAKP@SS6` | `john@example.com` | Fail: Password must contain lowercase |
| TC046 | SC4 | `u_nolow_7` | `WEAKP@SS7` | `WEAKP@SS7` | `john@example.com` | Fail: Password must contain lowercase |
| TC047 | SC4 | `u_nonum_0` | `WeakP@ssX` | `WeakP@ssX` | `john@example.com` | Fail: Password must contain number |
| TC048 | SC4 | `u_nonum_1` | `WeakP@ssX` | `WeakP@ssX` | `john@example.com` | Fail: Password must contain number |
| TC049 | SC4 | `u_nonum_2` | `WeakP@ssX` | `WeakP@ssX` | `john@example.com` | Fail: Password must contain number |
| TC050 | SC4 | `u_nonum_3` | `WeakP@ssX` | `WeakP@ssX` | `john@example.com` | Fail: Password must contain number |
| TC051 | SC4 | `u_nonum_4` | `WeakP@ssX` | `WeakP@ssX` | `john@example.com` | Fail: Password must contain number |
| TC052 | SC4 | `u_nonum_5` | `WeakP@ssX` | `WeakP@ssX` | `john@example.com` | Fail: Password must contain number |
| TC053 | SC4 | `u_nonum_6` | `WeakP@ssX` | `WeakP@ssX` | `john@example.com` | Fail: Password must contain number |
| TC054 | SC4 | `u_nonum_7` | `WeakP@ssX` | `WeakP@ssX` | `john@example.com` | Fail: Password must contain number |
| TC055 | SC4 | `u_nospec_0` | `WeakPass0` | `WeakPass0` | `john@example.com` | Fail: Password must contain special char |
| TC056 | SC4 | `u_nospec_1` | `WeakPass1` | `WeakPass1` | `john@example.com` | Fail: Password must contain special char |
| TC057 | SC4 | `u_nospec_2` | `WeakPass2` | `WeakPass2` | `john@example.com` | Fail: Password must contain special char |
| TC058 | SC4 | `u_nospec_3` | `WeakPass3` | `WeakPass3` | `john@example.com` | Fail: Password must contain special char |
| TC059 | SC4 | `u_nospec_4` | `WeakPass4` | `WeakPass4` | `john@example.com` | Fail: Password must contain special char |
| TC060 | SC4 | `u_nospec_5` | `WeakPass5` | `WeakPass5` | `john@example.com` | Fail: Password must contain special char |
| TC061 | SC4 | `u_nospec_6` | `WeakPass6` | `WeakPass6` | `john@example.com` | Fail: Password must contain special char |
| TC062 | SC4 | `u_nospec_7` | `WeakPass7` | `WeakPass7` | `john@example.com` | Fail: Password must contain special char |
| TC063 | SC4 | `u_short_0` | `W@s1` | `W@s1` | `john@example.com` | Fail: Password must be at least 8 chars |
| TC064 | SC4 | `u_short_1` | `W@s1` | `W@s1` | `john@example.com` | Fail: Password must be at least 8 chars |
| TC065 | SC4 | `u_short_2` | `W@s1` | `W@s1` | `john@example.com` | Fail: Password must be at least 8 chars |
| TC066 | SC4 | `u_short_3` | `W@s1` | `W@s1` | `john@example.com` | Fail: Password must be at least 8 chars |
| TC067 | SC4 | `u_short_4` | `W@s1` | `W@s1` | `john@example.com` | Fail: Password must be at least 8 chars |
| TC068 | SC4 | `u_short_5` | `W@s1` | `W@s1` | `john@example.com` | Fail: Password must be at least 8 chars |
| TC069 | SC4 | `u_short_6` | `W@s1` | `W@s1` | `john@example.com` | Fail: Password must be at least 8 chars |
| TC070 | SC4 | `u_short_7` | `W@s1` | `W@s1` | `john@example.com` | Fail: Password must be at least 8 chars |
| TC071 | SC5 | `u_mismatch_0` | `StrongP@ss1` | `StrongP@ss1x` | `john@example.com` | Fail: Passwords do not match |
| TC072 | SC5 | `u_mismatch_1` | `StrongP@ss1` | `StrongP@ss1x` | `john@example.com` | Fail: Passwords do not match |
| TC073 | SC5 | `u_mismatch_2` | `StrongP@ss1` | `StrongP@ss1x` | `john@example.com` | Fail: Passwords do not match |
| TC074 | SC5 | `u_mismatch_3` | `StrongP@ss1` | `StrongP@ss1x` | `john@example.com` | Fail: Passwords do not match |
| TC075 | SC5 | `u_mismatch_4` | `StrongP@ss1` | `StrongP@ss1x` | `john@example.com` | Fail: Passwords do not match |
| TC076 | SC5 | `u_mismatch_5` | `StrongP@ss1` | `StrongP@ss1x` | `john@example.com` | Fail: Passwords do not match |
| TC077 | SC5 | `u_mismatch_6` | `StrongP@ss1` | `StrongP@ss1x` | `john@example.com` | Fail: Passwords do not match |
| TC078 | SC5 | `u_mismatch_7` | `StrongP@ss1` | `StrongP@ss1x` | `john@example.com` | Fail: Passwords do not match |
| TC079 | SC5 | `u_mismatch_8` | `StrongP@ss1` | `StrongP@ss1x` | `john@example.com` | Fail: Passwords do not match |
| TC080 | SC5 | `u_mismatch_9` | `StrongP@ss1` | `StrongP@ss1x` | `john@example.com` | Fail: Passwords do not match |
| TC081 | SC6 | `u_bademail_0` | `StrongP@ss1` | `StrongP@ss1` | `plainaddress` | Fail: Invalid email format |
| TC082 | SC6 | `u_bademail_1` | `StrongP@ss1` | `StrongP@ss1` | `#@%^%#$@#$@#.com` | Fail: Invalid email format |
| TC083 | SC6 | `u_bademail_2` | `StrongP@ss1` | `StrongP@ss1` | `@example.com` | Fail: Invalid email format |
| TC084 | SC6 | `u_bademail_3` | `StrongP@ss1` | `StrongP@ss1` | `Joe Smith <email@example.com>` | Fail: Invalid email format |
| TC085 | SC6 | `u_bademail_4` | `StrongP@ss1` | `StrongP@ss1` | `email.example.com` | Fail: Invalid email format |
| TC086 | SC6 | `u_bademail_5` | `StrongP@ss1` | `StrongP@ss1` | `email@example@example.com` | Fail: Invalid email format |
| TC087 | SC6 | `u_bademail_6` | `StrongP@ss1` | `StrongP@ss1` | `.email@example.com` | Fail: Invalid email format |
| TC088 | SC6 | `u_bademail_7` | `StrongP@ss1` | `StrongP@ss1` | `email.@example.com` | Fail: Invalid email format |
| TC089 | SC6 | `u_bademail_8` | `StrongP@ss1` | `StrongP@ss1` | `email..email@example.com` | Fail: Invalid email format |
| TC090 | SC6 | `u_bademail_9` | `StrongP@ss1` | `StrongP@ss1` | `email@example.com (Joe Smith)` | Fail: Invalid email format |
| TC091 | SC7 | `u_existemail_0` | `StrongP@ss1` | `StrongP@ss1` | `existing@example.com` | Fail: Email already registered |
| TC092 | SC7 | `u_existemail_1` | `StrongP@ss1` | `StrongP@ss1` | `existing@example.com` | Fail: Email already registered |
| TC093 | SC7 | `u_existemail_2` | `StrongP@ss1` | `StrongP@ss1` | `existing@example.com` | Fail: Email already registered |
| TC094 | SC7 | `u_existemail_3` | `StrongP@ss1` | `StrongP@ss1` | `existing@example.com` | Fail: Email already registered |
| TC095 | SC7 | `u_existemail_4` | `StrongP@ss1` | `StrongP@ss1` | `existing@example.com` | Fail: Email already registered |
| TC096 | SC7 | `u_existemail_5` | `StrongP@ss1` | `StrongP@ss1` | `existing@example.com` | Fail: Email already registered |
| TC097 | SC7 | `u_existemail_6` | `StrongP@ss1` | `StrongP@ss1` | `existing@example.com` | Fail: Email already registered |
| TC098 | SC7 | `u_existemail_7` | `StrongP@ss1` | `StrongP@ss1` | `existing@example.com` | Fail: Email already registered |
| TC099 | SC7 | `u_existemail_8` | `StrongP@ss1` | `StrongP@ss1` | `existing@example.com` | Fail: Email already registered |
| TC100 | SC7 | `u_existemail_9` | `StrongP@ss1` | `StrongP@ss1` | `existing@example.com` | Fail: Email already registered |
| TC101 | SC8 | `` | `StrongP@ss1` | `StrongP@ss1` | `john@example.com` | Fail: Browser validation required field |
| TC102 | SC8 | `johnDoe` | `` | `StrongP@ss1` | `john@example.com` | Fail: Browser validation required field |
| TC103 | SC8 | `johnDoe` | `StrongP@ss1` | `` | `john@example.com` | Fail: Browser validation required field |
| TC104 | SC8 | `` | `` | `` | `` | Fail: Browser validation required field |
| TC105 | SC8 | `x` | `` | `` | `` | Fail: Browser validation required field |
