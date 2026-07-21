package com.example.jwt_authentication.service;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private static final String SECRET = "cognizant-jwt-handson-secret-key";
    private static final long EXPIRY_SECONDS = 20 * 60;

    public String generateToken(Authentication authentication) {
        Instant now = Instant.now();

        Map<String, Object> header = new LinkedHashMap<>();
        header.put("alg", "HS256");
        header.put("typ", "JWT");

        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("sub", authentication.getName());
        payload.put("iat", now.getEpochSecond());
        payload.put("exp", now.plusSeconds(EXPIRY_SECONDS).getEpochSecond());
        payload.put("roles", authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()));

        String encodedHeader = base64Url(toJson(header));
        String encodedPayload = base64Url(toJson(payload));
        String unsignedToken = encodedHeader + "." + encodedPayload;

        return unsignedToken + "." + sign(unsignedToken);
    }

    private String sign(String data) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec key = new SecretKeySpec(SECRET.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(key);
            return Base64.getUrlEncoder().withoutPadding()
                    .encodeToString(mac.doFinal(data.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception ex) {
            throw new IllegalStateException("Unable to generate JWT", ex);
        }
    }

    private String base64Url(String value) {
        return Base64.getUrlEncoder().withoutPadding()
                .encodeToString(value.getBytes(StandardCharsets.UTF_8));
    }

    private String toJson(Map<String, Object> values) {
        return values.entrySet().stream()
                .map(entry -> "\"" + entry.getKey() + "\":" + toJsonValue(entry.getValue()))
                .collect(Collectors.joining(",", "{", "}"));
    }

    private String toJsonValue(Object value) {
        if (value instanceof Number) {
            return value.toString();
        }

        if (value instanceof Iterable<?> items) {
            return toJsonArray(items);
        }

        return "\"" + escape(value.toString()) + "\"";
    }

    private String toJsonArray(Iterable<?> items) {
        StringBuilder json = new StringBuilder("[");
        boolean first = true;

        for (Object item : items) {
            if (!first) {
                json.append(",");
            }
            json.append(toJsonValue(item));
            first = false;
        }

        return json.append("]").toString();
    }

    private String escape(String value) {
        return value.replace("\\", "\\\\").replace("\"", "\\\"");
    }
}
