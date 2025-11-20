
🔹 1. API Route Matching
Test: Valid Route
POST http://localhost:8080/test


If the route exists in configuration, the request will enter the workflow pipeline.

Test: Invalid Route
POST http://localhost:8080/notfound
Expected Response:

{ "error": "not_found" }


POST http://localhost:8080/test
Body: 
{
   "name": "Chhavi",
   "role": "admin"
}
Expected Response:

500 Internal server error
Reason: 'https://test.test.com/' this not live

This confirms that the DynamicController correctly detects API paths.


🔹 2. Schema Validation Tests (validateSchema)

These tests verify the first step of the workflow pipeline.

2.1 Missing Required Field

Body:

{ "role": "admin" }

Expected:
{
    "error": "schema_validation_failed",
    "details": [
        {
            "instancePath": "",
            "schemaPath": "#/required",
            "keyword": "required",
            "params": {
                "missingProperty": "name"
            },
            "message": "must have required property 'name'"
        }
    ]
}

2.2 Wrong role Type

Body:

{ "name": "Chhavi", "role": "wrong_role" }


Expected:
{
    "error": "enum_check_failed",
    "field": "role",
    "allowed": [
        "admin",
        "user",
        "guest"
    ]
}

2.3 Empty String

Body:

{ "name": "" }


Expected:
{
    "error": "enum_field_missing",
    "field": "role"
}

2.5 Unexpected Extra Field

Body:

{
  "name": "Chhavi",
  "extra": "not allowed"
}


Expected:
{
    "error": "enum_field_missing",
    "field": "role"
}


🔹 3. Enum Validation Test (enumCheck)

If the workflow expects:

role ∈ ['admin', 'user', 'guest']

Test: Invalid Enum Value
{
  "name": "Chhavi",
  "role": "invalid"
}


Expected:
{
    "error": "enum_check_failed",
    "field": "role",
    "allowed": [
        "admin",
        "user",
        "guest"
    ]
}

🔹 4. Token Validation Test (tokenCheck)

If your workflow requires a header:

x-api-key: <valid-token>

Test: Missing Token

Send body:

{ "name": "Chhavi" }


Without any headers

Expected:
{
    "error": "token_missing"
}

🔹 5. JWT Validation Test (jwtCheck)

Header required:

Authorization: Bearer <token>

Test: Missing or Empty JWT Header

Body:

{ "name": "Chhavi" }


Expected:
{
    "error": "authorization_header_missing"
}

🔹 6. Session Cookie Test (sessionCheck)

Cookie required:

sid=<value>

Test: Missing Cookie

Send request with no cookies.

Expected:
{
    "error": "session_missing"
}

🔹 7. Full Workflow Success Path (Before Proxy Forwarding)

Since the external forwarding API is not real, we only test workflow success, not the proxy call.

Test: All Requirements Satisfied

Headers:
Content-Type: application/json
x-api-key: abc123
Authorization: Bearer <valid-jwt>
Cookie: sid=xyz


Body:

{
  "name": "Chhavi",
  "role": "admin"
}

Expected:

The workflow pipeline passes all steps.
After that, the controller attempts forwarding and you may receive a timeout such as:

ETIMEDOUT


This is expected and proves:

Request passed every workflow step

Proxy was called

Forwarding started

You do not need successful forwarding.

📌 8. What These Tests Prove

These Postman tests fully validate:

Test	Proves
Route matching	DynamicController correctly maps path to API
Schema validation	Workflow engine processes input correctly
Enum validation	Custom modules run in pipeline
Token validation	Header-based security works
JWT validation	Authorization layer works
Cookie validation	Session checker executes
Success-before-proxy	All workflow steps integrated correctly