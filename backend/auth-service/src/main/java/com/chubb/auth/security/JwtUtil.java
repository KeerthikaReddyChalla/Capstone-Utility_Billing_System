package com.chubb.auth.security;

@Component
public class JwtUtil {

    private final String SECRET = "MoveThisToConfigServerLater1234567890";
    private final long EXPIRATION = 1000L * 60 * 60 * 24 * 60;

    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role", user.getRole().name())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(Keys.hmacShaKeyFor(SECRET.getBytes()))
                .compact();
    }
}

