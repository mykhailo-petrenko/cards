package com.mapetrenko.cards;

import com.mapetrenko.cards.model.UserDTO;
import com.mapetrenko.cards.model.UserPasswordDTO;
import com.mapetrenko.cards.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.security.Principal;

@RestController
@RequestMapping("/api/v1/me")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public UserDTO getMyInfo(Principal principal) throws UserPrincipalNotFoundException {
        return userService.getUser(principal.getName());
    }

    @PostMapping()
    public UserDTO updateMyInfo(@RequestBody UserDTO userDTO, Principal principal) throws UserPrincipalNotFoundException {
        UserDTO user = userService.getUser(principal.getName());
        userDTO.setEmail(user.getEmail());

        return userService.updateUser(userDTO);
    }

    @PostMapping("/password")
    public void updatePassword(@RequestBody UserPasswordDTO passwordDTO, Principal principal) throws UserPrincipalNotFoundException {
        // @TODO: Add previous password validation

        userService.updatePassword(principal.getName(), passwordDTO);
    }
}
