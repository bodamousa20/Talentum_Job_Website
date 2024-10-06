package com.Talentum.TalentumApplication.repository;

import com.Talentum.TalentumApplication.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin,Long> {
    Admin findByEmail(String email);

}
