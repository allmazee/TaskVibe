package com.allmazee.taskvibe.service;

import com.allmazee.taskvibe.repository.UserRepository;
import com.allmazee.taskvibe.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import com.allmazee.taskvibe.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {
    private UserRepository repository;

    @Autowired
    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        String.format("User %s not found", username)
                ));
        return UserDetailsImpl.build(user);
    }
}
