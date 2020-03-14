package com.mapetrenko.cards.security;

import com.mapetrenko.cards.dao.UserRepository;
import com.mapetrenko.cards.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class JwtAuthenticationController {
    private UserRepository userRepository;
    private JwtTokenUtil jwtTokenUtil;
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody JwtAuthenticationRequest request) {
        try {
            if (request.getUsername().isEmpty() || request.getPassword().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

        try {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
            authenticationManager.authenticate(authenticationToken);
        } catch (Exception e) {
            return ResponseEntity.status(403).body(e.getMessage());
        }

        List<User> users = userRepository.findByEmail(request.getUsername());

        if (users.size() == 0) {
            return ResponseEntity.badRequest().build();
        }

        UserDetails user = users.get(0);

        final String token = jwtTokenUtil.generateToken(user);

        return ResponseEntity.ok(new JwtAuthenticationResponse(token));
    }

    @Autowired
    public void setJwtTokenUtil(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Autowired
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }
}
