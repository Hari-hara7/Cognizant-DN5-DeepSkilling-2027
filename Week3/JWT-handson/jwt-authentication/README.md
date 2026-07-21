# JWT Authentication Handson

## Project Flow

1. Client calls `GET /authenticate` with HTTP Basic Authentication.
2. Spring Security validates the username and password using in-memory users.
3. Valid users are:
   - `user` / `pwd` with role `USER`
   - `admin` / `pwd` with role `ADMIN`
4. After successful authentication, `AuthenticationController` receives the authenticated principal.
5. `AuthenticationService` creates a JWT with:
   - `sub`: logged-in username
   - `iat`: issued-at timestamp
   - `exp`: expiry timestamp
   - `roles`: user roles
6. The service signs the JWT using HMAC SHA-256.
7. The API returns the token as JSON.

## How To Run

```bash
mvn spring-boot:run
```

The application runs on port `8090`.

## Test The Endpoint

```bash
curl -u user:pwd http://localhost:8090/authenticate
```

Expected response:

```json
{
  "token": "header.payload.signature"
}
```

## Main Files

- `JwtAuthenticationApplication.java`: Spring Boot application entry point.
- `SecurityConfig.java`: Configures HTTP Basic authentication and in-memory users.
- `AuthenticationController.java`: Exposes the `/authenticate` endpoint.
- `AuthenticationService.java`: Generates and signs the JWT.

## Interview Questions

1. What is JWT?
   JWT, or JSON Web Token, is a compact token format used to securely transfer claims between two parties.

2. What are the three parts of a JWT?
   Header, payload, and signature.

3. What does the JWT header contain?
   It usually contains the token type and signing algorithm, such as `HS256`.

4. What does the JWT payload contain?
   It contains claims such as username, roles, issued time, and expiry time.

5. Why is a JWT signed?
   Signing ensures the token was not modified after it was created.

6. Is JWT encrypted by default?
   No. JWT is Base64Url encoded and signed, but not encrypted by default.

7. What is the purpose of the `exp` claim?
   It defines when the token expires.

8. What is HTTP Basic Authentication?
   It is an authentication method where the client sends username and password in the `Authorization` header.

9. Why do we use `PasswordEncoder`?
   It stores and compares passwords securely instead of keeping plain text passwords.

10. What is `SecurityFilterChain`?
    It defines Spring Security rules for authentication, authorization, CSRF, and filters.

11. What is the difference between authentication and authorization?
    Authentication verifies who the user is. Authorization verifies what the user can access.

12. How does this project generate a JWT?
    The controller receives the authenticated user and calls `AuthenticationService`, which builds a signed JWT.

13. Why should JWT use HTTPS?
    HTTPS prevents attackers from reading or stealing tokens while they travel over the network.

14. Where should a JWT secret be stored in production?
    It should be stored in environment variables or a secrets manager, not hardcoded in source code.

15. What happens if a JWT payload is changed?
    The signature validation fails because the payload no longer matches the original signature.
