package com.Talentum.TalentumApplication.repository;

import com.Talentum.TalentumApplication.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    boolean existsByEmail(String email);
    User findAccountByEmail (String email);

}
