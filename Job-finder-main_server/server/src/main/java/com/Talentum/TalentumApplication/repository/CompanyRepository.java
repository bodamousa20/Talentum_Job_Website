package com.Talentum.TalentumApplication.repository;

import com.Talentum.TalentumApplication.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    boolean existsByEmail(String email);
    boolean existsByName(String companyName);
    Company findByEmail(String email);

}
